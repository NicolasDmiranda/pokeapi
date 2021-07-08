let api ="https://pokeapi.co/api/v2/";

let loading = false
window.onload = function(){
    //buscar---------------------------------------------------
    var element = window.document.getElementById("buscarv")
    element.addEventListener("click", buscar);

    //limpiar---------------------------------------------------
    var element2 = window.document.getElementById("limpiar")
    element2.addEventListener("click", limpiar);
 }

 function limpiar(){
    document.getElementById("textoBuscar").value = "";
    var detalle = window.document.getElementById("detalle")
    detalle.classList.add("d-none")
 }

function buscar() {
    loading = true;
    var name = document.getElementById("textoBuscar").value;
     axios.get(api + 'pokemon/' + name) //https://pokeapi.co/api/v2/pokemon/{name}/
        .then(function (response)
        {     
            procesardatos(response.data);
            loading = false;
        })   
        .catch(function (error) 
        {  
            var detalle = window.document.getElementById("detalle")
            detalle.classList.add("d-none")
            alert("Tu pokemon ingresado no se encuentra")
            console.log(error);
            loading = false
        })
}

function procesardatos(data){

    //img---------------------------------------------------
    var imagen = window.document.getElementById("imagen");
    imagen.src = data.sprites.front_default;
 
    //name---------------------------------------------------
    var nombre = window.document.getElementById("nombre");
    nombre.innerText = data.name;

     //tipo---------------------------------------------------
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
    }

    var detalle = window.document.getElementById("detalle")
    detalle.classList.remove("d-none")
}