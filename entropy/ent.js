function readInput() {
    var fso = new ActiveXObject('Scripting.FileSystemObject');
    var file = fso.OpenTextFile('input.txt');
    var input = file.ReadAll();
    file.close();
    return input;
}

var input = readInput();
var chars = input.split('');
var pop = [];

for(var i = 0; i < chars.length - 1; i++) {
    var repeatCount = 1;
    for (var k = i + 1; k < chars.length; k++) {
        if (chars[i] == chars[k] && chars[i] != '') {
            chars[k] = '';
            repeatCount++;
        }
    }

    pop.push(chars[i] !== '' ? repeatCount : 0);
}

if (chars[chars.length - 1] !== '') {
    pop[chars.length - 1] = repeatCount;
}

var sum = pop.reduce(function (aggregate, element) {
    return aggregate + element;
}, 0);

chars.forEach(function (c, i) {
    if (c !== '') {
        WScript.echo('Символ: ' + c + ' Частота: ' + pop[i] / sum);
    }

    WScript.echo('Энтропия: ' + pop.reduce(function (calculated, next) {
        return calculated + -next * Math.log(next / sum) / (Math.log(2) * sum);
    }));
});
