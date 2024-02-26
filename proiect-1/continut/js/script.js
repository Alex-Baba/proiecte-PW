var mouseX;
var mouseY;
var startX;
var startY;
//pt desenare
var myVar=setInterval(showDate,1000);
function showDate()
{
	var d= new Date();
	var a= d.toLocaleTimeString();
	document.getElementById("data").innerHTML=a;
	
}
function aboutClient(){
	showDate();
	var url=window.location.href;
	document.getElementById("adresa").innerHTML=url;
	window.navigator.geolocation.getCurrentPosition(showPosition);
	var x = document.getElementById("locatie");
	

	function showPosition(position) {
		x.innerHTML = "Latitudine: " + position.coords.latitude +
		"  Longitudine: " + position.coords.longitude;
	} 
	var browset=document.getElementById("browser");
	browset.innerHTML=window.navigator.appName +" "+ window.navigator.appCodeName+" "+window.navigator.product+" "+window.navigator.appVersion;
	
	var canvas_m = document.getElementById("canvas");
	var ctx = canvas_m.getContext("2d");

	var offsetX = canvas_m.offsetLeft;
	var offsetY = canvas_m.offsetTop;

	
	canvas_m.addEventListener('mousemove', function(eveniment) {
		var rect = canvas_m.getBoundingClientRect(), root = document.documentElement;

	
		mouseX=eveniment.clientX-rect.left;
		mouseY=eveniment.clientY-rect.top;
	}, false);
	
}



var numbers=[];	
function loto()
{
	var i;
	var j;
	//generare numere
	var sir;
	for(i=1;i<=8;i++)
	{
		numbers[i]=Math.floor((Math.random()*255)+1);
	}
	var input_mun=[];
	for(i=1;i<=8;i++)
	{
		var inp=document.getElementById("x"+i);
		input_mun[i]=parseInt(inp.value,16);
	}
	var ok=0;
	for(j=1;j<=8;j++)
	{
		for(i=1;i<=8;i++)
		{
			if(numbers[i]==input_mun[j])
			{
				document.getElementById("x"+j).style.backgroundColor="#74db75";
				ok=ok+1;
				console.log("nr ghicit"+j);
				break;
			}
			else{
				document.getElementById("x"+j).style.backgroundColor="#ef6e6e";
				
			}
		}
	}
	if(ok==0)
	{
		document.getElementById("zona_afisare").innerHTML="Ne pare rău. Nu ai ghicit nici un număr.";
		console.log("afisat nu");
	}
	else
	{
		document.getElementById("zona_afisare").innerHTML="Bravo! Ai ghicit "+ok+" numere.";
	}
}

var first_click=false;
function desenare(){
	var culoareContur=document.getElementById("culoare_1").value;
	var culoareFill=document.getElementById("culoare_2").value;
	var canvas_m=document.getElementById("canvas");
	var context=canvas_m.getContext("2d");
	if(first_click)
	{
		console.log("desenat"+culoareContur+culoareFill);
		first_click=false;
		context.beginPath();
	    context.rect(startX, startY, mouseX - startX, mouseY - startY);
		console.log(startX+" "+startY+" "+(mouseX - startX)+" "+(mouseY - startY));
	    context.fillStyle = culoareFill;
	    context.fill();
	    context.strokeStyle = culoareContur;
		context.stroke();
	    canvas_m.style.cursor = "default";
	}
	else
	{
		
		first_click=true;
		startX = mouseX;
	    startY = mouseY;
	    canvas_m.style.cursor = "crosshair";
		console.log("else: "+startX+" "+startY);
	}
}
var lungime=3;
var latime=3;
function inserție_l(){
	var color_l=document.getElementById("culoare_3").value;
	var index_linie=document.getElementById("numar_linie").value;
	var tabel=document.getElementById("tabel");
	var linie_noua=tabel.insertRow(index_linie);
	lungime++;
	var i;
	var loc;
	for(i=0;i<latime;i++)
	{
		loc=linie_noua.insertCell(i);
		loc.innerHTML="linie nouă";
		loc.style.backgroundColor=color_l;
	}
	
}
function inserție_c(){
	var color_c=document.getElementById("culoare_3").value;
	var index_coloana=document.getElementById("numar_coloană").value;
	var tabel=document.getElementById("tabel");
	latime++;
	var randuri=document.getElementsByTagName("tr");
	var i;
	var loc;
	for(i=0;i<lungime;i++)
	{
		
		loc = randuri[i].insertCell(index_coloana);
		loc.innerHTML = "coloană nouă";
		loc.style.backgroundColor = color_c;
	}
	
}

function schimbaContinut(x,jsFisier,jsFunctie) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("continut").innerHTML = this.responseText;
			if (jsFisier) {
				var elementScript = document.createElement('script');
				elementScript.onload = function () {
					console.log("hello");
					if (jsFunctie) {
						window[jsFunctie]();
					}
				};
				elementScript.src = jsFisier;
				document.head.appendChild(elementScript);
			} else {
				if (jsFunctie) {
					window[jsFunctie]();
				}
			}
		}

	};
	xhttp.open("GET", x, true);
	xhttp.send();
	console.log("apel"+x);
	
}
