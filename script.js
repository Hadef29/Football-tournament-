let teams = [];

function addTeam() {
    const input = document.getElementById("teamName");
    const name = input.value.trim();

    if (name === "") {
        alert("Enter a team name.");
        return;
    }

    if (teams.some(team => team.name.toLowerCase() === name.toLowerCase())) {
        alert("Team already exists.");
        return;
    }

    teams.push({
        name: name,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        points: 0
    });

    input.value = "";
    updateTable();
}

function updateTable() {
    teams.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
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
            <td><b>${team.points}</b></td>
        </tr>`;
    });
}
