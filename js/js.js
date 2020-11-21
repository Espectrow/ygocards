function verdetalle(aux){
	var url = "db"+aux
	if(eval(url))
		document.getElementById('descripcion').innerHTML = '<center><a href="'+eval(url)+'"> Ver efecto</a></center>'
	else document.getElementById('descripcion').innerHTML ='Estamos agregando la carta a nuestra base de datos'
}
