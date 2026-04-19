// DrainSense Sewer Network - Mock Data
const NetworkData = {
  center: [12.9760, 77.5900],
  zoom: 15,

  manholes: [
    { id: 'MH-N01', position: [12.9830, 77.5850], groundLevel: 924.5, depth: 2.8, type: 'inspection', size: '1200mm' },
    { id: 'MH-N02', position: [12.9830, 77.5900], groundLevel: 924.0, depth: 3.2, type: 'junction', size: '1500mm' },
    { id: 'MH-N03', position: [12.9830, 77.5950], groundLevel: 923.5, depth: 2.5, type: 'inspection', size: '1200mm' },
    { id: 'MH-A01', position: [12.9800, 77.5830], groundLevel: 921.8, depth: 2.0, type: 'inspection', size: '900mm' },
    { id: 'MH-A02', position: [12.9800, 77.5870], groundLevel: 921.5, depth: 2.5, type: 'inspection', size: '1200mm' },
    { id: 'MH-A03', position: [12.9800, 77.5900], groundLevel: 921.0, depth: 3.5, type: 'junction', size: '1500mm' },
    { id: 'MH-A04', position: [12.9800, 77.5940], groundLevel: 921.2, depth: 3.0, type: 'inspection', size: '1200mm' },
    { id: 'MH-A05', position: [12.9800, 77.5980], groundLevel: 921.5, depth: 2.0, type: 'drop', size: '1200mm' },
    { id: 'MH-B01', position: [12.9770, 77.5840], groundLevel: 918.5, depth: 2.0, type: 'inspection', size: '900mm' },
    { id: 'MH-B02', position: [12.9770, 77.5870], groundLevel: 918.2, depth: 2.8, type: 'inspection', size: '1200mm' },
    { id: 'MH-B03', position: [12.9770, 77.5900], groundLevel: 918.0, depth: 4.0, type: 'junction', size: '1800mm' },
    { id: 'MH-B04', position: [12.9770, 77.5940], groundLevel: 918.3, depth: 3.2, type: 'inspection', size: '1200mm' },
    { id: 'MH-B05', position: [12.9770, 77.5970], groundLevel: 918.5, depth: 2.5, type: 'inspection', size: '1200mm' },
    { id: 'MH-C01', position: [12.9740, 77.5850], groundLevel: 915.8, depth: 2.0, type: 'inspection', size: '900mm' },
    { id: 'MH-C02', position: [12.9740, 77.5880], groundLevel: 915.5, depth: 2.5, type: 'inspection', size: '1200mm' },
    { id: 'MH-C03', position: [12.9740, 77.5900], groundLevel: 915.0, depth: 4.5, type: 'junction', size: '1500mm' },
    { id: 'MH-C04', position: [12.9740, 77.5930], groundLevel: 915.3, depth: 3.0, type: 'inspection', size: '1200mm' },
    { id: 'MH-C05', position: [12.9740, 77.5970], groundLevel: 915.5, depth: 2.0, type: 'inspection', size: '1200mm' },
    { id: 'MH-S01', position: [12.9710, 77.5860], groundLevel: 912.5, depth: 2.5, type: 'inspection', size: '1200mm' },
    { id: 'MH-S02', position: [12.9710, 77.5900], groundLevel: 912.0, depth: 4.8, type: 'junction', size: '1800mm' },
    { id: 'MH-S03', position: [12.9710, 77.5940], groundLevel: 912.3, depth: 3.5, type: 'inspection', size: '1200mm' },
  ],

  pipes: [
    // Main trunk (N→S, 600mm RCC)
    { id: 'P-T01', from: 'MH-N02', to: 'MH-A03', diameter: 600, material: 'RCC', startElev: 920.8, endElev: 917.5, slope: 0.99, length: 334, status: 'normal', blockagePoint: null, lastMaintenance: '2025-11-20', nextCleaning: '2026-05-20', mlScore: 0.08, flowRate: 120, age: 12 },
    { id: 'P-T02', from: 'MH-A03', to: 'MH-B03', diameter: 600, material: 'RCC', startElev: 917.5, endElev: 914.0, slope: 1.05, length: 334, status: 'normal', blockagePoint: null, lastMaintenance: '2025-12-05', nextCleaning: '2026-06-05', mlScore: 0.15, flowRate: 185, age: 12 },
    { id: 'P-T03', from: 'MH-B03', to: 'MH-C03', diameter: 600, material: 'RCC', startElev: 914.0, endElev: 910.5, slope: 1.05, length: 334, status: 'anomaly', blockagePoint: null, lastMaintenance: '2025-09-10', nextCleaning: '2026-03-10', mlScore: 0.62, flowRate: 240, age: 15 },
    { id: 'P-T04', from: 'MH-C03', to: 'MH-S02', diameter: 600, material: 'RCC', startElev: 910.5, endElev: 907.2, slope: 0.99, length: 334, status: 'normal', blockagePoint: null, lastMaintenance: '2026-01-15', nextCleaning: '2026-07-15', mlScore: 0.11, flowRate: 280, age: 12 },
    { id: 'P-T05', from: 'MH-S02', to: 'STP-01', diameter: 600, material: 'HDPE', startElev: 907.2, endElev: 905.0, slope: 0.55, length: 400, status: 'normal', blockagePoint: null, lastMaintenance: '2026-02-01', nextCleaning: '2026-08-01', mlScore: 0.05, flowRate: 310, age: 5 },
    { id: 'P-T06', from: 'STP-01', to: 'TP-01', diameter: 450, material: 'HDPE', startElev: 905.0, endElev: 904.0, slope: 0.38, length: 262, status: 'normal', blockagePoint: null, lastMaintenance: '2026-02-10', nextCleaning: '2026-08-10', mlScore: 0.03, flowRate: 300, age: 3 },

    // E-W collectors Row N
    { id: 'P-E01', from: 'MH-N01', to: 'MH-N02', diameter: 300, material: 'RCC', startElev: 921.7, endElev: 920.8, slope: 0.18, length: 556, status: 'normal', blockagePoint: null, lastMaintenance: '2025-10-12', nextCleaning: '2026-04-12', mlScore: 0.10, flowRate: 35, age: 10 },
    { id: 'P-E02', from: 'MH-N03', to: 'MH-N02', diameter: 300, material: 'RCC', startElev: 921.0, endElev: 920.8, slope: 0.04, length: 556, status: 'normal', blockagePoint: null, lastMaintenance: '2025-10-12', nextCleaning: '2026-04-12', mlScore: 0.22, flowRate: 40, age: 10 },

    // E-W collectors Row A
    { id: 'P-E03', from: 'MH-A01', to: 'MH-A02', diameter: 200, material: 'PVC', startElev: 919.8, endElev: 919.0, slope: 0.19, length: 445, status: 'normal', blockagePoint: null, lastMaintenance: '2025-08-20', nextCleaning: '2026-02-20', mlScore: 0.18, flowRate: 15, age: 6 },
    { id: 'P-E04', from: 'MH-A02', to: 'MH-A03', diameter: 300, material: 'RCC', startElev: 919.0, endElev: 917.5, slope: 0.45, length: 334, status: 'anomaly', blockagePoint: null, lastMaintenance: '2025-06-15', nextCleaning: '2026-01-15', mlScore: 0.55, flowRate: 50, age: 14 },
    { id: 'P-E05', from: 'MH-A03', to: 'MH-A04', diameter: 300, material: 'RCC', startElev: 917.5, endElev: 918.2, slope: -0.21, length: 445, status: 'blockage', blockagePoint: 0.65, lastMaintenance: '2025-04-10', nextCleaning: '2026-01-10', mlScore: 0.94, flowRate: 8, age: 18 },
    { id: 'P-E06', from: 'MH-A05', to: 'MH-A04', diameter: 200, material: 'PVC', startElev: 919.5, endElev: 918.2, slope: 0.29, length: 445, status: 'normal', blockagePoint: null, lastMaintenance: '2025-11-01', nextCleaning: '2026-05-01', mlScore: 0.12, flowRate: 20, age: 4 },

    // E-W collectors Row B
    { id: 'P-E07', from: 'MH-B01', to: 'MH-B02', diameter: 200, material: 'PVC', startElev: 916.5, endElev: 915.4, slope: 0.33, length: 334, status: 'normal', blockagePoint: null, lastMaintenance: '2025-07-22', nextCleaning: '2026-01-22', mlScore: 0.14, flowRate: 18, age: 5 },
    { id: 'P-E08', from: 'MH-B02', to: 'MH-B03', diameter: 350, material: 'RCC', startElev: 915.4, endElev: 914.0, slope: 0.42, length: 334, status: 'normal', blockagePoint: null, lastMaintenance: '2025-12-18', nextCleaning: '2026-06-18', mlScore: 0.09, flowRate: 55, age: 10 },
    { id: 'P-E09', from: 'MH-B03', to: 'MH-B04', diameter: 350, material: 'RCC', startElev: 914.0, endElev: 915.1, slope: -0.33, length: 445, status: 'anomaly', blockagePoint: null, lastMaintenance: '2025-05-30', nextCleaning: '2025-12-30', mlScore: 0.48, flowRate: 42, age: 15 },
    { id: 'P-E10', from: 'MH-B05', to: 'MH-B04', diameter: 200, material: 'PVC', startElev: 916.0, endElev: 915.1, slope: 0.27, length: 334, status: 'normal', blockagePoint: null, lastMaintenance: '2025-09-14', nextCleaning: '2026-03-14', mlScore: 0.06, flowRate: 22, age: 3 },

    // E-W collectors Row C
    { id: 'P-E11', from: 'MH-C01', to: 'MH-C02', diameter: 200, material: 'PVC', startElev: 913.8, endElev: 913.0, slope: 0.24, length: 334, status: 'normal', blockagePoint: null, lastMaintenance: '2025-08-05', nextCleaning: '2026-02-05', mlScore: 0.16, flowRate: 14, age: 7 },
    { id: 'P-E12', from: 'MH-C02', to: 'MH-C03', diameter: 300, material: 'RCC', startElev: 913.0, endElev: 910.5, slope: 1.14, length: 222, status: 'normal', blockagePoint: null, lastMaintenance: '2025-11-25', nextCleaning: '2026-05-25', mlScore: 0.07, flowRate: 48, age: 10 },
    { id: 'P-E13', from: 'MH-C03', to: 'MH-C04', diameter: 300, material: 'RCC', startElev: 910.5, endElev: 912.3, slope: -0.54, length: 334, status: 'normal', blockagePoint: null, lastMaintenance: '2026-01-08', nextCleaning: '2026-07-08', mlScore: 0.20, flowRate: 38, age: 10 },
    { id: 'P-E14', from: 'MH-C04', to: 'MH-C05', diameter: 200, material: 'PVC', startElev: 912.3, endElev: 913.5, slope: -0.28, length: 445, status: 'blockage', blockagePoint: 0.40, lastMaintenance: '2025-03-18', nextCleaning: '2025-10-18', mlScore: 0.89, flowRate: 5, age: 20 },

    // E-W collectors Row S
    { id: 'P-E15', from: 'MH-S01', to: 'MH-S02', diameter: 350, material: 'RCC', startElev: 910.0, endElev: 907.2, slope: 0.63, length: 445, status: 'normal', blockagePoint: null, lastMaintenance: '2025-10-30', nextCleaning: '2026-04-30', mlScore: 0.13, flowRate: 65, age: 8 },
    { id: 'P-E16', from: 'MH-S03', to: 'MH-S02', diameter: 350, material: 'RCC', startElev: 908.8, endElev: 907.2, slope: 0.36, length: 445, status: 'anomaly', blockagePoint: null, lastMaintenance: '2025-07-12', nextCleaning: '2026-01-12', mlScore: 0.52, flowRate: 30, age: 16 },

    // N-S secondaries
    { id: 'P-N01', from: 'MH-N01', to: 'MH-A02', diameter: 200, material: 'PVC', startElev: 921.7, endElev: 919.0, slope: 0.73, length: 370, status: 'normal', blockagePoint: null, lastMaintenance: '2025-09-05', nextCleaning: '2026-03-05', mlScore: 0.11, flowRate: 12, age: 5 },
    { id: 'P-N02', from: 'MH-N03', to: 'MH-A04', diameter: 250, material: 'RCC', startElev: 921.0, endElev: 918.2, slope: 0.76, length: 370, status: 'normal', blockagePoint: null, lastMaintenance: '2025-10-20', nextCleaning: '2026-04-20', mlScore: 0.19, flowRate: 25, age: 8 },
    { id: 'P-N03', from: 'MH-A01', to: 'MH-B01', diameter: 150, material: 'PVC', startElev: 919.8, endElev: 916.5, slope: 0.99, length: 334, status: 'normal', blockagePoint: null, lastMaintenance: '2025-06-10', nextCleaning: '2025-12-10', mlScore: 0.25, flowRate: 8, age: 4 },
    { id: 'P-N04', from: 'MH-A05', to: 'MH-B05', diameter: 150, material: 'PVC', startElev: 919.5, endElev: 916.0, slope: 1.05, length: 334, status: 'normal', blockagePoint: null, lastMaintenance: '2025-08-15', nextCleaning: '2026-02-15', mlScore: 0.08, flowRate: 10, age: 3 },
    { id: 'P-N05', from: 'MH-B01', to: 'MH-C01', diameter: 150, material: 'PVC', startElev: 916.5, endElev: 913.8, slope: 0.81, length: 334, status: 'normal', blockagePoint: null, lastMaintenance: '2025-07-01', nextCleaning: '2026-01-01', mlScore: 0.15, flowRate: 12, age: 5 },
    { id: 'P-N06', from: 'MH-B05', to: 'MH-C05', diameter: 150, material: 'PVC', startElev: 916.0, endElev: 913.5, slope: 0.75, length: 334, status: 'normal', blockagePoint: null, lastMaintenance: '2025-09-18', nextCleaning: '2026-03-18', mlScore: 0.10, flowRate: 14, age: 4 },
    { id: 'P-N07', from: 'MH-C01', to: 'MH-S01', diameter: 250, material: 'RCC', startElev: 913.8, endElev: 910.0, slope: 1.14, length: 334, status: 'normal', blockagePoint: null, lastMaintenance: '2025-11-08', nextCleaning: '2026-05-08', mlScore: 0.09, flowRate: 20, age: 8 },
    { id: 'P-N08', from: 'MH-C05', to: 'MH-S03', diameter: 200, material: 'PVC', startElev: 913.5, endElev: 908.8, slope: 1.41, length: 334, status: 'normal', blockagePoint: null, lastMaintenance: '2025-10-25', nextCleaning: '2026-04-25', mlScore: 0.14, flowRate: 18, age: 5 },
  ],

  pumpingStations: [
    { id: 'PS-01', position: [12.9805, 77.5905], groundLevel: 921.0, capacity: 500, status: 'active', pumps: 3, activePumps: 2, power: '45 kW', lastService: '2026-02-15' },
    { id: 'PS-02', position: [12.9715, 77.5870], groundLevel: 912.5, capacity: 800, status: 'active', pumps: 4, activePumps: 3, power: '75 kW', lastService: '2026-01-20' },
  ],

  stps: [
    { id: 'STP-01', position: [12.9685, 77.5920], groundLevel: 910.0, capacity: 10, type: 'MBR', status: 'active', efficiency: '95%', lastAudit: '2026-01-10' },
  ],

  liftStations: [
    { id: 'LS-01', position: [12.9745, 77.5860], groundLevel: 915.5, capacity: 200, status: 'active', liftHeight: 8.5, pumps: 2, lastService: '2025-12-05' },
  ],

  treatmentPlants: [
    { id: 'TP-01', position: [12.9670, 77.5900], groundLevel: 908.0, capacity: 50, type: 'Activated Sludge', status: 'active', area: '2.5 hectares', operatingSince: '2018' },
  ],

  // Helper: build position lookup from all node types
  getNodePosition(nodeId) {
    for (const mh of this.manholes) if (mh.id === nodeId) return mh.position;
    for (const ps of this.pumpingStations) if (ps.id === nodeId) return ps.position;
    for (const stp of this.stps) if (stp.id === nodeId) return stp.position;
    for (const ls of this.liftStations) if (ls.id === nodeId) return ls.position;
    for (const tp of this.treatmentPlants) if (tp.id === nodeId) return tp.position;
    return null;
  },

  getNodeElevation(nodeId) {
    for (const mh of this.manholes) if (mh.id === nodeId) return mh.groundLevel;
    for (const ps of this.pumpingStations) if (ps.id === nodeId) return ps.groundLevel;
    for (const stp of this.stps) if (stp.id === nodeId) return stp.groundLevel;
    for (const ls of this.liftStations) if (ls.id === nodeId) return ls.groundLevel;
    for (const tp of this.treatmentPlants) if (tp.id === nodeId) return tp.groundLevel;
    return 910;
  },

  getStats() {
    const totalLength = this.pipes.reduce((s, p) => s + p.length, 0);
    const blockages = this.pipes.filter(p => p.status === 'blockage').length;
    const anomalies = this.pipes.filter(p => p.status === 'anomaly').length;
    const avgScore = (this.pipes.reduce((s, p) => s + p.mlScore, 0) / this.pipes.length).toFixed(2);
    return { totalLength, totalPipes: this.pipes.length, totalManholes: this.manholes.length, blockages, anomalies, avgScore };
  }
};
