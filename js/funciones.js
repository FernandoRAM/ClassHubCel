history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};
/**
 * Función: logout()
 * @author: Fernando Rincón
 * 
 * Esta funcion te redirige a la pantalla de login y elimina la variable local 'idUsuario' usada para validar 
 * una sesión activa.
 * 
 */
function logout() {
    localStorage.removeItem('idUsuario');
    window.location.assign('index.html');

}

/**
 * Función: verificaSesion()
 * @author : Fernando Rincon
 * 
 * Esta función se ejecuta al cargar index.html y verifica que existe la variable de sesión, de no ser así se redirige
 * al usuario a la pantalla de login.
 */
function verificaSesion() {
    if (localStorage.getItem('idUsuario')) {

    } else {
        window.location.assign('index.html');
    }
}


/** 
* Función: login()
* Esta funcion se encarga de obtener los datos del usuario ingresados en la pantalla de inicio de sesión . 
* Al obtenerlos se verifican las credenciales en la Base de Datos (la contraseña hasheada). 
* De haber ingresado los datos correctos se redirigirá al usuario a la pantalla de inicio, de los contrario se muestra un aviso
* de que sus datos son incorrectos y debe intentarlo de nuevo.
* @author: Fernando Rincón
*/

function login() {
    var exp = document.getElementById('expediente').value;
    var pass = document.getElementById('pass').value;

    if (exp != '' && pass != '') {
        loginAjax = new XMLHttpRequest();
        loginAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/login.php?expediente=' + exp + '&pass=' + pre_hash(pass));
        loginAjax.send();
        loginAjax.onreadystatechange = function () {
            if (loginAjax.readyState == 4 && loginAjax.status == 200) {

                var respuesta = loginAjax.responseText;
                //console.log(respuesta);

                if (respuesta != '0') {

                    localStorage.setItem('idUsuario', respuesta);
                    window.location.assign('inicio.html');

                } else {
                    exp = '';
                    passs = '';
                    showToast('Datos incorrectos intenta de nuevo.');
                }


            }
        }
    } else {

    }

}



/*
* Función: pre_hash(str)
* @author: Mendoza Burgos Rubén Andrés (ramby)
*
* El objetivo de esta función es mandar los datos 'hasheados' antes de que lleguen al servidor.
* El resultado de esta función es un hash de 24 caracteres
*
* */

