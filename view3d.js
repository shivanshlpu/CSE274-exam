// DrainSense - 3D Three.js Viewer Module
const View3D = {
  scene: null, camera: null, renderer: null, controls: null,
  container: null, raycaster: null, mouse: null,
  pipeMeshes: [], nodeMeshes: [],
  tooltip: null, selectedPipe: null, onPipeSelect: null,
  animationFrameId: null, isActive: false,

  BASE_ELEV: 900,
  V_SCALE: 5,
  PIPE_SCALE: 8,

  init(containerId) {
    this.container = document.getElementById(containerId);
    this.tooltip = document.getElementById('tooltip-3d');

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x070b14, 0.0003);

    // Camera
    const w = this.container.clientWidth || 400;
    const h = this.container.clientHeight || 400;
    this.camera = new THREE.PerspectiveCamera(50, w / h, 1, 5000);
    this.camera.position.set(600, 500, 800);
    this.camera.lookAt(0, 50, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x070b14, 1);
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    // Controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.maxPolarAngle = Math.PI / 2.1;
    this.controls.minDistance = 100;
    this.controls.maxDistance = 2000;
    this.controls.target.set(0, 50, 0);

    // Raycaster
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.raycaster.params.Line = { threshold: 5 };

    // Lighting
    this._setupLights();
    this._buildGround();
    this._buildNetwork();
    this._setupEvents();
  },

  _setupLights() {
    const ambient = new THREE.AmbientLight(0x334466, 0.6);
    this.scene.add(ambient);

    const dir = new THREE.DirectionalLight(0xffeedd, 0.8);
    dir.position.set(500, 800, 300);
    dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    this.scene.add(dir);

    const point = new THREE.PointLight(0x06b6d4, 0.4, 1500);
    point.position.set(0, 300, 0);
    this.scene.add(point);
  },

  _buildGround() {
    // Grid
    const grid = new THREE.GridHelper(2000, 40, 0x1e293b, 0x111827);
    grid.position.y = 0;
    this.scene.add(grid);

    // Ground plane
    const groundGeo = new THREE.PlaneGeometry(2000, 2000);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0d1321, transparent: true, opacity: 0.7, roughness: 0.9
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    this.scene.add(ground);
  },

  _latLngToLocal(lat, lng) {
    const mPerDegLat = 111320;
    const mPerDegLng = 111320 * Math.cos(NetworkData.center[0] * Math.PI / 180);
    return {
      x: (lng - NetworkData.center[1]) * mPerDegLng,
      z: -(lat - NetworkData.center[0]) * mPerDegLat
    };
  },

  _elevToY(elev) {
    return (elev - this.BASE_ELEV) * this.V_SCALE;
  },

  _getStatusColor(status) {
    if (status === 'anomaly') return 0xf59e0b;
    if (status === 'blockage') return 0xef4444;
    return 0x6b7280;
  },

  _buildNetwork() {
    const pipeMatCache = {};
    const getMat = (color) => {
      if (!pipeMatCache[color]) {
        pipeMatCache[color] = new THREE.MeshStandardMaterial({
          color, roughness: 0.6, metalness: 0.2, emissive: color, emissiveIntensity: 0.15
        });
      }
      return pipeMatCache[color];
    };

    // Pipes
    NetworkData.pipes.forEach(pipe => {
      const fromPos = NetworkData.getNodePosition(pipe.from);
      const toPos = NetworkData.getNodePosition(pipe.to);
      if (!fromPos || !toPos) return;

      const p1 = this._latLngToLocal(fromPos[0], fromPos[1]);
      const p2 = this._latLngToLocal(toPos[0], toPos[1]);
      const y1 = this._elevToY(pipe.startElev);
      const y2 = this._elevToY(pipe.endElev);

      const radius = Math.max((pipe.diameter / 1000) * this.PIPE_SCALE, 1.5);

      if (pipe.status === 'normal') {
        const start = new THREE.Vector3(p1.x, y1, p1.z);
        const end = new THREE.Vector3(p2.x, y2, p2.z);
        const curve = new THREE.LineCurve3(start, end);
        const geo = new THREE.TubeGeometry(curve, 8, radius, 8, false);
        const mesh = new THREE.Mesh(geo, getMat(0x6b7280));
        mesh.castShadow = true;
        mesh.userData = { pipe };
        this.scene.add(mesh);
        this.pipeMeshes.push(mesh);
      } else {
        // Multi-segment colored pipe
        const segs = 16;
        for (let i = 0; i < segs; i++) {
          const t1 = i / segs;
          const t2 = (i + 1) / segs;
          const s = new THREE.Vector3(
            p1.x + (p2.x - p1.x) * t1, y1 + (y2 - y1) * t1, p1.z + (p2.z - p1.z) * t1
          );
          const e = new THREE.Vector3(
            p1.x + (p2.x - p1.x) * t2, y1 + (y2 - y1) * t2, p1.z + (p2.z - p1.z) * t2
          );

          let color;
          const mid = (t1 + t2) / 2;
          if (pipe.status === 'anomaly') {
            const lerpT = 0.3 + mid * 0.7;
            color = new THREE.Color(0x6b7280).lerp(new THREE.Color(0xf59e0b), lerpT);
          } else {
            const bp = pipe.blockagePoint || 0.5;
            const dist = Math.abs(mid - bp);
            const intensity = Math.max(0, 1 - dist * 4);
            color = new THREE.Color(0x6b7280).lerp(new THREE.Color(0xef4444), intensity);
          }

          const curve = new THREE.LineCurve3(s, e);
          const geo = new THREE.TubeGeometry(curve, 4, radius, 8, false);
          const mat = new THREE.MeshStandardMaterial({
            color, roughness: 0.6, metalness: 0.2, emissive: color, emissiveIntensity: 0.2
          });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.castShadow = true;
          mesh.userData = { pipe };
          this.scene.add(mesh);
          this.pipeMeshes.push(mesh);
        }
      }
    });

    // Manholes - vertical cylinders
    NetworkData.manholes.forEach(mh => {
      const pos = this._latLngToLocal(mh.position[0], mh.position[1]);
      const topY = this._elevToY(mh.groundLevel);
      const botY = this._elevToY(mh.groundLevel - mh.depth);
      const height = topY - botY;

      const geo = new THREE.CylinderGeometry(3, 3, height, 8);
      const mat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.7, metalness: 0.3 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos.x, botY + height / 2, pos.z);
      mesh.castShadow = true;
      this.scene.add(mesh);
      this.nodeMeshes.push(mesh);

      // Cap
      const capGeo = new THREE.CylinderGeometry(4, 4, 1, 8);
      const capMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.5, metalness: 0.4 });
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(pos.x, topY, pos.z);
      this.scene.add(cap);
      this.nodeMeshes.push(cap);
    });

    // Pumping Stations
    NetworkData.pumpingStations.forEach(ps => {
      const pos = this._latLngToLocal(ps.position[0], ps.position[1]);
      const y = this._elevToY(ps.groundLevel);
      const geo = new THREE.BoxGeometry(12, 20, 12);
      const mat = new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.4, metalness: 0.5, emissive: 0x1e40af, emissiveIntensity: 0.3 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos.x, y + 10, pos.z);
      mesh.castShadow = true;
      this.scene.add(mesh);
      this.nodeMeshes.push(mesh);
    });

    // STPs
    NetworkData.stps.forEach(stp => {
      const pos = this._latLngToLocal(stp.position[0], stp.position[1]);
      const y = this._elevToY(stp.groundLevel);
      const geo = new THREE.CylinderGeometry(15, 15, 16, 16);
      const mat = new THREE.MeshStandardMaterial({ color: 0x065f46, roughness: 0.5, metalness: 0.3, emissive: 0x10b981, emissiveIntensity: 0.2 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos.x, y + 8, pos.z);
      mesh.castShadow = true;
      this.scene.add(mesh);
      this.nodeMeshes.push(mesh);
    });

    // Lift Stations
    NetworkData.liftStations.forEach(ls => {
      const pos = this._latLngToLocal(ls.position[0], ls.position[1]);
      const y = this._elevToY(ls.groundLevel);
      const geo = new THREE.BoxGeometry(10, 30, 10);
      const mat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.5, metalness: 0.4, emissive: 0xf97316, emissiveIntensity: 0.2 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos.x, y + 15, pos.z);
      mesh.castShadow = true;
      this.scene.add(mesh);
      this.nodeMeshes.push(mesh);
    });

    // Treatment Plants
    NetworkData.treatmentPlants.forEach(tp => {
      const pos = this._latLngToLocal(tp.position[0], tp.position[1]);
      const y = this._elevToY(tp.groundLevel);
      // Main building
      const geo = new THREE.BoxGeometry(30, 18, 25);
      const mat = new THREE.MeshStandardMaterial({ color: 0x581c87, roughness: 0.4, metalness: 0.3, emissive: 0xa855f7, emissiveIntensity: 0.2 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos.x, y + 9, pos.z);
      mesh.castShadow = true;
      this.scene.add(mesh);
      this.nodeMeshes.push(mesh);
      // Tower
      const tGeo = new THREE.CylinderGeometry(4, 4, 30, 8);
      const tower = new THREE.Mesh(tGeo, mat.clone());
      tower.position.set(pos.x + 10, y + 15, pos.z - 8);
      this.scene.add(tower);
      this.nodeMeshes.push(tower);
    });
  },

  _setupEvents() {
    this.renderer.domElement.addEventListener('mousemove', (e) => {
      if (!this.isActive) return;
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const hits = this.raycaster.intersectObjects(this.pipeMeshes);

      if (hits.length > 0 && hits[0].object.userData.pipe) {
        const pipe = hits[0].object.userData.pipe;
        this.tooltip.textContent = `${pipe.id} | ${pipe.diameter}mm | ML: ${(pipe.mlScore * 100).toFixed(0)}% | ${pipe.status.toUpperCase()}`;
        this.tooltip.style.left = e.clientX + 'px';
        this.tooltip.style.top = e.clientY + 'px';
        this.tooltip.classList.add('visible');
        document.body.style.cursor = 'pointer';
      } else {
        this.tooltip.classList.remove('visible');
        document.body.style.cursor = 'default';
      }
    });

    this.renderer.domElement.addEventListener('click', (e) => {
      if (!this.isActive) return;
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const hits = this.raycaster.intersectObjects(this.pipeMeshes);

      if (hits.length > 0 && hits[0].object.userData.pipe) {
        this.selectedPipe = hits[0].object.userData.pipe;
        if (this.onPipeSelect) this.onPipeSelect(this.selectedPipe);
      }
    });

    window.addEventListener('resize', () => {
      if (!this.isActive || !this.container) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  },

  start() {
    this.isActive = true;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (w > 0 && h > 0) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }
    this._animate();
  },

  stop() {
    this.isActive = false;
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.tooltip && this.tooltip.classList.remove('visible');
  },

  _animate() {
    if (!this.isActive) return;
    this.animationFrameId = requestAnimationFrame(() => this._animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  },

  resetCamera() {
    this.camera.position.set(600, 500, 800);
    this.controls.target.set(0, 50, 0);
    this.controls.update();
  },

  topView() {
    this.camera.position.set(0, 1200, 0);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  },

  frontView() {
    this.camera.position.set(0, 200, 1000);
    this.controls.target.set(0, 50, 0);
    this.controls.update();
  }
};
