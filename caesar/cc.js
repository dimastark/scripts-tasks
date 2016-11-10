var RUS_CHARS = [
	'А','Б','В','Г','Д','Е','Ё','Ж',
	'З','И','Й','К','Л','М','Н','О',
	'П','Р','С','Т','У','Ф','Х','Ц',
	'Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'
];
var fso = new ActiveXObject("Scripting.FileSystemObject");
var string = "ОКОЛО МЕНЯ НЕ МОЛОКО"; // Входная строка
var shift = 3; // На сколько произвести сдвиг >= 0

var ts = fso.OpenTextFile("frequencies.txt");
var gt = ts.ReadAll();
var FREQUENCIES = gt.split(" ");

function indexOfChar(symbol, alph) {  // Мои велосипеды) Как мило
	for (var i = 0; i < alph.length; i++) {
		if (alph[i] === symbol) {
			return i;
		}
	}
	return -1;
}

function rot(str, rotation) {
	var res = "";
	for (var i = 0; i < str.length; i++) {
		var ind = indexOfChar(str.charAt(i), RUS_CHARS);
		if (ind !== -1) {
			res += RUS_CHARS[(ind + rotation) % RUS_CHARS.length];
		} else {
			res += str.charAt(i);
		}
	}
	return res;
}

var rotStr = rot(string, shift);
WScript.echo(rotStr);

var alphabet = [];
var circle = 0;
var minSum = Number.MAX_VALUE;

for (var i = 0; i < rotStr.length; i++) {
	alphabet[rotStr.charAt(i)] = 0;
}

for (i = 0; i < rotStr.length; i++) {
	alphabet[rotStr.charAt(i)]++;
}

for (var j = 0; j < RUS_CHARS.length; j++) {
    var sum = 0;
	for (i = 0; i < rotStr.length; i++)	{
		var freq = alphabet[rotStr.charAt(i)] / rotStr.length;
		var shiftedWith = indexOfChar(rotStr.charAt(i), RUS_CHARS) + j;
		var mustFreq = FREQUENCIES[shiftedWith % RUS_CHARS.length];
		sum += (mustFreq - freq) * (mustFreq - freq);
	}
    if (sum < minSum) {
    	minSum = sum;
		circle = j;
	}
}

WScript.echo(rot(rotStr, circle));
