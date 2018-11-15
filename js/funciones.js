
function login(){

	 var exp = document.getElementById('expediente').value;
	 var  pass = document.getElementById('pass').value;



	 if (exp != '' && pass != '') {

		loginAjax = new XMLHttpRequest();
		loginAjax.open('GET', 'http://localhost:9999/ClassHub/php/login.php?expediente='+exp+'&pass='+pre_hash(pass));
		loginAjax.send();
		loginAjax.onreadystatechange = function(){
			if (loginAjax.readyState == 4 && loginAjax.status == 200) {

					var respuesta = loginAjax.responseText;
          //console.log(respuesta);

					if (respuesta != '0') {


					 window.location.replace('http://localhost:9999/ClassHub/index.html');

					}else{
						exp= '';
						passs = '';
						showToast();	
					}
					
			
			
			}
		}
	}else{

	}

}
/*
Esta funcion se encarga de obtener los datos del usuario ingresados en la pantalla de inicio de sesión . 
Al obtenerlos se verifican las credenciales en la Base de Datos (la contraseña hasheada). 
De haber ingresado los datos correctos se redirigirá al usuario a la pantalla de inicio, de los contrario se muestra un aviso
de que sus datos son incorrectos y debe intentarlo de nuevo.
Autor: Fernando Rincón
Versión: 1.0
*/



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



var showToast = function() {
    ons.notification.toast('¡Datos Incorrectos. Intenta de nuevo!', {
    timeout: 2000
  });
};

/*
Esta funcion muestra un toast con el mensaje '¡Datos Incorrectos. Intenta de nuevo!' en la parte
inferior al ser ejecutada.
*/

function convocatorias(){

var convocatorias = "<!-- Carrusel -->"+
  "<ons-carousel fullscreen swipeable auto-scroll overscrollable id='carousel'>"+

   " <!-- Item Carrusel (Becas)-->"+
   " <ons-carousel-item>"+
     " <ons-card style='height: 95%; margin-top: 15px;'>"+
        "<center><h4>Becas</h4></center>"+
        "<!-- Item tarjeta -->"+
        "<ons-card style='background: rgba(0,0,0,.02); margin-top: 15px;'>"+
        "<span>Beca de manutención<i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> "+
        "</ons-card>"+
       " <!-- Item tarjeta -->"+
       " <ons-card style='background: rgba(0,0,0,.02); margin-top: 15px;'>"+
          "<span>Beca de Madres Solteras <i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> "+
        "</ons-card>"+
        "<!-- Item tarjeta -->"+
        "<ons-card  style='background: rgba(0,0,0,.02); margin-top: 15px;'>"+
         " <span>Beca de Transporte <i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> "+
       " </ons-card>"+
      "</ons-card>"+
    "</ons-carousel-item>"+

    "<!-- Item Carrusel (Servicio social) -->"+
   " <ons-carousel-item>"+
     " <ons-card style='height: 95%; margin-top:15px;'>"+
       " <!-- Item tarjeta -->"+
        "<center><h4>Servicio social</h4>"+
         " <!-- Item Servicio Social -->"+
         " <ons-card style='background: rgba(0,0,0,.02); margin-top: 15px;'>"+
            "<span>Servicio social Centro de Desarrollo <i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> "+
          "</ons-card>   "  +     
          "<!-- Item Servicio Social -->"+
          "<ons-card style='background: rgba(0,0,0,.02); margin-top: 15px;'>"+
            "<span>Servicio social Deportes <i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> "+
          "</ons-card> "       +  
          "<!-- Item Servicio Social -->"+
          "<ons-card style='background: rgba(0,0,0,.02); margin-top: 15px;'>"+
            "<span>Servicio social Centro de Cómputo <i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> "+
          "</ons-card>"+

        "</center>"+
     " </ons-card>"+
    "</ons-carousel-item>"+

        "<!-- Item Carrusel (Bolsa de trabajo) -->"+
    "<ons-carousel-item>"+
     " <ons-card style='height: 95%; margin-top: 15px;'>"+
        "<!-- Item tarjeta -->"+
        "<center><h4>Bolsa de Tarabajo</h4>"+
           " <!-- Item Servicio Social -->"+
          "<ons-card style='background: rgba(0,0,0,.02); margin-top: 15px;'>"+
           " <span>Prácticas Huawei <i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> "+
         " </ons-card>"+
        "</center>"+
     " </ons-card>"+
    "</ons-carousel-item>"+

  "</ons-carousel>";
  document.getElementById('contenido').innerHTML = '';
  document.getElementById('contenido').innerHTML = convocatorias;

}
/*
Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por el contenido de la página de convocatorias.
Autor: Fernando Rincon 
Versión: 1.0
*/

