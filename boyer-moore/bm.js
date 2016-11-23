function readInput() {
    var fso = new ActiveXObject('Scripting.FileSystemObject');
    var file  = fso.OpenTextFile('in.txt');
    var input = file.ReadAll();
    file.Close();
    return input;
}

function precalculate() {
    var shifts = [];
    for (var j = 1; j <= substringLen; j++) {
        var suffix = substring.substring(substringLen - j, substringLen);
        for (var i = 1; i + j < substringLen - j; i++) {
            var prefix = substring.substring(substringLen - i - j, substringLen - i);
            if (prefix === suffix) {
                shifts[j] = i;
                break;
            }
        }
        if (!shifts[j]) {
            shifts[j] = 0;
        }
    }
    return shifts;
}

var string = readInput();
var substring = 'abc';
var stringLen = string.length;
var substringLen = substring.length;
var shifts = precalculate();

var result=[];
var entry = [];
for(var k = 0; k < substringLen; k++) {
    entry[substring.charAt(k)] = k;
}

for (var i=substringLen-1; i<stringLen; i++) {
    for (var j = 0; string.charAt(i - j) === substring.charAt((substringLen - 1) - j); j++) {
        if (j === substringLen - 1) {
            result.push(i - (substringLen - 1));
            break;
        }
    }

    if (j + 1 !== substringLen) {
        if (!entry[string.charAt(i - j)]) {
            i += substringLen - 1;
        } else {
            i += Math.max(0, substringLen - entry[string.charAt(i - j)] - j - 2, shifts[j]);
        }
    }
}

WScript.echo(result.join(', '));