function pre_hash(str) {
    /*
    * Se hace una suma de los números ascii de cada caracter de la cadena que pasa como parámetro.
    *
    * También se crea una función que es capaz de realizar dicha suma.
    *
    * */

    function ascii_sum(str) {
        sum = 0;
        splited_str = str.split('');
        for (i = 0; i < splited_str.length; i++) {
            sum += splited_str[i].charCodeAt(0);
        }
        return sum;
    }

    /*
    * La suma de los números ascii se multiplica por la superficie de Dinamarca (en kilómetros cuadrados),
    * esto nos deja con un número 'aleatorio'.
    *
    * */

    DEN_SURF = 43094;
    DEMIRANDOM = (DEN_SURF * ascii_sum(str)).toString();
    RANDOM_CHARS = ['8', 'v', 'w', 'a', 'q', 'j', 'c', 'b', 'p', '5'];
    FINAL_HASH = '';

    /*
    * En base al número pseudoaleatorio generado tomamos caracteres de un arreglo que tiene caracteres
    * ya definidos.
    *
    * Considerando que el resultado mínimo de la multiplicación de la superficie de Dinamarca es de 6 cifras
    * tomamos 6 como el máximo número de iteraciones.
    *
    * */

    DEMI_INDEXES = DEMIRANDOM.split('');

    for (i = 0; i < 6; i++) {
        FINAL_HASH += RANDOM_CHARS[parseInt(DEMI_INDEXES[i])];
    }

    /*
    * Se reemplaza el arreglo de los caracteres aleatorios con otros distintos y también se reemplaza el valor
    * 'DEMIRANDOM' por el seno de la superficie de Querétaro (en kilómetros cuadrados) y multiplicado por la suma
    * de los números ascii del string que pasa como parámetro, hacemos que el número sea positivo y quitamos el punto.
    *
    * Nuevamente vamos a obtener 6 cifras que agregaremos a la variable FINAL_HASH.
    *
    * */

    RANDOM_CHARS = ['k', '6', 'c', 'u', 'y', 'm', '1', 'q', 't', 'i'];
    QRO_SURF = 11699;
    DEMIRANDOM = (Math.abs(Math.sin(QRO_SURF) * ascii_sum(str))).toString();
    DEMI_INDEXES = DEMIRANDOM.split('');
    INDEXES = new Array();

    for (i = 0; i < DEMI_INDEXES.length; i++) {
        if (!(DEMI_INDEXES[i] === '.')) {
            INDEXES.push(parseInt(DEMI_INDEXES[i]));
        }
    }

    for (i = 0; i < 6; i++) {
        FINAL_HASH += RANDOM_CHARS[INDEXES[i]];
    }

    /*
    * Se generan los siguientes 6 caracteres para nuestra función hash, se hace algo parecido al paso anterior pero
    * esta vez haciendo uso del número 'e' y la superficie del Vaticano (en yardas cuadradas).
    *
    * */

    RANDOM_CHARS = ['o', 'w', 'f', 'h', 'z', 'r', 'a', 'm', 'b', 'y'];
    VAT_SURF = 526236;
    DEMIRANDOM = (Math.E * VAT_SURF * ascii_sum(str)).toString();
    DEMI_INDEXES = DEMIRANDOM.split('');
    NEW_INDEXES = new Array();

    for (i = 0; i < DEMI_INDEXES.length; i++) {
        if (!(DEMI_INDEXES[i] === '.')) {
            NEW_INDEXES.push(parseInt(DEMI_INDEXES[i]));
        }
    }

    for (i = 0; i < 6; i++) {
        FINAL_HASH += RANDOM_CHARS[NEW_INDEXES[i]];
    }

    /*
    * Se generan los últimos 6 caracteres para nuestra función hash, se hace algo parecido al paso anterior pero
    * esta vez haciendo uso de la función seno y la superficie de Mongolia (en kilómetros cuadradas).
    *
    * */

    RANDOM_CHARS = ['1', '0', 'm', 'z', 'x', '8', '3', 'h', 'i', 'e'];
    MON_SURF = 238397;
    DEMIRANDOM = (Math.abs(Math.sin(MON_SURF * ascii_sum(str)))).toString();
    DEMI_INDEXES = DEMIRANDOM.split('');
    NEW_INDEXES = new Array();

    for (i = 0; i < DEMI_INDEXES.length; i++) {
        if (!(DEMI_INDEXES[i] === '.')) {
            NEW_INDEXES.push(parseInt(DEMI_INDEXES[i]));
        }
    }

    for (i = 0; i < 6; i++) {
        FINAL_HASH += RANDOM_CHARS[NEW_INDEXES[i]];
    }

    /*
    * Se retorna el resultado de la función :)
    *
    * */

    return FINAL_HASH;
}

/**
* Función: upReporte()
* @author Fernando Rincon
* 
* Esta funcion obtiene los datos ingresados por el usuario en la pantalla para enviar un reporte, posteriormente se envía
* al servidor para almacenar los datos y que posteriormente el administrador lo pueda revisar.
* 
*/
function upReporte() {
    var desc = localStorage.getItem('descripcionReporte');
    var tituloR = localStorage.getItem('tituloReporte');
    var idU = localStorage.getItem('idUsuario');
    var fecha = new Date().toJSON().slice(0, 10);

    if (desc != '' && idU != '') {
        reporteAjax = new XMLHttpRequest();
        reporteAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/nuevoReporte.php?descripcion=' + desc + '&idU=' + idU + '&tituloR=' + tituloR + '&fecha=' + fecha);
        reporteAjax.send();
        reporteAjax.onreadystatechange = function () {
            if (reporteAjax.readyState == 4 && reporteAjax.status == 200) {
                var response = reporteAjax.responseText;

                if (response == '1') {
                    alert('¡Reporte enviado exitosamente!');
                    window.location.assign('inicio.html');
                }
                else {
                    showToast('Error inesperado intentalo más tarde...');
                    window.location.assign('inicio.html');
                }
            }
        }

    } else {
        showToast('Completa los campos...');
    }
}

function upReporte2() {
    var desc = localStorage.getItem('descripcionReporte');
    var tituloR = localStorage.getItem('tituloReporte');
    var idU = localStorage.getItem('idUsuario');
    var r = localStorage.getItem('imagenURL');
    var fecha = new Date().toJSON().slice(0, 10);

    if (desc != '' && idU != '') {
        reporteAjax = new XMLHttpRequest();
        reporteAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/nuevoReporte2.php?descripcion=' + desc + '&idU=' + idU + '&tituloR=' + tituloR + '&fecha=' + fecha + '&r=' + r);
        reporteAjax.send();
        reporteAjax.onreadystatechange = function () {
            if (reporteAjax.readyState == 4 && reporteAjax.status == 200) {
                var response = reporteAjax.responseText;

                if (response == '1') {
                    alert('¡Reporte enviado exitosamente!');
                    window.location.assign('inicio.html');
                }
                else {
                    showToast('Error inesperado intentalo más tarde...');
                    window.location.assign('inicio.html');
                }
            }
        }

    } else {
        showToast('Completa los campos...');
    }
}

