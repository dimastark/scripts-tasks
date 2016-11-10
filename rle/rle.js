var fso = new ActiveXObject("Scripting.FileSystemObject");

switch (WSH.Arguments(0)) {
    case "code_escape":
    case "code_jump":
        var ts  = fso.OpenTextFile("in.txt");
        var input = ts.ReadAll();
        break;

    case "decode_escape":
    case "decode_jump":
        var ts  = fso.OpenTextFile("out.txt");
        var input = ts.ReadAll();
        break;
}

var i = 0;
var count = 1;
var result = "";
var rule;

switch (WSH.Arguments(0)) {
    case "code_escape":
        while (i < input.length) {
            while(input.charAt(i) === input.charAt(i+count)) {
                count++;
            }
            count_old = count;
            while (count > 64) {
                result += ("#" + String.fromCharCode(64) + input.charAt(i));
                count -= 64;
            }
            if ((count > 3) || (input.charAt(i) === "#")) {
                result += ("#" + String.fromCharCode(count) + input.charAt(i));
            } else {
                result += input.substr(i, count);
            }
            i += count_old;
            count = 1;
        }
        break;

    case "decode_escape":
        while (i < input.length) {
            if (input.charAt(i) === "#") {
                for (var j= 0; j < input.charCodeAt(i+1); j++) {
                    result += input.charAt(i + 2);
                }
                i += 3;
            } else {
                result += input.charAt(i);
                i++;
            }
        }
        break;

    case "code_jump":
        while (i < input.length) {
            while(input.charAt(i) == input.charAt(i + count)) {
                count++;
            }
            var count_old = count;
            if (count === 1) {
                while(input.charAt(i+count)!=input.charAt(i+count+1)) {
                    count++;
                }
                count_old = count;
                result += (String.fromCharCode(count + 32) + input.substr(i, count));
                i += count;
                count = 1;
            }
            while (count > 31) {
              result += (String.fromCharCode(32) + input.charAt(i));
              count -= 32;
            }
            if (count < 32) {
                result += (String.fromCharCode(count) + input.charAt(i));
                count = 1;
            }
            i += count_old;
            count = 1;
        }
        break;

    case "decode_jump":
        while (i < input.length) {
            if (input.charCodeAt(i) <= 32) {
                for (j= 0; j < input.charCodeAt(i); j++) {
                    result += input.charAt(i + 1);
                }
                i+= 2;
            }
            if (input.charCodeAt(i) > 32) {
                rule = input.charCodeAt(i) - 32;
                i += 1;
                while (rule > 0) {
                    result += input.charAt(i);
                    i++;
                    rule--;
                }
            }
        }
        break;

    default:
        WSH.echo("Wrong choise");
        break;
}

var ts  = fso.OpenTextFile("out.txt", 2, true);
ts.Write(result);
ts.Close();
