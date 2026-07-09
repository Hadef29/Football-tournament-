// ===============================
// Football Tournament Manager
// Section 1
// ===============================

let teams = [];
let fixtures = [];

// ---------- Load Saved Data ----------
window.onload = function () {

    const savedTeams = localStorage.getItem("teams");
    const savedFixtures = localStorage.getItem("fixtures");

    if (savedTeams)
        teams = JSON.parse(savedTeams);

    if (savedFixtures)
        fixtures = JSON.parse(savedFixtures);

    updateTeamList();
    updateTable();
    updateDashboard();

};

// ---------- Save ----------
function saveData() {

    localStorage.setItem("teams", JSON.stringify(teams));
    localStorage.setItem("fixtures", JSON.stringify(fixtures));

}

// ---------- Navigation ----------
function showPage(page) {

    document.querySelectorAll(".page").forEach(p => {

        p.style.display = "none";

    });

    document.getElementById(page).style.display = "block";

    document.querySelectorAll(".nav-btn").forEach(btn => {

        btn.classList.remove("active");

    });

}

// ---------- Add Team ----------
function addTeam() {

    const input = document.getElementById("teamName");

    const name = input.value.trim();

    if (name === "") {

        alert("Enter a team name.");

        return;

    }

    if (teams.some(t => t.name.toLowerCase() === name.toLowerCase())) {

        alert("Team already exists.");

        return;

    }

    teams.push({

        id: Date.now(),

        name: name,

        played: 0,

        wins: 0,

        draws: 0,

        losses: 0,

        gf: 0,

        ga: 0,

        gd: 0,

        points: 0,

        yellow: 0,

        red: 0

    });

    input.value = "";

    saveData();

    updateTeamList();

    updateTable();

    updateDashboard();

}

// ---------- Delete Team ----------
function deleteTeam(id) {

    if (!confirm("Delete this team?"))

        return;

    teams = teams.filter(team => team.id !== id);

    saveData();

    updateTeamList();

    updateTable();

    updateDashboard();

}

// ---------- Team List ----------
function updateTeamList() {

    const list = document.getElementById("teamList");

    list.innerHTML = "";

    if (teams.length === 0) {

        list.innerHTML = "<p>No teams added.</p>";

        return;

    }

    teams.forEach(team => {

        list.innerHTML += `

        <div class="team-item">

            <span>

                ⚽ ${team.name}

            </span>

            <button onclick="deleteTeam(${team.id})">

                Delete

            </button>

        </div>

        `;

    });

}

// ---------- Dashboard ----------
function updateDashboard() {

    document.getElementById("teamCount").textContent = teams.length;

    document.getElementById("matchCount").textContent = fixtures.length;

    let played = fixtures.filter(f => f.played).length;

    document.getElementById("playedCount").textContent = played;

    document.getElementById("remainingCount").textContent = fixtures.length - played;

}

// ---------- Standings ----------
function updateTable() {

    teams.sort((a, b) => {

        if (b.points !== a.points)

            return b.points - a.points;

        if (b.gd !== a.gd)

            return b.gd - a.gd;

        if (b.gf !== a.gf)

            return b.gf - a.gf;

        return a.name.localeCompare(b.name);

    });

    const body = document.getElementById("tableBody");

    body.innerHTML = "";

    teams.forEach((team, index) => {

        body.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${team.name}</td>

            <td>${team.played}</td>

            <td>${team.wins}</td>

            <td>${team.draws}</td>

            <td>${team.losses}</td>

            <td>${team.gf}</td>

            <td>${team.ga}</td>

            <td>${team.gd}</td>

            <td>${team.points}</td>

        </tr>

        `;

    });

}
