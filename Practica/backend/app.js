const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
const port = 3000;
const ruta = "http://localhost:3000"
var cors = require("cors");
const neo4j = require("neo4j-driver");
const driver = neo4j.driver( "neo4j://localhost:7687", neo4j.auth.basic("neo4j", "viajes"));

//const driver = neo4j.driver( "bolt://localhost:7687", neo4j.auth.basic("neo4j", "viajes"));
//const session = driver.session();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/buscandoSitios", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query="MATCH (s:Sitios), (c:comunidad  {nombre: '"+req.query.comunidad+"'}),"+
    " (i:costaInterior), (r:ruralUrbano), (d:descansoTurismo) WHERE (s)-[:PERTENECE_A]->(c) ";
  if(req.query.costaInterior!=''){
    query+= "AND (s)-[:ES_COSTA_O_INTERIOR]->(i {nombre: '"+req.query.costaInterior+"'})"
  }else{
    query+= "AND (s)-[:ES_COSTA_O_INTERIOR]->(i)"
  }
  if(req.query.ruralUrbano!=''){
    query+= "AND (s)-[:ES_RURAL_O_URBANO]->(r {nombre: '"+req.query.ruralUrbano+"'})"
  }else{
    query+= "AND (s)-[:ES_RURAL_O_URBANO]->(r)"
  }
  if(req.query.descansoTurismo!=''){
    query+= "AND (s)-[:ES_DESCANSO_O_TURISMO]->(d {nombre: '"+req.query.descansoTurismo+"'})"
  }else{
    query+= "AND (s)-[:ES_DESCANSO_O_TURISMO]->(d)"
  }
  if(req.query.monumentos!=''){
    query+= " AND s.monumentos>"+req.query.monumentos+""
  }
  if(req.query.naturaleza!=''){
    query+= " AND s.naturaleza>"+req.query.naturaleza+""
  }
  if(req.query.fiesta!=''){
    query+= " AND s.fiesta>"+req.query.fiesta+""
  }
  if(req.query.comida!=''){
    query+= " AND s.comida>"+req.query.comida+""
  }
  query+=" RETURN s.nombre, s.provincia, i.nombre, r.nombre, d.nombre, s.monumentos, s.naturaleza, s.fiesta, s.comida, s.queVer "

  var lista=[]
  const consultaFiltro= driver.session();
  consultaFiltro.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
        lista.push(result.get(1));
        lista.push(result.get(2));
        lista.push(result.get(3));
        lista.push(result.get(4));
        lista.push(result.get(5).low);
        lista.push(result.get(6).low);
        lista.push(result.get(7).low);
        lista.push(result.get(8).low);
        lista.push(result.get(9));
    },
    onCompleted: function() {
      res.send(lista);
      consultaFiltro.close();
    },
    onError: function(error) {
      console.log(error);
    }
  });
});


app.get("/recomendandoSitios", function(req, res) {
  ordenarPor='';
  if(req.query.orden == "Nombre Sitio"){
    ordenarPor="s.nombre";
  }else if(req.query.orden == "Provincia"){
    ordenarPor="s.provincia";
  }else if(req.query.orden == "Costa o Interior"){
    ordenarPor="i.nombre";
  }else if(req.query.orden == "Rural o Urbano"){
    ordenarPor="r.nombre";
  }else if(req.query.orden == "Descanso o Turismo"){
    ordenarPor="d.nombre";
  }else if(req.query.orden == "Monumentos"){
    ordenarPor="s.monumentos DESC";
  }else if(req.query.orden == "Naturaleza"){
    ordenarPor="s.naturaleza DESC";
  }else if(req.query.orden == "Fiesta"){
    ordenarPor="s.fiesta DESC";
  }else if(req.query.orden == "Comida"){
    ordenarPor="s.comida DESC";
  }
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query="MATCH (s:Sitios), (c:comunidad  {nombre: '"+req.query.comunidadRec+"'}),"+
    " (i:costaInterior), (r:ruralUrbano), (d:descansoTurismo) WHERE (s)-[:PERTENECE_A]->(c) ";
  query+= "AND (s)-[:ES_COSTA_O_INTERIOR]->(i)"  
  query+= "AND (s)-[:ES_RURAL_O_URBANO]->(r)"
  query+= "AND (s)-[:ES_DESCANSO_O_TURISMO]->(d)"
  query+=" RETURN s.nombre, s.provincia, i.nombre, r.nombre, d.nombre, s.monumentos, s.naturaleza, s.fiesta, s.comida, s.queVer ORDER BY "+ordenarPor+" ";

  var lista=[]
  const consultaFiltro= driver.session();
  consultaFiltro.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
        lista.push(result.get(1));
        lista.push(result.get(2));
        lista.push(result.get(3));
        lista.push(result.get(4));
        lista.push(result.get(5).low);
        lista.push(result.get(6).low);
        lista.push(result.get(7).low);
        lista.push(result.get(8).low);
        lista.push(result.get(9));
    },
    onCompleted: function() {
      res.send(lista);
      consultaFiltro.close();
    },
    onError: function(error) {
      console.log(error);
    }
  });
});


