var fso = new ActiveXObject("Scripting.FileSystemObject")
var ts  = fso.OpenTextFile("in.txt")
var S=ts.ReadAll()
t=WScript.StdIn.ReadLine()
var m=t.length
var n=S.length
var status=0
alph=new Array()
var count=0
var result=new Array()

for(i=0;i<m;i++)
alph[t.charAt(i)]=0
del=new Array(m+1)
for(j=0;j<=m;j++)
del[j]=new Array()
for(i in alph)
del[0][i]=0
for(j=0;j<m;j++){
prev=del[j][t.charAt(j)]
del[j][t.charAt(j)]=j+1
for(i in alph)
del[j+1][i]=del[prev][i]
}

for (var i=0; i<n;i++)
{
  if (del[status][S.charAt(i)]==undefined)
  {
    status=0
    continue
  }
  status= del[status][S.charAt(i)]
  if (status==m) 
  {
    result[count]=i-(m-1)
    count++  
  } 
}

var res= result.join(", ")
WScript.echo(res)