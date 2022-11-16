<template>
    <v-app >
        <div background="@/assets/fondo.jpg">
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
      <div  align="center">
        <div text-align="center" style="margin-left: 50px; margin-right: 50px">
          <br />
          Bienvenido a Viajar es vivir, la aplicación en la cual podrás buscar
          tu destino ideal para aquellos días libres en los que quieras 
          escaparte.
          <br />
          <img  src="@/assets/logo.png" width="500" height="400"> 
          <br />
          <br />
          <!-- Boton para comenzar la búsqueda -->
            <v-btn v-on:click= "irHome()" rounded color="primary" dark >IR A LA APLICACION</v-btn>
          </div>
        </div>  
    </div>
    </v-app>
</template>
  

  <script >
// @ is an alias to /src
import Vue from "vue";
import Vuetify from "vuetify/lib";
import swal from 'sweetalert2';
window.Swal = swal;

Vue.use(Vuetify);

export default {
  data: () => ({
  }),
  methods:{
    irHome(){
      //Comprobamos que haya introducido algun valor en todos los parámetros de búsqueda
        this.$router.push('/Home');
    },
  }
};
</script>
