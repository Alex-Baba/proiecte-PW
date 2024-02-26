
var xmlhttp;
var file;
var pers
function incarcaPersoane(){
	
	
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				document.getElementById("mesaj_").innerHTML=" Se încarcă. Vă rugam așteptați.";
				setTimeout(function(){
					document.getElementById("mesaj_").style.display="none";
					file=xmlhttp.responseXML;
					pers=file.getElementsByTagName("persoana");
					console.log(carti[0].getElementsByTagName("id")[0].childNodes[0].nodeValue
							+"-->"+pers.length);
					//inserare cap de tabel;
					var tabel=document.getElementById("pers_");
					var cap=tabel.insertRow(0);
					var cell1=cap.insertCell(0);
					cell1.innerHTML="Nr. crt.";
					var cell2=cap.insertCell(1);
					cell2.innerHTML="Nume";
					var cell3=cap.insertCell(2);
					cell3.innerHTML="Prenume";
					var cell4=cap.insertCell(3);
					cell4.innerHTML="Varsta";
					var i,j;
					for(i=0;i<pers.length;i++)
					{
						var line=tabel.insertRow(i+1);
						for(j=0;j<4;j++)
						{
							var cell=line.insertCell(j);
							switch(j)
							{
								case 0:
									cell.innerHTML=carti[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
									break;
								case 1:
									cell.innerHTML=carti[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue;
									break;
								case 2:
									cell.innerHTML=carti[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue;
									break;
								case 3:
									cell.innerHTML=carti[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue;
									break;
								default:break;
							}//end switch
						}//endfor1
					}//end for 2	
					console.log("passed");
				},2000);//end fct anonima
				
			}//end if1
		}//end function
	}//end if2

	xmlhttp.open("GET", "resurse/persoane-1.xml", true);
	xmlhttp.send();
}