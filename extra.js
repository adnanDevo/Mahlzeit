const ganzBox = document.querySelector("#ganzBox")
const gerichtBild = document.querySelector("#gerichtBild")
const info = document.querySelector("#statdkategori")
const title = document.querySelector("#title")
const tasten = document.querySelector("#tasten")
const zutaten = document.querySelector("#zutaten")
const zubereitung = document.querySelector("#zubereitung")
const kontainer2 = document.querySelector("#inhalt")
const urlParams = new URLSearchParams(window.location.search);
const artikelid = urlParams.get("idMeal");
gerichtZeigen()
function gerichtZeigen() {
    let ur = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${artikelid}`
    gerichtinfo(ur)
}
function gerichtinfo(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Laden der Rezepte.")
            }
            return response.json()
        })
        .then(data => {
            kontainer2.replaceChildren()
            if (!data.meals) {
                kontainer2.textContent = "Keine Rezepte gefunden. Bitte versuchen Sie ein anderer Name"
                return
            }
            data.meals.forEach(ele => {
                const linkzurueck = document.createElement("a")
                linkzurueck.className = "zurueck"
                linkzurueck.href = "index.html"
                linkzurueck.textContent = "← Zurück zu Übersicht"
                const image = document.createElement("img")
                image.src = ele.strMealThumb
                image.alt = ele.strMeal
                gerichtBild.append(image)
                const country = document.createElement("span")
                country.className = "stadt"
                country.textContent = ele.strCountry || "Unknown country"
                info.append(country)

                const category = document.createElement("span")
                category.className = "gerichtKategorie"
                category.textContent = ele.strCategory || "Unknown Category"
                info.append(category)
                const name = document.createElement("h1")
                name.className = "gerichtname"
                name.textContent = ele.strMeal
                title.append(name)
                if (ele.strYoutube) {
                    const film = document.createElement("a")
                    film.textContent = " ▶ Video ansehen"
                    film.className = "film"
                    film.href = ele.strYoutube
                    film.target = "_blank"
                    tasten.append(film)
                }
                
                const anderRezept = document.createElement("button")
                anderRezept.className = "andersRezept"
                anderRezept.textContent = " Anderes Rezept"
                tasten.append(anderRezept)
                anderRezept.addEventListener("click", function () {
                    suchrandom()
                })
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
                                kontainer2.textContent = "Keine Rezepte gefunden. Bitte versuchen Sie ein anderer Name"
                                return
                            }
                            data.meals.forEach(meal => {
                                window.location.href = `extra.html?idMeal=${meal.idMeal}`
                            })
                        })
                        .catch(error => {
                            console.error(error)
                            kontainer2.textContent = "Die Rezepte konnten nicht geladen werden."
                        })
                }
                const liste1 = document.createElement("ul")
                const zutatenTitle = document.createElement("h2")
                zutatenTitle.textContent = "Zutaten"
                zutatenTitle.className = "zutatenTitle"
                for (let i = 1; i < 21; i++) {
                    const lia = document.createElement("li")
                    let zutat = "strIngredient" + i
                    lia.textContent = ele[zutat]
                    if (lia.textContent != "") {
                        liste1.append(lia)
                    }
                }
                zutaten.append(zutatenTitle, liste1)
                const zubereitungTitle = document.createElement("h2")
                zubereitungTitle.textContent = "Zubereitung"
                zubereitungTitle.className = "zubereitungTitle"
                const liste2 = document.createElement("ol")
                const schritteListe = ele.strInstructions.split('.').map(satz => satz.trim()).filter(Boolean)
                schritteListe.forEach(schritt => {
                    const lib = document.createElement("li")
                    lib.textContent = schritt
                    liste2.append(lib)
                })
                zubereitung.append(zubereitungTitle, liste2)
                kontainer2.append(linkzurueck, gerichtBild, info, title, tasten, zutaten, zubereitung)
            })
        })
        .catch(error => {
            console.error(error)
            kontainer2.textContent = "Die Rezepte konnten nicht geladen werden."
        })
}