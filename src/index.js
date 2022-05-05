// import * as d3 from 'd3';
// import { json, svg, csv } from 'd3';

// Quelques fonctions utilitaires
function domForEach(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}
function domOn(selector, event, callback, options) {
  document.querySelectorAll(selector).forEach(element => element.addEventListener(event, callback, options));
}

//import dataBrutes from '../data/Projet_data.csv'

import responsivefy from './responsive';
import dataBrutes from '../data/data.json'
import propositions from '../data/dataPropositions.json'


// Tri des données dans les tableaux
// 1 tableau par type de données
const tabMotivation = dataBrutes.map(dataBrutes => dataBrutes["motivation"]);
const tabPays = dataBrutes.map(dataBrutes => dataBrutes["pays"]);
const tabTime = dataBrutes.map(dataBrutes => dataBrutes["time"]);
const tabSaison = dataBrutes.map(dataBrutes => dataBrutes["saison"]);
const tabPeople = dataBrutes.map(dataBrutes => dataBrutes["people"]);
const tabLogement = dataBrutes.map(dataBrutes => dataBrutes["logement"]);
const tabTheme = dataBrutes.map(dataBrutes => dataBrutes["theme"]);





const count = (array, question) => {

  for (const i of array) {
    // faire correspondre propostions et le i en itérant sur les deux (le i et les propositions)
  }








}

// Fonction de comptage des données
// Connaître la proportion des données dans chaque tableaux envoyés
function rendCount(array) {

  const compteur = {};

  for (const i of array) {


    if (compteur[i]) {
      compteur[i] += 1;
    } else {
      compteur[i] = 1;
    }
  }
  return compteur;

}



const motivation = rendCount(tabMotivation);
const pays = rendCount(tabPays);
// const time = rendCount(tabTime);
// const saison = rendCount(tabSaison);
// const people = rendCount(tabPeople);
// const logement = rendCount(tabLogement);
// const theme = rendCount(tabTheme);

// console.log(logement);
// console.log(logement["Hôtel"]);
console.log(motivation);




//const tabTest = [{word: , size:}];
for (const [key, value] of Object.entries(motivation)) {
  //console.log(`${key}: ${value}`);
  //tabTest = [{word: key, size: value}];
}


//console.log(tabTest);
const test2 = Object.entries(motivation)
console.log(test2);




// List of words
//var myWords = [{word: "Running", size: "10"}, {word: "Surfing", size: "20"}, {word: "Climbing", size: "50"}, {word: "Kiting", size: "30"}, {word: "Sailing", size: "20"}, {word: "Snowboarding", size: "60"} ]
//var myWords = [{word: "Volonté de découvrir le monde et soif d'apprentissage", size: "10"}, {word: "S'évader du quotidien fatiguant et penser à autre chose", size: "20"}, {word: "Voyage de rêve en tête et volonté de le réaliser", size: "50"}, {word: "Habitude de voyager régulièrement", size: "30"} ]

// set the dimensions and margins of the graph
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
  width = 1800 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz1").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  // appelle une fonction dans le file reponsive.js
  .call(responsivefy) // rend la visualisation responsive
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here
var layout = d3.layout.cloud()
  .size([width, height])
  // une des phrases n'a qu'1 vote, je l'aggrandis juste pour qu'elle soit lisible
  .words(test2.map(function (d) { if (d[1] == 1) { return { text: d[0], size: d[1] * 20 } } return { text: d[0], size: d[1] * 3.5 }; }))
  .padding(10)        //space between words
  .rotate(function () { return 0; })
  .fontSize(function (d) { return d.size })    // font size of words
  // pour pas que l'emplacement change au refresh, on met o.5 ou 1
  .random(function(d) { return 0.5; })
  .on("end", draw);
layout.start();




// This function takes the output of 'layout' above and draw the words
// Wordcloud features that are THE SAME from one word to the other can be here
function draw(words) {
  console.log(words);
  svg
    .append("g")
    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    // .attr("x", function (d) { return d.size; })
    // .attr("y", function (d) { return d.size; })
    .attr("class", function (d) { return `motivation${d.size}` })
    .style("font-size", function (d) { return d.size; })
    .style("fill", "green")
    .attr("text-anchor", "middle")
    .style("font-family", "Titillium Web")
    .style("font-weight", "bold")
  
    .attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function (d) { return d.text; });
}


// Mettre en lumière une proposition quand on passe la souris 
domOn('.motivation73', 'mouseover', () => {
  d3.select('.motivation35').style("fill-opacity", "0.5")
  d3.select('.motivation20').style("fill-opacity", "0.5")
})

domOn('.motivation73', 'mouseout', () => {
  d3.select('.motivation35').style("fill-opacity", "1")
  d3.select('.motivation20').style("fill-opacity", "1")
})

domOn('.motivation35', 'mouseover', () => {
  d3.select('.motivation73').style("fill-opacity", "0.5")
  d3.select('.motivation20').style("fill-opacity", "0.5")
})

domOn('.motivation35', 'mouseout', () => {
  // d3.select('.motivation73').style("fill", "green")
  d3.select('.motivation73').style("fill-opacity", "1")
  d3.select('.motivation20').style("fill-opacity", "1")
})

domOn('.motivation20', 'mouseover', () => {
  d3.select('.motivation35').style("fill-opacity", "0.5")
  d3.select('.motivation73').style("fill-opacity", "0.5")
})

domOn('.motivation20', 'mouseout', () => {
  //d3.select('.motivation73').style("fill", "green")
  d3.select('.motivation35').style("fill-opacity", "1")
  d3.select('.motivation73').style("fill-opacity", "1")
})

