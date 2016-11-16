function readProgram() {
    var fso = new ActiveXObject('Scripting.FileSystemObject');
    var programFile = fso.OpenTextFile('fact.txt');
    var s = '';
    while (!programFile.AtEndOfStream) {
        s += programFile.ReadLine() + ' ';
    }
    fso.close();
    s += 'exit';
    return s.split(' ');
}

var NUMBER_RE = /^-?[0-9]+$/;
var mem = readProgram();
var ip = 0;
var fl = false;

while (mem[ip]!='exit') {
    switch (mem[ip]) {

        case 'input':
            mem[mem[ip + 1]] = parseFloat(WScript.StdIn.ReadLine());
            if ((!NUMBER_RE.test(mem[mem[ip + 1]])) || (mem[mem[ip + 1]] < 0)) {
                WScript.Echo('Wrong input');
                WScript.Quit();
            } else {
                mem[mem[ip + 1]] = parseInt(mem[mem[ip + 1]]);
            }
            if (mem[ip + 2] == 'factor') {
                if (mem[mem[ip + 1]] > 170) {
                    WScript.Echo('Out of range');
                    WScript.Quit();
                }
            }
            else {
                if (mem[mem[ip + 1]] == 0)
                    fl = 1;
            }
            ip += 2;
            break;

        case 'output':
            if (mem[mem[ip + 1]] == 0) {
                WScript.echo('Divide by zero');
                WScript.Quit();
            }
            WScript.Echo(mem[mem[ip + 1]]);
            ip += 2;
            break;

        case 'mlp':
            mem[mem[ip + 3]] = mem[mem[ip + 1]] * mem[mem[ip + 2]];
            ip += 4;
            break;

        case 'raw1':
            if (mem[100] == mem[102])
                ip = 7;
            else
                ip = 11;
            break;

        case 'raw0':
            if (mem[102] == '0')
                ip = 6;
            else
                ip = 10;
            break;

        case 'factor':
            mem[99] = 1;
            mem[100] = 0;
            mem[101] = 1;
            ip += 1;
            break;

        case 'add':
            mem[mem[ip + 3]] = mem[mem[ip + 1]] + mem[mem[ip + 2]];
            ip += 4;
            break;

        case 'minus':
            mem[mem[ip + 3]] = mem[mem[ip + 1]] - mem[mem[ip + 2]];
            ip += 4;
            break;

        case 'goto':
            ip = mem[ip + 1];
            break;

        case 'maxmodminus':
            if (fl && ((mem[mem[ip + 1]] == 0) || (mem[mem[ip + 2]] == 0))) {
                if (mem[mem[ip + 1]] == 0) {
                    WScript.echo(mem[mem[ip + 2]]);
                    WScript.Quit();
                }
                else {
                    WScript.echo(mem[mem[ip + 1]]);
                    WScript.Quit();
                }
            }

            if (Math.max(mem[mem[ip + 1]], mem[mem[ip + 2]]) == mem[100])
                mem[mem[ip + 1]] = Math.abs(mem[mem[ip + 1]] - mem[mem[ip + 2]]);
            else
                mem[mem[ip + 2]] = Math.abs(mem[mem[ip + 1]] - mem[mem[ip + 2]]);
            ip += 3;
            break;

        case 'exit':
            WScript.Quit();
    }
}
