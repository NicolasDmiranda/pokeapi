let api ="https://pokeapi.co/api/v2/"; // here I return the values ​​to 0 when cleaning
window.onload = function(){
    //buscar---------------------------------------------------
    var element = window.document.getElementById("buscarv")
    element.addEventListener("click", buscar); // here i make the click event call me the search function

    //limpiar---------------------------------------------------
    var element2 = window.document.getElementById("limpiar")
    element2.addEventListener("click", limpiar); // here i make the click event call me the clean function
 }

 function limpiar(){
    document.getElementById("textoBuscar").value = "";
    var detalle = window.document.getElementById("detalle")
    detalle.classList.add("d-none") // here i return the values ​​to 0 when cleaning
 }

function buscar() {
    var name = document.getElementById("textoBuscar").value.toLowerCase();
     axios.get(api + 'pokemon/' + name) //https://pokeapi.co/api/v2/pokemon/{name}/ -> this is how my url would look
        .then(function (response)
        {     
            procesardatos(response.data);
        })   
        .catch(function (error) 
        {  
            var detalle = window.document.getElementById("detalle")
            detalle.classList.add("d-none")
            alert("El pokemon ingresado no se encuentra")
            console.log(error);
        })
}

function procesardatos(data){ // this is where i am processing all the data in the api

    //img---------------------------------------------------
    var imagen = window.document.getElementById("imagen");
    imagen.src = data.sprites.front_default;
 
    //name---------------------------------------------------
    var nombre = window.document.getElementById("nombre");
    nombre.innerText = data.name;

     //type---------------------------------------------------
     var tipo = window.document.getElementById("tipo");
     tipo.innerText = data.types[0].type.name;

    //abilities---------------------------------------------------
    var habilidades = window.document.getElementById("habilidades");
    habilidades.innerHTML="";
    var listaHabilidades = data.abilities;

    listaHabilidades.map(function(habilidad) {
        var li = document.createElement("li");
        li.innerText = habilidad.ability.name;
        habilidades.append(li);
    });

    //moves---------------------------------------------------
    var movimientos = window.document.getElementById("movimientos");
    movimientos.innerHTML="";
    var listaMovimientos = data.moves;
    
    for (let i = 3; i >= 0 ; i--) { 
        const element = listaMovimientos[i];
        var li = document.createElement("li");
        li.innerText = element.move.name;
        movimientos.append(li);
        //  in the for I made it count the first 4 movements of the list in the api
    }

    var detalle = window.document.getElementById("detalle")
    detalle.classList.remove("d-none") 
}