/**
 * Función: upForo()
 * @author: Fernando Rincón
 * 
 * Esta función toma los datos ingresados por el usuario en la pantalla de nuevoForo. Si los campos están completados
 * y se hizo bien el insert en la base de datos, se regresa un alert diciendo: 'Discusión publicada exitosamente!', 
 * de lo contrario, se muestra un toast 
 */

function upForo() {
    var titulo = localStorage.getItem('tituloForo');
    var desc = localStorage.getItem('descripcionForo');
    var idU = localStorage.getItem('idUsuario');

    if (titulo != '' && desc != '') {

        loginAjax = new XMLHttpRequest();
        loginAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/nuevoForo.php?titulo=' + titulo + '&desc=' + desc + '&idU=' + idU);
        loginAjax.send();
        loginAjax.onreadystatechange = function () {
            if (loginAjax.readyState == 4 && loginAjax.status == 200) {

                var respuesta = loginAjax.responseText;
                //alert(loginAjax.status);

                if (respuesta == '1') {
                    alert('¡Discusión publicada exitosamente!');
                    window.location.assign('inicio.html');

                } else {
                    titulo = '';
                    desc = '';
                    alert(login.responseText);
                }
            } else {
                //alert(loginAjax.status);
            }
        }
    } else {
        showToast('Completa los campos...');
    }
}

function upForo2() {

    var titulo = localStorage.getItem('tituloForo');
    var desc = localStorage.getItem('descripcionForo');
    var idU = localStorage.getItem('idUsuario');
    var imgURL = localStorage.getItem('imagenURL');

    if (titulo != '' && desc != '') {

        loginAjax = new XMLHttpRequest();
        loginAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/nuevoForo2.php?titulo=' + titulo + '&desc=' + desc + '&idU=' + idU + '&imgURL=' + imgURL);
        loginAjax.send();
        loginAjax.onreadystatechange = function () {
            if (loginAjax.readyState == 4 && loginAjax.status == 200) {

                var respuesta = loginAjax.responseText;
                //alert(loginAjax.status);

                if (respuesta == '1') {
                    alert('¡Discusión publicada exitosamente!');
                    window.location.assign('inicio.html');

                } else {
                    titulo = '';
                    desc = '';
                    alert(login.responseText);
                }
            } else {
                //alert(loginAjax.status);
            }
        }
    } else {
        showToast('Completa los campos...');
    }

}


/**
*Esta funcion muestra un toast con el mensaje '¡Datos Incorrectos. Intenta de nuevo!' en la parte
inferior al ser ejecutada y tener datos incorrectos en el login.
*/
var showToast = function (msj) {
    ons.notification.toast(msj, {
        timeout: 2000
    });
};




/**
 * Función: reporte()
 * @author : Fernando Rincon
 * 
 * Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por el contenido de la página para enviar un reporte.
 */
function reporte() {
    // var reporte =
    //     " <form method='POST' enctype='multipart/form-data '>" +
    //     " <ons-card style='height: 95%;'>" +

    //     "Título: <ons-input id='tituloReporte' modifier='underbar' placeholder='' float></ons-input><br><br>" +
    //     "Descripción: <br> <br> <textarea style='font-size:15px;border:solid rgb(150, 99, 99); width:95%; border-radius:10px;' name='descripcion' id='descripcion' cols='30' rows='10'></textarea> <br>" +

    //     "<input type='text' id='urlImg' hidden>" +
    //     "<center><label><ons-button onclick='upReporte()' modifier='large' style='background-color:red;'>Enviar reporte</ons-button> </label> </center>" +

    //     "</ons-card>" +
    //     "</form>" +
    //     "<div class='dropzone'><div class='info'></div></div>";
    // document.getElementById('contenido').innerHTML = '';
    // document.getElementById('contenido').innerHTML = reporte;
    window.location.href = 'reporte.html';
}
/*
Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por el contenido de la página de convocatorias.
@author Fernando Rinco
*/
function convocatorias() {

    var convocatorias = "<!-- Carrusel -->" +
        "<ons-carousel fullscreen swipeable auto-scroll overscrollable id='carousel'>" +

        " <!-- Item Carrusel (Becas)-->" +
        " <ons-carousel-item>" +
        " <ons-card style='height: 95%; margin-top: 15px;' id='becas'>" +
        "<center><h4>Becas</h4></center>" +
        "</ons-card>" +
        "</ons-carousel-item>" +

        "<!-- Item Carrusel (Servicio social) -->" +
        " <ons-carousel-item>" +
        " <ons-card style='height: 95%; margin-top:15px;' id='servicioS'>" +
        " <!-- Item tarjeta -->" +
        "<center><h4>Servicio social</h4>" +
        "</center>" +
        " </ons-card>" +
        "</ons-carousel-item>" +
        "<!-- Item Carrusel (Bolsa de trabajo) -->" +
        "<ons-carousel-item>" +
        " <ons-card style='height: 95%; margin-top: 15px;' id='bolsaT'>" +
        "<!-- Item tarjeta -->" +
        "<center><h4>Bolsa de Tarabajo</h4>" +
        "</center>" +
        " </ons-card>" +
        "</ons-carousel-item>" +

        "</ons-carousel>";
    document.getElementById('contenido').innerHTML = '';
    document.getElementById('contenido').innerHTML = convocatorias;
    cargarConvocatorias();

}


