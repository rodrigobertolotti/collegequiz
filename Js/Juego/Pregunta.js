$(document).ready(function () {
    var preg;
    var puntaje = 0;
    var sumaPuntos;

    let nombre = localStorage.getItem("nombre");
    let liceo = localStorage.getItem("liceo");
    var jugar = true;
    var cantidadCorrectas = 0;
    var tieneVidaExtra = false;
    var mensajeExtrasVida="";
    let traerPregunta = () => {
        $.ajax({
            type: 'GET',
            url: './TraerPregunta.php', //acordarse de cambiar de Juego/ a ./
            dataType: 'JSON',
            success: function (response) {
                console.log(response.length);
                let pregunta1 = response[0].pregunta;
                let opcion1 = response[0].opcion1;
                let opcion2 = response[0].opcion2;
                let opcion3 = response[0].opcion3;
                let correcta = response[0].correcta;
                let path = response[0].imagen;
                let dificultad = response[0].dificultad;
                preg = new CrearPregunta(pregunta1, [opcion1, opcion2, opcion3], correcta, dificultad, path);
                cargarPregunta(preg);
            },
            error: function (response) {
                console.log(response);
            }
        })
    };
    traerPregunta();

    let cargarPregunta = (pregunta) => {
        document.getElementById("respuestas").innerHTML = "";
        document.getElementById("imagen").innerHTML = "";
        document.getElementById("pregunta").innerHTML = "<center><p>" + pregunta.pregunta + "</p></center>";
        var imagen = document.createElement("img");
        imagen.setAttribute("src", pregunta.path);
        imagen.className = "imagen";
        document.getElementById("imagen").appendChild(imagen);
        let difBaja = document.getElementById("baja");
        let difMedia = document.getElementById("media");
        let difAlta = document.getElementById("alta");
        switch (pregunta.dificultad) {
            case "1":
                difBaja.className = "baja";
                difMedia.className = "inactiva";
                difAlta.className = "inactiva";
                break;
            case "2":
                difBaja.className = "inactiva";
                difMedia.className = "media";
                difAlta.className = "inactiva";
                break;
            case "3":
                difBaja.className = "inactiva";
                difMedia.className = "inactiva";
                difAlta.className = "alta";
                break;
        }
        for (var i = 0; i < pregunta.respuestas.length; i++) {
            var btn = document.createElement("BUTTON");
            btn.innerHTML = pregunta.respuestas[i];
            btn.className = 'botones';
            btn.setAttribute("id", i);
            btn.style.backgroundColor = '#3fb7aa';
            document.getElementById("respuestas").appendChild(btn);
        }

        function evaluoVidaExtra(puntos) {
            if (puntos> 3) {
                document.getElementById("vida").innerHTML = '';
                document.getElementById("vida").innerHTML = '<i id="iconoVida" class="fas fa-3x fa-heart corazon"></i>';
                return true;
            }else
            if (puntos== 3) {
                document.getElementById("vida").innerHTML = '';
                document.getElementById("vida").innerHTML = '<i id="iconoVida" class="fas fa-3x fa-heart corazon"></i>';
                mensajeExtrasVida=" VIDA EXTRA! ";
                return true;
            }else 
            {  
                return false;
            }
        }

        function evaluoTiempoExtra(){
            if (Math.random() >= 0.8) {
            mensajeExtrasTiempo= "TIEMPO EXTRA!";
            document.getElementById("reloj").innerHTML = '';
            document.getElementById("reloj").innerHTML = '<i id="iconoVida" class="fas fa-3x fa-stopwatch reloj"></i>';
            return true;
             } else {
                document.getElementById("reloj").innerHTML = '';
                document.getElementById("reloj").innerHTML = '<i id="iconoVida" class="fas fa-3x fa-stopwatch inactivo"></i>';
                 mensajeExtrasTiempo=" ";
                 return false;
             } 
        }

        let textoPuntos = " PUNTOS!";
        $("body").unbind("click").on("click", ".respuestas button", function (e) {
            let respuesta = $(this).attr("id");
            if (respuesta == pregunta.respuestaCorrecta) {
                cantidadCorrectas++;
                console.log(cantidadCorrectas);
                tieneVidaExtra = evaluoVidaExtra(cantidadCorrectas);
                console.log("tiene vidas? " + tieneVidaExtra);
                tieneTiempoExtra= evaluoTiempoExtra();
                $(this).css('border', '2px solid #3fb7aa');
                if (parseInt(counter) > 7) {
                    puntaje = puntaje + parseInt(pregunta.dificultad) + 1;
                    if (sumaPuntos == 1) textoPuntos = " PUNTO!";
                    Swal.fire({
                        title: "<p class='tituloModal'>+" + pregunta.dificultad + textoPuntos + " +1 respuesta rapida " +
                        mensajeExtrasVida + " " + mensajeExtrasTiempo+"</p>",
                        showConfirmButton: false,
                        icon: 'success',
                        timer: 2000
                    })
                    if (mensajeExtrasVida.length>0) mensajeExtrasVida="";
                } else {
                    puntaje = puntaje + parseInt(pregunta.dificultad);
                    if (sumaPuntos == 1) textoPuntos = " PUNTO!";
                    Swal.fire({
                        title: "<p class='tituloModal'>+" + pregunta.dificultad + " "+ textoPuntos +" " +
                        mensajeExtrasVida + " " + mensajeExtrasTiempo+"</p>",
                        showConfirmButton: false,
                        icon: 'success',
                        timer: 2000
                    })
                }
                mensajeExtrasVida="";
                mensajeExtrasTiempo="";
                if (tieneTiempoExtra){
                    counter = 20;
                    timer.style.color = "#3fb7aa";
                }
                else counter = 12;
                if (jugar) traerPregunta()
                else {
                    Swal.fire({
                        html: "<p class='tituloModal'>Ya perdiste</p>",
                        icon: 'error',
                        showCancelButton: true,
                        confirmButtonColor: '#3fb7aa',
                        cancelButtonColor: '#d95e5b',
                        confirmButtonText: 'Jugar de nuevo',
                        cancelButtonText: "Ver ranking",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }).then((result) => {

                        if (result.value) {
                            window.location = 'principalJuego.html'
                        } else window.location = 'ranking.html'

                    })
                }
            } else {
                if (tieneVidaExtra) {
                    Swal.fire({
                        html: "<p class='tituloModal'>TE SALVO LA VIDA EXTRA! Intenta de vuelta!</p>",
                        icon: 'error',
                        timer: 2000,
                        showConfirmButton: false,
                    })
                    tieneVidaExtra=false;
                    cantidadCorrectas=0;
                    counter=12;
                    document.getElementById("vida").innerHTML = '';
                document.getElementById("vida").innerHTML = '<i id="iconoVida" class="fas fa-3x fa-heart inactivo"></i>';
                } else {
                    jugar = false;
                    $(this).css('border', '2px solid #d95e5b');
                    clearInterval(cuentaRegresiva);
                    agregarRanking(nombre, liceo, puntaje);
                    var x = devolverImagen(puntaje);
                    url = x.imagen;
                    texto = x.texto;
                    Swal.fire({
                        html: "<p class='tituloModal'>Puntaje final: " + puntaje + "<p class='subtituloModal'>" + '"' + texto + '"' + "</p>",
                        icon: 'error',
                        showCancelButton: true,
                        imageUrl: url,
                        confirmButtonColor: '#3fb7aa',
                        cancelButtonColor: '#d95e5b',
                        confirmButtonText: 'Jugar de nuevo',
                        cancelButtonText: "Ver ranking",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }).then((result) => {
                        counter = 0;
                        if (result.value) {
                            window.location = 'principalJuego.html';
                            puntaje = 0;
                        } else {
                            window.location = 'ranking.html'
                            puntaje = 0;
                        }

                    })

                }
            }

        })
    }

    let devolverImagen = (puntaje) => {
        var retorno = {};
        var imagen;
        var texto;
        if (parseInt(puntaje) < 3) {
            imagen = 'https://res.cloudinary.com/dyvyiepbv/image/upload/c_scale,h_115/v1584722783/hiena_yggcla.png';
            texto = "Aun eres una simple hiena";

        } else
            if (parseInt(puntaje) < 7) {
                imagen = 'https://res.cloudinary.com/dyvyiepbv/image/upload/c_scale,h_115/v1584722983/scar_ewlkkf.jpg';
                texto = "Mira Simba. Estás en problemas de nuevo. Pero esta vez papi no está aquí para salvarte";
            } else
                if (parseInt(puntaje) < 11) {
                    imagen = 'https://res.cloudinary.com/dyvyiepbv/image/upload/c_scale,h_115/v1584721947/timon_cchurc.png';
                    texto = "Suceden cosas malas y no se puede hacer nada al respecto."
                } else
                    if (parseInt(puntaje) < 16) {
                        imagen = 'https://res.cloudinary.com/dyvyiepbv/image/upload/c_scale,h_115/v1584721579/simba_bwqero.jpg';
                        texto = "Mi padre me mostró todo el reino. Y voy a gobernar todo.";
                    } else
                        if (parseInt(puntaje) < 24) {
                            imagen = 'https://res.cloudinary.com/dyvyiepbv/image/upload/c_scale,h_140/v1584725208/rafiki_uvqnrb.jpg';
                            texto = "Cada día es una lección de sí mismo. ¡Disfruta el viaje!";
                        } else {
                            imagen = 'https://res.cloudinary.com/dyvyiepbv/image/upload/c_scale,h_120/v1584724954/mufasa_cr9z3c.png';
                            texto = "Los grandes reyes del pasado nos miran desde las estrellas.";
                        }

        var retorno = {
            "imagen": imagen,
            "texto": texto
        }
        console.log(retorno);
        return retorno;

    }


    let counter = 12;
    var timer = document.createElement("p");
    document.getElementById("timer").innerHTML = counter;
    timer.style.fontSize = "30px";
    timer.style.textAlign = "center";
    timer.className = "timer";


    var cuentaRegresiva = setInterval(function () {
        counter--;
        timer = document.getElementById("timer");
        timer.className = "timer";
        timer.innerHTML = counter;
        if ((timer.innerHTML == 12) || (timer.innerHTML == 11) || (timer.innerHTML == 10) || (timer.innerHTML == 9) || (timer.innerHTML == 8) || (timer.innerHTML == 7)) {
            timer.style.color = "#3fb7aa";
        };
        if ((timer.innerHTML == 6) || (timer.innerHTML == 5) || (timer.innerHTML == 4)) {
            timer.style.color = "#f3c744";
        };
        if ((timer.innerHTML == 3) || (timer.innerHTML == 2) || (timer.innerHTML == 1)) {
            timer.style.color = "#d95e5b";
        };
        if (counter === 0) {
            agregarRanking(nombre, liceo, puntaje);
            var x = devolverImagen(puntaje);
            url = x.imagen;
            texto = x.texto;
            Swal.fire({
                html: "<p class='tituloModal'>Puntaje final:" + puntaje + "</p>",
                icon: 'error',
                html: "<p class='tituloModal'>Puntaje final: " + puntaje + "<p class='subtituloModal'>" + '"' + texto + '"' + "</p>",
                imageUrl: url,
                showCancelButton: true,
                confirmButtonColor: '#3fb7aa',
                cancelButtonColor: '#d95e5b',
                confirmButtonText: 'Jugar de nuevo',
                cancelButtonText: "Ver ranking",
                closeOnConfirm: false,
                closeOnCancel: false
            }).then((result) => {

                if (result.value) {
                    window.location = 'principalJuego.html'
                } else window.location = 'ranking.html'

            })
            clearInterval(cuentaRegresiva);
        }
    }, 1000);

    let agregarRanking = (nombreAgregar, liceoAgregar, puntajeAgregar) => {

        var datos = {
            nombre: nombreAgregar,
            puntaje: puntajeAgregar,
            celular: '09123412',
            liceo: liceoAgregar,
        }
        $.ajax({
            type: "POST",
            url: "./IngresarRanking.php", //acordarse de cambiar de Juego/ a ./
            data: datos,
            success: function (e) { //el e retorna lo que devuelve php
                console.log(e);
            }
        })
        return false;
    }

})