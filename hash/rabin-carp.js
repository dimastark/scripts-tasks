function calculateRCHash(str) {
    var len = str.length;
    return str.reduce(function (hash, unused, ind) {
        hash += str.charCodeAt(ind) * Math.pow(2, len - ind);
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
var hashSubstring = calculateRCHash(substring);
var hashString = calculateRCHash(string.slice(0, substringLen));
var start = new Date();

for (var i=0; i<=stringLen-substringLen; i++) {
    if (hashSubstring === hashString) {
        for (var j = 0; string.charAt(i + j) === substring.charAt(j); j++) {
            if (j === substringLen - 1) {
                result.push(i);
                break;
            }
        }
    }
    hashString -= string.charCodeAt(i) * Math.pow(2, substringLen);
    hashString = hashString * 2 + string.charCodeAt(i + substringLen) * 2;
}

WScript.echo(result.join(', '), Date.now() - start.getTime(), 'ms ', result.length);
