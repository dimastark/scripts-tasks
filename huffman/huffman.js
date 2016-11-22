function readInput() {
    var fso = new ActiveXObject('Scripting.FileSystemObject');
    var file = fso.OpenTextFile('input.txt');
    var input = file.ReadAll();
    file.close();
    return input;
}

function writeFrequences(input, charArray, charCounts) {
    var out = fso.OpenTextFile('inform.txt', 2, true);
    out.WriteLine('Исходная строка');
    out.WriteLine(input);
    out.WriteLine('Алфавит и частота');
    for (var i=0; i < charArray.length; i++) {
        Text.Write(charArray[i] + ' = ' + charCounts[i] + ' ');
    }
    out.close();
}

function writeOut(input, charArray, codes) {
    var out = fso.OpenTextFile('inform.txt', 2, true);
    out.WriteLine();
    out.WriteLine('Коды символов:');

    charArray.forEach(function (c, ind) {
       out.WriteLine(c + ' = ' + codes[ind] + ' ')
    });

    encoded = input.split('').map(function (c) {
        return codes[charArray.indexOf(c)];
    });

    out.WriteLine('Закодированная строка');
    out.WriteLine(encoded);

    var decoded = encoded.split('').map(function (c) {
        return charArray[codes.indexOf(c)];
    }).join();

    out.WriteLine('Раскодированная строка');
    out.WriteLine(decoded);
    out.close();
}

var input = readInput();
var splitInput = input.split('');
var len = input.length;
var charArray = [];

splitInput.forEach(function (c) {
    if (charArray.indexOf(c) === -1) {
        charArray.push(c);
    }
});

var charCounts = charArray.map(function (c) {
    return splitInput.reduce(function (count, char) {
        return count + (char === c);
    }, 0);
});

charCounts.sort(function (a, b) {
    if (a > b) {
        var tmp = charArray;
        charArray[0] = charArray[1];
        charArray[1] = tmp;

        return 1
    }
});

writeFrequences(input, charArray, charCounts);

var nameAddress = [];

charArray.forEach(function (c, ind) {
    var selections = { 0: -1, 1: 'no', 2: 'no', 3: c };
    nameAddress[ind] = selections[ind % 4];
});

var iInd;
var jInd;
var charCountsLen = charCounts.length;

while (charCounts[charCountsLen - 1] < len) {
    var min = Number.MAX_VALUE;

    for (var i = 0; i < charCountsLen; i++) {
        for (var j = 0; j < charCountsLen; j++) {
            if (i != j && charCounts[i] > 0 && charCounts[j] > 0) {
                if (charCounts[i] + charCounts[j] < min) {
                    min = charCounts[i] + charCounts[j];
                    iInd = (i + 1) * 4 - 1;
                    jInd = (j + 1) * 4 - 1
                }
            }
        }
    }

    charCounts.push(min);
    charCounts[iInd] = -charCounts[iInd];
    charCounts[jInd] = -charCounts[jInd];

    if (nameAddress[iInd].length < nameAddress[jInd].length) {
        var tmp = iInd;
        iInd = jInd;
        jInd = tmp;
    }

    nameAddress.push(-1);
    nameAddress.push(iInd);
    nameAddress.push(jInd);
    nameAddress.push(nameAddress[iInd] + nameAddress[jInd]);
}

var lastAddress = nameAddress.length - 3;
while(nameAddress[lastAddress] !== 'no') {
    iInd = nameAddress[lastAddress];
    jInd = nameAddress[lastAddress + 1];
    nameAddress[iInd - 3] = 0;
    nameAddress[jInd - 3] = 1;
    lastAddress -= 4;
}

var codes = [];
for (i = 0; i < charArray.length; i++) {
    var encoded = nameAddress[((i + 1) * 4 - 4)];
    var char = nameAddress[((i + 1) * 4 - 1)].charAt(0);

    for (j = (i + 2) * 4 - 1; j < nameAddress.length - 4; j += 4) {
        if (nameAddress.indexOf(char) !== -1) {
            encoded += nameAddress[j - 3];
        }
    }

    codes.push(encoded.split('').reverse().join());
}

writeOut(input, charArray, codes);
