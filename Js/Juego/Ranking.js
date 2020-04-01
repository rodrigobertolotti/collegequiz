$(document).ready(function () {

    actualizar();
    let nombreAct = localStorage.getItem("nombre");
    function actualizar() {
        $.ajax({
            type: "GET",
            url: './Ranking.php', //cambiar de Juego/ a ./
            dataType: 'JSON',
            success: function (response) {
                console.log(response);
                $("#ranking tbody").empty();
                var largo = response.length;
                for (var i = 0; i < largo; i++) {
                    let clase="";
                    var nombre = response[i].nombre;
                    var liceo = response[i].liceo;
                    var puntaje = response[i].puntaje;
                    if (nombreAct===nombre) clase="actual";
                    switch (i){
                        case 0:
                            var tr_str = "<tr>" +
                            "<td><center><i class='fas fa-star fa-2x' style='color:yellow; margin-right: 10px;'></i><p class='textoPrimeras' style='display:inline'>" + nombre + "</p></center></td>" +
                            "<td><p class='textoPrimeras' style='text-align: center'>" + liceo + "</p></td>" +
                            "<td><p class='textoPrimeras' style='text-align: center'>" + puntaje + "</p></td>" +
                            "</tr>";
                        break;
                        case 1:
                            var tr_str = "<tr>" +
                            "<td><center><i class='fas fa-star fa-2x' style='color:grey; margin-right: 10px;'></i><p class='textoPrimeras' style='display:inline'>"  + nombre + "</p></center></td>" +
                            "<td><p class='textoPrimeras' style='text-align: center'>" + liceo + "</p></td>" +
                            "<td><p class='textoPrimeras' style='text-align: center'>" + puntaje + "</p></td>" +
                            "</tr>";
                        break;
                        case 2:
                            var tr_str = "<tr>" +
                            "<td><center><i class='fas fa-star fa-2x' style='color:brown; margin-right: 10px;'></i><p class='textoPrimeras' style='display:inline'>"  + nombre + "</p></center></td>" +
                            "<td><p class='textoPrimeras' style='text-align: center'>" + liceo + "</p></td>" +
                            "<td><p class='textoPrimeras' style='text-align: center'>" + puntaje + "</p></td>" +
                            "</tr>";
                        break;
                        default:
                    
                    var tr_str = "<tr class="+clase+">" +
                        "<td><p class='texto' style='text-align: center'>" + nombre + "</p></td>" +
                        "<td><p class='texto' style='text-align: center'>" + liceo + "</p></td>" +
                        "<td><p class='texto' style='text-align: center'>" + puntaje + "</p></td>" +
                        "</tr>";
                    }
                    $("#ranking tbody").append(tr_str);
                }
            },
        })
    };
})