/*
Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por el contenido de la página de horarios.
@author Fernando Rinc
*/

function horarios() {

    var horarios =
        "<!-- Carrusel -->" +
        "<ons-carousel fullscreen swipeable auto-scroll overscrollable id='carousel'>" +

        " <!-- Item Carrusel (Transporte)-->" +
        "<ons-carousel-item>" +
        "<ons-card style='height: 95%; margin-top: 15px;'>" +
        "<center><h4>Horarios de Transporte</h4></center>" +
        "<!-- Item tarjeta -->" +
        "<ons-card style='height: 30%; background: rgba(0,0,0,.02); margin-top: 30px;'>" +
        "<center>Juriquilla - CU</center>" +
        "<p id='horariosCJ'></p>" +
        " </ons-card>" +
        "<!-- Item tarjeta -->" +
        "<ons-card style='height: 30%; background: rgba(0,0,0,.02); margin-top: 30px;'>" +

        " <center>" +
        " CU - Juriquilla" +
        "</center>" +
        " <!-- Horarios -->" +
        " <p id='horariosJC'></p>" +

        "</ons-card>" +
        "</ons-card>" +
        "</ons-carousel-item>" +

        " <!-- Item Carrusel (Clases) -->" +
        "<ons-carousel-item>" +
        "<ons-card style='height: 95%; margin-top: 15px;overflow-y: scroll;'>" +
        "<!-- Item tarjeta -->" +
        " <center><h4>Horarios de Clases</h4>" +
        " <ons-search-input placeholder='Busca tu clase...' onchange='buscarClase(this.value)'></ons-search-input><br><br>" +
        "<div id='clasesBuscadas'>" +

        "</div>" +

        "</center>" +
        "</ons-card>" +
        " </ons-carousel-item>" +

        "  <!-- Item Carrusel (Tutores) -->" +
        " <ons-carousel-item>" +
        "<ons-card style='height: 95%; margin-top: 15px; overflow-y:scroll;' id=todostutores>" +
        " <center><h4>Tutores</h4></center><br><br>" +
        " </ons-carousel-item>" +

        "</ons-carousel>";


    document.getElementById('contenido').innerHTML = '';
    document.getElementById('contenido').innerHTML = horarios;
    cargarInfoH();
    cargarTutores();

}


/*
Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por el contenido de la página de Foro.
@author Fernando Rinc
*/

function foro() {
    var foro =
        "<!-- Lista de discusiones de usuario -->" +

        "<center ><h4>Mis discusiones</h4></center>" +
        "<div id='user'></div>" +
        "<ons-fab position='bottom right'  style='bottom: 60px;' onclick='nuevoForo()'> " +
        " <ons-icon icon='md-plus'></ons-icon> " +
        " </ons-fab>" +

        " <!-- Lista de discusiones de todos -->" +

        "<center><h5>Todas</h5></center>" +
        "<div id='todos'></div>";

    document.getElementById('contenido').innerHTML = '';
    document.getElementById('contenido').innerHTML = foro;
    getForos();
}
/**
* Función: getForos()
* Esta función obtiene todos los registros de los foros en la base de datos y da una vista previa de estos
* dentro de la vista de foros
*/

function getForos() {
    var idU = localStorage.getItem('idUsuario');
    var foroAjax = new XMLHttpRequest();
    foroAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/getForos.php');
    foroAjax.send();

    foroAjax.onreadystatechange = function () {
        if (foroAjax.readyState == 4 && foroAjax.status == 200) {
            var f = JSON.parse(foroAjax.responseText);
            //console.log(f);
            for (var i = 0; i < f.length; i++) {
                //console.log(f);
                var item = "<ons-card onclick='verDiscusion(" + f[i].idForo + ")'>" +
                    "<span >" + f[i].titulo + "<i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> " +
                    " </ons-card>";
                if (f[i].idUsuario == idU) {
                    //document.getElementById('user').innerHTML = '';
                    document.getElementById('user').innerHTML += item;
                } else {
                    //document.getElementById('todos').innerHTML = '';
                    document.getElementById('todos').innerHTML += item;
                }

            }
        }
    }
}

