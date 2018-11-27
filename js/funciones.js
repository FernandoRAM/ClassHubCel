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
function logout(){
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
function verificaSesion(){
    if(localStorage.getItem('idUsuario')){
        
    }else{
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
* Versión: 1.0
*/

function login() {
    var exp = document.getElementById('expediente').value;
    var pass = document.getElementById('pass').value;

    if (exp != '' && pass != '') {
        loginAjax = new XMLHttpRequest();
        loginAjax.open('GET', 'http://classhub2.000webhostapp.com/php/login.php?expediente=' + exp + '&pass=' + pre_hash(pass));
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
                    showToast('Datos incorrectos inenta de nuevo.');
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
function upReporte(){
    var desc = document.getElementById('descripcion').value;
    var idU = localStorage.getItem('idUsuario');

    if (desc != '' && idU != '') {
        reporteAjax = new XMLHttpRequest();
        reporteAjax.open('GET','http://classhub2.000webhostapp.com/php/nuevoReporte.php?descripcion='+desc+'&idU='+idU);
        reporteAjax.send();
        reporteAjax.onreadystatechange = function(){
            if (reporteAjax.readyState == 4 && reporteAjax.status == 200) {
                var response = reporteAjax.responseText;
               
                if (response == '1') {
                    alert('¡Reporte enviado exitosamente!');
                     window.location.assign('inicio.html');
                }
                else{
                    showToast('Error inesperado intentalo más tarde...');
                    window.location.assign('inicio.html');
                }
            }
        }
        
    }else {
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

  var titulo = document.getElementById('tituloForo').value;
  var desc = document.getElementById('descripcion').value;
  var idU = localStorage.getItem('idUsuario');
  
  if (titulo != '' && desc != '') {

      loginAjax = new XMLHttpRequest();
      loginAjax.open('GET', 'http://classhub2.000webhostapp.com/php/nuevoForo.php?titulo='+titulo+'&desc='+desc+'&idU='+idU);
      loginAjax.send();
      loginAjax.onreadystatechange = function () {
          if (loginAjax.readyState == 4 && loginAjax.status == 200) {

              var respuesta = loginAjax.responseText;
              alert(loginAjax.status);

              if (respuesta == '1') {

                  alert('Discusión publicada exitosamente!');
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
        timeout: 1000
    });
};




/**
 * Función: reporte()
 * @author : Fernando Rincon
 * 
 * Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por el contenido de la página para enviar un reporte.
 */
function reporte(){
    var reporte = 
   " <form method='POST' enctype='multipart/form-data '>"+
   " <ons-card style='height: 95%;'>"+
      
        
         
          "Descripción: <br> <br> <textarea style='font-size:15px;border:solid rgb(150, 99, 99); width:95%; border-radius:10px;' name='descripcion' id='descripcion' cols='30' rows='10'></textarea> <br>"+
        
        "<center><label> <img src='img/photo.png' style='max-width: 100px; max-height: 100px;'><input type='file' name='fileToUpload' id='fileToUpload' style='display: none;'> </label><br></center>"+
       " <center><label><ons-button onclick='upReporte()' modifier='large' style='background-color:red;'>Enviar Reporte</ons-button> </label> </center>"+
      
     " </ons-card>"+
   " </form>";
   document.getElementById('contenido').innerHTML = '';
   document.getElementById('contenido').innerHTML = reporte;
}
/*
Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por el contenido de la página de convocatorias.
Autor: Fernando Rincon 
Versión: 1.0
*/
function convocatorias() {

    var convocatorias = "<!-- Carrusel -->" +
        "<ons-carousel fullscreen swipeable auto-scroll overscrollable id='carousel'>" +

        " <!-- Item Carrusel (Becas)-->" +
        " <ons-carousel-item>" +
        " <ons-card style='height: 95%; margin-top: 15px;'>" +
        "<center><h4>Becas</h4></center>" +
        "<!-- Item tarjeta -->" +
        "<ons-card style='background: rgba(0,0,0,.02); margin-top: 15px;' onclick='verConvocatoria()'>" +
        "<span>Beca de manutención<i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> " +
        "</ons-card>" +
        " <!-- Item tarjeta -->" +
        " <ons-card style='background: rgba(0,0,0,.02); margin-top: 15px;'>" +
        "<span>Beca de Madres Solteras <i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> " +
        "</ons-card>" +
        "<!-- Item tarjeta -->" +
        "<ons-card  style='background: rgba(0,0,0,.02); margin-top: 15px;'>" +
        " <span>Beca de Transporte <i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> " +
        " </ons-card>" +
        "</ons-card>" +
        "</ons-carousel-item>" +

        "<!-- Item Carrusel (Servicio social) -->" +
        " <ons-carousel-item>" +
        " <ons-card style='height: 95%; margin-top:15px;'>" +
        " <!-- Item tarjeta -->" +
        "<center><h4>Servicio social</h4>" +
        " <!-- Item Servicio Social -->" +
        " <ons-card style='background: rgba(0,0,0,.02); margin-top: 15px;'>" +
        "<span>Servicio social Centro de Desarrollo <i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> " +
        "</ons-card>   " +
        "<!-- Item Servicio Social -->" +
        "<ons-card style='background: rgba(0,0,0,.02); margin-top: 15px;'>" +
        "<span>Servicio social Deportes <i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> " +
        "</ons-card> " +
        "<!-- Item Servicio Social -->" +
        "<ons-card style='background: rgba(0,0,0,.02); margin-top: 15px;'>" +
        "<span>Servicio social Centro de Cómputo <i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> " +
        "</ons-card>" +

        "</center>" +
        " </ons-card>" +
        "</ons-carousel-item>" +

        "<!-- Item Carrusel (Bolsa de trabajo) -->" +
        "<ons-carousel-item>" +
        " <ons-card style='height: 95%; margin-top: 15px;'>" +
        "<!-- Item tarjeta -->" +
        "<center><h4>Bolsa de Tarabajo</h4>" +
        " <!-- Item Servicio Social -->" +
        "<ons-card style='background: rgba(0,0,0,.02); margin-top: 15px;'>" +
        " <span>Prácticas Huawei <i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> " +
        " </ons-card>" +
        "</center>" +
        " </ons-card>" +
        "</ons-carousel-item>" +

        "</ons-carousel>";
    document.getElementById('contenido').innerHTML = '';
    document.getElementById('contenido').innerHTML = convocatorias;

}


/*
Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por el contenido de la página de horarios.
Autor: Fernando Rincon
Versión: 1.0
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
        "<ons-card style='height: 95%; margin-top: 15px;'>" +
        "<!-- Item tarjeta -->" +
        " <center><h4>Horarios de Clases</h4>" +
        " <ons-search-input placeholder='Busca tu clase...'></ons-search-input><br><br>" +
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
Autor: Fernando Rincon
Versión: 1.0
*/

function foro() {

    var foro =
        "<!-- Lista de discusiones de usuario -->" +

        "<center ><h4>Mis Discusiones</h4></center>" +
        "<div id='user'><center>No hay registros</center></div>"+
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

function getForos(){
    var idU = localStorage.getItem('idUsuario');
    var foroAjax = new XMLHttpRequest();
   foroAjax.open('GET', 'http://classhub2.000webhostapp.com/php/getForos.php');
   foroAjax.send();

   foroAjax.onreadystatechange = function (){
        if (foroAjax.readyState == 4 && foroAjax.status == 200) {
            var f = JSON.parse(foroAjax.responseText);
            for(var i =0 ; i< f.length ; i++){
                var item = "<ons-card onclick='verDiscusion("+f[i].idForo+")'>" +
                            "<span >"+f[i].Titulo+"<i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> " +
                            " </ons-card>";
                if (f[i].idUsuario == idU) {
                    document.getElementById('user').innerHTML = '';
                    document.getElementById('user').innerHTML += item;
                }else{
                    document.getElementById('todos').innerHTML = '';
                    document.getElementById('todos').innerHTML += item;
                }
               
            }
        }
   }
}

/**
 *Nombre de la funcion:
 *Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por el contenido de la página de Calendario.
 *Autor: Fernando Rincon
 *Versión: 1.0
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
   eventoAjax.open('GET', 'http://classhub2.000webhostapp.com/php/getEventos.php');
   eventoAjax.send();
  
   eventoAjax.onreadystatechange = function(){  
        
        if (eventoAjax.readyState == 4 && eventoAjax.status == 200) {
            var ev = JSON.parse(eventoAjax.responseText);
            console.log(ev[0]);
            for (var i = 0; i < ev.length ; i++) {
                var e = 
                "<ons-card onclick='verEvento("+ev[i].idEvento+")'>" +
                " <center>" +
                " <b>"+ev[i].Nombre+"</b>" +
                " <br><b>"+ev[i].Fecha+"</b>" +
                "</center>" +
                "<p>"+ev[i].Descripcion+"</p>" +
                " </ons-card>";

                document.getElementById('eventos').innerHTML += e;

            }
           
        }
   }
}


/**
 *Nombre de la funcion: verConvocatoria
 *Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por la vista con la información de la convocatoria seleccionada.
 *Autor: Fernando Rincon
 *Versión: 1.0
 */
function verConvocatoria() {

    var conv =

        "<ons-card style='height: 95%; margin-top: 15px;'>" +
        " <center><h3>Título Convocatoria</h3> " +
        "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique optio quibusdam error, doloremque est quasi necessitatibus atque ab et quae eveniet voluptate suscipit deserunt, facere commodi nostrum labore totam quis.</p>" +
        " </center>" +
        "<a href=' https://www.uaq.mx/informatica/descargas/Convocatoria_MIS06_2019_A.pdf'> https://www.uaq.mx/informatica/descargas/Convocatoria_MIS06_2019_A.pdf</a>" +
        "<center> " +
        " <img src='img/convocatoria.jpg' style='width: 300px !important;'> " +
        " </center>" +
        "</ons-card> ";

    document.getElementById('contenido').innerHTML = '';
    document.getElementById('contenido').innerHTML = conv;
}


/**
 *Nombre de la funcion: verTutor()
 *Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por la vista con la información del tutor seleccionado.
 *Autor: Fernando Rincon
 *Versión: 1.0
 */
function verTutor() {

    var tut =
        "<ons-card style='height: 95%; margin-top: 15px;'>" +
        "<center><img src='img/lalo.jpg' style='border-radius: 100px; max-width: 120px; max-height: 120px;'> <br>" +
        "<h4>Eduardo Aguirre Caracheo </h4><br></center>" +
        "<ons-card style='height: 45%; margin-top: 15px; background-color:rgba(0,0,0,.1);'>" +
        "<p>Contacto: 4426172635</p>" +
        " <p>Cubículo: Centro de Desarrollo</p>" +
        "</ons-card>";
    "</ons-card>";
    document.getElementById('contenido').innerHTML = '';
    document.getElementById('contenido').innerHTML = tut;
}


/**
 *Nombre de la funcion: verDiscusion
 *Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por la vista con la información de la discusión seleccionada.
 *Autor: Fernando Rincon
 *Versión: 1.0
 */
function verDiscusion(id) {
        var discAjax = new XMLHttpRequest();
        discAjax.open('GET', 'http://classhub2.000webhostapp.com/php/getDiscusion.php?idF='+id);
        discAjax.send();
        discAjax.onreadystatechange = function(){
            
        if (discAjax.readyState == 4 && discAjax.status == 200) {
            console.log(JSON.parse(discAjax.responseText));
            var dis = JSON.parse(discAjax.responseText);

            var disc = " <ons-card style='height: 85%; margin-top: 15px; overflow-y: scroll;'>" +
                "<center><h3>"+dis[0].Titulo+"</h3> </center>" +
                "<p>"+dis[0].Descripcion+"</p>" +
                " <center>" +
                " <img src='"+dis[0].ruta+"' style='width: 300px !important;'>" +
                " </center>" +
                " <h4>Comentarios:</h4>" +
                " <div id='comentarios'></div>"+
                " <p>Ruben Burgos: Son mias muchas gracias.</p>" +
                " <p>Fernando Rincon: No hay de que.</p>" +

                " </ons-card><br>" +

                " <ons-input style='width: 65%;margin-left: 5%;' id='comentario' type='text' placeholder='Comentar...'></ons-input>" +
                "<ons-button modifier='quiet' style='margin-left:4%;background-color: #dbdada;text-align: center'><center>Enviar</center></ons-button>";


        document.getElementById('contenido').innerHTML = '';
        document.getElementById('contenido').innerHTML = disc;
        }

       }

  

    

}



/**
 *Nombre de la funcion: verEvento
 *Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por la vista con la información del evento seleccionado.
 *Autor: Fernando Rincon
 *Versión: 1.0
 */
function verEvento(id) {

     var evAjax = new XMLHttpRequest();
        evAjax.open('GET', 'http://classhub2.000webhostapp.com/php/getEvento.php?idE='+id);
        evAjax.send();
        evAjax.onreadystatechange = function(){

                if (evAjax.readyState == 4 && evAjax.status == 200){
                    console.log(JSON.parse(evAjax.responseText));
                    var ev = JSON.parse(evAjax.responseText);
                     var eve = "<center><h3>"+ev[0].Nombre+"</h3></center>" +
                        "<ons-card>" +
                        "<h4>Fecha:</h4>" +ev[0].Fecha +
                        "<h4>Descripción:</h4> "+ev[0].Descripcion +
                        "<h4>Hora:</h4> "+ev[0].Hora+"<br><br>" +
                        "<a href='https://www.uaq.mx/informatica/descargas/CRT_2018.pdf'>https://www.uaq.mx/informatica/descargas/CRT_2018.pdf</a>" +
                        "<center> <img style='width:100%;height:100%;' id='imagenConvocatoria' src='"+ev[0].ruta+"' > </center>" +
                        "</ons-card>";
                    document.getElementById('contenido').innerHTML = '';
                    document.getElementById('contenido').innerHTML = eve;
                }

        }



   


}



/**
 *Nombre de la funcion: nuevoForo()
 *Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por la vista con el formulario para que el usuario pueda crear
 una nueva discusión.
 *Autor: Fernando Rincon
 *Versión: 1.0
 */
function nuevoForo() {

    console.log('No me piques we');

    var nf =
        "<form method='POST' enctype='multipart/form-data '>" +
        "<ons-card style='height: 95%;'>" +


        " Título: <ons-input id='tituloForo' modifier='underbar' placeholder='' float></ons-input><br><br>" +
        "Descripción: <br> <br> <textarea style='font-size:15px;border:solid gray; width:95%; border-radius:10px;' name='descripcion' id='descripcion' cols='30' rows='10'></textarea> <br>" +

        "<center><label> <img src='photo.png' style='max-width: 100px; max-height: 100px;'><input type='file' name='fileToUpload' id='fileToUpload' style='display: none;' > </label><br></center>" +
        "<center><label><ons-button onclick='upForo()' modifier='large'>Enviar</ons-button> </label> </center>" +

        "</ons-card>" +
        "</form>";

    document.getElementById('contenido').innerHTML = '';
    document.getElementById('contenido').innerHTML = nf;
}

/**
* Función: cargarInfoH()
* @author Fernando Rincón Amaya
* Esta función obtiene todos los registros de los horarios de transporte de CU a JURIQUILLA y viceversa, posteriormente
* los inserta en la tarjeta correspondiente.
*/
function cargarInfoH(){
     var horasAjax = new XMLHttpRequest();
        horasAjax.open('GET', 'http://classhub2.000webhostapp.com/php/getInfoH.php');
        horasAjax.send();
        horasAjax.onreadystatechange = function(){
            if (horasAjax.readyState == 4 && horasAjax.status == 200) {
                //console.log(JSON.parse(horasAjax.responseText));
                var hr = JSON.parse(horasAjax.responseText);
                for(var i = 0 ; i < hr.length ; i++){
                    var horario = hr[i];
                    //console.log(horario.Direccion);
                    if (horario.Direccion == 'JURIQUILLA - CU') {
                        document.getElementById('horariosCJ').innerHTML += '| '+horario.Hora+' ';
                    }else{
                        document.getElementById('horariosJC').innerHTML += '| '+horario.Hora+' ';
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

function cargarTutores(){
    var tutorAjax = new XMLHttpRequest();
        tutorAjax.open('GET', 'http://classhub2.000webhostapp.com/php/getTutores.php');
        tutorAjax.send();
        tutorAjax.onreadystatechange = function(){
            if (tutorAjax.readyState == 4 && tutorAjax.status == 200) {
               // console.log(JSON.parse(tutorAjax.responseText));
                var tut = JSON.parse(tutorAjax.responseText);
                for(var i = 0 ; i < tut.length ; i++){
                    var tutor = tut[i];
                    //console.log(tutor);
                    var t = 
                    "<ons-card onclick='verTutor("+tutor.idTutor+")'>" +
                    " <span>"+tutor.nombre+"<i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> " +
                     " </ons-card>";

                     document.getElementById('todostutores').innerHTML += t;
                    
                }
            }
        }
}

function subImg() {
    const url = 'php/upload.php';
    const form = document.querySelector('form');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const files = document.querySelector('[type=file]').files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            formData.append('files[]', file);
        }
        var oReq = new XMLHttpRequest();
        oReq.open("POST", "php/upload.php", true);
        oReq.onload = function () {
            if (oReq.status == 200) {
                alert("jalo");
                alert(oReq.responseText);
            } else {
                alert("no jalo");
            }
        };
        oReq.send(formData);
        // fetch(url, {
        //     method: 'POST',
        //     body: formData
        // }).then(response => {
        //     alert(response.status);
        //     if(response.status == 200){
        //       alert("jalo");
        //     }
        // });
    });
}

