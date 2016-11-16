var fso = new ActiveXObject("Scripting.FileSystemObject");
var ts = fso.OpenTextFile("in.txt");
var S = ts.ReadAll();
var n = S.length;
var list = "()+-*/";
var order = [];
var stack = [];
var result = [];

for (var i = 0; i < list.length; i++) {
    order[list.charAt(i)] = Math.floor(i / 2);
}

for (i = 0; i < n; i++) {
    if (order[S.charAt(i)] == undefined) {
        result.push(S.charAt(i));
    } else {
        if (S.charAt(i) === '(') {
            stack.push(S.charAt(i));
        } else if (S.charAt(i) === ')') {
    	    while ((stack[stack.length - 1] !== '(') && (stack.length !== 0)) {
    		    result.push(stack.pop());
    	    }
            if (stack.length === 0) {
                throw new Error("Wrong operand");
            }
            stack.pop();
    	} else {
    	    while ((order[S.charAt(i)] <= order[stack[stack.length-1]]) && (stack.length !== 0)) {
    	        result.push(stack.pop());
    	    }
    	    stack.push(S.charAt(i))
    	}
    }
}

while (stack.length !== 0) {
    result.push(stack.pop());
}

var res = result.join("");
WScript.echo(res);

for (i = 0; i < result.length; i++) {
	if (order[result[i]] === undefined) {
		stack.push(result[i]);
	} else {
		var a = stack.pop();
		var b = stack.pop();
		if (result[i] === "/" && a === 0) {
            throw new Error("Divide by zero");
        }
		stack.push(eval("parseInt(b)" + result[i] + "parseInt(start)")); // Уязвимость) Мило
	}
}

WScript.echo(stack.pop());
