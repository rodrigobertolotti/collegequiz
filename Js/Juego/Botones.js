$(document).ready(function () {
    var vida= document.createElement("button");
    vida.innerHTML= '<i id="iconoVida" class="fas fa-2x fa-heart inactivo"></i>';
    vida.className="botonesExtra";
    vida.setAttribute("id", "vida");
    document.getElementById("botones").appendChild(vida);

    var reloj= document.createElement("button");
    reloj.innerHTML= '<i id="iconoReloj" class="fas fa-2x fa-stopwatch inactivo"></i>';
    reloj.className="botonesExtra";
    reloj.setAttribute("id","reloj");
    document.getElementById("botones").appendChild(reloj);


})