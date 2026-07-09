let teams = [];
let fixtures = [];

// ---------- TAB SYSTEM ----------
function showTab(tabId) {
    document.querySelectorAll(".tab").forEach(tab => {
        tab.style.display = "none";
    });

    document.getElementById(tabId).style.display = "block";
}

// ---------- ADD TEAM ----------
function addTeam() {

    const input = document.getElementById("teamName");
    const name = input.value.trim();

    if(name===""){
        alert("Enter a team name");
        return;
    }

    if(teams.find(t=>t.name===name)){
        alert("Team already exists");
        return;
    }

    teams.push({
        name:name,
        played:0,
        wins:0,
        draws:0,
        losses:0,
        gf:0,
        ga:0,
        gd:0,
        points:0,
        yellow:0,
        red:0
    });

    input.value="";

    updateTeamList();
    updateTable();
}

// ---------- TEAM LIST ----------
function updateTeamList(){

    let div=document.getElementById("teamList");

    div.innerHTML="";

    teams.forEach((team,index)=>{

        div.innerHTML+=`
        <p>${index+1}. ${team.name}</p>
        `;

    });

}

// ---------- STANDINGS ----------
function updateTable(){

teams.sort((a,b)=>{

if(b.points!=a.points) return b.points-a.points;

if(b.gd!=a.gd) return b.gd-a.gd;

if(b.gf!=a.gf) return b.gf-a.gf;

return a.name.localeCompare(b.name);

});

let body=document.getElementById("tableBody");

body.innerHTML="";

teams.forEach((t,index)=>{

body.innerHTML+=`
<tr>

<td>${index+1}</td>
<td>${t.name}</td>
<td>${t.played}</td>
<td>${t.wins}</td>
<td>${t.draws}</td>
<td>${t.losses}</td>
<td>${t.gf}</td>
<td>${t.ga}</td>
<td>${t.gd}</td>
<td>${t.points}</td>

</tr>
`;

});

}
// ---------- GENERATE FIXTURES ----------
function generateFixtures() {

    if (teams.length < 2) {
        alert("Add at least 2 teams.");
        return;
    }

    fixtures = [];

    let fixtureList = document.getElementById("fixtureList");
    fixtureList.innerHTML = "";

    for (let i = 0; i < teams.length; i++) {

        for (let j = i + 1; j < teams.length; j++) {

            fixtures.push({
                home: teams[i].name,
                away: teams[j].name,
                homeGoals: "",
                awayGoals: "",
                played: false
            });

        }

    }

    fixtures.forEach((match, index) => {

        fixtureList.innerHTML += `
        <div class="card">

            <h3>Match ${index + 1}</h3>

            <b>${match.home}</b>

            <input
                type="number"
                min="0"
                id="hg${index}"
                placeholder="Goals"
                style="width:70px;">

            -

            <input
                type="number"
                min="0"
                id="ag${index}"
                placeholder="Goals"
                style="width:70px;">

            <b>${match.away}</b>

            <br><br>

            <button onclick="saveResult(${index})">
                Save Result
            </button>

        </div>
        `;

    });

}
function saveResult(index){

    const homeGoals = parseInt(document.getElementById("hg"+index).value);
    const awayGoals = parseInt(document.getElementById("ag"+index).value);

    if(isNaN(homeGoals) || isNaN(awayGoals)){
        alert("Enter both scores.");
        return;
    }

    let match = fixtures[index];

    if(match.played){
        alert("Result already saved.");
        return;
    }

    match.played = true;

    let home = teams.find(t => t.name === match.home);
    let away = teams.find(t => t.name === match.away);

    home.played++;
    away.played++;

    home.gf += homeGoals;
    home.ga += awayGoals;

    away.gf += awayGoals;
    away.ga += homeGoals;

    home.gd = home.gf - home.ga;
    away.gd = away.gf - away.ga;

    if(homeGoals > awayGoals){

        home.wins++;
        away.losses++;

        home.points += 3;

    }

    else if(homeGoals < awayGoals){

        away.wins++;
        home.losses++;

        away.points += 3;

    }

    else{

        home.draws++;
        away.draws++;

        home.points++;
        away.points++;

    }

    updateTable();

    alert("Result Saved!");

}
