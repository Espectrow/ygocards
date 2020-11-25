function convertir(){
	var ydk = document.getElementById("ydk").innerHTML
	var cont = new Array();
	cont = ydk.split('\n')
	var html = new Array();
	var PRIMERO ='<a href="https://espectrow.github.io/ygocards/pics/'
	var SEGUNDO ='.jpg" data-lightbox="'
	var TERCERO ='"><img onClick="verdetalle(\'';
	var CUARTO = '\')" id="image" src="https://espectrow.github.io/ygocards/pics/'
	var QUINTO ='.jpg"></a>'
	document.getElementById("html").innerHTML=""
	document.getElementById("ydk").style="display:none"
	
	for(var a=0; a<cont.length; a++)
	{	
		if(cont[0] != "#main")
		{
			html[0]=''
		}
		if (!isNaN(cont[a]))
		{
			html[a]=PRIMERO+cont[a]+SEGUNDO+cont[a]+TERCERO+cont[a]+CUARTO+cont[a]+QUINTO+'\n';
		}
		if(cont[a] == "#main")
		{
			html[a]='<center>\n<div id="deck-container">\n<div id="title">Main Deck</div>\n<div id="Images">'
		}
		if(cont[a] == "#extra")
		{
			html[a]='</div>\n</div>\n</div>\n\n<div id="deck-container">\n<div id="title">Extra Deck</div>\n<div id="images">'
		}
		if(cont[a] == "!side")
		{
			html[a]='</div>\n</div>\n</div>\n\n<div id="deck-container">\n<div id="title">Side Deck</div>\n<div id="images">'
		}
		
		if(cont[a] == "#fin" || cont[a] == "")
		{
			html[a]='</div>\n</div>\n</div>\n</center>'
		}
	}
	for(var e=0; e<html.length; e++)
	{
	document.getElementById("html").innerHTML+=html[e]
	}
}
