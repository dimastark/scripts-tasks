var fso  = new  ActiveXObject("Scripting.FileSystemObject")                                                                                                                      
var file = fso.OpenTextFile("enter_file.txt")
var enter_String = file.ReadAll( )
file.close()                                         
var dlin = enter_String.length                                                                            
var mass_char = new Array()
var sim
var flag
var i=0
var j
var index=0
while(i<dlin)
{
    sim = enter_String.charAt(i)
    flag =0 
    for(j=0;j<mass_char.length;j++)
          if (mass_char[j] == sim)
              {
                 flag = 1
                 break
               }
     if (flag==0)
     {
         mass_char[index]=sim
         index++
      }
     i++
}

var mass_count = new Array(mass_char.length)
for(i=0;i<mass_char.length;i++)
    mass_count[i]=0

for(i=0;i<mass_char.length;i++)
{
    for(j=0;j<dlin;j++)
         if (mass_char[i] == enter_String.charAt(j))
             mass_count[i]++
}


for(i=0;i<mass_count.length;i++)
     for(j=0;j<mass_count.length;j++)
           if (mass_count[i]<mass_count[j])
               {
                  mass_count[i]+=mass_count[j]
                  mass_count[j] = mass_count[i] - mass_count[j]
                  mass_count[i] -=mass_count[j]
                  sim=mass_char[i]
                  mass_char[i] = mass_char[j]
                  mass_char[j] = sim
               }

var Text = fso.OpenTextFile("inform.txt", 2, true)
Text.WriteLine("Исходная строка")
Text.WriteLine(enter_String)
Text.WriteLine("Алфавит и частота")
for(i=0;i<mass_char.length;i++)
Text.Write(mass_char[i]+"="+mass_count[i] +" ")


var NameAddres = new Array()

i=0
j=0
while(i<mass_char.length)
{
      NameAddres[j]=-1
      NameAddres[j+1]="no"
     NameAddres[j+2]="no"
     NameAddres[j+3]=mass_char[i]
     j+=4
     i++
}

var index_i
var index_j
var min
var final_min
var dlin2
var dlin3 = mass_count.length
while(mass_count[mass_count.length-1]< dlin)
{
   min=0
    final_min=999999999999
    for(i=0;i<dlin3;i++)
      for(j=0;j<dlin3;j++)
          if ( i!=j && mass_count[i] >0 && mass_count[j] >0)
              {
                  min=mass_count[i]+mass_count[j]
                  if (min<final_min)
                      {
                         final_min=min
                         index_i = i
                         index_j = j
                      }
                }
         mass_count[dlin3]=final_min
         dlin3++
         mass_count[index_i] =-mass_count[index_i]
         mass_count[index_j]=-mass_count[index_j]
         index_i = (index_i + 1)*4 -1
         index_j = (index_j + 1)*4 -1
         if (NameAddres[index_i].length < NameAddres[index_j].length)
             {
                index_i+=index_j
                index_j = index_i - index_j
                index_i-=index_j
             }
         dlin2 = NameAddres.length
         NameAddres[dlin2]=-1
         NameAddres[dlin2+1]= index_i
         NameAddres[dlin2+2]=index_j
         NameAddres[dlin2+3] =NameAddres[index_i]+NameAddres[index_j]
}
i = NameAddres.length-3
while(NameAddres[i] !="no")
{
   index_i =NameAddres[i]
   index_j =NameAddres[i+1]
  NameAddres[index_i -3]=0
  NameAddres[index_j -3]=1
  i = i-4
}
var mass_kod = new Array()
var kod
var l
var flag
var sim2
var linkl
var sav
for(i=0;i<mass_char.length;i++)
{
  kod=""
  sim=NameAddres[((i+1)*4 -1)].charAt(0)


  
  kod+=NameAddres[((i+1)*4-4)]
  for(j=(i+2)*4-1;j<NameAddres.length-4;j+=4)
{
   flag =0
  for(l=0;l<NameAddres[j].length;l++)
        if (sim==NameAddres[j].charAt(l))
            {
           flag=1
            }
 if (flag==1)
  kod+=NameAddres[j-3]
 }
sav=''
linkl=kod.length-1
while(linkl>=0)
{
sav=sav+kod.charAt(linkl)
linkl=linkl-1
}
mass_kod[i] =sav
}
Text.WriteLine("")
Text.WriteLine("Коды символов")
for(i=0;i<mass_char.length;i++)
Text.WriteLine(mass_char[i]+"= "+mass_kod[i]+" ")

kod=""
for(i=0;i<enter_String.length;i++)
{
   index=-1
   sim=enter_String.charAt(i)
   for(j=0;j<mass_char.length;j++)
       if (sim==mass_char[j])
          {
             index=j
           }
   kod+=mass_kod[index]
}
Text.WriteLine("Закодированная строка")
Text.WriteLine(kod)

var newString=""
i=0
while(i<kod.length)
{
sim=""
flag=0
while(flag!=1)
{
sim+=kod.charAt(i)
for(l=0;l<mass_kod.length;l++)
if(sim==mass_kod[l])
{
flag=1
index=l
}
i=i+1
}
newString+=mass_char[index]
}
Text.WriteLine("Раскодированная строка")
Text.WriteLine(newString)