//FUNCION PARA DEVOLVER LA MEDIA DE FIESTA DE LOS SITIOS
app.get("/avgFiesta", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query = "MATCH (s:Sitios) return avg(s.fiesta)"
  var lista=[]
  const consultaFiesta = driver.session();
  consultaFiesta.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
    },
    onCompleted: function() {
      consultaFiesta.close();
      res.send(lista);
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA OBTENER SITIOS CON FIESTAS
app.get("/busquedaFestividad", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query="MATCH (s:Sitios), (c:comunidad),(i:costaInterior), (r:ruralUrbano),"+
      "(d:descansoTurismo) WHERE (s)-[:PERTENECE_A]->(c) ";
  query+= "AND (s)-[:ES_COSTA_O_INTERIOR]->(i)"  
  query+= "AND (s)-[:ES_RURAL_O_URBANO]->(r)"
  query+= "AND (s)-[:ES_DESCANSO_O_TURISMO]->(d)"
  query+= " AND s.fiesta>"+req.query.avgFiesta+""
  query+=" RETURN s.nombre, s.provincia, i.nombre, r.nombre, d.nombre, s.monumentos, s.naturaleza, s.fiesta, s.comida, s.queVer ORDER BY s.fiesta DESC ";
  var lista=[]
  const consultaFiesta = driver.session();
  consultaFiesta.run(query).subscribe({
    onNext: function(result) {
      lista.push(result.get(0));
      lista.push(result.get(1));
      lista.push(result.get(2));
      lista.push(result.get(3));
      lista.push(result.get(4));
      lista.push(result.get(5).low);
      lista.push(result.get(6).low);
      lista.push(result.get(7).low);
      lista.push(result.get(8).low);
      lista.push(result.get(9));
    },
    onCompleted: function() {
      consultaFiesta.close();
      res.send(lista);
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA DEVOLVER LA MEDIA DE NATURALEZA DE LOS SITIOS
app.get("/avgNaturaleza", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query = "MATCH (s:Sitios) return avg(s.naturaleza)"
  var lista=[]
  const consultaNaturaleza = driver.session();
  consultaNaturaleza.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
    },
    onCompleted: function() {
      consultaNaturaleza.close();
      res.send(lista);
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA OBTENER SITIOS CON DESCONEXION: mayor valor de naturaleza de la media, que sea descanso y rural
app.get("/busquedaNaturaleza", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query="MATCH (s:Sitios), (c:comunidad),(i:costaInterior), (r:ruralUrbano),"+
      "(d:descansoTurismo) WHERE (s)-[:PERTENECE_A]->(c) ";
  query+= "AND (s)-[:ES_COSTA_O_INTERIOR]->(i)"  
  query+= "AND (s)-[:ES_RURAL_O_URBANO]->(r {nombre: 'Rural'})"
  query+= "AND (s)-[:ES_DESCANSO_O_TURISMO]->(d {nombre: 'Descanso'})"
  query+= " AND s.naturaleza>"+req.query.avgNaturaleza+""
  query+=" RETURN s.nombre, s.provincia, i.nombre, r.nombre, d.nombre, s.monumentos, s.naturaleza, s.fiesta, s.comida, s.queVer ORDER BY s.naturaleza DESC ";
  var lista=[]
  const consultaNaturaleza = driver.session();
  consultaNaturaleza.run(query).subscribe({
    onNext: function(result) {
      lista.push(result.get(0));
      lista.push(result.get(1));
      lista.push(result.get(2));
      lista.push(result.get(3));
      lista.push(result.get(4));
      lista.push(result.get(5).low);
      lista.push(result.get(6).low);
      lista.push(result.get(7).low);
      lista.push(result.get(8).low);
      lista.push(result.get(9));
    },
    onCompleted: function() {
      consultaNaturaleza.close();
      res.send(lista);
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA OBTENER SITIOS CON PLAYA: valor de costa, ordenado por naturaleza
app.get("/busquedaPlaya", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query="MATCH (s:Sitios), (c:comunidad),(i:costaInterior), (r:ruralUrbano),"+
      "(d:descansoTurismo) WHERE (s)-[:PERTENECE_A]->(c) ";
  query+= "AND (s)-[:ES_COSTA_O_INTERIOR]->(i {nombre: 'Costa'})"  
  query+= "AND (s)-[:ES_RURAL_O_URBANO]->(r)"
  query+= "AND (s)-[:ES_DESCANSO_O_TURISMO]->(d)"
  query+=" RETURN s.nombre, s.provincia, i.nombre, r.nombre, d.nombre, s.monumentos, s.naturaleza, s.fiesta, s.comida, s.queVer ORDER BY s.naturaleza DESC ";
  var lista=[]
  const consultaPlaya = driver.session();
  consultaPlaya.run(query).subscribe({
    onNext: function(result) {
      lista.push(result.get(0));
      lista.push(result.get(1));
      lista.push(result.get(2));
      lista.push(result.get(3));
      lista.push(result.get(4));
      lista.push(result.get(5).low);
      lista.push(result.get(6).low);
      lista.push(result.get(7).low);
      lista.push(result.get(8).low);
      lista.push(result.get(9));
    },
    onCompleted: function() {
      consultaPlaya.close();
      res.send(lista);
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA DEVOLVER LA MEDIA DE MONUMENTOS DE LOS SITIOS
app.get("/avgMonumento", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query = "MATCH (s:Sitios) return avg(s.monumentos)"
  var lista=[]
  const consultaMonumentos = driver.session();
  consultaMonumentos.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
    },
    onCompleted: function() {
      consultaMonumentos.close();
      res.send(lista);
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

//FUNCION PARA OBTENER SITIOS CON CULTURAL: mayor valor de monumentos de la media, que sea turismo
app.get("/busquedaCultural", function(req, res) {
  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query="MATCH (s:Sitios), (c:comunidad),(i:costaInterior), (r:ruralUrbano),"+
      "(d:descansoTurismo) WHERE (s)-[:PERTENECE_A]->(c) ";
  query+= "AND (s)-[:ES_COSTA_O_INTERIOR]->(i)"  
  query+= "AND (s)-[:ES_RURAL_O_URBANO]->(r)"
  query+= "AND (s)-[:ES_DESCANSO_O_TURISMO]->(d {nombre: 'Turismo'})"
  query+= " AND s.monumentos>"+req.query.avgMonumento+""
  query+=" RETURN s.nombre, s.provincia, i.nombre, r.nombre, d.nombre, s.monumentos, s.naturaleza, s.fiesta, s.comida, s.queVer ORDER BY s.monumentos DESC ";
  var lista=[]
  const consultaCultura = driver.session();
  consultaCultura.run(query).subscribe({
    onNext: function(result) {
      lista.push(result.get(0));
      lista.push(result.get(1));
      lista.push(result.get(2));
      lista.push(result.get(3));
      lista.push(result.get(4));
      lista.push(result.get(5).low);
      lista.push(result.get(6).low);
      lista.push(result.get(7).low);
      lista.push(result.get(8).low);
      lista.push(result.get(9));
    },
    onCompleted: function() {
      consultaCultura.close();
      res.send(lista);
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

app.get("/buscandoSitiosRango", function(req, res) {
  rangos: ["Entre 16 y 24 años", "Entre 24 y 32 años", "Entre 32 y 40 años", "Entre 40 y 55 años", "Mas de 55 años"],

  ordenarPor='';
  if(req.query.rangoedad == "Entre 16 y 24 años"){
    ordenarPor="s.modeloA";
  }else if(req.query.rangoedad == "Entre 24 y 32 años"){
    ordenarPor="s.modeloB";
  }else if(req.query.rangoedad == "Entre 32 y 40 años"){
    ordenarPor="s.modeloC";
  }else if(req.query.rangoedad == "Entre 40 y 55 años"){
    ordenarPor="s.modeloD";
  }else if(req.query.orden == "Mas de 55 años"){
    ordenarPor="s.modeloE";
  }

  //AQUI HACEMOS LA CONSULTA A LA BASE DE DATOS
  query="MATCH (s:Sitios), (c:comunidad ),(i:costaInterior), (r:ruralUrbano), (d:descansoTurismo) WHERE (s)-[:PERTENECE_A]->(c) ";
  query+= "AND (s)-[:ES_COSTA_O_INTERIOR]->(i)"  
  query+= "AND (s)-[:ES_RURAL_O_URBANO]->(r)"
  query+= "AND (s)-[:ES_DESCANSO_O_TURISMO]->(d)"
  query+=" RETURN s.nombre, s.provincia, i.nombre, r.nombre, d.nombre, s.monumentos, s.naturaleza, s.fiesta, s.comida, s.queVer ORDER BY "+ordenarPor+" DESC";

  var lista=[]
  const consultaFiltro= driver.session();
  consultaFiltro.run(query).subscribe({
    onNext: function(result) {
        lista.push(result.get(0));
        lista.push(result.get(1));
        lista.push(result.get(2));
        lista.push(result.get(3));
        lista.push(result.get(4));
        lista.push(result.get(5).low);
        lista.push(result.get(6).low);
        lista.push(result.get(7).low);
        lista.push(result.get(8).low);
        lista.push(result.get(9));
    },
    onCompleted: function() {
      res.send(lista);
      consultaFiltro.close();
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

app.listen(port, function() {
  console.log("App funcionando");
});
