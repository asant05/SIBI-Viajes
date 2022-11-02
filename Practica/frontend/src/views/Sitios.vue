<template>
  <v-app>
    <div id="AppBar" position="relative">
      <v-spacer></v-spacer>
      <v-app-bar color="#FADBD8" height="70px" dense dark>
        <div class="d-flex align-center">
          <v-img
            alt="Viajar es VivirA"
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
    <br>
    <div id="botonBuscarSitios" class="text-center" style="float:left">
      <v-btn rounded color="primary" v-on:click= "volverAlInicio()"> VOLVER A LA PÁGINA PRINCIPAL </v-btn>
    </div>
    <br>

    <div>
      <v-data-table :headers="headers" :items="sitios" :items-per-page="15" class="elevation-1"></v-data-table>
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
// @ is an alias to /src
//const Swal = require('sweetalert2')
import Vue from "vue";
import Vuetify from "vuetify/lib";
import swal from 'sweetalert2';
window.Swal = swal;
const axios= require("axios");

Vue.use(Vuetify);

export default {
  data: () => ({
    headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'nombre',
        },
        {
          text: 'Comunidad',
          align: 'start',
          sortable: false,
          value: 'comunidad'
        },
        { text: 'Provincia',
          align: 'start',
          sortable: false,
          value: 'provincia'
        },
        {
          text: 'CostaInterior',
          align: 'start',
          sortable: false,
          value: 'costaInterior'
        },
        {
          text: 'RuralUrbano',
          align: 'start',
          sortable: false,
          value: 'ruralUrbano'
        },
        {
          text: 'DescansoTurismo',
          align: 'start',
          sortable: false,
          value: 'descansoTurismo'
        },
        {
          text: 'Monumentos',
          align: 'start',
          sortable: false,
          value: 'monumentos'
        },
        {
          text: 'Naturaleza',
          align: 'start',
          sortable: false,
          value: 'naturaleza'
        },
        {
          text: 'Fiesta',
          align: 'start',
          sortable: false,
          value: 'fiesta'
        },
        {
          text: 'Comida',
          align: 'start',
          sortable: false,
          value: 'comida'
        },
        {
          text: 'QueVer',
          align: 'start',
          sortable: false,
          value: 'queVer'
        },

    ],
    sitios: [],
    //jugadores:[],
    sheet: false,
    //Objeto sitio para almacenar los datos y pasárselos a la base de datos como parámetro
    sitio: {
      comunidad: undefined,
      provincia: undefined,
      costaInterior: undefined,
      ruralUrbano: undefined,
      descansoTurismo: undefined,
      monumentos: undefined,
      naturaleza: undefined,
      fiesta:undefined,
      comida:undefined,
    },
    comunidades: ["Galicia", "Asturias", "Cantabria", "Pais Vasco", "Navarra", "Aragon",
    "Cataluna", "La Rioja", "Castilla y Leon", "Madrid", "Comunidad Valenciana",
    "Castilla La Mancha", "Extremadura", "Murcia", "Andalucia" ],    
    //items: ['Jugador defensivo', 'Playmaker', 'Jugador ofensivo', '3-And-D'],
    //top: ['Top 3', 'Top 10', 'Top 15'],
    comunidad:'',
    provincia: '',
    costaInterior: '',
    ruralUrbano: '',
    descansoTurismo: '',
    rules: undefined,
    icon: undefined
  }),
    mounted(){
      axios.get('http://localhost:3000/buscandoSitios',{
        params:{
          /*edad: this.$store.state.jugador.edad,
          posicion: this.$store.state.jugador.posicion,
          fg: this.$store.state.jugador.fg,
          threep: this.$store.state.jugador.threep,
          ft: this.$store.state.jugador.ft,
          puntos: this.$store.state.jugador.puntos,
          rebotes: this.$store.state.jugador.rebotes,
          asistencias: this.$store.state.jugador.asistencias,*/

          comunidad: this.$store.state.sitio.comunidad,
          provincia: this.$store.state.sitio.provincia,
          costaInterior: this.$store.state.sitio.costaInterior,
          ruralUrbano: this.$store.state.sitio.ruralUrbano,
          descansoTurismo: this.$store.state.sitio.descansoTurismo,
          monumentos: this.$store.state.sitio.monumentos,
          naturaleza: this.$store.state.sitio.naturaleza,
          fiesta: this.$store.state.sitio.fiesta,
          comida: this.$store.state.sitio.comida,
          queVer: this.$store.state.sitio.queVer,  
        }
      }).then(response=>{
        //AQUI RELLENAMOS EL ARRAY DE JUGADORES PARA QUE LOS MUESTRE EN LA TABLA
        //Cada jugador va a venir acompañado de 16 valores, con lo cual cada 16 i cambiamos de jugador
        
        for (var step = 0; step < response.data.length; step+=5) {
          this.sitios.push({ 
            "nombre": response.data[step],
            "comunidad": response.data[step+1],
            "provincia": response.data[step+2],
            "costaInterior":response.data[step+3],
            "ruralUrbano":response.data[step+4],
            "descansoTurismo":response.data[step+5],
            /*"rebotes":response.data[step+6],
            "rebotesOfensivos":response.data[step+7],
            "rebotesDefensivos":response.data[step+8],
            "robos":response.data[step+9],
            "perdidas":response.data[step+10],
            "asistencias":response.data[step+11],
            "fg":response.data[step+12],
            "ft":response.data[step+13],
            "threep":response.data[step+14],
            "faltas": response.data[step+15]*/
          });
        }
      }).catch((e) => {
              console.log(e.message);
      });
    },
    methods:{
      volverAlInicio(){
        this.$router.push("/");
      },
      resetearSitios(){
        this.sitio.nombre = undefined
        this.sitio.comunidad = undefined
        this.sitio.provincia = undefined
        this.sitio.costaInterior = undefined
        this.sitio.ruralUrbano = undefined
        this.sitio.descansoTurismo = undefined
        this.sitio.monumentos = undefined
        this.sitio.naturaleza = undefined
        this.sitio.fiesta = undefined
        this.sitio.comida = undefined
      }
    }
};
</script>
