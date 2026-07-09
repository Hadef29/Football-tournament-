:root{
    --bg: #0a1310;
    --bg-alt: #0d1a16;
    --panel: #101d19;
    --panel-2: #0d1815;
    --line: #1e3a30;
    --line-soft: #16281f;
    --text: #eaf2ed;
    --muted: #7fa294;
    --muted-2: #547363;
    --lime: #c8ff4d;
    --lime-dim: #7fae2e;
    --red: #ff5a3c;
    --yellow: #ffd23f;
    --radius: 10px;
  }
  *{ box-sizing:border-box; }
  html,body{ margin:0; padding:0; }
  body{
    background:
      radial-gradient(1200px 600px at 85% -10%, rgba(200,255,77,0.06), transparent 60%),
      repeating-linear-gradient(180deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 3px),
      var(--bg);
    color: var(--text);
    font-family: 'Space Grotesk', system-ui, sans-serif;
    min-height: 100vh;
    padding: 24px 16px 80px;
  }
  .wrap{ max-width: 980px; margin: 0 auto; }

  /* ---------- Header ---------- */
  header.board{
    position: relative;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: linear-gradient(180deg, var(--panel), var(--panel-2));
    padding: 20px 24px;
    margin-bottom: 16px;
    overflow: hidden;
  }
  header.board::before{
    content:"";
    position:absolute; left:0; top:0; bottom:0; width:6px;
    background: repeating-linear-gradient(180deg, var(--lime) 0 10px, transparent 10px 20px);
    opacity:0.6;
  }
  .league-name-row{ display:flex; align-items:baseline; gap:10px; flex-wrap:wrap; }
  .flag{ color: var(--lime); font-size:24px; }
  #leagueName{
    background:transparent; border:none; border-bottom:1px dashed transparent;
    color: var(--text); font-family:'Space Grotesk', sans-serif;
    font-size: 26px; font-weight:700; letter-spacing:0.3px;
    padding:2px 2px; max-width: 100%;
  }
  #leagueName:hover, #leagueName:focus{ border-bottom-color: var(--lime-dim); outline:none; }
  header.board p.tag{
    margin:6px 0 0; color: var(--muted); font-size:13px;
  }
  .stat-chips{ display:flex; gap:10px; margin-top:14px; flex-wrap:wrap; }
  .chip{
    font-family:'JetBrains Mono', monospace;
    background: var(--bg-alt);
    border:1px solid var(--line);
    border-radius:6px;
    padding:6px 10px;
    font-size:12px;
    color: var(--muted);
  }
  .chip b{ color: var(--lime); font-weight:700; }

  /* ---------- Tab menu ---------- */
  nav.tabs{
    display:flex; gap:4px;
    border:1px solid var(--line);
    border-radius: var(--radius);
    background: var(--panel);
    padding:6px;
    margin-bottom: 20px;
  }
  nav.tabs button{
    flex:1;
    background:transparent;
    border:none;
    color: var(--muted);
    font-family:'Space Grotesk', sans-serif;
    font-weight:600;
    font-size:13px;
    padding:10px 8px;
    border-radius:7px;
    cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:7px;
    transition: all .15s ease;
  }
  nav.tabs button .num{
    font-family:'JetBrains Mono', monospace;
    font-size:10px;
    background: var(--bg-alt);
    border:1px solid var(--line);
    border-radius:4px;
    padding:1px 6px;
    color: var(--muted);
  }
  nav.tabs button:hover{ color: var(--text); }
  nav.tabs button.active{
    background: var(--lime);
    color: #0a1310;
  }
  nav.tabs button.active .num{ background: rgba(10,19,16,0.15); color:#0a1310; border-color:transparent; }
  nav.tabs button:disabled{ opacity:0.35; cursor:not-allowed; }

  .tabpanel{ display:none; }
  .tabpanel.active{ display:block; }

  /* ---------- Panels ---------- */
  .panel{
    border:1px solid var(--line);
    border-radius: var(--radius);
    background: var(--panel);
    padding: 20px;
    margin-bottom: 20px;
  }
  .panel h2{
    font-size:13px;
    text-transform:uppercase;
    letter-spacing:1.5px;
    color: var(--lime-dim);
    margin:0 0 16px;
    display:flex; align-items:center; gap:8px;
  }
  .panel h2::before{
    content:"";
    width:8px; height:8px;
    background: var(--lime);
    display:inline-block;
    transform: rotate(45deg);
  }

  /* ---------- Team input ---------- */
  .team-input-row{ display:flex; gap:8px; margin-bottom:14px; }
  input[type=text], input[type=number]{
    background: var(--bg-alt);
    border:1px solid var(--line);
    color: var(--text);
    border-radius:6px;
    padding:10px 12px;
    font-family:'Space Grotesk', sans-serif;
    font-size:14px;
  }
  input[type=text]{ flex:1; }
  input[type=text]:focus, input[type=number]:focus{
    outline:none; border-color: var(--lime-dim);
  }
  input[type=number]{
    width:52px; text-align:center;
    font-family:'JetBrains Mono', monospace;
    padding:8px 4px;
  }
  button{
    font-family:'Space Grotesk', sans-serif;
    font-weight:600;
    font-size:13px;
    border-radius:6px;
    border:1px solid var(--line);
    background: var(--bg-alt);
    color: var(--text);
    padding:10px 16px;
    cursor:pointer;
    transition: all .15s ease;
  }
  button:hover{ border-color: var(--lime-dim); color: var(--lime); }
  button.primary{
    background: var(--lime);
    color: #0a1310;
    border-color: var(--lime);
  }
  button.primary:hover{ filter: brightness(1.08); color:#0a1310; }
  button.ghost{ background:transparent; }
  button.danger:hover{ border-color: var(--red); color: var(--red); }
  button:disabled{ opacity:0.4; cursor:not-allowed; }

  .team-list{ display:flex; flex-wrap:wrap; gap:8px; }
  .team-tag{
    display:flex; align-items:center; gap:8px;
    background: var(--bg-alt);
    border:1px solid var(--line);
    border-radius:20px;
    padding:6px 8px 6px 14px;
    font-size:13px;
  }
  .team-tag .x{
    cursor:pointer; color:var(--muted); font-family:monospace;
    width:18px; height:18px; display:flex; align-items:center; justify-content:center;
    border-radius:50%;
  }
  .team-tag .x:hover{ background: var(--red); color:#fff; }
  .empty-note{ color: var(--muted-2); font-size:13px; padding:6px 0; }

  .actions-row{ display:flex; gap:10px; flex-wrap:wrap; margin-top:16px; align-items:center; }
  .toggle-row{
    display:flex; align-items:center; gap:8px; font-size:13px; color: var(--muted);
    background: var(--bg-alt); border:1px solid var(--line); border-radius:6px; padding:8px 12px;
  }
  .toggle-row input{ accent-color: var(--lime); width:16px; height:16px; }

  /* ---------- Fixtures ---------- */
  .matchday{ margin-bottom: 22px; }
  .matchday-label{
    font-family:'JetBrains Mono', monospace;
    font-size:11px;
    letter-spacing:1px;
    color: var(--muted);
    text-transform:uppercase;
    margin-bottom:8px;
    display:flex; align-items:center; gap:8px;
  }
  .matchday-label::after{
    content:""; flex:1; height:1px; background: var(--line-soft);
  }
  .match-ticket{
    border:1px solid var(--line);
    border-radius:8px;
    background: var(--bg-alt);
    padding:12px 14px;
    margin-bottom:8px;
  }
  .match-ticket.played{ border-color: var(--line-soft); background: linear-gradient(180deg, var(--bg-alt), rgba(200,255,77,0.02)); }
  .match-main{
    display:grid;
    grid-template-columns: 1fr 42px 20px 42px 1fr;
    align-items:center;
    gap:8px;
  }
  .team-name{ font-size:14px; font-weight:600; }
  .team-name.home{ text-align:right; }
  .team-name.away{ text-align:left; }
  .vs{ text-align:center; color: var(--muted-2); font-size:11px; font-family:'JetBrains Mono',monospace; }
  .score-input{ text-align:center; }
  .cards-toggle{
    font-size:11px; color: var(--muted); cursor:pointer; margin-top:10px;
    display:flex; align-items:center; gap:6px; user-select:none;
  }
  .cards-toggle .badge{
    font-family:'JetBrains Mono', monospace; font-size:10px;
    background: var(--panel-2); border:1px solid var(--line); border-radius:4px; padding:1px 6px;
  }
  .cards-toggle:hover{ color: var(--lime); }
  .cards-panel{
    display:none;
    margin-top:12px;
    padding-top:12px;
    border-top: 1px dashed var(--line-soft);
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .cards-panel.open{ display:grid; }
  .cards-col .who{ font-weight:600; color:var(--text); margin-bottom:8px; font-size:13px; }
  .stepper-field{ display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:8px; }
  .stepper-field .label{ display:flex; align-items:center; gap:7px; font-size:12px; color:var(--muted); }
  .swatch{ width:11px; height:15px; border-radius:2px; display:inline-block; }
  .swatch.y{ background: var(--yellow); }
  .swatch.r{ background: var(--red); }
  .stepper{ display:flex; align-items:center; gap:0; border:1px solid var(--line); border-radius:6px; overflow:hidden; }
  .stepper button{
    border:none; border-radius:0; padding:6px 10px; font-family:'JetBrains Mono', monospace;
    background: var(--panel-2); font-size:14px; line-height:1;
  }
  .stepper button:hover{ color: var(--lime); }
  .stepper .count{
    width:30px; text-align:center; font-family:'JetBrains Mono', monospace; font-size:13px;
    font-weight:700; background: var(--bg); padding:6px 0;
  }

  /* ---------- Standings ---------- */
  .table-scroll{ overflow-x:auto; }
  table.standings{
    width:100%;
    border-collapse: collapse;
    font-size:13px;
    min-width: 720px;
  }
  table.standings th{
    text-align:center;
    font-family:'JetBrains Mono', monospace;
    font-size:10px;
    letter-spacing:1px;
    color: var(--muted);
    text-transform:uppercase;
    padding:8px 6px;
    border-bottom:1px solid var(--line);
  }
  table.standings th.team-col, table.standings td.team-col{ text-align:left; }
  table.standings td{
    text-align:center;
    padding:9px 6px;
    font-family:'JetBrains Mono', monospace;
    border-bottom:1px solid var(--line-soft);
  }
  table.standings td.team-col{ font-family:'Space Grotesk', sans-serif; font-weight:600; }
  table.standings tr.top3 td.team-col{ color: var(--lime); }
  table.standings td.pos{ font-weight:700; }
  .pos-badge{
    display:inline-flex; align-items:center; justify-content:center;
    width:20px; height:20px; border-radius:4px;
    background: var(--bg-alt);
    border:1px solid var(--line);
  }
  tr.top3 .pos-badge{ background: var(--lime); color:#0a1310; border-color:var(--lime); }
  td.pts{ font-weight:700; color: var(--lime); }
  td.gd.pos-val{ color: var(--lime-dim); }
  td.gd.neg-val{ color: var(--red); }
  .disc{ display:inline-flex; gap:6px; align-items:center; justify-content:center; }
  .disc .yb, .disc .rb{ display:inline-flex; align-items:center; gap:3px; }
  .disc .box{ width:8px; height:11px; border-radius:1px; }
  .disc .box.y{ background: var(--yellow); }
  .disc .box.r{ background: var(--red); }

  /* ---------- Legend / footer ---------- */
  details.legend summary{ cursor:pointer; color: var(--muted); font-size:13px; list-style:none; }
  details.legend summary::-webkit-details-marker{ display:none; }
  details.legend summary::before{ content:"▸ "; color:var(--lime-dim); }
  details.legend[open] summary::before{ content:"▾ "; }
  .legend ol{ color: var(--muted); font-size:13px; line-height:1.9; padding-left:20px; margin-top:10px; }
  .legend b{ color: var(--text); }

  .empty-state{ text-align:center; color: var(--muted-2); padding: 30px 10px; font-size:14px; }
