var IN = document.getElementById('input');
var CONT = document.getElementById('cont');
var OUT = document.getElementById('output');
var RESULT = document.getElementById('result');

function sum(a, b) {
    return a + b;
}

function code() {
    var input = String(IN.value);
    var bits = input.split('').map(Number);
    var encodedBits = [];
    encodedBits.push((bits[0] + bits[1] + bits[2]) % 2);
    encodedBits.push((bits[0] + bits[1] + bits[3]) % 2);
    encodedBits.push((bits[0] + bits[2] + bits[3]) % 2);
    encodedBits.push((encodedBits.reduce(sum) + bits.reduce(sum)) % 2);
    OUT.value = input;
    CONT.value = encodedBits.map(String).reduce(sum);
}

function decode() {
    var cont = String(CONT.value);
    var bits = String(OUT.value).split('').map(Number);
    var encodedBits = [];
    encodedBits.push((bits[0] + bits[1] + bits[2]) % 2);
    encodedBits.push((bits[0] + bits[1] + bits[3]) % 2);
    encodedBits.push((bits[0] + bits[2] + bits[3]) % 2);
    encodedBits.push((encodedBits.reduce(sum) + bits.reduce(sum)) % 2);
    
    var count = encodedBits.reduce(function (count, c, i) {
       return count + c !== cont.charAt(i);
    });

    var result = '';
    if (count === 0) {
        result = 'There is no error';
    } else {
        if (count == 4) {
            result = 'All bytes is wrong';
        }
        if (count == 1 || count == 3) {
            for (i = 3; i >= 0; i--) {
                if (encodedBits[i] == cont.charAt(i)) result += '' + (4 - i) + ', '
            }
        }
        if (count == 2) {
            for (i = 3; i >= 0; i--) {
                if (encodedBits[i] != cont.charAt(i)) result += '' + (4 - i) + ', '
            }
        }
    }
    RESULT.value = result
}
