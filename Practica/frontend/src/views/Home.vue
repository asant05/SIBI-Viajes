<template>
  <v-app>
    <div id="AppBar" position="relative">
      <v-spacer></v-spacer>
      <v-app-bar color="#FADBD8" height="70px" dense dark>
        <div class="d-flex align-center">
          <v-img
            alt="Viajar es Vivir"
            class="shrink mr-2"
            contain
            src="@/assets/logo.png"
            transition="scale-transition"
            width="100"
          />
          <v-toolbar-title justify-content:center>Viajar es Vivir</v-toolbar-title>
        </div>
      </v-app-bar>
    </div>

    <!-- Div con todos los elementos de la búsqueda -->
    <div style="background-color: #ffffff">
      <div text-align="center" style="margin-left: 50px; margin-right: 50px">
        <br />
        Bienvenido a Viajar es vivir, la apliación en la cual podrás buscar
        tu destino ideal para aquellos días libres en los que quieras 
        escaparte.
        <br />
        <strong>PARÁMETROS DE BÚSQUEDA:</strong>
        <br />
        <br />
        <!-- div para el radiobutton de la posición -->
        <div id="comunidad" style="float:left; margin-right: 100px">
          <div><strong>COMUNIDAD AUTONOMA</strong></div>
          <v-radio-group v-model="sitio.comunidad">
            <v-radio v-for="com in comunidades" :key="com" :label="`${com}`" :value="com"></v-radio>
          </v-radio-group>
        </div>
        <!-- div para el textfield de la edad -->
        <div id="provincia" style="float:left; margin-right: 50px">
          <div><strong>PROVINCIA</strong></div>
          <v-text-field v-model="sitio.provincia" label="Provincia ej. Leon" :rules="rules" outlined ></v-text-field>
        </div>
        <!-- div para el textfield del porcentaje de tiros de campo -->
        <div id="costaInterior" style="float:left; margin-right: 50px">
          <div><strong>COSTA O INTERIOR</strong></div>
          <v-text-field v-model="sitio.costaInterior" label="Costa o Interior" :rules="rules" outlined ></v-text-field>
        </div>
        <!-- div para el textfield del porcentaje de tiros de 3 -->
        <div id="ruralUrbano" style="float:left; margin-right: 50px">
          <div><strong>RURAL O URBANO</strong></div>
          <v-text-field v-model="sitio.ruralUrbano" label="Rural o Urbano" :rules="rules" outlined ></v-text-field>
        </div>
        <!-- div para el textfield del porcentaje de tiros libres -->
        <div id="descansoTurismo" style="float:left; margin-right: 50px">
          <div><strong>DESCANSO O TURISMO</strong></div>
          <v-text-field v-model="sitio.descansoTurismo" label="Descanso o Turismo" :rules="rules" outlined ></v-text-field>
        </div>
        <!-- div para el textfield de la media de puntos por partido-->
        <div id="monumentos" style="float:left; margin-right: 50px">
          <div><strong>PUNTUACION MINIMA MONUMENTOS</strong></div>
          <v-text-field v-model="sitio.monumentos" label="Entero del 0 al 10" :rules="rules" outlined ></v-text-field>
        </div>
        <!-- div para el textfield de la media de rebotes por partido-->
        <div id="naturaleza" style="float:left; margin-right: 50px">
          <div><strong>PUNTUACION MINIMA NATURALEZA</strong></div>
          <v-text-field v-model="sitio.naturaleza" label="Entero del 0 al 10" :rules="rules" outlined ></v-text-field>
        </div>
        <!-- div para el textfield de la media de asistencias por partido -->
        <div id="fiesta" style="float:left; margin-right: 50px">
          <div><strong>PUNTUACION MINIMA FIESTA</strong></div>
          <v-text-field v-model="sitio.fiesta" label="Entero del 0 al 10" :rules="rules" outlined ></v-text-field>
        </div>
        <!-- div para el textfield de la media de asistencias por partido -->
        <div id="comida" style="float:left; margin-right: 50px">
          <div><strong>PUNTUACION MINIMA COMIDA</strong></div>
          <v-text-field v-model="sitio.comida" label="Entero del 0 al 10" :rules="rules" outlined ></v-text-field>
        </div>

        <div id="botonBuscarSitio" class="text-center" style="float:left">
          <v-btn rounded color="primary" v-on:click= "buscarSitios()"> BUSCAR SITIOS </v-btn>
        </div>
      </div>

      <div id="recomendaciones" style="float:left; margin-left: 50px; margin-right: 50px; margin-top: 50px">
        <br />
        Si no sabes a donde ir, escribe la comunidad autónoma y se mostrarán algunos ejemplos aleatorios.
        <br />

        <!-- Botón para escoger comunidad autonoma -->
        <v-row align="center" style="float:left; width:40%; padding-right:40px">
          <v-col cols="12">
            <v-select v-model="comunidadRec" :items="comunidades" :menu-props="{ top: true, offsetY: true }" label="Escoge una comunidad"></v-select>
          </v-col>
        </v-row>

        <!-- Botón para escoger el numero de jugadores a mostrar 
        <v-row align="center" style="float:left; width:33%; padding-right:40px">
          <v-col cols="12">
            <v-select v-model="numJugadores" :items="top" :menu-props="{ top: true, offsetY: true }" label="Escoge el número de jugadores"></v-select>
          </v-col>
        </v-row>

         Botón para escoger la posicion del jugador 
        <v-row align="center" style="float:left; width:30%">
          <v-col cols="12">
            <v-select v-model="posicion" :items="comunidades" :menu-props="{ top: true, offsetY: true }" label="Escoge la posición del jugador"></v-select>
          </v-col>
        </v-row> -->

        <!-- Boton para comenzar la búsqueda -->
        <v-row align="center" style="float:left">
          <v-col cols="12">
            <v-btn v-on:click= "recomendarSitios()" rounded color="primary" dark >RECOMENDAR SITIOS</v-btn>
          </v-col>
          
        </v-row>

        <!-- Finaliza el div de las recomendaciones -->
      </div>
        <!-- Finaliza el div de los elementos de busqueda -->
    </div>

    <!-- Pie de pagina -->
    <div id="piePagina" >
      <v-footer dark padless >
      <v-card class="flex"  flat tile >
        <v-card-title class="teal" >
          <strong class="subheading">Si tiene alguna duda o consejo que darlos, no dude en escribirnos!</strong>
          <v-spacer></v-spacer>
          <v-btn href="https://www.linkedin.com/in/omar-arias-fern%C3%A1ndez-7a71871b7/" target="_blank" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">mdi-message</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} —
          <strong
            >Curso 22/23 Sistemas de información de gestión y business intelligence<br />
            <v-bottom-sheet v-model="sheet" inset>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="orange" dark v-bind="attrs" v-on="on"
                  >AYUDA
                </v-btn>
              </template>
              <v-sheet class="text-center" height="270px">
                <v-btn class="mt-6" text color="error" @click="sheet = !sheet">
                  Cerrar ventana
                </v-btn>
                <div class="text-left">
                  Para el uso de esta aplicación, se deben introducir los parametros que el usuario 
                  busque en su viaje para que así el programa contraste la base de datos y se ajuste
                  a la busqueda. El requisito obligatorio es la comunidad, tanto para la búsqueda
                  con los demás parámetros como la recomendación aleatoria.<br>
                  En el primer apartado se deberán introducir todos los datos y el programa buscará
                  el que sea mas afín, y en el segundo se elegirán destinos aleatorios.
                </div>
              </v-sheet>
            </v-bottom-sheet>
          </strong>
        </v-card-text>
      </v-card>
    </v-footer>
    </div>
  </v-app>
