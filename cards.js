// SETTINGS
let settings = {
    "theme": "dark",
    "search": "https://duckduckgo.com/?t=h_&q=",
    "header": "Home",
}
if (localStorage.getItem("settings") != undefined) {
    settings = JSON.parse(localStorage.getItem("settings"))
}
// SETUP
var themeName = ("theme/" + settings.theme + ".css");
document.getElementById("theme").setAttribute("href", themeName);
var DocCards = document.getElementById("cards");
document.getElementById("header").textContent = settings.header
let cards = [
    { name: "Youtube" , link: "https://youtube.com", icon: "icon/youtube.png"},
    { name: "Github" , link: "https://github.com", icon: "icon/github.png"}
];
var NewButton = document.createElement('figure');
NewButton.innerHTML = `+`
NewButton.id = "AddCard"
DocCards.appendChild(NewButton);
const AddCardButton = document.getElementById("AddCard")
const LoadCards = function() {
    for(card of cards) {
        AddCard(card.name, card.link, card.icon)
    };
}
if (localStorage.getItem("cards") != undefined) {
    cards = JSON.parse(localStorage.getItem("cards"))
}
LoadCards()

// FUNCTIONS
mouseX = 0
mouseY = 0
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });
function search(ele) {
    if(event.key === 'Enter') {
        window.location.href = settings.search + ele.value
    }
}
const DeleteCard = function(name) {
    for(card of cards){
        if (card.name == name) {
            cards.splice(cards.indexOf(card), 1)
            while (DocCards.firstChild != document.querySelector("#AddCard")) {
                DocCards.removeChild(DocCards.firstChild);
            }
            localStorage.setItem("cards", JSON.stringify(cards))
            LoadCards()
        }
    }
}
const DeletePopUp = function() {
    document.querySelector(".popup").remove()
}
const EditIcon = function(name) {
    icon = prompt("Icon Link")
    if (card.name == name) {
        let indexnum = cards.indexOf(card)
        cards[indexnum].icon = icon
        while (DocCards.firstChild != document.querySelector("#AddCard")) {
            DocCards.removeChild(DocCards.firstChild);
        }
        localStorage.setItem("cards", JSON.stringify(cards))
        LoadCards()
    }
}
const SetSettings = function(setting) {
    console.log(setting)
    const newValue = prompt(`New Value for ${setting}`);
    settings[setting] = newValue;
    localStorage.setItem("settings", JSON.stringify(settings))
    window.location.reload()
}
const OpenSettings = function(){
    var PopUp = document.createElement('div')
    PopUp.classList.add("popup")
    PopUp.style.left = '94vw'
    PopUp.style.top = '1vh'
    PopUp.innerHTML = `<ul><li><button onclick="SetSettings('theme')">Theme</button></li><li><button onclick="SetSettings('header')">Home</button></li><li><button onclick="SetSettings('search')">Search URL</button></li><li><button style="color: red;" onclick="localStorage.clear();window.location.reload()">DELETE ALL DATA</button></li></ul>`
    document.body.appendChild(PopUp)
}
const CardConfig = function(name) {
    StringName = "'" + name + "'"
    var PopUp = document.createElement('div')
    PopUp.classList.add("popup")
    PopUp.style.left = mouseX+'px'
    PopUp.style.top = mouseY+'px'
    PopUp.innerHTML = `<ul><li><button onclick="DeleteCard(${StringName});DeletePopUp()">Delete</button></li><li><button onclick="EditIcon(${StringName});DeletePopUp()">Edit Icon</button></li></ul>`
    document.body.appendChild(PopUp)
}
function AddCard(name, link, icon) {
    StringName = "'" + name + "'"
    link = link + ''
    if (icon == "icon" | icon == undefined) {
    icon = "https://icons.duckduckgo.com/ip3/" + link.split("https://")[1] + ".ico"
    }
    var NewCard = document.createElement('figure');
    NewCard.id = name;
    NewCard.innerHTML = `<a href="${link}"></a><figcaption>${name}</figcaption><button onclick="(CardConfig(${(StringName)}))">...</button>`
    NewCard.firstChild.style.backgroundImage = "url(" + icon + ")";
    DocCards.appendChild(NewCard);
    NewCard.parentNode.insertBefore(NewCard, AddCardButton)
};
// ACTIONS
AddCardButton.addEventListener("click", function() {
    var name = prompt("What is the name of the card?")
    var link = prompt("What is the link of the card?")
    if(link.endsWith("/")) {
        link = link.slice(0, -1)
    }
    AddCard(name, link)
    cards.push({ name: name, link: link, icon: "icon" })
    localStorage.setItem("cards", JSON.stringify(cards))
});