/**
 *Función:
 *Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por el contenido de la página de Calendario.
 *@author Fernando Rincon
 */
function calendario() {

    var cal =

        "<center><h3>Calendario de actividades</h3></center>" +
        "<div id='eventos'></div>";

    document.getElementById('contenido').innerHTML = '';
    document.getElementById('contenido').innerHTML = cal;
    cargarEventos();
}
/**
*Función: cargarEventos()
* @author Fernando Rincón
* Esta función obtiene todos los registros de los eventos y los inserta mediante AJAX a la vista del calendario.
*/

function cargarEventos() {

    var eventoAjax = new XMLHttpRequest();
    eventoAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/getEventos.php');
    eventoAjax.send();

    eventoAjax.onreadystatechange = function () {

        if (eventoAjax.readyState == 4 && eventoAjax.status == 200) {
            var ev = JSON.parse(eventoAjax.responseText);
            //console.log(ev[0]);
            for (var i = 0; i < ev.length; i++) {
                var e =
                    "<ons-card onclick='verEvento(" + ev[i].idEvento + ")'>" +
                    " <center>" +
                    " <b>" + ev[i].Nombre + "</b>" +
                    " <br><b>" + ev[i].Fecha + "</b>" +
                    "</center>" +
                    "<p>" + ev[i].Descripcion + "</p>" +
                    " </ons-card>";

                document.getElementById('eventos').innerHTML += e;

            }

        }
    }
}


/**
 * Función: verConvocatoria
 * Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por la vista con la información de la convocatoria seleccionada.
 * Los datos de la convocatoria son recuperados de la bd a través de AJAX.
 * @author Fernando Rincon
 */
function verConvocatoria(id) {

    var convAjax = new XMLHttpRequest();
    convAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/getConvocatoria.php?idCon=' + id);
    convAjax.send();
    convAjax.onreadystatechange = function () {

        if (convAjax.readyState == 4 && convAjax.status == 200) {
            var c = JSON.parse(convAjax.responseText);
            //console.log(c);
            var conv =

                "<ons-card style='height: 95%; margin-top: 15px; overflow-y:scroll'>" +
                " <center><h3>" + c[0].Nombre + "</h3> " +
                "<p>" + c[0].Descripcion + "</p>" +
                " </center>" +
                "<center> " +
                " <img src='" + 'http://' + c[0].ruta + "' style='width: 300px !important;'> " +
                " </center>" +
                "</ons-card> ";

            document.getElementById('contenido').innerHTML = '';
            document.getElementById('contenido').innerHTML = conv;

        }
    }


}


/**
 *Función: verTutor()
 *Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por la vista con la información del tutor seleccionado.
 *@author Fernando Rincon
 */
function verTutor(id) {

    var tutAjax = new XMLHttpRequest();
    tutAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/getTutor.php?idT=' + id);
    tutAjax.send();
    tutAjax.onreadystatechange = function () {
        if (tutAjax.readyState == 4 && tutAjax.status == 200) {
            var t = JSON.parse(tutAjax.responseText);
            //console.log(t);


            var tut =
                "<ons-card style='height: 95%; margin-top: 15px;'>" +
                "<center><img src='" + 'http://' + t[0].ruta + "' style='border-radius: 100px; max-width: 120px; max-height: 120px;'> <br>" +
                "<h4>" + t[0].nombre + "</h4><br></center>" +
                "<ons-card style='height: 45%; margin-top: 15px; background-color:rgba(0,0,0,.1);'>" +
                " <p>Correo: " + t[0].correo + "</p>" +
                " <p>Cubículo: " + t[0].cubiculo + "</p>" +
                " <p>Horarios: De " + t[0].horaInicio + " a " + t[0].horaFin + "</p>" +
                "</ons-card>";

            document.getElementById('contenido').innerHTML = '';
            document.getElementById('contenido').innerHTML = tut;
        }
    }


}


/**
 *Función: verDiscusion
 *Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por la vista con la información de la discusión seleccionada.
 *@author Fernando Rincon
 */
