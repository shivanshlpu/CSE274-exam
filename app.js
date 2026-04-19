// DrainSense - Main Application Controller
const App = {
  is3DActive: false,
  selectedPipe: null,
  currentTool: null,

  init() {
    // Init 2D map
    Map2D.init('map-container');
    Map2D.onPipeSelect = (pipe) => this.selectPipe(pipe);

    // Init 3D (deferred rendering)
    View3D.init('three-container');
    View3D.onPipeSelect = (pipe) => this.selectPipe(pipe);

    // Populate stats
    this.updateStats();

    // 3D toggle
    document.getElementById('btn-toggle-3d').addEventListener('click', () => this.toggle3D());

    // Camera controls
    document.getElementById('cam-reset').addEventListener('click', () => View3D.resetCamera());
    document.getElementById('cam-top').addEventListener('click', () => View3D.topView());
    document.getElementById('cam-front').addEventListener('click', () => View3D.frontView());

    // Tabs
    const tabInspector = document.getElementById('tab-inspector');
    const tabPipes = document.getElementById('tab-pipes');
    const infoDefault = document.getElementById('info-default');
    const infoPipes = document.getElementById('info-pipes');

    tabInspector.addEventListener('click', () => {
      tabInspector.classList.add('active'); tabPipes.classList.remove('active');
      infoDefault.style.display = ''; infoPipes.style.display = 'none';
    });
    tabPipes.addEventListener('click', () => {
      tabPipes.classList.add('active'); tabInspector.classList.remove('active');
      infoDefault.style.display = 'none'; infoPipes.style.display = '';
      this.renderPipesTable();
    });

    // Export
    document.getElementById('btn-export').addEventListener('click', () => this.exportData());

    // Toolbar
    document.querySelectorAll('.plan-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isActive = btn.classList.contains('active');
        document.querySelectorAll('.plan-btn').forEach(b => b.classList.remove('active'));
        if (!isActive) {
          btn.classList.add('active');
          this.currentTool = btn.id.replace('tool-', '');
        } else {
          this.currentTool = null;
        }
        document.body.style.cursor = this.currentTool ? 'crosshair' : 'default';
      });
    });

    // Map Click Handler for Planning Tools
    Map2D.map.on('click', (e) => {
      if (this.currentTool && this.currentTool !== 'delete') {
        this.addNetworkNode(this.currentTool, e.latlng);
        this.currentTool = null;
        document.querySelectorAll('.plan-btn').forEach(b => b.classList.remove('active'));
        document.body.style.cursor = 'default';
      }
    });

    // Search
    document.getElementById('search-input').addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      if (q.length < 2) return;
      const pipe = NetworkData.pipes.find(p => p.id.toLowerCase().includes(q));
      if (pipe) {
        document.getElementById('tab-inspector').click();
        this.selectPipe(pipe);
      }
    });

    // Show welcome state
    this.showInfoPanel(null);
  },

  updateStats() {
    const stats = NetworkData.getStats();
    document.getElementById('stat-pipes').textContent = stats.totalPipes;
    document.getElementById('stat-manholes').textContent = stats.totalManholes;
    document.getElementById('stat-length').textContent = (stats.totalLength / 1000).toFixed(1) + ' km';
    document.getElementById('stat-alerts').textContent = stats.blockages + stats.anomalies;
    document.getElementById('stat-health').textContent = ((1 - parseFloat(stats.avgScore)) * 100).toFixed(0) + '%';
  },

  toggle3D() {
    this.is3DActive = !this.is3DActive;
    const btn = document.getElementById('btn-toggle-3d');
    const container = document.getElementById('three-container');
    const infoDefault = document.getElementById('info-default');

    if (this.is3DActive) {
      btn.classList.add('active');
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/></svg> Back to Info';
      container.classList.add('visible');
      if (infoDefault) infoDefault.style.display = 'none';
      View3D.start();
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg> Analyze in 3D';
      container.classList.remove('visible');
      if (infoDefault) infoDefault.style.display = '';
      View3D.stop();
    }
  },

  selectPipe(pipe) {
    this.selectedPipe = pipe;
    Map2D.clearHighlight();
    Map2D.highlightPipe(pipe.id);
    this.showInfoPanel(pipe);
    this.drawElevationProfile(pipe);
  },

  showInfoPanel(pipe) {
    const panel = document.getElementById('pipe-info-card');
    const empty = document.getElementById('pipe-info-empty');
    if (!pipe) {
      if (panel) panel.style.display = 'none';
      if (empty) empty.style.display = '';
      return;
    }
    if (panel) panel.style.display = '';
    if (empty) empty.style.display = 'none';

    const scoreColor = pipe.mlScore > 0.7 ? 'danger' : pipe.mlScore > 0.35 ? 'warning' : 'success';
    const scoreFill = pipe.mlScore > 0.7 ? 'high' : pipe.mlScore > 0.35 ? 'medium' : 'low';

    document.getElementById('pi-id').textContent = pipe.id;
    document.getElementById('pi-status').textContent = pipe.status;
    document.getElementById('pi-status').className = 'popup-status ' + pipe.status;
    document.getElementById('pi-diameter').textContent = pipe.diameter + 'mm';
    document.getElementById('pi-material').textContent = pipe.material;
    document.getElementById('pi-start-elev').textContent = pipe.startElev.toFixed(1) + 'm';
    document.getElementById('pi-end-elev').textContent = pipe.endElev.toFixed(1) + 'm';
    document.getElementById('pi-slope').textContent = pipe.slope.toFixed(2) + '%';
    document.getElementById('pi-length').textContent = pipe.length + 'm';
    document.getElementById('pi-flow').textContent = pipe.flowRate + ' L/s';
    document.getElementById('pi-age').textContent = pipe.age + ' yrs';
    document.getElementById('pi-last-maint').textContent = pipe.lastMaintenance;
    document.getElementById('pi-next-clean').textContent = pipe.nextCleaning;
    document.getElementById('pi-ml-score').textContent = (pipe.mlScore * 100).toFixed(0) + '%';
    document.getElementById('pi-ml-score').className = 'info-value ' + scoreColor;
    document.getElementById('pi-ml-bar').className = 'ml-score-fill ' + scoreFill;
    document.getElementById('pi-ml-bar').style.width = (pipe.mlScore * 100) + '%';
  },

  drawElevationProfile(pipe) {
    const canvas = document.getElementById('elevation-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.parentElement.clientWidth - 28;
    const h = canvas.height = 130;

    ctx.clearRect(0, 0, w, h);

    const padding = { top: 20, right: 15, bottom: 25, left: 40 };
    const plotW = w - padding.left - padding.right;
    const plotH = h - padding.top - padding.bottom;

    // Data
    const fromNode = NetworkData.manholes.find(m => m.id === pipe.from) ||
      [...NetworkData.stps, ...NetworkData.treatmentPlants, ...NetworkData.pumpingStations].find(n => n.id === pipe.from);
    const toNode = NetworkData.manholes.find(m => m.id === pipe.to) ||
      [...NetworkData.stps, ...NetworkData.treatmentPlants, ...NetworkData.pumpingStations].find(n => n.id === pipe.to);

    const groundStart = fromNode ? fromNode.groundLevel : pipe.startElev + 3;
    const groundEnd = toNode ? toNode.groundLevel : pipe.endElev + 3;

    const allElevs = [groundStart, groundEnd, pipe.startElev, pipe.endElev];
    const minE = Math.min(...allElevs) - 1;
    const maxE = Math.max(...allElevs) + 1;

    const xScale = (v) => padding.left + (v / pipe.length) * plotW;
    const yScale = (v) => padding.top + plotH - ((v - minE) / (maxE - minE)) * plotH;

    // Background
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.5;
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const elev = minE + (maxE - minE) * (i / steps);
      const y = yScale(elev);
      ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(w - padding.right, y); ctx.stroke();
      ctx.fillStyle = '#64748b';
      ctx.font = '9px "JetBrains Mono"';
      ctx.textAlign = 'right';
      ctx.fillText(elev.toFixed(1), padding.left - 4, y + 3);
    }

    // Ground profile (filled)
    ctx.beginPath();
    ctx.moveTo(xScale(0), yScale(groundStart));
    ctx.lineTo(xScale(pipe.length), yScale(groundEnd));
    ctx.lineTo(xScale(pipe.length), yScale(maxE + 5));
    ctx.lineTo(xScale(0), yScale(maxE + 5));
    ctx.closePath();
    const gGrad = ctx.createLinearGradient(0, yScale(maxE), 0, yScale(minE));
    gGrad.addColorStop(0, 'rgba(101,67,33,0.15)');
    gGrad.addColorStop(1, 'rgba(101,67,33,0.05)');
    ctx.fillStyle = gGrad;
    ctx.fill();

    // Ground line
    ctx.beginPath();
    ctx.moveTo(xScale(0), yScale(groundStart));
    ctx.lineTo(xScale(pipe.length), yScale(groundEnd));
    ctx.strokeStyle = '#8B6914';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Pipe line
    ctx.beginPath();
    ctx.moveTo(xScale(0), yScale(pipe.startElev));
    ctx.lineTo(xScale(pipe.length), yScale(pipe.endElev));
    const pipeColor = pipe.status === 'blockage' ? '#ef4444' : pipe.status === 'anomaly' ? '#f59e0b' : '#06b6d4';
    ctx.strokeStyle = pipeColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Pipe fill gradient
    ctx.beginPath();
    ctx.moveTo(xScale(0), yScale(pipe.startElev));
    ctx.lineTo(xScale(pipe.length), yScale(pipe.endElev));
    ctx.lineTo(xScale(pipe.length), h);
    ctx.lineTo(xScale(0), h);
    ctx.closePath();
    const pGrad = ctx.createLinearGradient(0, yScale(pipe.startElev), 0, h);
    pGrad.addColorStop(0, pipeColor.replace(')', ',0.2)').replace('rgb', 'rgba'));
    pGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = pGrad;
    ctx.fill();

    // Endpoint dots
    ctx.fillStyle = pipeColor;
    ctx.beginPath(); ctx.arc(xScale(0), yScale(pipe.startElev), 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(xScale(pipe.length), yScale(pipe.endElev), 4, 0, Math.PI * 2); ctx.fill();

    // Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('0m', xScale(0), h - 5);
    ctx.fillText(pipe.length + 'm', xScale(pipe.length), h - 5);

    ctx.fillStyle = pipeColor;
    ctx.font = '9px "JetBrains Mono"';
    ctx.fillText(pipe.startElev.toFixed(1), xScale(0), yScale(pipe.startElev) - 8);
    ctx.fillText(pipe.endElev.toFixed(1), xScale(pipe.length), yScale(pipe.endElev) - 8);

    // Legend
    ctx.fillStyle = '#64748b';
    ctx.font = '8px Inter';
    ctx.textAlign = 'left';
    ctx.fillText('— Ground     — Pipe Invert', padding.left, 12);
  },

  exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(NetworkData, null, 2));
    const node = document.createElement('a');
    node.setAttribute("href", dataStr);
    node.setAttribute("download", "drainsense_network.json");
    document.body.appendChild(node);
    node.click();
    node.remove();
  },

  renderPipesTable() {
    const tbody = document.getElementById('pipes-tbody');
    tbody.innerHTML = '';
    NetworkData.pipes.forEach(pipe => {
      const tr = document.createElement('tr');
      const sColor = pipe.status === 'blockage' ? '#ef4444' : pipe.status === 'anomaly' ? '#f59e0b' : '#10b981';
      const scoreTColor = pipe.mlScore > 0.7 ? 'var(--accent-red)' : pipe.mlScore > 0.35 ? 'var(--accent-amber)' : 'var(--accent-green)';
      tr.innerHTML = `
        <td><div class="status-dot" style="background:${sColor}"></div><span style="text-transform:capitalize">${pipe.status}</span></td>
        <td style="font-family:var(--font-mono); font-weight:600; color:var(--text-primary)">${pipe.id}</td>
        <td style="color:${scoreTColor}; font-weight:600">${(pipe.mlScore * 100).toFixed(0)}%</td>
        <td>${pipe.diameter}mm</td>
      `;
      tr.addEventListener('click', () => {
        document.getElementById('tab-inspector').click();
        this.selectPipe(pipe);
      });
      tbody.appendChild(tr);
    });
  },

  addNetworkNode(type, latlng) {
    if (type === 'add-pipe') {
      let nearest = null, minDist = Infinity;
      [...NetworkData.manholes, ...NetworkData.pumpingStations, ...NetworkData.stps].forEach(n => {
        const d = Map2D.map.distance(latlng, n.position);
        if (d < minDist) { minDist = d; nearest = n; }
      });
      if (!nearest) return;
      
      const newMhId = 'MH-NEW-' + Math.floor(Math.random()*1000);
      NetworkData.manholes.push({
        id: newMhId, position: [latlng.lat, latlng.lng], groundLevel: nearest.groundLevel > 0 ? nearest.groundLevel - 0.5 : 910, depth: 2, type: 'inspection', size: '1000mm'
      });
      
      const newPipeId = 'P-NEW-' + Math.floor(Math.random()*1000);
      NetworkData.pipes.push({
        id: newPipeId, from: nearest.id, to: newMhId, diameter: 200, material: 'PVC', 
        startElev: nearest.groundLevel - 2, endElev: nearest.groundLevel - 2.5, 
        slope: 0.5, length: Math.floor(minDist) || 50, status: 'normal', blockagePoint: null,
        lastMaintenance: new Date().toISOString().split('T')[0], nextCleaning: '2026-10-01', mlScore: 0.05, flowRate: 10, age: 0
      });
    } else {
      const prefix = type === 'add-manhole' ? 'MH' : type === 'add-pump' ? 'PS' : type === 'add-stp' ? 'STP' : 'LS';
      const arr = type === 'add-manhole' ? NetworkData.manholes : type === 'add-pump' ? NetworkData.pumpingStations : type === 'add-stp' ? NetworkData.stps : NetworkData.liftStations;
      
      const id = `${prefix}-NEW-` + Math.floor(Math.random()*1000);
      const nodeObj = { id, position: [latlng.lat, latlng.lng], groundLevel: 915 };
      if (type === 'add-manhole') { nodeObj.depth = 2; nodeObj.type = 'inspection'; nodeObj.size = '1000mm'; }
      if (type === 'add-pump') { nodeObj.capacity = 100; nodeObj.status = 'active'; nodeObj.pumps = 2; nodeObj.activePumps = 1; nodeObj.power = '20 kW'; }
      if (type === 'add-stp') { nodeObj.capacity = 5; nodeObj.type = 'MBR'; nodeObj.status = 'active'; nodeObj.efficiency = '95%'; }
      if (type === 'add-lift') { nodeObj.capacity = 50; nodeObj.liftHeight = 5; nodeObj.status = 'active'; }
      arr.push(nodeObj);
    }
    
    this.refreshNetwork();
  },

  refreshNetwork() {
    Map2D.pipeLayers.forEach(l => {
      if(l.segments) l.segments.forEach(s => Map2D.map.removeLayer(s));
      Map2D.map.removeLayer(l.line);
    });
    Map2D.pipeLayers = [];
    Map2D.renderPipes();
    Map2D.renderNodes();
    
    if (this.is3DActive) {
      View3D.stop();
      View3D.isActive = true;
      View3D.pipeMeshes.forEach(m => View3D.scene.remove(m));
      View3D.pipeMeshes = [];
      View3D.nodeMeshes.forEach(m => View3D.scene.remove(m));
      View3D.nodeMeshes = [];
      View3D._buildNetwork();
    }
    
    this.updateStats();
    if (document.getElementById('tab-pipes').classList.contains('active')) {
      this.renderPipesTable();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