function horarios(){

	var horarios = 
		"<!-- Carrusel -->"+
	  "<ons-carousel fullscreen swipeable auto-scroll overscrollable id='carousel'>"+

	   " <!-- Item Carrusel (Transporte)-->"+
	    "<ons-carousel-item>"+
	      "<ons-card style='height: 95%; margin-top: 15px;'>"+
	        "<center><h4>Horarios de Transporte</h4></center>"+
	        "<!-- Item tarjeta -->"+
	        "<ons-card style='height: 30%; background: rgba(0,0,0,.02); margin-top: 30px;'>"+
	          "<center>Juriquilla - CU</center>"+
	            "<p id='horariosCJ'>11:00, 13:00, 14:10, 13:00, 16:00, 16:30, 17:30, 17:10</p>"+
	       " </ons-card>"+
	        "<!-- Item tarjeta -->"+
	        "<ons-card style='height: 30%; background: rgba(0,0,0,.02); margin-top: 30px;'>"+

	         " <center>"+
	           " CU - Juriquilla"+
	          "</center>"+
	           " <!-- Horarios -->"+
	           " <p id='horariosCJ'>11:00, 13:00, 14:10, 13:00, 16:00, 16:30, 17:30, 17:10</p>"+

	        "</ons-card>"+
	      "</ons-card>"+
	    "</ons-carousel-item>"+

	   " <!-- Item Carrusel (Clases) -->"+
	    "<ons-carousel-item>"+
	      "<ons-card style='height: 95%; margin-top: 15px;'>"+
	        "<!-- Item tarjeta -->"+
	       " <center><h4>Horarios de Clases</h4>"+
	           " <ons-search-input placeholder='Busca tu clase...'></ons-search-input><br><br>"+
             "<div id='clasesBuscadas'>"+
              
            "</div>"+

	        "</center>"+
	      "</ons-card>"+
	   " </ons-carousel-item>"+

     "  <!-- Item Carrusel (Tutores) -->"+
   " <ons-carousel-item>"+
        "<ons-card style='height: 95%; margin-top: 15px; overflow-y:scroll;'>"+
         " <center><h4>Tutores</h4></center><br><br>"+
           " <ons-card>"+
             " <span>Eduardo Aguirre Caracheo<i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> "+
           " </ons-card>"+

           " <ons-card>"+
            "  <span>Diego Ibarra Corona<i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> "+
           " </ons-card>"+

           " <ons-card>"+
              "<span>Alejandro Vargas Díaz<i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> "+
           " </ons-card> "+

          "</ons-card>"+
       " </ons-card>"+
     " </ons-carousel-item>"+

	  "</ons-carousel>";


  document.getElementById('contenido').innerHTML = '';
  document.getElementById('contenido').innerHTML = horarios;

}
/*
Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por el contenido de la página de horarios.
Autor: Fernando Rincon
Versión: 1.0
*/

function foro(){

	var foro = 
		 "<!-- Lista de discusiones de usuario -->"+
	  
	  "<center><h4>Mis Discusiones</h4></center>"+
	     "<ons-fab position='bottom right'  style='bottom: 60px;' onclick='nuevoForo()'> "+
         " <ons-icon icon='md-plus'></ons-icon> "+
    " </ons-fab>"+
	  "  <!-- Item -->"+
	 "   <ons-card>"+
	     "<span>Llaves perdidas<i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> "+
	  " </ons-card>"+
	  "  <!-- Item -->"+
	 "   <ons-card>"+
	     "<span>Ayuda POO<i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> "+
	  " </ons-card>"+

	" <!-- Lista de discusiones de todos -->"+
	 
	   "<center><h5>Todas</h5></center>"+
	  
	   " <!-- Item -->"+
	   " <ons-card>"+
	     "<span>Celular Olvidado<i class='zmdi zmdi-chevron-right zmdi-hc-lg' style='float:right;'></i></span> "+

	   "</ons-card>"
     ;

	    document.getElementById('contenido').innerHTML = '';
 		document.getElementById('contenido').innerHTML = foro;
}
/*
Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por el contenido de la página de Foro.
Autor: Fernando Rincon
Versión: 1.0
*/

function calendario(){

	var cal = 

		"<center><h3>Calendario de actividades</h3></center>"+

   " <ons-card onclick='window.location.href = 'calendario.html?id_event='' >"+
       " <center>"+
           " <b>Invasión Troyana</b>"+
           " <br><b>24 de Noviembre</b>"+
        "</center>"+
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor...</p>"+
   " </ons-card>"+

   " <ons-card onclick='window.location.href = 'calendario.html?id_event='' >"+
       " <center>"+
           " <b>Carritos Troyanos</b>"+
           " <br><b>27 de Noviembre</b>"+
       " </center>"+
       " <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor...</p>"+
    "</ons-card>"+

   " <ons-card onclick='window.location.href = 'calendario.html?id_event=''>"+
       " <center>"+
            "<b>Congreso Nacional de Computación</b>"+
            "<br><b>21 de Noviembre</b>"+
        "</center>"+
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor...</p>"+
    "</ons-card>"+

    "<ons-card onclick='window.location.href = 'calendario.html?id_event=''>"+
        "<center>"+
            "<b>Taller de Jutsus</b>"+
            "<br><b>3 de Diciembre</b>"+
       " </center>"+
       " <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor...</p>"+
    "</ons-card>"+

   " <ons-card onclick='window.location.href = 'calendario.html?id_event='' >"+
       " <center>"+
            "<b>Taller Avanzado de Jutsus</b>"+
           " <br><b>7 de Diciembre</b>"+
       " </center>"+
       " <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor...</p>"+
    "</ons-card>";

     	document.getElementById('contenido').innerHTML = '';
 		document.getElementById('contenido').innerHTML = cal;
}

/*
Esta funcion se encarga de quitar el contenido del div con id 'contenido' y cambiarlo por el contenido de la página de Calendario.
Autor: Fernando Rinco3
Versión: 1.0
*/

function nuevoForo(){

  console.log('No me piques we'); 
	

		
}