function verDiscusion(id) {
    var discAjax = new XMLHttpRequest();
    discAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/getDiscusion.php?idF=' + id);
    discAjax.send();
    discAjax.onreadystatechange = function () {

        if (discAjax.readyState == 4 && discAjax.status == 200) {
            //console.log(discAjax.responseText);
            var dis = JSON.parse(discAjax.responseText);

            var disc = " <ons-card style='height: 85%; margin-top: 15px; overflow-y: scroll;'>" +
                "<center><h3>" + dis[0].titulo + "</h3> </center>" +
                "<p>" + dis[0].Descripcion + "</p>" +
                " <center>" +
                " <img src='" +  dis[0].ruta + "' style='width: 80% !important;' alt=''>" +
                " </center>" +
                " <h4>Comentarios:</h4>" +
                " <div id='comentarios'></div>" +
                " </ons-card><br>" +
                " <ons-input style='width: 65%;margin-left: 5%;' id='comentario' type='text' placeholder='Comentar...'></ons-input>" +
                "<ons-button modifier='quiet' onclick='comentar(" + id + ")' style='margin-left:4%;background-color: #dbdada;text-align: center'><center>Enviar</center></ons-button>";


            document.getElementById('contenido').innerHTML = '';
            document.getElementById('contenido').innerHTML = disc;

        }
    }
    cargarComentarios(id);
}

/**
 * Función: cargarComentarios(id)
 * @author Fernando Rincón Amaya
 * Esta función obtiene como parámtero el id del foro para hacer una petición po AJAX al servidor y obtener los comentarios de dicho foro.
 */
function cargarComentarios(id) {
    var comentAjax = new XMLHttpRequest();
    comentAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/getComentarios.php?idCom=' + id);
    comentAjax.send();
    comentAjax.onreadystatechange = setTimeout(function () {

        if (comentAjax.readyState == 4 && comentAjax.status == 200) {
            var com = JSON.parse(comentAjax.responseText);
           // console.log(com);
            if (com != 0) {
                for (var i = 0; i < com.length; i++) {
                    var c =
                        " <p>" + com[i].NomUsuario + ": " + com[i].Comentario + "</p>";
                    document.getElementById('comentarios').innerHTML += c;

                }
            } else {

                var c =
                    " <p>No hay comentarios disponibles...</p>";
                document.getElementById('comentarios').innerHTML += c;
            }

        }

    }, 800);
}


function comentar(idForo) {

    var coment = document.getElementById('comentario').value;
    var idUsuario = localStorage.getItem('idUsuario');

    if (coment != '' && coment != '   ') {
        var comentAjax = new XMLHttpRequest();
        comentAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/comentar.php?idForo=' + idForo + '&Com=' + coment + '&idU=' + idUsuario);
        comentAjax.send();
        comentAjax.onreadystatechange = function () {
            if (comentAjax.readyState == 4 && comentAjax.status == 200) {
                var com = JSON.parse(comentAjax.responseText);
                document.getElementById('comentarios').innerHTML = '';
                showToast('Comentario publicado exitosamente...');
                document.getElementById('comentario').value = '';
                cargarComentarios(idForo);

            }
        }
    } else {
        showToast('Completa los campos...');
    }
}


/**
 *Función: verEvento
 *Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por la vista con la información del evento seleccionado.
 *@author Fernando Rincon
 */
function verEvento(id) {

    var evAjax = new XMLHttpRequest();
    evAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/getEvento.php?idE=' + id);
    evAjax.send();
    evAjax.onreadystatechange = function () {

        if (evAjax.readyState == 4 && evAjax.status == 200) {
           // console.log(JSON.parse(evAjax.responseText));
            var ev = JSON.parse(evAjax.responseText);
            var eve = "<center><h3>" + ev[0].Nombre + "</h3></center>" +
                "<ons-card>" +
                "<h4>Fecha:</h4>" + ev[0].Fecha +
                "<h4>Descripción:</h4> " + ev[0].Descripcion +
                "<h4>Hora:</h4> " + ev[0].Hora + "<br><br>" +
                "<center> <img style='width:100%;height:100%;' id='imagenConvocatoria' src='" + 'http://' + ev[0].ruta + "' > </center>" +
                "</ons-card>";
            document.getElementById('contenido').innerHTML = '';
            document.getElementById('contenido').innerHTML = eve;
        }

    }
}



/**
 *Función: nuevoForo()
 *Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por la vista con el formulario para que el usuario pueda crear
 una nueva discusión.
 *@author Fernando Rincon
 */
