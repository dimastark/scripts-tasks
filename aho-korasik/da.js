function readInput() {
    var fso = new ActiveXObject('Scripting.FileSystemObject');
    var file  = fso.OpenTextFile('in.txt');
    var input = file.ReadAll();
    file.Close();
    return input;
}

var string = readInput();
var substring = 'abc';
var substringLen = substring.length;
var states = substring.split('');

dka = substring.map(function () {
    return [];
});

states.forEach(function (state) {
    dka[0][state] = 0;
});

states.forEach(function (c, i) {
    dka[i][c] = i + 1;
    states.forEach(function (state) {
        dka[i + 1][state] = dka[dka[i][c]][state];
    });
});

var result = [];
var status = 0;

string.split('').forEach(function (c, i) {
    if (!dka[status][c]) {
        status = 0;
        return;
    }
    status = dka[status][c];

    if (status === substringLen) {
        result.push(i - (substringLen - 1));
    }
});

WScript.echo(result.join(', '));
