var FSO = new ActiveXObject("Scripting.FileSystemObject");  
t = FSO.OpenTextFile("¬вод.txt");
var str = t.ReadAll()
t.close();
entrop=0;
countPovtor=1;
alph=new Array();
pop=new Array();
 for(i=0; i<str.length; i++)
  alph[i]=str.charAt(i);
 for(i=0;i<alph.length-1;i++)
  {
    for(k=i+1; k<alph.length; k++)
	 if(alph[i]==alph[k]&&alph[i]!="")
	  {
	   alph[k]="";
	   countPovtor++;
	  }
	if(alph[i]!="")
	  pop[i]=countPovtor;
	  else
	  pop[i]=0;
	 countPovtor=1;
  } 
   if(alph[alph.length-1]!="")
    pop[alph.length-1]=countPovtor;
	sum=0;
	for(f=0;f<pop.length; f++)
	 if(pop[f]!=0)
	  sum+=pop[f];
   for(i=0;i<alph.length; i++)
   if(alph[i]!="")
    WScript.echo("simvol: "+alph[i]+" chastota: "+pop[i]/sum);
	for(i=0;i<pop.length; i++)
	if(pop[i]!=0)
	 entrop+=-pop[i]*Math.log(pop[i]/sum)/(Math.log(2)*sum)
	 WScript.echo("entropiya: "+entrop);
	 
	  
	  
	 