function nuevoForo() {
    window.location = 'foro2.html';
    //console.log('No me piques we');

    // var nf =
    //     "<form method='POST' enctype='multipart/form-data' id='formUpForo'>" +
    //     "<ons-card style='height: 95%;'>" +


    //     " Título: <ons-input id='tituloForo' modifier='underbar' placeholder='' name='titulo' float></ons-input><br><br>" +
    //     "Descripción: <br> <br> <textarea style='font-size:15px;border:solid gray; width:95%; border-radius:10px;' name='descripcion' id='descripcion' cols='30' rows='10'></textarea> <br>" +

    //     "<center><label><img src='photo.png' style='max-width: 100px; max-height: 100px;'><input type='file' name='fileToUploadN' id='fileToUpload' style='display: none;'></label><br></center>" +
    //     "<input type='text' value='" + localStorage.getItem('idUsuario') + "' name='usuario'>" +
    //     "<center><label><ons-button onclick='upForo()' modifier='large'>Enviar</ons-button> </label> </center>" +
    //     "</ons-card>" +
    //     "</form>";

    // document.getElementById('contenido').innerHTML = '';
    // document.getElementById('contenido').innerHTML = nf;
}

/**
* Función: cargarInfoH()
* @author Fernando Rincón Amaya
* Esta función obtiene todos los registros de los horarios de transporte de CU a JURIQUILLA y viceversa, posteriormente
* los inserta en la tarjeta correspondiente.
*/
function cargarInfoH() {
    var horasAjax = new XMLHttpRequest();
    horasAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/getInfoH.php');
    horasAjax.send();
    horasAjax.onreadystatechange = function () {
        if (horasAjax.readyState == 4 && horasAjax.status == 200) {
            //console.log(JSON.parse(horasAjax.responseText));
            var hr = JSON.parse(horasAjax.responseText);
            for (var i = 0; i < hr.length; i++) {
                var horario = hr[i];
                //console.log(horario.Direccion);
                if (horario.Direccion == 'JURIQUILLA - CU') {
                    document.getElementById('horariosCJ').innerHTML += '| ' + horario.Hora + ' ';
                } else {
                    document.getElementById('horariosJC').innerHTML += '| ' + horario.Hora + ' ';
                }
            }
        }
    }

}

/**
* Función: cargarTutores()
* @author Fernando Rincon Amaya
* Esta función obtiene los registros de los tutores en la bd y posteriormente los inserta en la vista de tutores.
*/

function cargarTutores() {
    var tutorAjax = new XMLHttpRequest();
    tutorAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/getTutores.php');
    tutorAjax.send();
    tutorAjax.onreadystatechange = function () {
        if (tutorAjax.readyState == 4 && tutorAjax.status == 200) {
            // console.log(JSON.parse(tutorAjax.responseText));
            var tut = JSON.parse(tutorAjax.responseText);
            for (var i = 0; i < tut.length; i++) {
                var tutor = tut[i];
                //console.log(tutor);
                var t =
                    "<ons-card onclick='verTutor(" + tutor.idTutor + ")'>" +
                    " <span>" + tutor.nombre + "<i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> " +
                    " </ons-card>";

                document.getElementById('todostutores').innerHTML += t;

            }
        }
    }
}

/**
* Función: cargarConvocatorias()
* @author Fernando Rincón Amaya
* Esta función obtiene los registros de las convocatorias en la bd y posteriormente los inserta en la vista correspondiente, ya sea
* para becas, servicio social o bolsa de trabajo.
*/

function cargarConvocatorias() {

    var convAjax = new XMLHttpRequest();
    convAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/getConvocatorias.php');
    convAjax.send();
    convAjax.onreadystatechange = function () {
        if (convAjax.readyState == 4 && convAjax.status == 200) {
            var convocatoria = JSON.parse(convAjax.responseText);

            for (var i = 0; i < convocatoria.length; i++) {
                //console.log(convocatoria[i]);

                var c =
                    "<!-- Item tarjeta -->" +
                    "<ons-card style='background: rgba(0,0,0,.02); margin-top: 15px;' onclick='verConvocatoria(" + convocatoria[i].idConvocatoria + ")'>" +
                    "<span>" + convocatoria[i].Nombre + "<i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> " +
                    "</ons-card>";

                if (convocatoria[i].TipoConvocatoria == 'Becas') {
                    document.getElementById('becas').innerHTML += c;
                } else if (convocatoria[i].TipoConvocatoria == 'Servicio Social') {
                    document.getElementById('servicioS').innerHTML += c;
                } else if (convocatoria[i].TipoConvocatoria == 'Bolsa de Trabajo') {
                    document.getElementById('bolsaT').innerHTML += c;
                }

            }
        }
    }
}
/**
 * Función: buscarClase()
 * @author Fernando Rincón
 * Esta función obtiene como parámetro elvalor de la barra de búsqueda de lo que escribió el usuario y en base a eso busca una materia
 * con ese nombre o con el nombre del profesor que escribió.
 */
