//todo make api call with the riot api, then fetch summoner id from safoekillmachine to continue building

const riotKey = "api_key=RGAPI-13d35355-91a5-45d0-b627-f0dc87773ff6"
const btnSr = document.getElementById("btn-sr")
const welcomeMsg = document.getElementById("welcomeMsg")
const btnMastery = document.getElementById("btn-mastery")
const ulMastery = document.getElementById("ul-mastery")
let summoner = ""
let mastery = []
let champion = []


//for later on
// const summonerFromLocalStorage = localStorage.getItem("mySummoner")
//
// if (summonerFromLocalStorage) {
//     mySummoner = summonerFromLocalStorage
//     fetchSummoner(mySummoner)
// }


async function fetchSummoner(name) {
    let link = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?${riotKey}`
    const response = await fetch(link)
    const summoner = await response.json()
    return summoner
}

async function fetchMasteryBySummonerId(id) {
    let link = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?${riotKey}`
    const response = await fetch(link)
    const summoner = await response.json()
    return summoner
}

async function fetchChampions() {
    let link = `https://ddragon.leagueoflegends.com/cdn/11.19.1/data/en_US/champion.json`
    const response = await fetch(link)
    const champion = await response.json()
    return champion
}


btnSr.addEventListener("click", async () => {
    try {
        let inputSr = document.getElementById("input-sr").value
        let result = summoner + inputSr
        console.log(result)
        summoner = await fetchSummoner(result)
    } catch (error) {
        console.log("error", error)
    }
    welcomeMsg.textContent += `Welcome ${summoner.name}, your userid is ${summoner.id}`

    console.log(summoner)

})

btnMastery.addEventListener("click", async () => {
    try {
        mastery = await fetchMasteryBySummonerId(summoner.id)
        champion = await fetchChampions()
        // https://stackoverflow.com/questions/921789/how-to-loop-through-a-plain-javascript-object-with-the-objects-as-members
        Object.keys(champion.data).forEach(key => {
            for (let i = 0; i < 11; i++) {
                if (champion.data[key]['key']  == mastery[i].championId) {
                    ulMastery.innerHTML += `<li>Champion: ${champion.data[key]['name']}
                    and the points ${mastery[i].championPoints}
                    and your current level is ${mastery[i].championLevel}
                    have you aquired your chest? ${mastery[i].chestGranted}</li>`
                }
            }
        })



    } catch (error) {
        console.log("error", error)
    }
})












