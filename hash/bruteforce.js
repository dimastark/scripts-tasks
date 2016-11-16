var fso = new ActiveXObject('Scripting.FileSystemObject');
var ts = fso.OpenTextFile('1.txt');
var string = ts.ReadAll();
ts.Close();

var substring = 'князь';
var stringLen = string.length;
var substringLen = substring.length;
var result = [];
var start = new Date();

for (var i = 0; i <= stringLen - substringLen; i++) {
    for (var j = 0; string.charAt(i + j) === substring.charAt(j); j++) {
        if (j === substringLen - 1) {
            result.push(i);
            break;
        }
    }
}

WScript.echo(result.join(', '), Date.now() - start.getTime(), 'ms ', result.length);
