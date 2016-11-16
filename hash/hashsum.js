function calculateHashSum(str) {
    return str.reduce(function (hash, unused, ind) {
        hash += str.charCodeAt(ind);
        return hash;
    }, 0);
}

var fso = new ActiveXObject('Scripting.FileSystemObject');
var ts = fso.OpenTextFile('1.txt');
var string = ts.ReadAll();
ts.Close();

var substring = 'князь';
var stringLen = string.length;
var substringLen = substring.length;
var result = [];
var substringHash = calculateHashSum(substring);
var stringHash = calculateHashSum(string.slice(0, substringLen));
var start = new Date();

for (var i = 0; i <= stringLen-substringLen; i++) {
    if (substringHash === stringHash) {
        for (var j = 0; string.charAt(i + j) === substring.charAt(j); j++) {
            if (j === substringLen - 1) {
                result.push(i);
                break;
            }
        }
    }
    stringHash -= string.charCodeAt(i);
    stringHash += string.charCodeAt(i + substringLen);
}

WScript.echo(result.join(', '), Date.now() - start.getTime(), 'ms ', result.length);
