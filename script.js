(function(){
  // ---------------- State ----------------
  let teams = [];
  let matches = [];
  let activeView = 'dashboard';

  const el = id => document.getElementById(id);
  const teamInput = el('teamInput');
  const addTeamBtn = el('addTeamBtn');
  const teamListEl = el('teamList');
  const teamEmptyNote = el('teamEmptyNote');
  const generateBtn = el('generateBtn');
  const resetBtn = el('resetBtn');
  const fixturesContainer = el('fixturesContainer');
  const standingsBody = el('standingsBody');
  const chipTeams = el('chipTeams');
  const chipPlayed = el('chipPlayed');
  const chipTotal = el('chipTotal');
  const exportBtn = el('exportBtn');
  const importFile = el('importFile');
  const leagueNameInput = el('leagueName');
  const mobileTitle = el('mobileTitle');
  const doubleRoundToggle = el('doubleRoundToggle');
  const navFixturesBtn = el('navFixturesBtn');
  const navTableBtn = el('navTableBtn');
  const navTeamCount = el('navTeamCount');
  const dashEmpty = el('dashEmpty');
  const dashContent = el('dashContent');
  const leaderName = el('leaderName');
  const leaderStats = el('leaderStats');
  const dashMiniTable = el('dashMiniTable');
  const dashNextFixtures = el('dashNextFixtures');
  const dashGoTeams = el('dashGoTeams');
  const sidebar = el('sidebar');
  const scrim = el('scrim');
  const hamburgerBtn = el('hamburgerBtn');

  leagueNameInput.addEventListener('input', ()=>{
    const name = leagueNameInput.value.trim() || 'FootBall League';
    document.title = name;
    mobileTitle.textContent = name;
  });

  // ---------------- Navigation ----------------
  function switchView(view){
    if((view === 'fixtures' && navFixturesBtn.disabled) || (view === 'table' && navTableBtn.disabled)) return;
    activeView = view;
    document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === view));
    document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + view));
    closeSidebar();
  }
  document.querySelectorAll('.nav-item').forEach(b=>{
    b.addEventListener('click', ()=> switchView(b.dataset.view));
  });
  dashGoTeams.addEventListener('click', ()=> switchView('teams'));

  function openSidebar(){ sidebar.classList.add('open'); scrim.classList.add('show'); }
  function closeSidebar(){ sidebar.classList.remove('open'); scrim.classList.remove('show'); }
  hamburgerBtn.addEventListener('click', ()=>{
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  scrim.addEventListener('click', closeSidebar);

  // ---------------- Team management ----------------
  function addTeam(name){
    name = name.trim();
    if(!name) return;
    if(teams.some(t => t.toLowerCase() === name.toLowerCase())){
      teamInput.value = '';
      teamInput.focus();
      return;
    }
    teams.push(name);
    teamInput.value = '';
    teamInput.focus();
    renderTeams();
    computeStandings();
  }

  function removeTeam(name){
    teams = teams.filter(t => t !== name);
    matches = [];
    navFixturesBtn.disabled = true;
    navTableBtn.disabled = true;
    if(activeView === 'fixtures' || activeView === 'table') switchView('teams');
    renderTeams();
    computeStandings();
  }

  function renderTeams(){
    teamListEl.innerHTML = '';
    teams.forEach(t=>{
      const tag = document.createElement('div');
      tag.className = 'team-tag';
      tag.innerHTML = `<span>${escapeHtml(t)}</span><span class="x" data-team="${escapeHtml(t)}">✕</span>`;
      teamListEl.appendChild(tag);
    });
    teamEmptyNote.style.display = teams.length ? 'none' : 'block';
    generateBtn.disabled = teams.length < 2;
    chipTeams.textContent = teams.length;
    navTeamCount.textContent = teams.length;
    teamListEl.querySelectorAll('.x').forEach(x=>{
      x.addEventListener('click', ()=> removeTeam(x.dataset.team));
    });
  }

  function escapeHtml(s){
    return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  addTeamBtn.addEventListener('click', ()=> addTeam(teamInput.value));
  teamInput.addEventListener('keydown', e=>{
    if(e.key === 'Enter'){ e.preventDefault(); addTeam(teamInput.value); }
  });

  // ---------------- Fixture generation (circle method — every team plays every other team) ----------------
  function circleRounds(list){
    let arr = [...list];
    if(arr.length % 2 !== 0) arr.push(null); // bye slot
    const n = arr.length;
    const rounds = [];
    for(let r=0; r<n-1; r++){
      const roundMatches = [];
      for(let i=0; i<n/2; i++){
        const home = arr[i], away = arr[n-1-i];
        if(home !== null && away !== null) roundMatches.push({home, away});
      }
      rounds.push(roundMatches);
      arr = [arr[0], arr[n-1], ...arr.slice(1, n-1)];
    }
    return rounds;
  }

  function generateFixtures(){
    const firstLeg = circleRounds(teams);
    let allRounds = firstLeg.map(r => r.map(m => ({...m})));

    if(doubleRoundToggle.checked){
      const secondLeg = firstLeg.map(round => round.map(m => ({ home: m.away, away: m.home })));
      allRounds = allRounds.concat(secondLeg);
    }

    matches = [];
    let id = 0;
    allRounds.forEach((round, ridx)=>{
      round.forEach(m=>{
        matches.push({
          id: id++,
          round: ridx+1,
          home: m.home, away: m.away,
          hg: null, ag: null,
          hy: 0, hr: 0, ay: 0, ar: 0
        });
      });
    });

    renderFixtures();
    computeStandings();
    navFixturesBtn.disabled = false;
    navTableBtn.disabled = false;
    switchView('fixtures');
  }

  generateBtn.addEventListener('click', generateFixtures);

  resetBtn.addEventListener('click', ()=>{
    if(!confirm('This clears all teams, fixtures and results. Continue?')) return;
    teams = [];
    matches = [];
    renderTeams();
    navFixturesBtn.disabled = true;
    navTableBtn.disabled = true;
    computeStandings();
    switchView('dashboard');
  });

  // ---------------- Fixtures rendering ----------------
  function renderFixtures(){
    fixturesContainer.innerHTML = '';
    const byRound = {};
    matches.forEach(m => { (byRound[m.round] = byRound[m.round] || []).push(m); });

    Object.keys(byRound).sort((a,b)=>a-b).forEach(rnd=>{
      const wrap = document.createElement('div');
      wrap.className = 'matchday';
      const label = document.createElement('div');
      label.className = 'matchday-label';
      label.textContent = `Matchday ${rnd}`;
      wrap.appendChild(label);

      byRound[rnd].forEach(m=>{
        const isPlayed = m.hg !== null && m.ag !== null;
        const cardTotal = (m.hy||0)+(m.hr||0)+(m.ay||0)+(m.ar||0);
        const ticket = document.createElement('div');
        ticket.className = 'match-ticket' + (isPlayed ? ' played' : '');
        ticket.innerHTML = `
          <div class="match-main">
            <div class="team-name home">${escapeHtml(m.home)}</div>
            <input type="number" min="0" class="score-input" data-id="${m.id}" data-field="hg" value="${m.hg ?? ''}" placeholder="–">
            <div class="vs">v</div>
            <input type="number" min="0" class="score-input" data-id="${m.id}" data-field="ag" value="${m.ag ?? ''}" placeholder="–">
            <div class="team-name away">${escapeHtml(m.away)}</div>
          </div>
          <div class="cards-toggle" data-id="${m.id}">
            <span class="arrow">▸</span> Cards &amp; discipline
            ${cardTotal > 0 ? `<span class="badge">${cardTotal}</span>` : ''}
          </div>
          <div class="cards-panel" id="cards-${m.id}">
            ${cardStepperCol(m, 'home')}
            ${cardStepperCol(m, 'away')}
          </div>
        `;
        wrap.appendChild(ticket);
      });
      fixturesContainer.appendChild(wrap);
    });

    fixturesContainer.querySelectorAll('.score-input').forEach(inp=>{
      inp.addEventListener('input', onScoreChange);
    });
    fixturesContainer.querySelectorAll('.stepper button').forEach(btn=>{
      btn.addEventListener('click', onStepperClick);
    });
    fixturesContainer.querySelectorAll('.cards-toggle').forEach(t=>{
      t.addEventListener('click', ()=>{
        const panel = document.getElementById(`cards-${t.dataset.id}`);
        panel.classList.toggle('open');
        t.querySelector('.arrow').textContent = panel.classList.contains('open') ? '▾' : '▸';
      });
    });
  }

  function cardStepperCol(m, side){
    const teamName = side === 'home' ? m.home : m.away;
    const yField = side === 'home' ? 'hy' : 'ay';
    const rField = side === 'home' ? 'hr' : 'ar';
    return `
      <div class="cards-col">
        <div class="who">${escapeHtml(teamName)}</div>
        <div class="stepper-field">
          <span class="label"><span class="swatch y"></span>Yellow cards</span>
          <span class="stepper">
            <button type="button" data-id="${m.id}" data-field="${yField}" data-delta="-1">−</button>
            <span class="count" id="count-${m.id}-${yField}">${m[yField]}</span>
            <button type="button" data-id="${m.id}" data-field="${yField}" data-delta="1">+</button>
          </span>
        </div>
        <div class="stepper-field">
          <span class="label"><span class="swatch r"></span>Red cards</span>
          <span class="stepper">
            <button type="button" data-id="${m.id}" data-field="${rField}" data-delta="-1">−</button>
            <span class="count" id="count-${m.id}-${rField}">${m[rField]}</span>
            <button type="button" data-id="${m.id}" data-field="${rField}" data-delta="1">+</button>
          </span>
        </div>
      </div>
    `;
  }

  function findMatch(id){ return matches.find(m => m.id === Number(id)); }

  function onScoreChange(e){
    const m = findMatch(e.target.dataset.id);
    const field = e.target.dataset.field;
    const val = e.target.value;
    m[field] = val === '' ? null : Math.max(0, parseInt(val, 10) || 0);
    computeStandings();
    const ticket = e.target.closest('.match-ticket');
    if(m.hg !== null && m.ag !== null) ticket.classList.add('played');
    else ticket.classList.remove('played');
  }

  function onStepperClick(e){
    const btn = e.currentTarget;
    const m = findMatch(btn.dataset.id);
    const field = btn.dataset.field;
    const delta = parseInt(btn.dataset.delta, 10);
    m[field] = Math.max(0, (m[field] || 0) + delta);
    const countEl = el(`count-${m.id}-${field}`);
    countEl.textContent = m[field];
    const toggleEl = btn.closest('.match-ticket').querySelector('.cards-toggle');
    const total = (m.hy||0)+(m.hr||0)+(m.ay||0)+(m.ar||0);
    let badgeEl = toggleEl.querySelector('.badge');
    if(total > 0){
      if(!badgeEl){
        badgeEl = document.createElement('span');
        badgeEl.className = 'badge';
        toggleEl.appendChild(badgeEl);
      }
      badgeEl.textContent = total;
    } else if(badgeEl){
      badgeEl.remove();
    }
    computeStandings();
  }

  // ---------------- Standings computation ----------------
  function computeStandings(){
    const stats = {};
    teams.forEach(t=>{
      stats[t] = { name:t, played:0, won:0, drawn:0, lost:0, gf:0, ga:0, gd:0, pts:0, yellow:0, red:0 };
    });

    const playedMatches = matches.filter(m => m.hg !== null && m.ag !== null);

    playedMatches.forEach(m=>{
      const h = stats[m.home], a = stats[m.away];
      if(!h || !a) return;
      h.played++; a.played++;
      h.gf += m.hg; h.ga += m.ag;
      a.gf += m.ag; a.ga += m.hg;
      h.yellow += m.hy || 0; h.red += m.hr || 0;
      a.yellow += m.ay || 0; a.red += m.ar || 0;
      if(m.hg > m.ag){ h.won++; h.pts += 3; a.lost++; }
      else if(m.hg < m.ag){ a.won++; a.pts += 3; h.lost++; }
      else { h.drawn++; a.drawn++; h.pts += 1; a.pts += 1; }
    });

    Object.values(stats).forEach(s => s.gd = s.gf - s.ga);

    const ranked = tieBreakSort(Object.values(stats), playedMatches, 0);
    renderStandings(ranked);
    renderDashboard(ranked, playedMatches);

    chipPlayed.textContent = playedMatches.length;
    chipTotal.textContent = matches.length;
  }

  function tieBreakSort(group, playedMatches, stageIndex){
    if(group.length <= 1) return group;
    const stages = ['points','gd','gf','h2h','red','yellow'];
    if(stageIndex >= stages.length){
      return [...group].sort((a,b)=> a.name.localeCompare(b.name));
    }
    const stage = stages[stageIndex];

    let keyed;
    if(stage === 'points') keyed = group.map(t => ({t, key: t.pts}));
    else if(stage === 'gd') keyed = group.map(t => ({t, key: t.gd}));
    else if(stage === 'gf') keyed = group.map(t => ({t, key: t.gf}));
    else if(stage === 'red') keyed = group.map(t => ({t, key: -t.red}));
    else if(stage === 'yellow') keyed = group.map(t => ({t, key: -t.yellow}));
    else if(stage === 'h2h'){
      const names = new Set(group.map(t => t.name));
      const miniPts = {};
      group.forEach(t => miniPts[t.name] = 0);
      playedMatches.forEach(m=>{
        if(names.has(m.home) && names.has(m.away)){
          if(m.hg > m.ag) miniPts[m.home] += 3;
          else if(m.hg < m.ag) miniPts[m.away] += 3;
          else { miniPts[m.home] += 1; miniPts[m.away] += 1; }
        }
      });
      keyed = group.map(t => ({t, key: miniPts[t.name]}));
    }

    keyed.sort((a,b)=> b.key - a.key);

    const subgroups = [];
    let current = [keyed[0]];
    for(let i=1; i<keyed.length; i++){
      if(keyed[i].key === current[0].key) current.push(keyed[i]);
      else { subgroups.push(current); current = [keyed[i]]; }
    }
    subgroups.push(current);

    let result = [];
    subgroups.forEach(sg=>{
      const teamsInSg = sg.map(x => x.t);
      if(teamsInSg.length === 1) result.push(teamsInSg[0]);
      else result.push(...tieBreakSort(teamsInSg, playedMatches, stageIndex+1));
    });
    return result;
  }

  function renderStandings(ranked){
    standingsBody.innerHTML = '';
    if(ranked.length === 0){
      standingsBody.innerHTML = `<tr><td colspan="11" class="empty-state">No teams yet.</td></tr>`;
      return;
    }
    ranked.forEach((s, idx)=>{
      const tr = document.createElement('tr');
      if(idx < 3) tr.className = 'top3';
      const gdClass = s.gd > 0 ? 'pos-val' : (s.gd < 0 ? 'neg-val' : '');
      tr.innerHTML = `
        <td class="pos"><span class="pos-badge">${idx+1}</span></td>
        <td class="team-col">${escapeHtml(s.name)}</td>
        <td>${s.played}</td>
        <td>${s.won}</td>
        <td>${s.drawn}</td>
        <td>${s.lost}</td>
        <td>${s.gf}</td>
        <td>${s.ga}</td>
        <td class="gd ${gdClass}">${s.gd > 0 ? '+' + s.gd : s.gd}</td>
        <td class="pts">${s.pts}</td>
        <td>
          <span class="disc">
            <span class="yb"><span class="box y"></span>${s.yellow}</span>
            <span class="rb"><span class="box r"></span>${s.red}</span>
          </span>
        </td>
      `;
      standingsBody.appendChild(tr);
    });
  }

  // ---------------- Dashboard ----------------
  function renderDashboard(ranked, playedMatches){
    const hasTeams = teams.length >= 2;
    if(!hasTeams){
      dashEmpty.style.display = 'block';
      dashContent.style.display = 'none';
      return;
    }
    dashEmpty.style.display = 'none';
    dashContent.style.display = 'grid';

    if(ranked.length && playedMatches.length){
      const leader = ranked[0];
      leaderName.textContent = leader.name;
      leaderStats.innerHTML = `
        <span>P <b>${leader.played}</b></span>
        <span>GD <b>${leader.gd > 0 ? '+' + leader.gd : leader.gd}</b></span>
        <span>Pts <b>${leader.pts}</b></span>
      `;
    } else {
      leaderName.textContent = '—';
      leaderStats.innerHTML = `<span>No matches played yet</span>`;
    }

    dashMiniTable.innerHTML = '';
    if(ranked.length){
      ranked.slice(0, 5).forEach((s, idx)=>{
        const row = document.createElement('div');
        row.className = 'mini-row';
        row.innerHTML = `<span class="pos">${idx+1}</span><span class="name">${escapeHtml(s.name)}</span><span class="pts">${s.pts} pts</span>`;
        dashMiniTable.appendChild(row);
      });
    } else {
      dashMiniTable.innerHTML = `<div class="empty-state">Generate fixtures to see standings.</div>`;
    }

    dashNextFixtures.innerHTML = '';
    const upcoming = matches.filter(m => m.hg === null || m.ag === null).slice(0, 5);
    if(upcoming.length){
      upcoming.forEach(m=>{
        const row = document.createElement('div');
        row.className = 'next-fixture';
        row.innerHTML = `<span>${escapeHtml(m.home)} v ${escapeHtml(m.away)}</span><span class="md">MD ${m.round}</span>`;
        dashNextFixtures.appendChild(row);
      });
    } else if(matches.length){
      dashNextFixtures.innerHTML = `<div class="empty-state">All matches played!</div>`;
    } else {
      dashNextFixtures.innerHTML = `<div class="empty-state">Generate fixtures first.</div>`;
    }
  }

  // ---------------- Export / Import ----------------
  exportBtn.addEventListener('click', ()=>{
    const data = { leagueName: leagueNameInput.value, teams, matches, doubleRound: doubleRoundToggle.checked };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (leagueNameInput.value.trim() || 'league') + '-data.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  importFile.addEventListener('change', e=>{
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = evt=>{
      try{
        const data = JSON.parse(evt.target.result);
        if(!Array.isArray(data.teams) || !Array.isArray(data.matches)) throw new Error('bad format');
        teams = data.teams;
        matches = data.matches;
        if(typeof data.leagueName === 'string' && data.leagueName.trim()){
          leagueNameInput.value = data.leagueName;
          document.title = data.leagueName;
          mobileTitle.textContent = data.leagueName;
        }
        doubleRoundToggle.checked = !!data.doubleRound;
        renderTeams();
        navFixturesBtn.disabled = matches.length === 0;
        navTableBtn.disabled = matches.length === 0;
        if(matches.length) renderFixtures();
        computeStandings();
        switchView(matches.length ? 'table' : 'teams');
      }catch(err){
        alert('Could not read that file — it does not look like a valid league export.');
      }
    };
    reader.readAsText(file);
    importFile.value = '';
  });

  // ---------------- Init ----------------
  renderTeams();
  computeStandings();
})();
