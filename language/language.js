const languages = [];
const langSave = "CVMaheutLang";
let lang = localStorage.getItem(langSave);
if (lang == null) lang = "fr";

/**
 * initialize languages param with a fetch request (get all languages in the DB)
 * @param {*} names
 */
async function initLanguage(names) {
  let result;
  for (let i = 0; i < names.length; i++) {
    const reponse = await fetch(
      `https://maheutnicolas.github.io/CV/language/files/${names[i]}.json`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
}
    );
    result = await reponse.json();
    languages.push(result);
  }
  changeLanguage(lang);
  placeButton();
}

function placeButton() {
  let button = document.getElementById("tL");
  button.innerHTML = languages[findLanguage(lang)].icon;
  button.addEventListener("click", () => {
    document.getElementById("language_menu").classList.toggle("disable");
  });

  let menu = document.getElementById("language_menu");
  for (let i = 0; i < languages.length; i++) {
    let component = document.createElement("div");
    component.id = languages[i].name;
    component.innerHTML = languages[i].icon;
    component.className = "language_button";
    component.addEventListener("click", (event) => {
      let id = event.target.id;
      document.getElementById("tL").innerHTML =
        languages[findLanguage(id)].icon;
      changeLanguage(id);
      document.getElementById("language_menu").classList.toggle("disable");
    });
    menu.appendChild(component);
  }
}

function changeLanguage(name) {
  lang = name;
  localStorage.setItem(langSave, lang);
  pos = findLanguage(name);
  if (pos == null) return;

  // replace all numeroted language sign (t*)
  let count = 0;
  while (true) {
    let array = document.getElementsByClassName(`t${count}`);
    if (array.length == 0) {
      break;
    }
    for (let i = 0; i < array.length; i++) {
      array[i].innerHTML = languages[pos].text[count];
    }
    count++;
  }

  // replace all t in order ( after name one, count continue is use )
  let languageElements = document.getElementsByClassName(`t`);
  for (let i = 0; i < languageElements.length; i++) {
    languageElements[i].innerHTML = languages[pos].text[count];
    count++;
  }
}

function findLanguage(name) {
  for (let i = 0; i < languages.length; i++) {
    if (languages[i].name == name) return i;
  }
  return null;
}

initLanguage(["fr", "eng"]);
