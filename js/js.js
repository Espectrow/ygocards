function verdetalle(aux){
	var url = "db"+aux

 	if(eval(url)){
	document.getElementById('descripcion').innerHTML = '<center><a href="'+eval(url)+'"> Ver efecto</a></center>'
	}
	else{
	document.getElementById('descripcion').innerHTML ='Estamos agregando la carta a nuestra base de datos'
	}
	if(eval(url)==dberror){
	document.getElementById('descripcion').innerHTML ='Esta Carta No se encuentra en nuestra base de datos, es posible que el ydk cargado no sea compatible con nuestra app.'
	}
	
	
	
}
function imgerror(imagen,db) {
	
	var cantidada = document.getElementsByTagName("a")
	for(var a = 0; a < cantidada.length-1; a++)
	{
		if (cantidada[a].getElementsByTagName("img")[0].src == imagen.src)
		{
		cantidada[a].href="../images/error.png";
		cantidada[a].innerHTML = '<img onclick="verdetalle(\'error\')" id="image" src="https://espectrow.github.io/ygocards/images/error.png">'
		}
	}
    return true;
}