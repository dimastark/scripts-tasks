function calculateSumHash(str) {
    return str.reduce(function (hash, unused, ind) {
        hash += Math.pow(str.charCodeAt(ind), 2);
        return hash;
    }, 0);
}

var fso = new ActiveXObject('Scripting.FileSystemObject');
var ts  = fso.OpenTextFile('1.txt');
var string = ts.ReadAll();
ts.Close();

var substring = 'князь';
var stringLen = string.length;
var substringLen = substring.length;
var result = [];
var substringHash = calculateSumHash(substring);
var stringHash = calculateSumHash(string.slice(0, substringLen));
var start = new Date();

for (var i = 0; i <= stringLen - substringLen; i++) {
    if (substringHash === stringHash) {
        for (var j = 0; string.charAt(i + j) === substring.charAt(j); j++) {
            if (j === substringLen - 1) {
                result.push(i);
                break;
            }
        }
    }
    stringHash -= Math.pow(string.charCodeAt(i), 2);
    stringHash += Math.pow(string.charCodeAt(i + substringLen), 2)
}

WScript.echo(result.join(', '), Date.now() - start.getTime(), 'ms ', result.length);
