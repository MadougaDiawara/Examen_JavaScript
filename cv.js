let cvContent = ''; // Variable pour stocker le contenu du CV

const birthDate = document.getElementById('birthDate').value;
const birthPlace = document.getElementById('birthPlace').value;

// Build CV content
cvContent = `
    <div class="cv-section">
        <h2>Informations Personnelles</h2>
        <p><strong>Nom complet:</strong> ${fullName}</p>
        <p><strong>Date de naissance:</strong> ${birthDate}</p>
        <p><strong>Lieu de naissance:</strong> ${birthPlace}</p>
        <p><strong>Profession:</strong> ${profession}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        <p><strong>Adresse:</strong> ${address}</p>
        <p><strong>Ville:</strong> ${city}</p>
    </div>
`; // Ajouter la date et le lieu de naissance

// Fonction pour ajouter une formation
function addEducation() {
    const educationSection = document.getElementById('education-section');
    const newEntry = document.createElement('div');
    newEntry.classList.add('education-entry');
    newEntry.innerHTML = `
        <label for="degree">Diplôme *</label>
        <input type="text" class="degree" placeholder="Votre diplôme" required>
        <label for="institution">Établissement *</label>
        <input type="text" class="institution" placeholder="Nom de l'établissement" required>
        <label for="eduCity">Ville</label>
        <input type="text" class="eduCity" placeholder="Ville de l'établissement">
        <label for="startDateEdu">Date de début</label>
        <input type="date" class="startDateEdu">
        <label for="endDateEdu">Date de fin (ou en cours)</label>
        <input type="date" class="endDateEdu">
        <label for="eduDescription">Description</label>
        <textarea class="eduDescription" placeholder="Description de la formation"></textarea>
        <button type="button" onclick="removeEducation(this)">Supprimer</button>
    `;
    educationSection.appendChild(newEntry);
}

// Fonction pour supprimer une formation
function removeEducation(button) {
    button.parentElement.remove();
}

// Fonction pour générer le CV
function generateCV() {
    const fullName = document.getElementById('fullName').value;
    const profession = document.getElementById('profession').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;

    // Build CV content
    cvContent = `
        <div class="cv-section">
            <h2>Informations Personnelles</h2>
            <p><strong>Nom complet:</strong> ${fullName}</p>
            <p><strong>Profession:</strong> ${profession}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Téléphone:</strong> ${phone}</p>
            <p><strong>Adresse:</strong> ${address}</p>
            <p><strong>Ville:</strong> ${city}</p>
        </div>
        <div class="cv-section">
            <h2>Formation</h2>
            ${Array.from(document.querySelectorAll('.education-entry')).map(entry => `
                <p><strong>Diplôme:</strong> ${entry.querySelector('.degree').value}</p>
                <p><strong>Établissement:</strong> ${entry.querySelector('.institution').value}</p>
                <p><strong>Ville:</strong> ${entry.querySelector('.eduCity').value}</p>
                <p><strong>Date de début:</strong> ${entry.querySelector('.startDateEdu').value}</p>
                <p><strong>Date de fin:</strong> ${entry.querySelector('.endDateEdu').value}</p>
                <p><strong>Description:</strong> ${entry.querySelector('.eduDescription').value}</p>
            `).join('')}
        </div>
        <div class="cv-section">
            <h2>Expérience Professionnelle</h2>
            ${Array.from(document.querySelectorAll('.experience-entry')).map(entry => `
                <p><strong>Poste:</strong> ${entry.querySelector('.position').value}</p>
                <p><strong>Entreprise:</strong> ${entry.querySelector('.company').value}</p>
                <p><strong>Ville:</strong> ${entry.querySelector('.expCity').value}</p>
                <p><strong>Date de début:</strong> ${entry.querySelector('.startDateExp').value}</p>
                <p><strong>Date de fin:</strong> ${entry.querySelector('.endDateExp').value}</p>
                <p><strong>Description:</strong> ${entry.querySelector('.expDescription').value}</p>
            `).join('')}
        </div>
        <div class="cv-section">
            <h2>Compétences</h2>
            ${Array.from(document.querySelectorAll('.skill-entry')).map(entry => `
                <p><strong>Compétence:</strong> ${entry.querySelector('.skill').value}</p>
                <p><strong>Niveau:</strong> ${entry.querySelector('.skillLevel').value}</p>
            `).join('')}
        </div>
        <div class="cv-section">
            <h2>Langues</h2>
            ${Array.from(document.querySelectorAll('.language-entry')).map(entry => `
                <p><strong>Langue:</strong> ${entry.querySelector('.language').value}</p>
                <p><strong>Niveau:</strong> ${entry.querySelector('.languageLevel').value}</p>
            `).join('')}
        </div>
        <div class="cv-section">
            <h2>Centres d'intérêt</h2>
            ${Array.from(document.querySelectorAll('.interest-entry')).map(entry => `
                <p>${entry.querySelector('.interest').value}</p>
            `).join('')}
        </div>
    `;

    document.getElementById('cv-output').innerHTML = cvContent;

    // Afficher les boutons de téléchargement et de suppression après génération
    document.getElementById('download-btn').style.display = 'block';
    document.getElementById('download-word-btn').style.display = 'block'; // Afficher le bouton Word
    document.getElementById('delete-btn').style.display = 'block';
}

// Fonction pour télécharger le CV en PDF
async function downloadCV() {
    if (!cvContent) {
        alert("Aucun contenu à télécharger."); // Vérification du contenu
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Convertir le contenu HTML du CV stocké dans la variable
    const element = document.createElement('div');
    element.innerHTML = cvContent;

    // Convertir le contenu HTML en PDF
    await doc.html(element, {
        callback: function (doc) {
            doc.save('CV.pdf'); // Nom du fichier téléchargé
        },
        x: 10,
        y: 10
    });
}

// Fonction pour supprimer le CV
function deleteCV() {
    // Réinitialiser les champs de saisie
    document.getElementById('fullName').value = '';
    document.getElementById('profession').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('city').value = '';
    document.getElementById('profilePhoto').value = '';

    // Vider le contenu du CV
    document.getElementById('cv-output').innerHTML = '';

    // Masquer les boutons de téléchargement et de suppression
    document.getElementById('download-btn').style.display = 'none';
    document.getElementById('download-word-btn').style.display = 'none'; // Masquer le bouton Word
    document.getElementById('delete-btn').style.display = 'none';

    // Réinitialiser le contenu du CV
    cvContent = '';
}
// Fonction pour télécharger le CV en format Word
function downloadCVWord() {
    const header = '<html xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"/></head><body>';
    const footer = '</body></html>';
    const content = header + cvContent + footer;

    const blob = new Blob([content], {
        type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CV.doc'; // Nom du fichier téléchargé
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
