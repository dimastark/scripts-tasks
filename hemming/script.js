function code()
{
    var result=""
    var output = document.getElementById('output')
    var cont = document.getElementById('cont')
    input = new String(document.getElementById('input').value)
    if (input/1!=input || input.length!=4) {
        result=""
        output.value=result
    }
    else {
        var d1=input.charAt(0)
        var d2=input.charAt(1)
        var d3=input.charAt(2)
        var d4=input.charAt(3)
        var p1=(parseInt(d1)+parseInt(d2)+parseInt(d3))%2
        var p2=(parseInt(d1)+parseInt(d2)+parseInt(d4))%2
        var p3=(parseInt(d1)+parseInt(d3)+parseInt(d4))%2
        var p4=(p1+p2+p3+parseInt(d1)+parseInt(d2)+parseInt(d3)+parseInt(d4))%2
        result+=""+p1+p2+p3+p4
        output.value=input
        cont.value=result
    }
}
function decode()
{
    var result=""
    input = new String(document.getElementById('output').value)
    cont = new String(document.getElementById('cont').value)
    output = document.getElementById('result')
    var count=0
    var p = new Array()
    var d1=input.charAt(0)
    var d2=input.charAt(1)
    var d3=input.charAt(2)
    var d4=input.charAt(3)
    p[0]=(parseInt(d1)+parseInt(d2)+parseInt(d3))%2
    p[1]=(parseInt(d1)+parseInt(d2)+parseInt(d4))%2
    p[2]=(parseInt(d1)+parseInt(d3)+parseInt(d4))%2
    p[3]=(parseInt(p[0])+parseInt(p[1])+parseInt(p[2])+parseInt(d1)+parseInt(d2)+parseInt(d3)+parseInt(d4))%2
    for (i=0;i<4;i++)
        if (p[i]!=cont.charAt(i)) count++

    if ((input/1==input)&&(cont/1==cont)&&(input.length==4)&&(cont.length==4))
    {
        if (count==0) result="There is no error"
        else
        {
            if (count==4) result="All byte is wrong"
            if (count==1 || count==3)
            {
                for (i=3;i>=0;i--)
                    if (p[i]==cont.charAt(i)) result+=""+(4-i)+", "
            }
            if (count==2)
            {
                for (i=3;i>=0;i--)
                    if (p[i]!=cont.charAt(i)) result+=""+(4-i)+", "
            }
        }
        output.value=result
    }
}
