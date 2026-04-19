// DrainSense - 2D Leaflet Map Module
const Map2D = {
  map: null,
  pipeLayers: [],
  nodeLayers: [],
  selectedPipe: null,
  onPipeSelect: null,

  init(containerId) {
    this.map = L.map(containerId, {
      center: NetworkData.center,
      zoom: NetworkData.zoom,
      zoomControl: false,
      attributionControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    // Dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(this.map);

    this.renderPipes();
    this.renderNodes();
  },

  // Color interpolation helper
  interpolateColor(c1, c2, t) {
    const h2r = (hex) => {
      const m = hex.match(/\w\w/g);
      return [parseInt(m[0],16), parseInt(m[1],16), parseInt(m[2],16)];
    };
    const [r1,g1,b1] = h2r(c1);
    const [r2,g2,b2] = h2r(c2);
    const r = Math.round(r1 + (r2-r1)*t);
    const g = Math.round(g1 + (g2-g1)*t);
    const b = Math.round(b1 + (b2-b1)*t);
    return `rgb(${r},${g},${b})`;
  },

  getStatusColor(status) {
    if (status === 'anomaly') return '#f59e0b';
    if (status === 'blockage') return '#ef4444';
    return '#6b7280';
  },

  renderPipes() {
    const GREY = '#6b7280';
    const YELLOW = '#f59e0b';
    const RED = '#ef4444';

    NetworkData.pipes.forEach(pipe => {
      const fromPos = NetworkData.getNodePosition(pipe.from);
      const toPos = NetworkData.getNodePosition(pipe.to);
      if (!fromPos || !toPos) return;

      const segments = 20;
      const weight = Math.max(3, pipe.diameter / 100);

      if (pipe.status === 'normal') {
        const line = L.polyline([fromPos, toPos], {
          color: GREY, weight, opacity: 0.8, lineJoin: 'round', lineCap: 'round'
        }).addTo(this.map);
        this._attachPipeEvents(line, pipe);
        this.pipeLayers.push({ line, pipe });
      } else {
        // Gradient pipe
        const groupLines = [];
        for (let i = 0; i < segments; i++) {
          const t1 = i / segments;
          const t2 = (i + 1) / segments;
          const p1 = [fromPos[0] + (toPos[0]-fromPos[0])*t1, fromPos[1] + (toPos[1]-fromPos[1])*t1];
          const p2 = [fromPos[0] + (toPos[0]-fromPos[0])*t2, fromPos[1] + (toPos[1]-fromPos[1])*t2];

          let color;
          if (pipe.status === 'anomaly') {
            const mid = (t1 + t2) / 2;
            color = this.interpolateColor(GREY, YELLOW, 0.3 + mid * 0.7);
          } else {
            const mid = (t1 + t2) / 2;
            const bp = pipe.blockagePoint || 0.5;
            const dist = Math.abs(mid - bp);
            const intensity = Math.max(0, 1 - dist * 4);
            color = this.interpolateColor(GREY, RED, intensity);
          }

          const seg = L.polyline([p1, p2], {
            color, weight, opacity: 0.9, lineJoin: 'round', lineCap: 'round'
          }).addTo(this.map);
          groupLines.push(seg);
        }

        // Invisible overlay for interaction
        const overlay = L.polyline([fromPos, toPos], {
          color: 'transparent', weight: weight + 8, opacity: 0
        }).addTo(this.map);
        this._attachPipeEvents(overlay, pipe);
        this.pipeLayers.push({ line: overlay, segments: groupLines, pipe });
      }
    });
  },

  _attachPipeEvents(layer, pipe) {
    layer.on('mouseover', (e) => {
      layer.setStyle && layer.setStyle({ opacity: 1 });
      this._showPopup(e.latlng, pipe);
    });
    layer.on('click', (e) => {
      this.selectedPipe = pipe;
      if (this.onPipeSelect) this.onPipeSelect(pipe);
      this._showPopup(e.latlng, pipe);
    });
  },

  _showPopup(latlng, pipe) {
    const scoreColor = pipe.mlScore > 0.7 ? 'high' : pipe.mlScore > 0.35 ? 'medium' : 'low';
    const scoreTextColor = pipe.mlScore > 0.7 ? 'danger' : pipe.mlScore > 0.35 ? 'warning' : 'success';

    const html = `
      <div class="popup-header">
        <span class="pipe-id">${pipe.id}</span>
        <span class="popup-status ${pipe.status}">${pipe.status}</span>
      </div>
      <div class="popup-body">
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Diameter</span>
            <span class="info-value">${pipe.diameter}mm</span>
          </div>
          <div class="info-item">
            <span class="info-label">Material</span>
            <span class="info-value">${pipe.material}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Start Elev.</span>
            <span class="info-value">${pipe.startElev.toFixed(1)}m</span>
          </div>
          <div class="info-item">
            <span class="info-label">End Elev.</span>
            <span class="info-value">${pipe.endElev.toFixed(1)}m</span>
          </div>
          <div class="info-item">
            <span class="info-label">Last Maint.</span>
            <span class="info-value">${pipe.lastMaintenance}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Next Clean</span>
            <span class="info-value">${pipe.nextCleaning}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Flow Rate</span>
            <span class="info-value">${pipe.flowRate} L/s</span>
          </div>
          <div class="info-item">
            <span class="info-label">Length</span>
            <span class="info-value">${pipe.length}m</span>
          </div>
        </div>
        <div class="popup-ml">
          <div class="popup-ml-label">ML Blockage Prediction</div>
          <div class="popup-ml-row">
            <span class="popup-ml-score ${scoreTextColor}">${(pipe.mlScore * 100).toFixed(0)}%</span>
            <div class="ml-score-bar" style="flex:1">
              <div class="ml-score-fill ${scoreColor}" style="width:${pipe.mlScore * 100}%"></div>
            </div>
          </div>
        </div>
      </div>`;

    L.popup({ className: 'ds-popup', maxWidth: 280, closeButton: false })
      .setLatLng(latlng)
      .setContent(html)
      .openOn(this.map);
  },

  renderNodes() {
    this.nodeLayers.forEach(layer => this.map.removeLayer(layer));
    this.nodeLayers = [];

    // Manholes
    NetworkData.manholes.forEach(mh => {
      const icon = L.divIcon({
        className: 'node-marker manhole',
        iconSize: [14, 14], iconAnchor: [7, 7],
        html: ''
      });
      const marker = L.marker(mh.position, { icon }).addTo(this.map)
        .bindTooltip(`<b>${mh.id}</b><br>Type: ${mh.type}<br>Depth: ${mh.depth}m<br>GL: ${mh.groundLevel}m`, {
          className: 'ds-tooltip', direction: 'top', offset: [0, -10]
        });
      this.nodeLayers.push(marker);
    });

    // Pumping Stations
    NetworkData.pumpingStations.forEach(ps => {
      const icon = L.divIcon({
        className: 'node-marker pumping',
        iconSize: [24, 24], iconAnchor: [12, 12],
        html: '<span style="font-size:12px">⚡</span>'
      });
      const marker = L.marker(ps.position, { icon }).addTo(this.map)
        .bindTooltip(`<b>${ps.id}</b><br>Capacity: ${ps.capacity} L/s<br>Pumps: ${ps.activePumps}/${ps.pumps}<br>Power: ${ps.power}`, {
          className: 'ds-tooltip', direction: 'top', offset: [0, -14]
        });
      this.nodeLayers.push(marker);
    });

    // STPs
    NetworkData.stps.forEach(stp => {
      const icon = L.divIcon({
        className: 'node-marker stp',
        iconSize: [28, 28], iconAnchor: [14, 14],
        html: '<span style="font-size:13px">🔄</span>'
      });
      const marker = L.marker(stp.position, { icon }).addTo(this.map)
        .bindTooltip(`<b>${stp.id}</b><br>Type: ${stp.type}<br>Cap: ${stp.capacity} MLD<br>Eff: ${stp.efficiency}`, {
          className: 'ds-tooltip', direction: 'top', offset: [0, -16]
        });
      this.nodeLayers.push(marker);
    });

    // Lift Stations
    NetworkData.liftStations.forEach(ls => {
      const icon = L.divIcon({
        className: 'node-marker lift',
        iconSize: [22, 22], iconAnchor: [11, 11],
        html: '<span style="font-size:11px">⬆</span>'
      });
      const marker = L.marker(ls.position, { icon }).addTo(this.map)
        .bindTooltip(`<b>${ls.id}</b><br>Capacity: ${ls.capacity} L/s<br>Lift: ${ls.liftHeight}m`, {
          className: 'ds-tooltip', direction: 'top', offset: [0, -13]
        });
      this.nodeLayers.push(marker);
    });

    // Treatment Plants
    NetworkData.treatmentPlants.forEach(tp => {
      const icon = L.divIcon({
        className: 'node-marker treatment',
        iconSize: [30, 30], iconAnchor: [15, 15],
        html: '<span style="font-size:14px">🏭</span>'
      });
      const marker = L.marker(tp.position, { icon }).addTo(this.map)
        .bindTooltip(`<b>${tp.id}</b><br>Type: ${tp.type}<br>Cap: ${tp.capacity} MLD<br>Since: ${tp.operatingSince}`, {
          className: 'ds-tooltip', direction: 'top', offset: [0, -17]
        });
      this.nodeLayers.push(marker);
    });
  },

  highlightPipe(pipeId) {
    this.pipeLayers.forEach(({ line, segments, pipe }) => {
      if (pipe.id === pipeId) {
        if (segments) segments.forEach(s => s.setStyle({ weight: 8, opacity: 1 }));
        else line.setStyle({ weight: 8, opacity: 1, color: '#06b6d4' });
      }
    });
  },

  clearHighlight() {
    this.pipeLayers.forEach(({ line, segments, pipe }) => {
      const w = Math.max(3, pipe.diameter / 100);
      if (segments) segments.forEach(s => s.setStyle({ weight: w, opacity: 0.9 }));
      else line.setStyle({ weight: w, opacity: 0.8, color: '#6b7280' });
    });
  }
};
