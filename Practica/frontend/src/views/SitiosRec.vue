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
    <div style="background-color: #ffffff">
      <div text-align="center" style="margin-left: 50px; margin-right: 50px">
        <br />
        Bienvenido a Viajar es vivir, aqui podemos ver las opciones aleatorias de sitios de la comunidad:
        <br />
        <strong>{{this.$store.state.comunidadRec}}</strong>
        <br />
        <br />
      </div>
    </div>
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
          <v-btn href="mailto:asantf05@estudiantes.unileon.es?Subject=Dudas%20sobre%20ViajarEsVivir" target="_blank" :key="icon" class="mx-4" dark icon>
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
    sheet: false,
    //Objeto sitio para almacenar los datos y pasárselos a la base de datos como parámetro
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
    },
    comunidades: ["Galicia", "Asturias", "Cantabria", "Pais Vasco", "Navarra", "Aragon",
    "Cataluna", "La Rioja", "Castilla y Leon", "Madrid", "Comunidad Valenciana",
    "Castilla La Mancha", "Extremadura", "Murcia", "Andalucia" ],    
    comunidadRec:'',
    orden: '',
    rules: undefined,
    icon: undefined
  }),
    mounted(){
      axios.get('http://localhost:3000/recomendandoSitios',{
        params:{
          comunidadRec: this.$store.state.comunidadRec,
          orden: this.$store.state.orden,
        }
      }).then(response=>{
        //AQUI RELLENAMOS EL ARRAY DE SITIOS PARA QUE LOS MUESTRE EN LA TABLA
        //Cada sitio va a venir acompañado de 10 valores, con lo cual cada 10 i cambiamos de sitio
        
        for (var step = 0; step < response.data.length; step+=10) {
          this.sitios.push({ 
            "nombre": response.data[step],
            "provincia": response.data[step+1],
            "costaInterior":response.data[step+2],
            "ruralUrbano":response.data[step+3],
            "descansoTurismo":response.data[step+4],
            "monumentos":response.data[step+5],
            "naturaleza":response.data[step+6],
            "fiesta":response.data[step+7],
            "comida":response.data[step+8],
            "queVer":response.data[step+9]
          });
        }
      }).catch((e) => {
              console.log(e.message);
      });
    },
    methods:{
      volverAlInicio(){
        this.$router.push("/");
      }
    }
};
</script>