</template>

<script>
const Swal = require('sweetalert2')
// @ is an alias to /src
import Vue from "vue";
import Vuetify from "vuetify/lib";
import swal from 'sweetalert2';
window.Swal = swal;

Vue.use(Vuetify);

export default {
  data: () => ({
    comunidades: ["Galicia", "Asturias", "Cantabria", "Pais Vasco", "Navarra", "Aragon",
    "Cataluna", "La Rioja", "Castilla y Leon", "Madrid", "Comunidad Valenciana",
    "Castilla La Mancha", "Extremadura", "Murcia", "Andalucia" ],    
    sheet: false,
    //Objeto jugador para almacenar los datos y pasárselos a la base de datos como parámetro
    /*jugador: {
      nombre: '',
      equipo:'',
      salario: '',
      puntos: undefined,
      rebotes: undefined,
      rebotesOfensivos: undefined,
      rebotesDefensivos: undefined,
      robos: undefined,
      perdidas: undefined,
      asistencias: undefined,
      fg: undefined,
    },*/
    sitio: {
      comunidad: '',
      provincia: '',
      costaInterior: '',
      ruralUrbano: '',
      descansoTurismo: '',
      monumentos: '',
      naturaleza: '',
      fiesta:'',
      comida:'',
      queVer:'',
    },
    comunidad: '',
    provincia: '',
    costaInterior: '',
    ruralUrbano: '',
    descansoTurismo: '',
    //items: ['Defensive rebounder', 'Playmaker', 'Offensive rebounder', '3&D', 'Defensive Player', 'All-around player'],
    //top: ['Top 3', 'Top 10', 'Top 15', 'Top 25'],
    comunidadRec:'',
    rules: undefined,
    icon: undefined
  }),
  methods:{
    buscarSitios(){
            //Comprobamos que haya introducido algun valor en todos los parámetros de búsqueda necesarios
            //if(this.sitio.comunidad == '' || this.sitio.provincia == ''){
              if(this.sitio.comunidad == ''){
                //Mensaje de error
                Swal.fire({
                  title: '¡BÚSQUEDA INCOMPLETA!',
                  text: 'Debes introducir al menos la comunidad del sitio que quieres buscar',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                })
            }else{
                //Guardamos en la variable global sitio los valores que nos han introducido por pantalla
                this.$store.state.sitio.comunidad = this.sitio.comunidad,
                this.$store.state.sitio.provincia = this.sitio.provincia,
                this.$store.state.sitio.costaInterior = this.sitio.costaInterior,
                this.$store.state.sitio.ruralUrbano = this.sitio.ruralUrbano,
                this.$store.state.sitio.descansoTurismo = this.sitio.descansoTurismo,
                this.$store.state.sitio.monumentos = this.sitio.monumentos,
                this.$store.state.sitio.naturaleza = this.sitio.naturaleza,
                this.$store.state.sitio.fiesta = this.sitio.fiesta,
                this.$store.state.sitio.comida = this.sitio.comida,
                this.$store.state.sitio.queVer = this.sitio.queVer,
                this.$store.state.comunidadRec=this.comunidadRec,
                console.log("HOLA "+this.$store.state.comunidadRec);

                //Redireccionamos a sitios, allí se hará la consulta
                this.$router.push('/Sitios');
            }
        },
        recomendarSitios(){
            //Comprobamos que haya introducido algun valor en todos los parámetros de búsqueda
            if(this.comunidadRec == '' ){
                //Mensaje de error
                Swal.fire({
                  title: '  ¡BÚSQUEDA INCOMPLETA!',
                  text: 'Debes introducir la comunidad donde buscar los sitios',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                })
            }else{
                //Guardamos el número de jugadores que desea el usuario y el estilo que ha escogido
                /*if(this.numJugadores=='Top 3'){
                  this.numJugadores=3
                }else if(this.numaJugadores=='Top 10'){
                  this.numJugadores=10
                }else if(this.numJugadores=='Top 15'){
                  this.numJugadores=15
                }else{
                  this.numJugadores=25
                }*/
                this.$store.state.comunidadRec=this.comunidadRec;
                //this.$store.state.numJugadores = this.numJugadores
                //this.$store.state.estilo = this.estilo
                //this.$store.state.posicion= this.posicion
                //Redireccionamos a sitiosRec, allí se hará la consulta
                this.$router.push('/SitiosRec');
            }
        }
    }
};
</script>
