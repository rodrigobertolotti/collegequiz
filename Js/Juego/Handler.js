$(document).ready(function () {

    var imagen= document.createElement("img");
    imagen.setAttribute("src", "https://res.cloudinary.com/dyvyiepbv/image/upload/v1584296410/LOGO_qh3egu.png");
    imagen.className="logo";
    document.getElementById("ventana").appendChild(imagen);
    var boton=document.createElement("button");
    boton.innerHTML="<p class='textoJugar'>JUGAR</p>";
    boton.className="btnJugar";
    boton.id="btnJugar";
    document.getElementById("ventana").appendChild(boton);
    
    var ranking=document.createElement("button");
    ranking.innerHTML="<p class='textoJugar'>RANKING</p>";
    ranking.className="btnRanking";
    ranking.id="btnRanking";
    document.getElementById("ventana").appendChild(ranking);

    $("body").on("click", "#btnRanking", function () {
      window.location="ranking.html";
    })

    $("body").on("click", "#btnJugar", function () {

      if (localStorage.hasOwnProperty('nombre')){
        Swal.fire({
          html: "<p class='tituloModal'>Jugar como: " + localStorage.getItem('nombre') + "?</p>",
          showCancelButton: true,
          confirmButtonColor: '#3fb7aa',
          cancelButtonColor: '#d95e5b',
          confirmButtonText: 'SI',
          cancelButtonText: "Cambiar usuario",
          closeOnConfirm: false,
          closeOnCancel: false
        }).then((result) => {
          
          if (result.value) {
            window.location="principalJuego.html";

          } else {
            Swal.mixin({
              input: 'text',
              confirmButtonText: 'Siguiente &rarr;',
              showCancelButton: true,
              position: 'top',
              progressSteps: ['1','2','3']
            }).queue([
              {
                html: "<p class='tituloLogin'>Nombre y apellido: </p>",
              },
              {
                html: "<p class='tituloLogin'>Liceo: </p>",
              },
              {
                html: "<p class='tituloLogin'>Celular: </p>",
            },
            ]).then((result) => {
              if (!result.value[0] || !result.value[1]){
                Swal.fire({
                  icon: 'error',
                  html: "<p class='tituloModalError'>Datos incorrectos</p>",
                })
              }else{
                  var nombre=result.value[0];
                  var liceo= result.value[1];
                  var celular=result.value[2];
                  localStorage.setItem("nombre",nombre);
                  localStorage.setItem("liceo", liceo);
                  localStorage.setItem("celular", celular);
                Swal.fire({
                  title: 'Listo, buena suerte!',
                  position: 'top',
                  imageUrl: "https://res.cloudinary.com/dyvyiepbv/image/upload/v1584982575/pumba_suv8ww.jpg",
                  icon: 'success',
                  confirmButtonText: 'JUGAR'
                }).then((result) => {
                  if (result.value) {
                    window.location="principalJuego.html";
                  } 
                  
                  })
              }
            })
          }
          })
      }else{
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Siguiente &rarr;',
            showCancelButton: true,
            position: 'top',
            progressSteps: ['1','2','3']
          }).queue([
            {
              html: "<p class='tituloModal'>Nombre y apellido: </p>",
            },
            {
              html: "<p class='tituloModal'>Liceo: </p>",
            },
            {
              html: "<p class='tituloModal'>Celular: </p>",
          },
          ]).then((result) => {
            if (!result.value[0] || !result.value[1]){
              Swal.fire({
                icon: 'error',
                position: 'top',
                html: "<p class='tituloModalError'>Datos incorrectos</p>",
              })
            }else{
                var nombre=result.value[0];
                var liceo= result.value[1];
                var celular=result.value[2];
                localStorage.setItem("nombre",nombre);
                localStorage.setItem("liceo", liceo);
                localStorage.setItem("celular", celular);
              Swal.fire({
                html: "<p class='tituloModal'>BUENA SUERTE!</p>",
                imageUrl: "https://res.cloudinary.com/dyvyiepbv/image/upload/v1584982575/pumba_suv8ww.jpg",
                position: 'top',
                icon: 'success',
                confirmButtonText: 'JUGAR'
              }).then((result) => {
                if (result.value) {
                  window.location="principalJuego.html";
                } 
                
                })
            }
          })
        }
        
    })
})