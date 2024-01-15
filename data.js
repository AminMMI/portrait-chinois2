document.addEventListener("DOMContentLoaded", function () {
  // On sélectionne les éléments du formulaire par leur ID 
  const analogieInput = document.getElementById('analogie');
  const valeurAnalogieInput = document.getElementById('valeurAnalogie');
  const raisonInput = document.getElementById('raison');
  const imageInput = document.getElementById('image');
  const emailInput = document.getElementById('email');
  const formBtn = document.getElementById('btn-form');
  const formMessage = document.getElementById('formMessage');

  formBtn.addEventListener('click', (event) => {
      // On récupère les valeurs des champs du formulaire
      const analogie = analogieInput.value;
      const valeurAnalogie = valeurAnalogieInput.value;
      const raison = raisonInput.value;
      const image = imageInput.value;
      const email = emailInput.value;

      let errorMessage = ''; 
      if (!email) {
          errorMessage += 'Le champ "Adresse e-mail" est requis.\n';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          errorMessage += 'Veuillez fournir une adresse e-mail valide.\n';
      }
      if (!analogie) {
          errorMessage += 'Le champ "Nom de l\'analogie" est requis.\n';
      }
      if (!valeurAnalogie) {
          errorMessage += 'Le champ "Valeur de l\'analogie" est requis.\n';
      }
      if (!raison) {
          errorMessage += 'Le champ "Explication" est requis.\n';
      }
      if (!image) {
          errorMessage += 'Le champ "Lien de l\'image" est requis.\n';
      } else if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(image)) {
          errorMessage += 'Veuillez fournir un lien d\'image valide (URL se terminant par .jpg, .gif, ou .png).\n';
      }

      // S'il y a des erreurs, empêchez l'envoi du formulaire et affichez l'alerte
      if (errorMessage !== '') {
          event.preventDefault();
          formMessage.innerHTML = ' <i class="icon iconoir-xmark"></i><p>' + errorMessage.replace(/\n/g, '<br>') + '</p>';
          formMessage.classList.add("error");
      } else {
          // On créait un objet avec les données du formulaire
          const inputData = {
              analogie: analogie,
              valeurAnalogie: valeurAnalogie,
              raison: raison,
              image: image,
              email: email
          };

          // On appelle une fonction pour traiter les données du formulaire et créer la section
          traiterFormulaire(inputData);

          // Affichage du msg en cas de succès
          formMessage.innerHTML = ' <i class="icon iconoir-check"></i><p>Le formulaire a été soumis avec succès !</p>';
          formMessage.classList.add("success");

          // Envoyez la requête vers le serveur ici
          let url = 'http://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=benazzouz&courriel=' + email + '&message=Si j\'étais ' + analogie + ' je serais ' + valeurAnalogie + ' car ' + raison + ' image:' + image;
          console.log(url);

          fetch(url).then(function(response) {
              response.json().then(function(data) {
                  console.log("Réponse reçue : ");
                  console.log(data);
              })
        });
      }
  });

  // Fonction pour traiter les données du formulaire et créer la section
  function traiterFormulaire(data) {
      // Effectuez le code pour récupérer le contenu de analogie.html
      fetch('analogie.html')
          .then(response => response.text())
          .then(analogie => {
              // Initialisez une variable htmlanalogie qui contiendra le code extrait de analogie.html
              let htmlanalogie = '';

              // Utilisez les données du formulaire pour créer la section
              const sectionHTML = analogie
                  .replace('{{id}}', "user-analogie")
                  .replace('{{analogie}}', data.analogie)
                  .replace('{{ValeurAnalogie}}', data.valeurAnalogie)
                  .replace('{{image}}', data.image)
                  .replace('{{raison}}', data.raison)
                  .replace('{{numéro}}', '08');

              // Ajoutez la nouvelle chaîne à la variable htmlanalogie
              htmlanalogie += sectionHTML;

              // Ajoutez le contenu du template modifié au document dans la div qui a la classe .liste-analogies
              document.querySelector('.analogie-formulaire').innerHTML = htmlanalogie;
          });
  }
});