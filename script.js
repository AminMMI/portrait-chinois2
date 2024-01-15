document.addEventListener("DOMContentLoaded", function () {
// on récupère le fichier html où nos analogies seront affichés
  fetch('analogie.html')
//on utilise le .then afin d'extraire le texte de la réponse
.then(response => response.text())
.then(analogie => {
  //on récupère le fichier json qui contient toutes les informations a afficher 
  fetch('data.json')
  // on utilise response.json pour extraire les informations du json
  .then(response => response.json())
  .then(data =>{
    // on créait la variable htmlanalogie pour contenir notre code html
    let htmlanalogie = '';
    
    //création de la fonction afficheAnalogie qui prend resultat en entrée
    data.forEach(function afficheAnalogie(resultat) {
      // création de la const section HTML avec la valeur analogie, elle contiendra le texte de analogie.html
      const sectionHTML = analogie
      // on va remplacer toutes les valeurs entre deux accolades par le valeur contenu dans le fichier json
      .replace('{{analogie}}',resultat.analogie)
      .replace('{{ValeurAnalogie}}',resultat.ValeurAnalogie)
      .replace('{{raison}}',resultat.raison)
      .replace('{{class}}',resultat.class)
      .replace('{{image}}',resultat.img)
      .replace('{{id}}',resultat.id);

      htmlanalogie += sectionHTML;
  })
  document.querySelector('.liste-analogies').innerHTML = htmlanalogie;


})
})







});










//   fetch('script/data.json').then(function (response) {
//     response.json().then(function (data) {
//       data.forEach(function afficheAnalogie(resultat) {
//         document.querySelector('.liste-analogies').innerHTML += "<div class=\""+resultat.class+"\" id=\""+resultat.id+"\"><h1>Si j’étais " + resultat.analogie + "</h1>" + "<h2>Je serais " + resultat.ValeurAnalogie + "</h2>" + "<p>" + resultat.raison + "</p>" + "<img src=\""+resultat.img+"\">" + "<div>";
//       })
//     })
//   });



// let togg1 = document.getElementById("togg1");
// let togg2 = document.getElementById("togg2");
// let d1 = document.getElementById("analogie1");
// let d2 = document.getElementById("analogie2");
// togg1.addEventListener("click", () => {
//   if(getComputedStyle(d1).visibility != "hidden"){
//     d1.style.visibility = "hidden";
//   } else {
//     d1.style.visibility = "visible";
//   }
// })

// function togg(){
//   if(getComputedStyle(d2).visibility != "hidden"){
//     d2.style.visibility = "visible";
//   } else {
//     d2.style.visibility = "hidden";
//   }
// };
// togg2.onclick = togg;

