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
