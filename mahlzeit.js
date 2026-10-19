const suchbox = document.querySelector("#suchbox")
const linesuch1 = document.querySelector("#linesuch1")
const suchfeld = document.querySelector("#hhh")
const suchbutton = document.querySelector("#suchbutton")
const uberrasch = document.querySelector("#uberrasch")
const untertasten = document.querySelector("#untertasten")
const taste1 = document.querySelector("#taste1")
const taste2 = document.querySelector("#taste2")
const taste3 = document.querySelector("#taste3")
const taste4 = document.querySelector("#taste4")
const taste5 = document.querySelector("#taste5")
const taste6 = document.querySelector("#taste6")
const taste7 = document.querySelector("#taste7")
const kontainer = document.querySelector("#kontainer")
//Startseite -----------------------------------------------------
anfangseite()
taste1.style.backgroundColor = "orange"
function anfangseite() {
    let searchText = ""
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    suchen(url, searchText)
}
//suchfunktion --------------------------------------------------------
suchbutton.addEventListener("click", function () {

    let searchText = suchfeld.value.trim()
    if (searchText == "") {
        kontainer.textContent = "Bitte geben Sie einen Suchbegriff ein."
        const linkZurueck = document.createElement("a")
        linkZurueck.href = "index.html"
        linkZurueck.textContent = "Wieder zu Start Seite"
        taste1.style.backgroundColor = "#dbf7c3"
        kontainer.append(linkZurueck)
    } else {
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        suchen(url, searchText)

    }

})
//überraschung funktion ------------------------------------------------------
uberrasch.addEventListener("click", function () {
    suchrandom()
})
//Alle-button ---------------------------------------------------------------
taste1.addEventListener("click", function () {
    suchfeld.value = ""
    kontainer.replaceChildren()
    taste1.style.backgroundColor = "orange"
    taste2.style.backgroundColor = "#dbf7c3"
    taste3.style.backgroundColor = "#dbf7c3"
    taste4.style.backgroundColor = "#dbf7c3"
    taste5.style.backgroundColor = "#dbf7c3"
    taste6.style.backgroundColor = "#dbf7c3"
    taste7.style.backgroundColor = "#dbf7c3"
    anfangseite()
})
// Beef-button --------------------------------------------------------------
taste2.addEventListener("click", function () {
    let url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef"
    suchen(url, "", "Beef")
    taste1.style.backgroundColor = "#dbf7c3"
    taste3.style.backgroundColor = "#dbf7c3"
    taste4.style.backgroundColor = "#dbf7c3"
    taste5.style.backgroundColor = "#dbf7c3"
    taste6.style.backgroundColor = "#dbf7c3"
    taste7.style.backgroundColor = "#dbf7c3"
    suchfeld.value = ""
    taste2.style.backgroundColor = "orange"
})
//Chicken-button --------------------------------------------------------------
taste3.addEventListener("click", function () {
    let url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken"
    suchen(url, "", "Chicken")
    taste2.style.backgroundColor = "#dbf7c3"
    taste1.style.backgroundColor = "#dbf7c3"
    taste4.style.backgroundColor = "#dbf7c3"
    taste5.style.backgroundColor = "#dbf7c3"
    taste6.style.backgroundColor = "#dbf7c3"
    taste7.style.backgroundColor = "#dbf7c3"
    suchfeld.value = ""
    taste3.style.backgroundColor = "orange"
})
//Dessert-button ------------------------------------------------------------
taste4.addEventListener("click", function () {
    let url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert"
    suchen(url, "", "Dessert")
    taste2.style.backgroundColor = "#dbf7c3"
    taste3.style.backgroundColor = "#dbf7c3"
    taste1.style.backgroundColor = "#dbf7c3"
    taste5.style.backgroundColor = "#dbf7c3"
    taste6.style.backgroundColor = "#dbf7c3"
    taste7.style.backgroundColor = "#dbf7c3"
    suchfeld.value = ""
    taste4.style.backgroundColor = "orange"
})
// Pasta-button    -----------------------------------------------------------
taste5.addEventListener("click", function () {
    let url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta"
    suchen(url, "", "Pasta")
    taste2.style.backgroundColor = "#dbf7c3"
    taste3.style.backgroundColor = "#dbf7c3"
    taste4.style.backgroundColor = "#dbf7c3"
    taste1.style.backgroundColor = "#dbf7c3"
    taste6.style.backgroundColor = "#dbf7c3"
    taste7.style.backgroundColor = "#dbf7c3"
    suchfeld.value = ""
    taste5.style.backgroundColor = "orange"
})
//Seafood-button  ----------------------------------------------------------
taste6.addEventListener("click", function () {
    let url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
    suchen(url, "", "Seafood")
    taste2.style.backgroundColor = "#dbf7c3"
    taste3.style.backgroundColor = "#dbf7c3"
    taste4.style.backgroundColor = "#dbf7c3"
    taste5.style.backgroundColor = "#dbf7c3"
    taste1.style.backgroundColor = "#dbf7c3"
    taste7.style.backgroundColor = "#dbf7c3"
    suchfeld.value = ""
    taste6.style.backgroundColor = "orange"
})
// Vegetarian-button  --------------------------------------------------------
taste7.addEventListener("click", function () {
    let url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian"
    suchen(url, "", "Vegetarian")
    taste2.style.backgroundColor = "#dbf7c3"
    taste3.style.backgroundColor = "#dbf7c3"
    taste4.style.backgroundColor = "#dbf7c3"
    taste5.style.backgroundColor = "#dbf7c3"
    taste6.style.backgroundColor = "#dbf7c3"
    taste1.style.backgroundColor = "#dbf7c3"
    suchfeld.value = ""
    taste7.style.backgroundColor = "orange"
})
// Haupt-funktion --------------------------------------------------------------
function suchen(ur, searchText, kategorie) {
    if (searchText == "") {
        kontainer.textContent = "Bitte gib einen Suchbegriff ein."
    }
    fetch(ur)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Laden der Rezepte.")
            }
            return response.json()
        })
        .then(data => {
            kontainer.replaceChildren()
            if (!data.meals) {
                kontainer.textContent = "Keine Rezepte gefunden."
                const linkZurueck = document.createElement("a")
                linkZurueck.href = "index.html"
                linkZurueck.textContent = "Wieder zu Start Seite"
                taste1.style.backgroundColor = "#dbf7c3"
                kontainer.append(linkZurueck)
                return
            }
            const liste = data.meals.slice(0, 8)
            liste.forEach(meal => {
                const kartee = document.createElement("article")
                kartee.className = "rezeptKarte"

                const gBild = document.createElement("img")
                gBild.src = meal.strMealThumb
                gBild.alt = meal.strMeal
                gBild.className = "rezeptBild"
                const info = document.createElement("div")
                info.className = "rezeptInfo"

                const gStadt = document.createElement("span")
                gStadt.className = "rezeptLand"
                gStadt.textContent = meal.strArea || "Unknown country"

                const gKategorie = document.createElement("span")
                gKategorie.className = "rezeptKategorie"
                gKategorie.textContent = meal.strCategory || kategorie

                const details = document.createElement("div")
                details.className = "rezeptDetails"

                details.append(gStadt, gKategorie)

                const title = document.createElement("h2")
                title.className = "rezeptTitle"
                title.textContent = meal.strMeal

                const link = document.createElement("a")
                let mid = meal.idMeal
                link.className = "rezeptLink"
                link.href = `extra.html?idMeal=${mid}`
                link.textContent = "Rezept Zeigen →"

                info.append(details, title, link)

                kartee.append(gBild, info)

                kontainer.appendChild(kartee)
            })
        })
        .catch(error => {
            console.error(error)
            kontainer.textContent = "Die Rezepte konnten nicht geladen werden."
        })
}
function suchrandom() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Laden der Rezepte.")
            }
            return response.json()
        })
        .then(data => {
            if (!data.meals) {
                kontainer.textContent = "Keine Rezepte gefunden."
                return
            }
            data.meals.forEach(meal => {
                window.location.href = `extra.html?idMeal=${meal.idMeal}`
            })
        })
        .catch(error => {
            console.error(error)
            kontainer.textContent = "Die Rezepte konnten nicht geladen werden."
        })
}