function buscarClase(val) {
    document.getElementById('clasesBuscadas').innerHTML = '';
    var claseAjax = new XMLHttpRequest();
    claseAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/buscar.php?valor=' + val);
    claseAjax.send();
    claseAjax.onreadystatechange = function () {
        if (claseAjax.readyState == 4 && claseAjax.status == 200) {
            var clas = JSON.parse(claseAjax.responseText);
            //console.log(clas);
            if(val.trim() != ''){
                for (var i = 0; i < clas.length; i++) {
                    var c = "";
                    if (clas[i].dias == 1) {
                        c = " <ons-card>" +
                            "<b>Materia:</b> " + clas[i].nombre + " <br><br>" +
                            "<b>Dias:</b> Lunes y Miércoles <br><br>" +
                            "<b>Horario:</b> " + clas[i].horaInicio + " - " + clas[i].horaFin + "<br><br>" +
                            "<b>Aula(s):</b> " + clas[i].edificio + clas[i].numero + ' - ' + clas[i].salon2 + "  <br><br>" +
                            "<b>Profesor:</b> " + clas[i].nombreProfesor + " <br><br>" +
                            "<b>Grupo:</b> " + clas[i].grupo + " <br><br>" +
                            " </ons-card>";
                    }
                    if (clas[i].dias == 2) {
                        c = " <ons-card>" +
                            "<b>Materia:</b> " + clas[i].nombre + " <br><br>" +
                            "<b>Dias:</b> Martes y Jueves <br><br>" +
                            "<b>Horario:</b> " + clas[i].horaInicio + " - " + clas[i].horaFin + "<br><br>" +
                            "<b>Aula(s):</b> " + clas[i].edificio + clas[i].numero + ' - ' + clas[i].salon2 + "<br><br>" +
                            "<b>Profesor:</b> " + clas[i].nombreProfesor + " <br><br>" +
                            "<b>Grupo:</b> " + clas[i].grupo + " <br><br>" +
                            " </ons-card>";
                    }
                    if (clas[i].dias == 3) {
                        c = " <ons-card>" +
                            "<b>Materia:</b> " + clas[i].nombre + " <br><br>" +
                            "<b>Dias:</b> Viernes <br><br>" +
                            "<b>Horario:</b> " + clas[i].horaInicio + " - " + clas[i].horaFin + " <br><br>" +
                            "<b>Aula(s):</b> " + clas[i].edificio + clas[i].numero + ' - ' + clas[i].salon2 + " <br><br>" +
                            "<b>Profesor:</b> " + clas[i].nombreProfesor + " <br><br>" +
                            "<b>Grupo:</b> " + clas[i].grupo + " <br><br>" +
                            " </ons-card>";
                    }
                    document.getElementById('clasesBuscadas').innerHTML += c;
                }


            }else{
                showToast('Completa los campos...');
            }
        }
    }
}
/**
 * Función: registrar()
 * @author Fernando Rincón
 * Esta funcion registra al usuario con las credenciales que este introdujo en la pantalla de registro, la contraseña se hashea antes de
 * ser enviada al servidor y posteriormente su información se almacena en la BD.
 */
function registrar() {
    var exp = document.getElementById('expediente').value;
    var contr = document.getElementById('pass').value;
    var nom = document.getElementById('nombre').value;
    //console.log(contr);
    if (exp.trim() != '' && contr.trim() != '' && nom.trim() != '') {
        var registroAjax = new XMLHttpRequest();
        registroAjax.open('GET', 'http://classhub2.000webhostapp.com/php/App/registrar.php?exp=' + exp + '&pass=' + pre_hash(contr) + '&nombre=' + nom);
        registroAjax.send();
        registroAjax.onreadystatechange = function () {
            if (registroAjax.readyState == 4 && registroAjax.status == 200) {
                var res = registroAjax.responseText;
                //console.log(res);
                if (res == 1) {
                    location.href = 'index.html';
                } else {
                    showToast('Expediente ya registrado o Intentalo más tarde...');
                }


            }
        }
    }
}

function saveForo() {
    localStorage.tituloForo = document.getElementById('tituloForo').value;
    localStorage.descripcionForo = document.getElementById('descripcion').value;
    window.location = 'imagenForo.html';
}

function sinImagen() {
    localStorage.imagenURL = '';
    upForo();
}

function saveReporte() {
    localStorage.tituloReporte = document.getElementById('tituloReporte').value;
    localStorage.descripcionReporte = document.getElementById('descripcionReporte').value;
    window.location = 'imagenReporte.html';
}

function sinImagenReporte() {
    localStorage.imagenURL = '';
    upReporte();
}
function verificaCaracteres(input){
    var regex = /[^0-9, a-z, ?, ¿, !, ¡, . , ( , ), ó, ñ, á, í, é, ú ]/gi;
    input.value = input.value.replace(regex, "");
}