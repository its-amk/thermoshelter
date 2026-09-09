/**
 * THERMOSHELTER Streamlit-Style Web Application Engine
 * Pure Client-Side Physical Simulation Engine, Responsive Charts, and State Manager
 */

// 1. DATASETS - 26 INDIAN STATES & UNION TERRITORIES
const CLIMATES = {
    Rajasthan: { name: "Rajasthan", capital: "Jaipur", region: "West", lat: 26.9124, lon: 75.7873, alt: 431, avg: 25.8, min: 11.2, max: 41.5, hum: 38, wind: 3.9, rain: 650, zone: "Hot-Arid" },
    Delhi: { name: "Delhi", capital: "New Delhi", region: "North", lat: 28.6139, lon: 77.2090, alt: 216, avg: 25.0, min: 8.5, max: 40.2, hum: 54, wind: 3.2, rain: 790, zone: "Composite" },
    Maharashtra: { name: "Maharashtra", capital: "Mumbai", region: "West", lat: 19.0760, lon: 72.8777, alt: 14, avg: 27.2, min: 19.5, max: 34.0, hum: 74, wind: 3.8, rain: 2200, zone: "Hot-Humid" },
    Karnataka: { name: "Karnataka", capital: "Bengaluru", region: "South", lat: 12.9716, lon: 77.5946, alt: 920, avg: 24.1, min: 15.5, max: 33.5, hum: 65, wind: 2.7, rain: 970, zone: "Temperate" },
    "Tamil Nadu": { name: "Tamil Nadu", capital: "Chennai", region: "South", lat: 13.0827, lon: 80.2707, alt: 7, avg: 28.6, min: 21.0, max: 37.5, hum: 72, wind: 3.9, rain: 1400, zone: "Hot-Humid" },
    Gujarat: { name: "Gujarat", capital: "Ahmedabad", region: "West", lat: 23.0225, lon: 72.5714, alt: 53, avg: 27.0, min: 13.0, max: 42.0, hum: 48, wind: 3.6, rain: 800, zone: "Hot-Arid" },
    Kerala: { name: "Kerala", capital: "Thiruvananthapuram", region: "South", lat: 8.5241, lon: 76.9366, alt: 10, avg: 27.5, min: 22.0, max: 33.0, hum: 80, wind: 3.1, rain: 3100, zone: "Warm-Humid" },
    "West Bengal": { name: "West Bengal", capital: "Kolkata", region: "East", lat: 22.5726, lon: 88.3639, alt: 9, avg: 26.8, min: 14.0, max: 36.5, hum: 75, wind: 3.3, rain: 1800, zone: "Hot-Humid" },
    "Uttar Pradesh": { name: "Uttar Pradesh", capital: "Lucknow", region: "North", lat: 26.8467, lon: 80.9462, alt: 123, avg: 25.5, min: 9.0, max: 41.0, hum: 58, wind: 2.9, rain: 990, zone: "Composite" },
    Punjab: { name: "Punjab", capital: "Amritsar", region: "North", lat: 31.6340, lon: 74.8723, alt: 234, avg: 24.2, min: 6.5, max: 40.5, hum: 56, wind: 3.4, rain: 700, zone: "Composite" },
    Telangana: { name: "Telangana", capital: "Hyderabad", region: "South", lat: 17.3850, lon: 78.4867, alt: 542, avg: 26.5, min: 14.5, max: 39.0, hum: 55, wind: 3.0, rain: 890, zone: "Semi-Arid" },
    "Madhya Pradesh": { name: "Madhya Pradesh", capital: "Bhopal", region: "Central", lat: 23.2599, lon: 77.4126, alt: 527, avg: 25.3, min: 10.0, max: 41.2, hum: 52, wind: 3.1, rain: 1100, zone: "Composite" },
    "Himachal Pradesh": { name: "Himachal Pradesh", capital: "Shimla", region: "North", lat: 31.1048, lon: 77.1734, alt: 2276, avg: 14.5, min: 1.0, max: 26.0, hum: 62, wind: 2.8, rain: 1500, zone: "Cold-Mountain" },
    "Jammu & Kashmir": { name: "Jammu & Kashmir", capital: "Srinagar", region: "North", lat: 34.0837, lon: 74.7973, alt: 1585, avg: 13.8, min: -2.0, max: 31.0, hum: 64, wind: 2.5, rain: 720, zone: "Cold-Temperate" },
    Ladakh: { name: "Ladakh", capital: "Leh", region: "North", lat: 34.1526, lon: 77.5770, alt: 3524, avg: 5.2, min: -12.0, max: 22.0, hum: 30, wind: 4.0, rain: 105, zone: "Cold-Arid" },
    Assam: { name: "Assam", capital: "Guwahati", region: "Northeast", lat: 26.1445, lon: 91.7362, alt: 55, avg: 24.5, min: 11.0, max: 33.5, hum: 82, wind: 2.2, rain: 2800, zone: "Warm-Humid" },
    Odisha: { name: "Odisha", capital: "Bhubaneswar", region: "East", lat: 20.2961, lon: 85.8245, alt: 45, avg: 27.4, min: 15.5, max: 38.0, hum: 73, wind: 3.5, rain: 1500, zone: "Hot-Humid" },
    Bihar: { name: "Bihar", capital: "Patna", region: "East", lat: 25.5941, lon: 85.1376, alt: 53, avg: 25.8, min: 9.5, max: 40.0, hum: 63, wind: 2.8, rain: 1200, zone: "Composite" },
    Uttarakhand: { name: "Uttarakhand", capital: "Dehradun", region: "North", lat: 30.3165, lon: 78.0322, alt: 640, avg: 21.5, min: 5.0, max: 36.0, hum: 65, wind: 2.6, rain: 2100, zone: "Sub-Tropical" },
    Goa: { name: "Goa", capital: "Panaji", region: "West", lat: 15.2993, lon: 74.1240, alt: 31, avg: 27.8, min: 20.5, max: 33.5, hum: 78, wind: 3.7, rain: 3000, zone: "Hot-Humid" },
    "Andhra Pradesh": { name: "Andhra Pradesh", capital: "Visakhapatnam", region: "South", lat: 17.6868, lon: 83.2185, alt: 15, avg: 28.2, min: 19.0, max: 37.0, hum: 70, wind: 3.8, rain: 1100, zone: "Hot-Humid" },
    Jharkhand: { name: "Jharkhand", capital: "Ranchi", region: "East", lat: 23.3441, lon: 85.3096, alt: 651, avg: 24.0, min: 10.0, max: 38.0, hum: 60, wind: 2.9, rain: 1400, zone: "Composite" },
    Chhattisgarh: { name: "Chhattisgarh", capital: "Raipur", region: "Central", lat: 21.2514, lon: 81.6296, alt: 298, avg: 26.5, min: 13.0, max: 42.0, hum: 55, wind: 2.9, rain: 1300, zone: "Composite" },
    Meghalaya: { name: "Meghalaya", capital: "Shillong", region: "Northeast", lat: 25.5788, lon: 91.8933, alt: 1525, avg: 17.2, min: 4.0, max: 25.5, hum: 85, wind: 2.4, rain: 3200, zone: "Temperate-Rainy" },
    Sikkim: { name: "Sikkim", capital: "Gangtok", region: "Northeast", lat: 27.3389, lon: 88.6065, alt: 1650, avg: 15.5, min: 3.0, max: 24.0, hum: 84, wind: 2.3, rain: 3500, zone: "Cold-Mountain" },
    Haryana: { name: "Haryana", capital: "Hisar", region: "North", lat: 29.0588, lon: 76.0856, alt: 220, avg: 24.8, min: 7.0, max: 41.0, hum: 52, wind: 3.3, rain: 600, zone: "Semi-Arid" }
};

const WMO_WEATHER_CODES = {
    0: { desc: "Clear Sky", icon: "☀️" },
    1: { desc: "Mainly Clear", icon: "🌤️" },
    2: { desc: "Partly Cloudy", icon: "⛅" },
    3: { desc: "Overcast", icon: "☁️" },
    45: { desc: "Fog", icon: "🌫️" },
    48: { desc: "Depositing Rime Fog", icon: "🌫️" },
    51: { desc: "Light Drizzle", icon: "🌦️" },
    53: { desc: "Moderate Drizzle", icon: "🌦️" },
    55: { desc: "Dense Drizzle", icon: "🌧️" },
    61: { desc: "Slight Rain", icon: "🌧️" },
    63: { desc: "Moderate Rain", icon: "🌧️" },
    65: { desc: "Heavy Rain", icon: "🌧️" },
    71: { desc: "Slight Snow", icon: "🌨️" },
    73: { desc: "Moderate Snow", icon: "🌨️" },
    75: { desc: "Heavy Snow", icon: "❄️" },
    80: { desc: "Slight Showers", icon: "🌦️" },
    81: { desc: "Moderate Showers", icon: "🌧️" },
    82: { desc: "Violent Showers", icon: "⛈️" },
    95: { desc: "Thunderstorm", icon: "⛈️" },
    96: { desc: "Thunderstorm w/ Hail", icon: "⛈️" }
};

function getCompassBearing(degrees) {
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const idx = Math.round(degrees / 22.5) % 16;
    return directions[idx];
}

const MATERIALS = [
    { name: "Brick", k: 0.80, density: 1600, c: 840, alpha: 0.85, eps: 0.90, cost: 7500, category: "Wall", avail: "Common" },
    { name: "AAC Block", k: 0.24, density: 600, c: 880, alpha: 0.75, eps: 0.90, cost: 6500, category: "Wall", avail: "Common" },
    { name: "Concrete", k: 1.40, density: 2400, c: 880, alpha: 0.70, eps: 0.88, cost: 8000, category: "Wall", avail: "Common" },
    { name: "Mud/Adobe", k: 0.30, density: 1400, c: 850, alpha: 0.80, eps: 0.90, cost: 2500, category: "Wall", avail: "Common" },
    { name: "Compressed Earth Block", k: 0.50, density: 1800, c: 900, alpha: 0.75, eps: 0.90, cost: 4200, category: "Wall", avail: "Common" },
    { name: "Stone", k: 2.00, density: 2400, c: 800, alpha: 0.65, eps: 0.90, cost: 9000, category: "Wall", avail: "Local" },
    { name: "Fly Ash Brick", k: 0.60, density: 1700, c: 840, alpha: 0.75, eps: 0.90, cost: 6000, category: "Wall", avail: "Common" },
    { name: "Hollow Concrete Block", k: 0.55, density: 1200, c: 900, alpha: 0.70, eps: 0.88, cost: 5600, category: "Wall", avail: "Common" },
    { name: "Laterite Block", k: 0.45, density: 1500, c: 900, alpha: 0.75, eps: 0.90, cost: 4500, category: "Wall", avail: "Local" },
    { name: "Rammed Earth", k: 0.45, density: 1900, c: 900, alpha: 0.80, eps: 0.90, cost: 3500, category: "Wall", avail: "Local" },
    { name: "Porotherm Block", k: 0.27, density: 750, c: 880, alpha: 0.75, eps: 0.90, cost: 6800, category: "Wall", avail: "Common" },
    { name: "Timber Wood", k: 0.13, density: 600, c: 1600, alpha: 0.60, eps: 0.90, cost: 18000, category: "Wall", avail: "Common" },
    { name: "RCC", k: 1.70, density: 2400, c: 880, alpha: 0.70, eps: 0.88, cost: 9500, category: "Roof", avail: "Common" },
    { name: "Clay Tile", k: 1.00, density: 1600, c: 840, alpha: 0.85, eps: 0.90, cost: 7000, category: "Roof", avail: "Common" },
    { name: "Mud/Adobe Roof", k: 0.30, density: 1400, c: 850, alpha: 0.80, eps: 0.90, cost: 2800, category: "Roof", avail: "Local" },
    { name: "Metal Sheet", k: 50.00, density: 7800, c: 500, alpha: 0.65, eps: 0.85, cost: 12000, category: "Roof", avail: "Common" },
    { name: "Insulated Metal Sheet", k: 0.04, density: 50, c: 1200, alpha: 0.65, eps: 0.85, cost: 18000, category: "Roof", avail: "Specialized" },
    { name: "Aluminium Sheet", k: 205.00, density: 2700, c: 900, alpha: 0.60, eps: 0.85, cost: 22000, category: "Roof", avail: "Common" },
    { name: "GI Sheet", k: 50.00, density: 7850, c: 500, alpha: 0.65, eps: 0.85, cost: 11000, category: "Roof", avail: "Common" },
    { name: "Terracotta Tile", k: 0.90, density: 1700, c: 840, alpha: 0.82, eps: 0.90, cost: 7500, category: "Roof", avail: "Common" },
    { name: "Fiber Cement Sheet", k: 0.35, density: 1400, c: 900, alpha: 0.65, eps: 0.90, cost: 8500, category: "Roof", avail: "Common" },
    { name: "Thatched Roof", k: 0.09, density: 300, c: 1500, alpha: 0.80, eps: 0.90, cost: 3000, category: "Roof", avail: "Local" },
    { name: "Bamboo/Composite Roof", k: 0.18, density: 700, c: 1400, alpha: 0.75, eps: 0.90, cost: 9000, category: "Roof", avail: "Local" },
    { name: "PUF Sandwich Panel", k: 0.023, density: 45, c: 1400, alpha: 0.45, eps: 0.88, cost: 19500, category: "Roof", avail: "Specialized" },
    { name: "Cool Roof Coating", k: 0.40, density: 1200, c: 1000, alpha: 0.20, eps: 0.92, cost: 14000, category: "Roof", avail: "Common" },
    { name: "EPS", k: 0.038, density: 25, c: 1450, alpha: 0.70, eps: 0.90, cost: 9000, category: "Insulation", avail: "Specialized" },
    { name: "XPS", k: 0.030, density: 35, c: 1450, alpha: 0.65, eps: 0.90, cost: 14000, category: "Insulation", avail: "Specialized" },
    { name: "Rock Wool", k: 0.045, density: 150, c: 840, alpha: 0.75, eps: 0.85, cost: 12000, category: "Insulation", avail: "Specialized" },
    { name: "Glass Wool", k: 0.040, density: 80, c: 840, alpha: 0.75, eps: 0.90, cost: 10000, category: "Insulation", avail: "Specialized" },
    { name: "Expanded Perlite", k: 0.050, density: 120, c: 900, alpha: 0.70, eps: 0.90, cost: 8500, category: "Insulation", avail: "Common" },
    { name: "Vermiculite", k: 0.060, density: 100, c: 1000, alpha: 0.70, eps: 0.90, cost: 8000, category: "Insulation", avail: "Common" },
    { name: "Coir/Coconut Fiber", k: 0.045, density: 120, c: 1500, alpha: 0.80, eps: 0.90, cost: 6500, category: "Insulation", avail: "Local" },
    { name: "Cellulose", k: 0.040, density: 60, c: 1500, alpha: 0.70, eps: 0.90, cost: 7000, category: "Insulation", avail: "Common" },
    { name: "Polyurethane/PIR", k: 0.025, density: 40, c: 1400, alpha: 0.65, eps: 0.90, cost: 22000, category: "Insulation", avail: "Specialized" },
    { name: "Natural Fiber Insulation", k: 0.045, density: 100, c: 1500, alpha: 0.75, eps: 0.90, cost: 7500, category: "Insulation", avail: "Local" },
    { name: "Wood Fiber Board", k: 0.038, density: 160, c: 2100, alpha: 0.70, eps: 0.90, cost: 9500, category: "Insulation", avail: "Common" },
    { name: "Rice Husk Board", k: 0.050, density: 200, c: 1300, alpha: 0.75, eps: 0.90, cost: 5000, category: "Insulation", avail: "Local" }
];

// 2. ACTIVE APPLICATION STATE
let currentAnsysFormat = "apdl";

let state = {
    climate: CLIMATES.Rajasthan,
    solstice: "summer", // 'summer', 'winter', 'equinox'
    metabolicRate: 1.0,
    clothingInsulation: 0.5,
    useLiveTemp: false,
    liveWeather: null,
    selectedRegionFilter: "All",
    stateSearchQuery: "",
    shelter: {
        roofArea: 100,
        wallArea: 400,
        volume: 300,
        thermalMassKg: 50000,
        wallMaterial: MATERIALS[0], // Brick
        wallThickness: 0.23,
        roofMaterial: MATERIALS[13], // Clay Tile
        roofThickness: 0.15,
        roofAlpha: 0.85,
        wallAlpha: 0.85,
        orientationDeg: 0, // 0 = True South
        aspectRatio: 1.5, // 1.5 : 1 E-W elongated
        windowArea: 12, // m²
        glazingType: "double_lowe",
        glazingU: 1.8,
        glazingShgc: 0.72,
        nightShutters: "insulated_r2",
        nightShutterR: 2.0, // m²K/W
        infiltrationAch: 0.25 // ACH
    },
    currentSimulation: null,
    currentHoverHour: -1
};
window.state = state;

// 3. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    populateDesignMaterialDropdowns();
    renderFullMaterialsTable("All", "");
    renderIndianStatesGrid();
    updateClimateDisplay();
    updateDesignParameters();
    fetchCurrentStateLiveWeather();
    runSimulation();
    setupCanvasHover();

    // Initialize 3D viewer & 2D cutaway with layout dimensions
    setTimeout(() => {
        if (typeof init3DShelterViewer === "function") init3DShelterViewer();
        if (typeof renderEnvelopeCutaway === "function") renderEnvelopeCutaway();
    }, 200);

    window.addEventListener("resize", () => {
        if (state.currentSimulation) {
            renderThermalCycleChart(state.currentSimulation);
            renderHeatFlowChart(state.currentSimulation);
        }
    });
});

// Sidebar Toggle
function toggleSidebar() {
    const sb = document.getElementById("sidebar");
    sb.classList.toggle("open");
}

// Navigation Switcher
function switchPage(pageId, btnElement) {
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    if (btnElement) {
        btnElement.classList.add("active");
    } else {
        const matchingBtn = document.querySelector(`.nav-btn[data-page="${pageId}"]`);
        if (matchingBtn) matchingBtn.classList.add("active");
    }

    document.querySelectorAll(".app-page").forEach(page => page.classList.remove("active"));
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) targetPage.classList.add("active");

    if (pageId === "simulate" && state.currentSimulation) {
        setTimeout(() => {
            renderThermalCycleChart(state.currentSimulation);
            renderHeatFlowChart(state.currentSimulation);
        }, 50);
    } else if (pageId === "climate") {
        setTimeout(() => renderClimateDiurnalChart(), 50);
    } else if (pageId === "optimize") {
        setTimeout(() => {
            if (!optimizationCandidates.length) {
                runOptimizationSweep();
            } else {
                renderParetoChart();
                renderOptimizationTable();
            }
        }, 50);
    } else if (pageId === "ansys") {
        updateAnsysScriptPreview();
    } else if (pageId === "design") {
        setTimeout(() => {
            if (typeof init3DShelterViewer === "function") init3DShelterViewer();
            if (typeof update3DGeometry === "function") update3DGeometry();
            if (typeof renderEnvelopeCutaway === "function") {
                if (state.currentSimulation) {
                    renderEnvelopeCutaway(state.currentSimulation.outMin, state.currentSimulation.inMin);
                } else {
                    renderEnvelopeCutaway();
                }
            }
        }, 80);
    }
}

// 4. PHYSICS ENGINE (Exact Equations from Core Python Modules)
function calculateUValue(thickness, k, h_i = 8.0, h_o = 25.0) {
    const rTotal = (1.0 / h_i) + (thickness / k) + (1.0 / h_o);
    return 1.0 / rTotal;
}

function calculateSolarAltitude(lat, hour, dayOfYear) {
    const declination = 23.45 * Math.sin((360.0 * (dayOfYear - 81.0) / 365.25) * Math.PI / 180.0);
    const hourAngle = (hour - 12.0) * 15.0;

    const latRad = lat * Math.PI / 180.0;
    const decRad = declination * Math.PI / 180.0;
    const hraRad = hourAngle * Math.PI / 180.0;

    const sinAlt = Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(hraRad);
    return Math.asin(Math.max(-1.0, Math.min(1.0, sinAlt))) * 180.0 / Math.PI;
}

function calculatePMV(opTemp, met) {
    const factor = 0.303 * Math.exp(-0.036 * met) + 0.028;
    // Standard ASHRAE 55 neutral temperature for 0.5 clo summer clothing is 24.0°C; 22.0°C for 1.0 clo winter clothing
    const neutralTemp = (state && state.solstice === "winter") ? 22.0 : 24.0;
    let pmv = factor * (opTemp - neutralTemp);
    return Math.max(-3.0, Math.min(3.0, pmv));
}

function calculatePPD(pmv) {
    let ppd = 100.0 - 95.0 * Math.exp(-(0.03353 * Math.pow(pmv, 4) + 0.2179 * Math.pow(pmv, 2)));
    return Math.max(5.0, Math.min(100.0, ppd));
}

// 5. 24-HOUR TRANSIENT SIMULATION RUNNER (Core Physics for Task 1, Task 2, and Task 3)
function runSimulation() {
    const climate = state.climate;
    const s = state.shelter;
    const netWallArea = Math.max(10.0, s.wallArea - s.windowArea);
    const uWall = calculateUValue(s.wallThickness, s.wallMaterial.k);
    const uRoof = calculateUValue(s.roofThickness, s.roofMaterial.k);

    const dayOfYear = state.solstice === "summer" ? 172 : state.solstice === "winter" ? 355 : 80;
    const avgTemp = climate.avg;
    const amplitude = (climate.max - climate.min) / 2.0;

    // Optional Real-Time Live Telemetry Coupling
    let liveTempOffset = 0;
    let activeWind = climate.wind;
    let liveDni = null;
    let liveDhi = null;

    if (state.useLiveTemp && state.liveWeather && typeof state.liveWeather.temperature_2m === "number") {
        const currentHour = new Date().getHours();
        const modeledCurrentHourTemp = avgTemp + amplitude * Math.cos((currentHour - 14.0) * 15.0 * Math.PI / 180.0);
        liveTempOffset = state.liveWeather.temperature_2m - modeledCurrentHourTemp;
        if (state.liveWeather.wind_speed_10m) {
            activeWind = Math.max(0.5, state.liveWeather.wind_speed_10m / 3.6);
        }
        if (state.liveWeather.direct_normal_irradiance !== undefined) {
            liveDni = state.liveWeather.direct_normal_irradiance;
        }
        if (state.liveWeather.diffuse_radiation !== undefined) {
            liveDhi = state.liveWeather.diffuse_radiation;
        }
    }

    // Thermal mass heat capacity C_total (Joules/K)
    const cTotal = Math.max(100000.0, s.thermalMassKg * s.wallMaterial.c);

    // Convective surface resistances (W/m²·K)
    const ho = 22.0; // exterior boundary conductance
    const hi = 8.0;  // interior boundary conductance

    // ASHRAE 55 Adaptive Comfort Model baseline for natural/passive emergency shelters
    const tComfAdaptive = 17.8 + 0.31 * (avgTemp + liveTempOffset);
    const adaptiveLower = Math.max(20.0, tComfAdaptive - 3.5);
    const adaptiveUpper = Math.min(27.5, tComfAdaptive + 3.5);

    // Warmup cycles (2 diurnal periods) to allow heavy thermal mass to achieve cyclic periodic steady-state equilibrium
    let indoorTemp = avgTemp + liveTempOffset;
    for (let warmup = 0; warmup < 2; warmup++) {
        for (let h = 0; h < 24; h++) {
            const outdoorT = avgTemp + liveTempOffset + amplitude * Math.cos((h - 14.0) * 15.0 * Math.PI / 180.0);
            const altDeg = calculateSolarAltitude(climate.lat, h, dayOfYear);
            const altRad = altDeg * Math.PI / 180.0;

            let qWindowSolar = 0;
            let tSolAirRoof = outdoorT;
            let tSolAirWall = outdoorT;

            if (altDeg > 0) {
                const dni = (liveDni !== null && liveDni > 0) ? liveDni : 850;
                const dhi = (liveDhi !== null && liveDhi > 0) ? liveDhi : 120;
                const beamRoof = dni * Math.sin(altRad);
                const roofIrr = Math.max(0, beamRoof) + dhi;

                const hourAngleDeg = (h - 12.0) * 15.0;
                const relAzimuthDeg = hourAngleDeg - (s.orientationDeg || 0);
                const cosIncidence = Math.cos(altRad) * Math.cos(relAzimuthDeg * Math.PI / 180.0);
                const beamSouth = Math.max(0, dni * Math.max(0, cosIncidence));
                const wallSouthIrr = beamSouth + (dhi * 0.5);
                const wallAvgIrr = (dni * Math.cos(altRad) * 0.25) + (dhi * 0.5);

                qWindowSolar = s.windowArea * wallSouthIrr * s.glazingShgc;
                tSolAirRoof = outdoorT + (s.roofAlpha * roofIrr) / ho;
                tSolAirWall = outdoorT + (s.wallAlpha * (wallSouthIrr * 0.35 + wallAvgIrr * 0.65)) / ho;
            }

            const qCond = (uRoof * s.roofArea * (tSolAirRoof - indoorTemp)) + (uWall * netWallArea * (tSolAirWall - indoorTemp));
            let effGlazingU = s.glazingU;
            if (altDeg <= 0) {
                const shutterR = s.nightShutterR || 0.0;
                effGlazingU = 1.0 / ((1.0 / s.glazingU) + shutterR);
            }
            const qGlaze = effGlazingU * s.windowArea * (outdoorT - indoorTemp);
            const qInfil = 0.33 * s.infiltrationAch * s.volume * (outdoorT - indoorTemp);
            const hConv = 10.0 + 4.0 * activeWind;
            const qConv = hConv * (netWallArea * 0.08) * (outdoorT - indoorTemp);
            const qRad = (altDeg <= 0) ? s.roofMaterial.eps * 25.0 * s.roofArea : 0;

            const qNet = qWindowSolar + qCond + qGlaze + qInfil + qConv - qRad;
            indoorTemp = Math.max(-18.0, Math.min(48.0, indoorTemp + (qNet * 3600.0) / cTotal));
        }
    }

    // Main 24-Hour Simulation Day
    const timesteps = [];
    let comfortableCount = 0;
    let totalSolarGainWh = 0;
    let totalConductionWh = 0;
    let totalGlazingWh = 0;
    let totalInfilWh = 0;
    let peakSolarW = 0;

    for (let h = 0; h < 24; h++) {
        // Diurnal outdoor temperature curve (peak at 14:00), modulated by live telemetry if synced
        const outdoorT = avgTemp + liveTempOffset + amplitude * Math.cos((h - 14.0) * 15.0 * Math.PI / 180.0);

        // 1. Solar Radiation & Thermal Generation (TASK 2)
        const altDeg = calculateSolarAltitude(climate.lat, h, dayOfYear);
        const altRad = altDeg * Math.PI / 180.0;

        let roofIrr = 0;
        let wallSouthIrr = 0;
        let wallAvgIrr = 0;
        let qWindowSolar = 0;
        let qRoofSolar = 0;
        let qWallSolar = 0;
        let qOpaqueSolar = 0;
        let qSolar = 0;
        let tSolAirRoof = outdoorT;
        let tSolAirWall = outdoorT;

        if (altDeg > 0) {
            const dni = (liveDni !== null && liveDni > 0) ? liveDni : 850;
            const dhi = (liveDhi !== null && liveDhi > 0) ? liveDhi : 120;

            // Horizontal roof solar irradiance
            const beamRoof = dni * Math.sin(altRad);
            roofIrr = Math.max(0, beamRoof) + dhi;

            // South-oriented vertical surface (solar collector façade)
            const hourAngleDeg = (h - 12.0) * 15.0;
            const relAzimuthDeg = hourAngleDeg - (s.orientationDeg || 0);
            const cosIncidence = Math.cos(altRad) * Math.cos(relAzimuthDeg * Math.PI / 180.0);
            const beamSouth = Math.max(0, dni * Math.max(0, cosIncidence));
            wallSouthIrr = beamSouth + (dhi * 0.5);

            // Other perimeter walls average irradiance
            wallAvgIrr = (dni * Math.cos(altRad) * 0.25) + (dhi * 0.5);

            // Thermal energy generated from solar radiation through window openings
            qWindowSolar = s.windowArea * wallSouthIrr * s.glazingShgc;

            // Solar radiation absorbed by opaque envelope (for solar resource KPI reporting)
            qRoofSolar = s.roofAlpha * roofIrr * s.roofArea;
            qWallSolar = s.wallAlpha * ((wallSouthIrr * 0.35 + wallAvgIrr * 0.65) * netWallArea);
            qOpaqueSolar = qRoofSolar + qWallSolar;
            qSolar = qWindowSolar + qOpaqueSolar;

            // Sol-Air external boundary temperatures for roof & walls
            tSolAirRoof = outdoorT + (s.roofAlpha * roofIrr) / ho;
            tSolAirWall = outdoorT + (s.wallAlpha * (wallSouthIrr * 0.35 + wallAvgIrr * 0.65)) / ho;
        }

        if (qSolar > peakSolarW) peakSolarW = qSolar;
        totalSolarGainWh += qSolar;

        // 2. Opaque Conduction Heat Flow through Sol-Air boundary (TASK 3)
        const qCondRoof = uRoof * s.roofArea * (tSolAirRoof - indoorTemp);
        const qCondWall = uWall * netWallArea * (tSolAirWall - indoorTemp);
        const qCond = qCondRoof + qCondWall;
        totalConductionWh += qCond;

        // 3. Glazing Heat Flow & Nocturnal Shutter Decoupling (TASK 3)
        let effGlazingU = s.glazingU;
        if (altDeg <= 0) {
            // After sunset: night insulation shutter deployed across openings
            const shutterR = s.nightShutterR || 0.0;
            effGlazingU = 1.0 / ((1.0 / s.glazingU) + shutterR);
        }
        const qGlaze = effGlazingU * s.windowArea * (outdoorT - indoorTemp);
        totalGlazingWh += qGlaze;

        // 4. Infiltration Air Leakage Heat Transfer (TASK 3)
        const qInfil = 0.33 * s.infiltrationAch * s.volume * (outdoorT - indoorTemp);
        totalInfilWh += qInfil;

        // 5. Convection (wind velocity dependent)
        const hConv = 10.0 + 4.0 * activeWind;
        const qConv = hConv * (netWallArea * 0.08) * (outdoorT - indoorTemp);

        // 6. Stefan-Boltzmann Sky Longwave Radiation Dissipation
        const qRad = (altDeg <= 0) ? s.roofMaterial.eps * 25.0 * s.roofArea : 0;

        // Net Heat Influx & Thermal Mass Lag (TASK 1: Inside Temperature Prediction)
        const qNet = qWindowSolar + qCond + qGlaze + qInfil + qConv - qRad;
        const dtSeconds = 3600.0;
        const tempDelta = (qNet * dtSeconds) / cTotal;
        indoorTemp = Math.max(-18.0, Math.min(48.0, indoorTemp + tempDelta));

        // Operative Temperature & Comfort Assessment (Interior Mean Radiant Temperature)
        const tInsideSurfRoof = indoorTemp + (uRoof / hi) * (tSolAirRoof - indoorTemp);
        const tInsideSurfWall = indoorTemp + (uWall / hi) * (tSolAirWall - indoorTemp);
        const tMrt = (tInsideSurfRoof * s.roofArea + tInsideSurfWall * netWallArea) / (s.roofArea + netWallArea);
        const tOp = 0.5 * indoorTemp + 0.5 * tMrt;

        const pmv = calculatePMV(tOp, state.metabolicRate);
        const ppd = calculatePPD(pmv);
        // ASHRAE Standard 55 Band (22.0°C–26.0°C) or Adaptive 80% Acceptability Band for passive shelters
        const isComfortable = (tOp >= 22.0 && tOp <= 26.0) || (tOp >= adaptiveLower && tOp <= adaptiveUpper && ppd < 20.0);

        if (isComfortable) comfortableCount++;

        timesteps.push({
            hour: h,
            outdoorTemp: outdoorT,
            indoorTemp: indoorTemp,
            opTemp: tOp,
            qSolar: qSolar,
            qWindowSolar: qWindowSolar,
            qOpaqueSolar: qOpaqueSolar,
            qCond: qCond,
            qGlaze: qGlaze,
            qInfil: qInfil,
            qConv: qConv,
            qRad: qRad,
            qNet: qNet,
            deltaT: outdoorT - indoorTemp,
            pmv: pmv,
            ppd: ppd,
            isComfortable: isComfortable
        });
    }

    const inTemps = timesteps.map(t => t.indoorTemp);
    const outTemps = timesteps.map(t => t.outdoorTemp);

    const simulation = {
        timesteps: timesteps,
        comfortableHours: comfortableCount,
        comfortPercentage: (comfortableCount / 24.0) * 100.0,
        inMin: Math.min(...inTemps),
        inMax: Math.max(...inTemps),
        inSwing: Math.max(...inTemps) - Math.min(...inTemps),
        outMin: Math.min(...outTemps),
        outMax: Math.max(...outTemps),
        outSwing: Math.max(...outTemps) - Math.min(...outTemps),
        peakSolarW: peakSolarW,
        totalSolarKwh: totalSolarGainWh / 1000.0,
        totalConductionKwh: totalConductionWh / 1000.0,
        totalGlazingKwh: totalGlazingWh / 1000.0,
        totalInfilKwh: totalInfilWh / 1000.0,
        netBalanceWh: timesteps.reduce((acc, t) => acc + t.qNet, 0) / 24.0
    };

    state.currentSimulation = simulation;
    updateSimulationKPIs(simulation);
    renderThermalCycleChart(simulation);
    renderHeatFlowChart(simulation);
    renderHourlyLogTable(simulation);

    // Keep visualizers synced with live simulation metrics
    if (_3D.initialized && typeof update3DGeometry === "function") update3DGeometry();
    if (typeof renderEnvelopeCutaway === "function") renderEnvelopeCutaway(simulation.outMin, simulation.inMin);
}

// 6. UPDATE SIMULATION DASHBOARD KPIS (Tasks 1, 2, 3 Fulfillments)
function updateSimulationKPIs(sim) {
    const elBanner = document.getElementById("kpi-comfort-banner");
    if (elBanner) elBanner.innerText = `Comfort: ${sim.comfortPercentage.toFixed(1)}% of Day (${sim.comfortableHours}/24 hrs)`;

    const elHours = document.getElementById("kpi-comfort-hours");
    if (elHours) elHours.innerText = `${sim.comfortableHours} / 24 hrs`;

    const elPct = document.getElementById("kpi-comfort-pct");
    if (elPct) {
        elPct.innerText = `${sim.comfortPercentage.toFixed(1)}% in ASHRAE Band`;
        elPct.className = `metric-delta ${sim.comfortableHours > 0 ? 'delta-positive' : 'delta-warn'}`;
    }

    const elInR = document.getElementById("kpi-indoor-range");
    if (elInR) elInR.innerText = `${sim.inMin.toFixed(1)}°C – ${sim.inMax.toFixed(1)}°C`;

    const elInS = document.getElementById("kpi-indoor-swing");
    if (elInS) elInS.innerText = `Swing: ${sim.inSwing.toFixed(1)}°C`;

    const elOutR = document.getElementById("kpi-outdoor-range");
    if (elOutR) elOutR.innerText = `${sim.outMin.toFixed(1)}°C – ${sim.outMax.toFixed(1)}°C`;

    const elOutS = document.getElementById("kpi-outdoor-swing");
    if (elOutS) elOutS.innerText = `Diurnal Swing: ${sim.outSwing.toFixed(1)}°C`;

    const elSolarKwh = document.getElementById("kpi-solar-kwh");
    if (elSolarKwh) elSolarKwh.innerText = `${Math.round(sim.totalSolarKwh).toLocaleString()} kWh`;

    const elPeakSolar = document.getElementById("kpi-peak-solar");
    if (elPeakSolar) elPeakSolar.innerText = `Peak: ${(sim.peakSolarW / 1000).toFixed(1)} kW`;

    const elNet = document.getElementById("kpi-net-energy");
    if (elNet) elNet.innerText = `${sim.netBalanceWh >= 0 ? '+' : ''}${Math.round(sim.netBalanceWh).toLocaleString()} Wh`;

    // Task 3: Heat Flow Details by deltaT
    const midStep = sim.timesteps[12] || sim.timesteps[0];
    const elSolarVal = document.getElementById("mode-solar-val");
    if (elSolarVal) elSolarVal.innerText = `+${(midStep.qSolar / 1000).toFixed(1)} kW`;

    const elCondVal = document.getElementById("mode-cond-val");
    if (elCondVal) elCondVal.innerText = `${(midStep.qCond / 1000).toFixed(1)} kW`;

    const elConvVal = document.getElementById("mode-conv-val");
    if (elConvVal) elConvVal.innerText = `${(midStep.qConv / 1000).toFixed(1)} kW`;

    const elRadVal = document.getElementById("mode-rad-val");
    if (elRadVal) elRadVal.innerText = `-${(midStep.qRad / 1000).toFixed(1)} kW`;

    const elGlazeVal = document.getElementById("mode-glaze-val");
    if (elGlazeVal) elGlazeVal.innerText = `${(midStep.qGlaze / 1000).toFixed(1)} kW`;

    const elInfilVal = document.getElementById("mode-infil-val");
    if (elInfilVal) elInfilVal.innerText = `${(midStep.qInfil / 1000).toFixed(1)} kW`;
}

// 7. RENDER 24-HOUR THERMAL CYCLE CHART
function renderThermalCycleChart(sim) {
    const canvas = document.getElementById("thermalCycleCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const w = canvas.width = canvas.parentElement.clientWidth || 1000;
    const h = canvas.height = 340;

    ctx.clearRect(0, 0, w, h);

    const padL = 50, padR = 25, padT = 25, padB = 40;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;

    // Y Axis scaling (typically 0°C to 50°C)
    const minTemp = Math.floor(Math.min(sim.outMin, sim.inMin, 15) / 5) * 5;
    const maxTemp = Math.ceil(Math.max(sim.outMax, sim.inMax, 35) / 5) * 5 + 5;
    const tempSpan = maxTemp - minTemp;

    const getY = (t) => padT + chartH - ((t - minTemp) / tempSpan) * chartH;
    const getX = (hour) => padL + (hour / 23.0) * chartW;

    // 1. Draw ASHRAE 55 Comfort Zone Band (22°C to 26°C)
    const y26 = getY(26.0);
    const y22 = getY(22.0);
    ctx.fillStyle = "rgba(0, 212, 178, 0.15)";
    ctx.fillRect(padL, y26, chartW, y22 - y26);
    ctx.strokeStyle = "rgba(0, 212, 178, 0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(padL, y26, chartW, y22 - y26);

    // Comfort Zone Label
    ctx.fillStyle = "#00d4b2";
    ctx.font = "11px Inter, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("ASHRAE 55 Band (22–26°C)", padL + chartW - 10, y26 + 16);

    // 2. Horizontal Grid Lines & Y Axis Labels
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#94a3b8";
    ctx.textAlign = "right";
    ctx.font = "11px 'Fira Code', monospace";

    for (let t = minTemp; t <= maxTemp; t += 5) {
        const y = getY(t);
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(padL + chartW, y);
        ctx.stroke();
        ctx.fillText(`${t}°C`, padL - 8, y + 4);
    }

    // 3. X Axis Labels (Hours 00:00 to 23:00)
    ctx.textAlign = "center";
    for (let hour = 0; hour < 24; hour += 3) {
        const x = getX(hour);
        ctx.beginPath();
        ctx.moveTo(x, padT + chartH);
        ctx.lineTo(x, padT + chartH + 5);
        ctx.stroke();
        ctx.fillText(`${hour}:00`, x, padT + chartH + 20);
    }

    // Helper to draw smooth path
    function drawLine(key, color, lineWidth = 2.5, isDashed = false) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        if (isDashed) ctx.setLineDash([4, 4]);
        else ctx.setLineDash([]);

        sim.timesteps.forEach((ts, idx) => {
            const x = getX(ts.hour);
            const y = getY(ts[key]);
            if (idx === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // Draw Lines: Outdoor (Orange), Indoor (Cyan), Operative (Purple)
    drawLine("outdoorTemp", "#ff9800", 2.0, true);
    drawLine("indoorTemp", "#38bdf8", 3.0);
    drawLine("opTemp", "#c084fc", 2.2);

    // Hover Crosshair Inspector
    if (state.currentHoverHour >= 0 && state.currentHoverHour < 24) {
        const ts = sim.timesteps[state.currentHoverHour];
        const hx = getX(ts.hour);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(hx, padT);
        ctx.lineTo(hx, padT + chartH);
        ctx.stroke();
        ctx.setLineDash([]);

        // Points
        const drawPoint = (val, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(hx, getY(val), 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 1.5;
            ctx.stroke();
        };

        drawPoint(ts.outdoorTemp, "#ff9800");
        drawPoint(ts.indoorTemp, "#38bdf8");
        drawPoint(ts.opTemp, "#c084fc");

        // Tooltip footer
        document.getElementById("chart-hover-inspect").innerHTML = `
            <strong>Hour ${ts.hour}:00</strong> &bull; 
            Outdoor: <span style="color:#ff9800">${ts.outdoorTemp.toFixed(1)}°C</span> &bull; 
            Indoor: <span style="color:#38bdf8">${ts.indoorTemp.toFixed(1)}°C</span> &bull; 
            Operative $T_{op}$: <span style="color:#c084fc">${ts.opTemp.toFixed(1)}°C</span> &bull; 
            PMV: <strong>${(ts.pmv >= 0 ? '+' : '') + ts.pmv.toFixed(2)}</strong> &bull; 
            PPD: <strong>${ts.ppd.toFixed(1)}%</strong> &bull; 
            Solar: <strong>${Math.round(ts.qSolar).toLocaleString()} W</strong> &bull; 
            Status: <span class="badge-status ${ts.isComfortable ? 'in-zone' : 'out-zone'}">${ts.isComfortable ? 'COMFORTABLE' : 'UNCOMFORTABLE'}</span>
        `;
    }
}

// 8. RENDER HEAT FLOW CHART (TASK 3: Decomposition Across Temperature Difference)
function renderHeatFlowChart(sim) {
    const canvas = document.getElementById("heatFlowCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const w = canvas.width = canvas.parentElement.clientWidth || 480;
    const h = canvas.height = 250;
    ctx.clearRect(0, 0, w, h);

    const padL = 45, padR = 20, padT = 25, padB = 35;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;
    const zeroY = padT + chartH * 0.60;

    // Background horizontal grid line & Zero reference
    ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, zeroY);
    ctx.lineTo(padL + chartW, zeroY);
    ctx.stroke();

    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px 'Fira Code', monospace";
    ctx.textAlign = "right";
    ctx.fillText("0 W", padL - 8, zeroY + 3);

    const barW = (chartW / 24) * 0.72;

    sim.timesteps.forEach(ts => {
        const x = padL + (ts.hour / 24) * chartW;

        // 1. Solar Thermal Generation (positive yellow bar)
        if (ts.qSolar > 0) {
            const solarH = Math.min(zeroY - padT, (ts.qSolar / 120000) * (chartH * 0.50));
            ctx.fillStyle = "#facc15";
            ctx.fillRect(x, zeroY - solarH, barW, solarH);
        }

        // 2. Opaque Conduction (red if entering, blue if exiting)
        if (ts.qCond !== 0) {
            const condH = Math.min(chartH * 0.35, (Math.abs(ts.qCond) / 25000) * (chartH * 0.30));
            ctx.fillStyle = ts.qCond > 0 ? "#ef4444" : "#3b82f6";
            ctx.fillRect(x + 1, ts.qCond > 0 ? zeroY - condH : zeroY, barW * 0.5, condH);
        }

        // 3. Glazing / Openings Heat Flow (cyan)
        if (ts.qGlaze !== 0) {
            const glazeH = Math.min(chartH * 0.30, (Math.abs(ts.qGlaze) / 25000) * (chartH * 0.25));
            ctx.fillStyle = ts.qGlaze > 0 ? "#22d3ee" : "#0284c7";
            ctx.fillRect(x + barW * 0.5, ts.qGlaze > 0 ? zeroY - glazeH : zeroY, barW * 0.45, glazeH);
        }

        // 4. Infiltration Loss (pink indicator)
        if (ts.qInfil < 0) {
            const infilH = Math.min(chartH * 0.25, (Math.abs(ts.qInfil) / 25000) * (chartH * 0.20));
            ctx.fillStyle = "#f472b6";
            ctx.fillRect(x + 2, zeroY, barW - 4, infilH);
        }
    });

    // X-Axis Hour Markers
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px 'Fira Code', monospace";
    ctx.textAlign = "center";
    for (let hour = 0; hour < 24; hour += 4) {
        const x = padL + (hour / 24) * chartW + barW / 2;
        ctx.fillText(`${hour}:00`, x, padT + chartH + 18);
    }
}

// 9. SETUP HOVER INSPECTOR ON CANVAS
function setupCanvasHover() {
    const canvas = document.getElementById("thermalCycleCanvas");
    if (!canvas) return;

    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const padL = 50, padR = 25;
        const chartW = canvas.width - padL - padR;

        if (mouseX >= padL && mouseX <= padL + chartW) {
            const frac = (mouseX - padL) / chartW;
            state.currentHoverHour = Math.max(0, Math.min(23, Math.round(frac * 23)));
            if (state.currentSimulation) renderThermalCycleChart(state.currentSimulation);
        }
    });

    canvas.addEventListener("mouseleave", () => {
        state.currentHoverHour = -1;
        if (state.currentSimulation) renderThermalCycleChart(state.currentSimulation);
    });
}

// 10. RENDER HOURLY LOG TABLE
function renderHourlyLogTable(sim) {
    const tbody = document.getElementById("hourly-log-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    sim.timesteps.forEach(ts => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${ts.hour.toString().padStart(2, '0')}:00</strong></td>
            <td>${ts.outdoorTemp.toFixed(1)}°C</td>
            <td>${ts.indoorTemp.toFixed(1)}°C</td>
            <td style="color:#c084fc;font-weight:600">${ts.opTemp.toFixed(1)}°C</td>
            <td>${(ts.pmv >= 0 ? '+' : '') + ts.pmv.toFixed(2)}</td>
            <td>${ts.ppd.toFixed(1)}%</td>
            <td><span class="badge-status ${ts.isComfortable ? 'in-zone' : 'out-zone'}">${ts.isComfortable ? 'Comfort' : 'Discomfort'}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// 11. SITE & CLIMATE VIEW UPDATES & LIVE TELEMETRY
function updateClimateDisplay() {
    const c = state.climate;
    const topBadge = document.getElementById("top-climate-badge");
    if (topBadge) topBadge.innerText = `${c.name} (${c.zone})`;
    
    const elZone = document.getElementById("cl-zone-name");
    if (elZone) elZone.innerText = c.zone;
    
    const elElev = document.getElementById("cl-elev");
    if (elElev) elElev.innerText = `Elevation: ${c.alt}m • ${c.region} India`;
    
    const elAvg = document.getElementById("cl-avg-temp");
    if (elAvg) elAvg.innerText = `${c.avg.toFixed(1)} °C`;
    
    const elRange = document.getElementById("cl-temp-range");
    if (elRange) elRange.innerText = `Min ${c.min.toFixed(1)}°C • Max ${c.max.toFixed(1)}°C (Swing ${(c.max - c.min).toFixed(1)}°C)`;
    
    const elHum = document.getElementById("cl-humidity");
    if (elHum) elHum.innerText = `${c.hum} %`;
    
    const elWind = document.getElementById("cl-wind");
    if (elWind) elWind.innerText = `${c.wind} m/s`;
    
    const elHConv = document.getElementById("cl-h-conv");
    if (elHConv) elHConv.innerText = `h = ${(10.0 + 4.0 * c.wind).toFixed(1)} W/m²·K`;
    
    const elRain = document.getElementById("cl-rain");
    if (elRain) elRain.innerText = `${c.rain} mm`;
    
    const optTarget = document.getElementById("opt-climate-target");
    if (optTarget) optTarget.innerText = c.name;

    renderIndianStatesGrid();
    renderClimateDiurnalChart();
}

function setAppClimate(stateName, cardElement) {
    if (!CLIMATES[stateName]) return;
    state.climate = CLIMATES[stateName];

    // Synchronize sidebar dropdown
    const selectEl = document.getElementById("sb-climate-select");
    if (selectEl) selectEl.value = stateName;

    updateClimateDisplay();
    fetchCurrentStateLiveWeather();
    runSimulation();
}

function onSidebarClimateChange() {
    const stateName = document.getElementById("sb-climate-select").value;
    setAppClimate(stateName);
}

function onSidebarSolsticeChange() {
    state.solstice = document.getElementById("sb-solstice-select").value;
    runSimulation();
}

function onSidebarMetChange() {
    const val = parseFloat(document.getElementById("sb-slider-met").value);
    state.metabolicRate = val;
    document.getElementById("sb-val-met").innerText = `${val.toFixed(1)} met`;
    runSimulation();
}

function onSidebarCloChange() {
    const val = parseFloat(document.getElementById("sb-slider-clo").value);
    state.clothingInsulation = val;
    document.getElementById("sb-val-clo").innerText = `${val.toFixed(1)} clo`;
    runSimulation();
}

// 🔴 LIVE WEATHER TELEMETRY FETCHER
async function fetchCurrentStateLiveWeather() {
    const c = state.climate;
    const btn = document.getElementById("btn-refresh-weather");
    const statLabel = document.getElementById("live-station-label");
    const tsLabel = document.getElementById("live-update-timestamp");

    if (btn) btn.innerHTML = `<span class="btn-icon">⏳</span> Fetching Live Data...`;
    if (statLabel) statLabel.innerText = `Connecting to WMO Station for ${c.name} (${c.lat.toFixed(2)}°N, ${c.lon.toFixed(2)}°E)...`;

    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,direct_normal_irradiance,diffuse_radiation&timezone=Asia%2FKolkata`;
    const localProxyUrl = `/api/weather?lat=${c.lat}&lon=${c.lon}`;

    let data = null;

    // 1. Try direct Open-Meteo with 4s timeout
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(openMeteoUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) {
            data = await res.json();
        }
    } catch (err) {
        console.warn("Direct Open-Meteo fetch failed/timed out, attempting proxy fallback:", err);
    }

    // 2. Fallback to local server proxy if needed
    if (!data || !data.current) {
        try {
            const res = await fetch(localProxyUrl);
            if (res.ok) {
                data = await res.json();
            }
        } catch (err2) {
            console.warn("Local weather proxy fetch also failed:", err2);
        }
    }

    if (btn) btn.innerHTML = `<span class="btn-icon">🔄</span> Refresh Telemetry`;

    if (data && data.current) {
        applyLiveWeatherData(data.current, c);
    } else {
        // Fallback simulated live variation based on local time
        const currentHour = new Date().getHours();
        const amp = (c.max - c.min) / 2.0;
        const estTemp = c.avg + amp * Math.cos((currentHour - 14.0) * 15.0 * Math.PI / 180.0);
        const fallbackCur = {
            temperature_2m: estTemp,
            apparent_temperature: estTemp + 1.5,
            relative_humidity_2m: c.hum,
            wind_speed_10m: c.wind * 3.6,
            wind_direction_10m: 180,
            direct_normal_irradiance: (currentHour >= 6 && currentHour <= 18) ? 650 : 0,
            diffuse_radiation: (currentHour >= 6 && currentHour <= 18) ? 120 : 0,
            surface_pressure: 1012,
            cloud_cover: 20,
            weather_code: 0
        };
        applyLiveWeatherData(fallbackCur, c);
        if (tsLabel) tsLabel.innerText = `🕒 Offline Telemetry Profile (Estimated for ${currentHour}:00 IST)`;
    }
}

function applyLiveWeatherData(cur, c) {
    state.liveWeather = cur;

    const temp = cur.temperature_2m;
    const apparent = cur.apparent_temperature;
    const hum = cur.relative_humidity_2m;
    const windKmh = cur.wind_speed_10m;
    const windMs = (windKmh / 3.6).toFixed(1);
    const windDir = cur.wind_direction_10m || 0;
    const dni = cur.direct_normal_irradiance !== undefined ? Math.round(cur.direct_normal_irradiance) : 0;
    const dhi = cur.diffuse_radiation !== undefined ? Math.round(cur.diffuse_radiation) : 0;
    const pressure = cur.surface_pressure || cur.pressure_msl || 1013.25;
    const cloud = cur.cloud_cover !== undefined ? cur.cloud_cover : 0;
    const code = cur.weather_code || 0;
    const wmo = WMO_WEATHER_CODES[code] || { desc: "Clear Conditions", icon: "☀️" };

    const delta = temp - c.avg;
    const deltaStr = (delta >= 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1)) + `°C vs historical avg (${c.avg.toFixed(1)}°C)`;

    // Update DOM
    const elTemp = document.getElementById("live-temp");
    if (elTemp) elTemp.innerHTML = `${wmo.icon} ${temp.toFixed(1)} °C`;

    const elDelta = document.getElementById("live-temp-delta");
    if (elDelta) {
        elDelta.innerText = deltaStr;
        elDelta.className = delta > 2.5 ? "lm-delta delta-warn" : delta < -2.5 ? "lm-delta delta-positive" : "lm-delta";
    }

    const elApp = document.getElementById("live-apparent");
    if (elApp) elApp.innerText = `${apparent.toFixed(1)} °C`;

    const elCond = document.getElementById("live-condition-desc");
    if (elCond) elCond.innerText = `Weather: ${wmo.desc} • Cloud ${cloud}%`;

    const elHum = document.getElementById("live-humidity");
    if (elHum) elHum.innerText = `${hum} %`;

    const elWind = document.getElementById("live-wind");
    if (elWind) elWind.innerText = `${windKmh.toFixed(1)} km/h (${windMs} m/s)`;

    const elWindDir = document.getElementById("live-wind-dir");
    if (elWindDir) elWindDir.innerText = `Direction: ${windDir}° (${getCompassBearing(windDir)})`;

    const elIrr = document.getElementById("live-irradiance");
    if (elIrr) elIrr.innerText = `${dni} W/m²`;

    const elDiff = document.getElementById("live-diffuse");
    if (elDiff) elDiff.innerText = `Diffuse: ${dhi} W/m²`;

    const elPres = document.getElementById("live-pressure");
    if (elPres) elPres.innerText = `${pressure.toFixed(1)} hPa`;

    const elCloud = document.getElementById("live-cloud-cover");
    if (elCloud) elCloud.innerText = `Cloud Cover: ${cloud}%`;

    const elStat = document.getElementById("live-station-label");
    if (elStat) elStat.innerHTML = `WMO Observation Station: <strong>${c.name} (${c.capital})</strong> &bull; Elevation: ${c.alt}m`;

    const elTime = document.getElementById("live-update-timestamp");
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    if (elTime) elTime.innerText = `🕒 Telemetry Stream: ${nowStr} IST (Real-Time WMO Live)`;

    const elLat = document.getElementById("live-geo-lat");
    if (elLat) elLat.innerText = c.lat.toFixed(2);
    const elLon = document.getElementById("live-geo-lon");
    if (elLon) elLon.innerText = c.lon.toFixed(2);

    if (state.useLiveTemp) {
        runSimulation();
    }
    renderClimateDiurnalChart();
}

function onToggleLiveSimulation(checked) {
    state.useLiveTemp = checked;
    if (checked && !state.liveWeather) {
        fetchCurrentStateLiveWeather();
    } else {
        runSimulation();
        renderClimateDiurnalChart();
    }
}

// 🏛️ INDIAN STATES DIRECTORY RENDERING & FILTERING
function renderIndianStatesGrid() {
    const grid = document.getElementById("indian-states-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const query = (state.stateSearchQuery || "").toLowerCase().trim();
    const region = state.selectedRegionFilter || "All";

    const stateList = Object.values(CLIMATES);
    const filtered = stateList.filter(s => {
        const matchesRegion = (region === "All" || s.region.toLowerCase() === region.toLowerCase());
        const matchesSearch = (!query || 
            s.name.toLowerCase().includes(query) ||
            s.capital.toLowerCase().includes(query) ||
            s.zone.toLowerCase().includes(query) ||
            s.region.toLowerCase().includes(query)
        );
        return matchesRegion && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; color: var(--st-text-muted); background: var(--st-bg-card); border-radius: 0.75rem; border: 1px dashed var(--st-border);">
                <span style="font-size: 2rem;">🔍</span>
                <p style="margin-top: 0.5rem; font-size: 0.9rem;">No Indian states match "<strong>${query}</strong>".</p>
                <p style="font-size: 0.78rem; color: var(--st-text-sub);">Try searching "Cold", "South", "Kerala", "Ladakh", or reset filter.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(s => {
        const isActive = (s.name === state.climate.name);
        const card = document.createElement("div");
        card.className = `climate-card ${isActive ? 'active' : ''}`;
        card.id = `card-state-${s.name.replace(/[^a-zA-Z0-9]/g, '')}`;

        const zoneSlug = "zone-" + s.zone.toLowerCase().replace(/[^a-z0-9]/g, '-');

        card.innerHTML = `
            <div>
                <div class="c-region-tag">${s.region} INDIA &bull; ${s.capital}</div>
                <div class="c-head">
                    <h4>${s.name}</h4>
                    <span class="zone-badge ${zoneSlug}">${s.zone}</span>
                </div>
                <div class="c-coords">${s.lat.toFixed(2)}°N, ${s.lon.toFixed(2)}°E &bull; ${s.alt}m Alt</div>
                <div class="c-preview-temp">Avg ${s.avg.toFixed(1)}°C (${s.min.toFixed(1)}°C – ${s.max.toFixed(1)}°C)</div>
                <div class="c-metrics-row">
                    <span>💧 Hum: ${s.hum}%</span>
                    <span>💨 Wind: ${s.wind} m/s</span>
                    <span>🌧️ Rain: ${s.rain} mm</span>
                </div>
            </div>
            <button class="c-select-btn" onclick="setAppClimate('${s.name}', this.closest('.climate-card'))">
                ${isActive ? '✓ Active State Telemetry' : 'Select State & Stream Weather'}
            </button>
        `;
        grid.appendChild(card);
    });
}

function filterStatesByRegion(region, btnElement) {
    state.selectedRegionFilter = region;
    document.querySelectorAll(".state-region-tabs .region-tab").forEach(btn => btn.classList.remove("active"));
    if (btnElement) btnElement.classList.add("active");
    renderIndianStatesGrid();
}

function onStateSearchInput() {
    const input = document.getElementById("state-search-input");
    if (!input) return;
    state.stateSearchQuery = input.value;
    renderIndianStatesGrid();
}

// 12. RENDER CLIMATE DIURNAL CHART WITH LIVE OBSERVATION MARKER
function renderClimateDiurnalChart() {
    const canvas = document.getElementById("climateDiurnalCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const w = canvas.width = canvas.parentElement.clientWidth || 1000;
    const h = canvas.height = 220;
    ctx.clearRect(0, 0, w, h);

    const padL = 50, padR = 40, padT = 25, padB = 35;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;

    const c = state.climate;
    const amplitude = (c.max - c.min) / 2.0;

    // Y Axis scaling with padding
    const minPlot = Math.floor(c.min - 5);
    const maxPlot = Math.ceil(c.max + 5);
    const rangePlot = maxPlot - minPlot;

    const getY = (t) => padT + chartH - ((t - minPlot) / rangePlot) * chartH;
    const getX = (hour) => padL + (hour / 23.0) * chartW;

    // Background horizontal grid lines & Y labels
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px 'Fira Code', monospace";
    ctx.textAlign = "right";

    const yStep = Math.max(5, Math.round(rangePlot / 4));
    for (let temp = Math.ceil(minPlot / yStep) * yStep; temp <= maxPlot; temp += yStep) {
        const y = getY(temp);
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(padL + chartW, y);
        ctx.stroke();
        ctx.fillText(`${temp}°C`, padL - 10, y + 3);
    }

    // Baseline Diurnal Curve (Historical Sinusoid)
    ctx.beginPath();
    ctx.strokeStyle = "#ff9800";
    ctx.lineWidth = 3;

    for (let hour = 0; hour < 24; hour++) {
        const t = c.avg + amplitude * Math.cos((hour - 14.0) * 15.0 * Math.PI / 180.0);
        const x = getX(hour);
        const y = getY(t);
        if (hour === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Fill subtle gradient under the curve
    ctx.lineTo(getX(23), padT + chartH);
    ctx.lineTo(getX(0), padT + chartH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    grad.addColorStop(0, "rgba(255, 152, 0, 0.15)");
    grad.addColorStop(1, "rgba(255, 152, 0, 0.0)");
    ctx.fillStyle = grad;
    ctx.fill();

    // X Axis Hour Labels
    ctx.fillStyle = "#ffffff";
    ctx.font = "11px 'Fira Code', monospace";
    ctx.textAlign = "center";
    for (let hour = 0; hour < 24; hour += 4) {
        ctx.fillText(`${hour.toString().padStart(2, '0')}:00`, getX(hour), padT + chartH + 18);
    }

    // 🔴 Highlight Current Live Telemetry Point if available
    if (state.liveWeather && typeof state.liveWeather.temperature_2m === "number") {
        const currentHour = new Date().getHours();
        const liveTemp = state.liveWeather.temperature_2m;
        const liveX = getX(currentHour);
        const liveY = getY(liveTemp);

        // Vertical guide line
        ctx.save();
        ctx.strokeStyle = "rgba(0, 212, 178, 0.5)";
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(liveX, padT);
        ctx.lineTo(liveX, padT + chartH);
        ctx.stroke();
        ctx.restore();

        // Glowing outer halo
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 212, 178, 0.25)";
        ctx.arc(liveX, liveY, 10, 0, Math.PI * 2);
        ctx.fill();

        // Glowing live dot
        ctx.beginPath();
        ctx.fillStyle = "#00d4b2";
        ctx.arc(liveX, liveY, 5, 0, Math.PI * 2);
        ctx.fill();

        // Tooltip badge
        const badgeText = `● LIVE: ${liveTemp.toFixed(1)}°C (${currentHour}:00 IST)`;
        ctx.font = "bold 10px 'Inter', sans-serif";
        const textW = ctx.measureText(badgeText).width;
        const boxX = Math.min(padL + chartW - textW - 14, Math.max(padL, liveX - textW / 2));
        const boxY = Math.max(padT + 5, liveY - 24);

        ctx.fillStyle = "#1e293b";
        ctx.strokeStyle = "#00d4b2";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(boxX - 6, boxY - 12, textW + 12, 18, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left";
        ctx.fillText(badgeText, boxX, boxY + 1);
    }
}

// 13. SHELTER DESIGN CONTROLS
function populateDesignMaterialDropdowns() {
    const wallSel = document.getElementById("design-wall-mat");
    const roofSel = document.getElementById("design-roof-mat");
    if (!wallSel || !roofSel) return;

    wallSel.innerHTML = "";
    roofSel.innerHTML = "";

    MATERIALS.forEach(m => {
        const optW = document.createElement("option");
        optW.value = m.name;
        optW.innerText = `${m.name} (k=${m.k} W/m·K) - ₹${m.cost}/m³`;
        if (m.name === "Brick") optW.selected = true;
        wallSel.appendChild(optW);

        const optR = document.createElement("option");
        optR.value = m.name;
        optR.innerText = `${m.name} (k=${m.k} W/m·K) - ₹${m.cost}/m³`;
        if (m.name === "Clay Tile") optR.selected = true;
        roofSel.appendChild(optR);
    });
}

function onDesignMaterialChange() {
    const wallName = document.getElementById("design-wall-mat").value;
    const roofName = document.getElementById("design-roof-mat").value;

    const wallMat = MATERIALS.find(m => m.name === wallName);
    const roofMat = MATERIALS.find(m => m.name === roofName);

    if (wallMat) {
        state.shelter.wallMaterial = wallMat;
        state.shelter.wallAlpha = wallMat.alpha;
        document.getElementById("slider-wall-alpha").value = wallMat.alpha;
        document.getElementById("val-wall-alpha").innerText = `${wallMat.alpha.toFixed(2)} (${wallMat.name})`;
    }

    if (roofMat) {
        state.shelter.roofMaterial = roofMat;
        state.shelter.roofAlpha = roofMat.alpha;
        document.getElementById("slider-roof-alpha").value = roofMat.alpha;
        document.getElementById("val-roof-alpha").innerText = `${roofMat.alpha.toFixed(2)} (${roofMat.name})`;
    }

    updateDesignParameters();
}

function updateDesignParameters() {
    const s = state.shelter;

    // Geometric dimensions
    const elOrient = document.getElementById("geom-orientation");
    if (elOrient) s.orientationDeg = parseFloat(elOrient.value) || 0;

    const elAspect = document.getElementById("geom-aspect-ratio");
    if (elAspect) s.aspectRatio = parseFloat(elAspect.value) || 1.5;

    s.roofArea = parseFloat(document.getElementById("geom-roof-area").value) || 100;
    s.wallArea = parseFloat(document.getElementById("geom-wall-area").value) || 400;
    s.volume = parseFloat(document.getElementById("geom-volume").value) || 300;
    s.thermalMassKg = parseFloat(document.getElementById("geom-mass").value) || 50000;

    // Openings & Glazing System
    const elWin = document.getElementById("geom-window-area");
    if (elWin) s.windowArea = Math.min(s.wallArea * 0.4, Math.max(0, parseFloat(elWin.value) || 12));

    const elGlaze = document.getElementById("geom-glazing-type");
    if (elGlaze) {
        s.glazingType = elGlaze.value;
        if (s.glazingType === "triple_argon") {
            s.glazingU = 1.2; s.glazingShgc = 0.65;
        } else if (s.glazingType === "double_lowe") {
            s.glazingU = 1.8; s.glazingShgc = 0.72;
        } else if (s.glazingType === "double_standard") {
            s.glazingU = 2.8; s.glazingShgc = 0.76;
        } else {
            s.glazingU = 5.8; s.glazingShgc = 0.82;
        }
    }

    const elShutters = document.getElementById("geom-night-shutters");
    if (elShutters) {
        s.nightShutters = elShutters.value;
        if (s.nightShutters === "insulated_r2") s.nightShutterR = 2.0;
        else if (s.nightShutters === "insulated_r1") s.nightShutterR = 1.0;
        else if (s.nightShutters === "curtain") s.nightShutterR = 0.4;
        else s.nightShutterR = 0.0;
    }

    const elInfil = document.getElementById("geom-infiltration");
    if (elInfil) s.infiltrationAch = parseFloat(elInfil.value) || 0.25;

    // Wall & Roof assembly thickness
    s.wallThickness = parseFloat(document.getElementById("slider-wall-thick").value);
    s.roofThickness = parseFloat(document.getElementById("slider-roof-thick").value);

    document.getElementById("val-wall-thick").innerText = `${s.wallThickness.toFixed(2)} m (${Math.round(s.wallThickness * 1000)}mm)`;
    document.getElementById("val-roof-thick").innerText = `${s.roofThickness.toFixed(2)} m (${Math.round(s.roofThickness * 1000)}mm)`;

    s.roofAlpha = parseFloat(document.getElementById("slider-roof-alpha").value);
    s.wallAlpha = parseFloat(document.getElementById("slider-wall-alpha").value);
    document.getElementById("val-roof-alpha").innerText = `${s.roofAlpha.toFixed(2)}`;
    document.getElementById("val-wall-alpha").innerText = `${s.wallAlpha.toFixed(2)}`;

    // Calculate U-Values
    const netWallArea = Math.max(10.0, s.wallArea - s.windowArea);
    const uWall = calculateUValue(s.wallThickness, s.wallMaterial.k);
    const uRoof = calculateUValue(s.roofThickness, s.roofMaterial.k);
    const totalUA = (uWall * netWallArea) + (uRoof * s.roofArea) + (s.glazingU * s.windowArea);

    const wallCost = netWallArea * s.wallThickness * s.wallMaterial.cost;
    const roofCost = s.roofArea * s.roofThickness * s.roofMaterial.cost;
    const glazingCost = s.windowArea * (s.glazingType === "triple_argon" ? 12000 : s.glazingType === "double_lowe" ? 8500 : 4500);
    const shutterCost = (s.nightShutters !== "none") ? s.windowArea * 3500 : 0;
    const totalCost = wallCost + roofCost + glazingCost + shutterCost;

    document.getElementById("design-u-wall").innerText = `${uWall.toFixed(2)} W/m²·K`;
    document.getElementById("design-u-roof").innerText = `${uRoof.toFixed(2)} W/m²·K`;
    document.getElementById("design-total-ua").innerText = `${Math.round(totalUA).toLocaleString()} W/K`;
    document.getElementById("design-total-cost").innerText = `₹ ${Math.round(totalCost).toLocaleString()}`;

    const topBadge = document.getElementById("top-envelope-badge");
    if (topBadge) {
        topBadge.innerText = `${Math.round(s.wallThickness * 1000)}mm ${s.wallMaterial.name} • ${Math.round(s.roofThickness * 1000)}mm ${s.roofMaterial.name} • ${s.windowArea}m² Glazing`;
    }

    // Update active U-value badge in design viewport header if present
    const activeUBadge = document.getElementById("active-u-badge");
    if (activeUBadge) {
        activeUBadge.innerText = `U-Wall: ${uWall.toFixed(2)} W/m²·K`;
    }

    // Update Visualizers
    if (typeof update3DGeometry === "function") update3DGeometry();
    if (typeof renderEnvelopeCutaway === "function") {
        if (state.currentSimulation) {
            renderEnvelopeCutaway(state.currentSimulation.outMin, state.currentSimulation.inMin);
        } else {
            renderEnvelopeCutaway();
        }
    }
}

function applyDesignAndSimulate() {
    updateDesignParameters();
    runSimulation();
    switchPage("simulate", document.querySelector('[data-page="simulate"]'));
}

// 14. DESIGN OPTIMIZATION ENGINE
let optimizationCandidates = [];

function runOptimizationSweep() {
    const climate = state.climate;
    const testMaterials = [
        MATERIALS.find(m => m.name === "Brick"),
        MATERIALS.find(m => m.name === "Porotherm Block"),
        MATERIALS.find(m => m.name === "AAC Block"),
        MATERIALS.find(m => m.name === "Mud/Adobe"),
        MATERIALS.find(m => m.name === "Rammed Earth")
    ];

    const testRoofs = [
        MATERIALS.find(m => m.name === "Clay Tile"),
        MATERIALS.find(m => m.name === "Cool Roof Coating"),
        MATERIALS.find(m => m.name === "PUF Sandwich Panel")
    ];

    const thicknesses = [0.15, 0.23, 0.30, 0.38];
    optimizationCandidates = [];

    testMaterials.forEach(wallMat => {
        testRoofs.forEach(roofMat => {
            thicknesses.forEach(th => {
                const uWall = calculateUValue(th, wallMat.k);
                const uRoof = calculateUValue(0.15, roofMat.k);

                // Quick 24h comfort estimate
                const amplitude = (climate.max - climate.min) / 2.0;
                let comfortableCount = 0;
                let indoorT = climate.avg;
                const cTotal = 50000 * wallMat.c;

                for (let h = 0; h < 24; h++) {
                    const outT = climate.avg + amplitude * Math.cos((h - 14.0) * 15.0 * Math.PI / 180.0);
                    const qNet = (roofMat.alpha * 600 * 100) + (uWall * 400 + uRoof * 100) * (outT - indoorT) - 8000;
                    indoorT = indoorT + (qNet * 3600.0) / cTotal;
                    const pmv = calculatePMV(indoorT, 1.0);
                    const ppd = calculatePPD(pmv);
                    if (indoorT >= 22.0 && indoorT <= 26.0 && ppd < 20.0) comfortableCount++;
                }

                const comfortPct = (comfortableCount / 24.0) * 100.0;
                const cost = (400 * th * wallMat.cost) + (100 * 0.15 * roofMat.cost);

                optimizationCandidates.push({
                    wallMat: wallMat,
                    roofMat: roofMat,
                    thickness: th,
                    uWall: uWall,
                    comfortPct: comfortPct,
                    cost: cost
                });
            });
        });
    });

    // Sort by Comfort % descending, then Cost ascending
    optimizationCandidates.sort((a, b) => b.comfortPct - a.comfortPct || a.cost - b.cost);

    const best = optimizationCandidates[0];
    document.getElementById("opt-title").innerText = `${best.wallMat.name} (${Math.round(best.thickness * 1000)}mm) + ${best.roofMat.name}`;
    const baseComfort = (state.currentSimulation && state.currentSimulation.comfortPercentage != null)
        ? state.currentSimulation.comfortPercentage : 0;
    const gain = best.comfortPct - baseComfort;
    document.getElementById("opt-comfort-pct").innerText = `${best.comfortPct.toFixed(1)}% (${gain >= 0 ? '+' : ''}${gain.toFixed(1)}% Gain)`;
    document.getElementById("opt-u-val").innerText = `${best.uWall.toFixed(2)} W/m²·K`;
    document.getElementById("opt-cost").innerText = `₹ ${Math.round(best.cost).toLocaleString()}`;

    // Stamp climate target name on candidate rankings subtitle
    const optTarget = document.getElementById("opt-climate-target");
    if (optTarget) optTarget.innerText = state.climate.name;

    renderOptimizationTable();
    renderParetoChart();
}

function renderOptimizationTable() {
    const tbody = document.getElementById("opt-rankings-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    optimizationCandidates.slice(0, 10).forEach((cand, idx) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>#${idx + 1}</strong></td>
            <td>${cand.wallMat.name} (${Math.round(cand.thickness * 1000)}mm)</td>
            <td>${cand.roofMat.name}</td>
            <td style="color:#00d4b2;font-weight:700">${cand.comfortPct.toFixed(1)}%</td>
            <td>₹${Math.round(cand.cost).toLocaleString()}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderParetoChart() {
    const canvas = document.getElementById("paretoCanvas");
    if (!canvas || !optimizationCandidates.length) return;
    const ctx = canvas.getContext("2d");

    const w = canvas.width = canvas.parentElement.clientWidth || 480;
    const h = canvas.height = 260;
    ctx.clearRect(0, 0, w, h);

    const padL = 60, padR = 20, padT = 20, padB = 35;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;

    const minCost = 300000;
    const maxCost = 1500000;

    const getX = (cost) => padL + ((cost - minCost) / (maxCost - minCost)) * chartW;
    const getY = (pct) => padT + chartH - (pct / 60.0) * chartH;

    // Axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + chartH);
    ctx.lineTo(padL + chartW, padT + chartH);
    ctx.stroke();

    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px 'Fira Code', monospace";
    ctx.fillText("₹400k", getX(400000), padT + chartH + 15);
    ctx.fillText("₹1.2M", getX(1200000), padT + chartH + 15);
    ctx.fillText("0%", padL - 25, padT + chartH);
    ctx.fillText("50%", padL - 28, getY(50));

    // Plot Points
    optimizationCandidates.forEach((c, i) => {
        ctx.fillStyle = i === 0 ? "#ff4b4b" : "rgba(0, 212, 178, 0.7)";
        ctx.beginPath();
        ctx.arc(getX(c.cost), getY(c.comfortPct), i === 0 ? 6 : 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

function applyOptimizedPreset() {
    if (!optimizationCandidates.length) runOptimizationSweep();
    const best = optimizationCandidates[0];

    document.getElementById("design-wall-mat").value = best.wallMat.name;
    document.getElementById("design-roof-mat").value = best.roofMat.name;
    document.getElementById("slider-wall-thick").value = best.thickness;

    onDesignMaterialChange();
    applyDesignAndSimulate();
}

// 15. MATERIALS DIRECTORY
let matFilterCategory = "All";
let matSearchQuery = "";

function renderFullMaterialsTable(cat, search) {
    const tbody = document.getElementById("full-materials-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    const filtered = MATERIALS.filter(m => {
        const catMatch = (cat === "All" || m.category.toLowerCase() === cat.toLowerCase());
        const searchMatch = (m.name.toLowerCase().includes(search) || m.avail.toLowerCase().includes(search));
        return catMatch && searchMatch;
    });

    filtered.forEach(m => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${m.name}</strong></td>
            <td><span class="zone-badge zone-temperate">${m.category}</span></td>
            <td><code style="color:#38bdf8">${m.k.toFixed(m.k < 0.1 ? 3 : 2)}</code></td>
            <td>${m.density}</td>
            <td>${m.c}</td>
            <td>${m.alpha.toFixed(2)}</td>
            <td>₹${m.cost.toLocaleString()}</td>
            <td>${m.avail}</td>
            <td>
                <button class="apply-btn" onclick="applyMaterialFromDirectory('${m.name}')">Use in Design</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function filterMaterialsList(category, btnElement) {
    matFilterCategory = category;
    document.querySelectorAll(".materials-filter-bar .tab-btn").forEach(btn => btn.classList.remove("active"));
    if (btnElement) btnElement.classList.add("active");
    renderFullMaterialsTable(matFilterCategory, matSearchQuery);
}

function searchMaterialsList() {
    matSearchQuery = document.getElementById("mat-table-search").value.toLowerCase().trim();
    renderFullMaterialsTable(matFilterCategory, matSearchQuery);
}

function applyMaterialFromDirectory(matName) {
    const mat = MATERIALS.find(m => m.name === matName);
    if (!mat) return;

    if (mat.category === "Wall" || mat.category === "Insulation") {
        document.getElementById("design-wall-mat").value = mat.name;
    } else {
        document.getElementById("design-roof-mat").value = mat.name;
    }

    onDesignMaterialChange();
    switchPage("design", document.querySelector('[data-page="design"]'));
}

// 16. 🏔️ LADAKH HIGH-ALTITUDE COLD REGION SOLVER PRESET
function applyLadakhPreset() {
    state.climate = CLIMATES.Ladakh;
    state.solstice = "winter";

    const rammedEarth = MATERIALS.find(m => m.name === "Rammed Earth") || MATERIALS[9];
    const pufRoof = MATERIALS.find(m => m.name === "PUF Sandwich Panel") || MATERIALS[23];

    state.shelter.wallMaterial = rammedEarth;
    state.shelter.wallThickness = 0.35;
    state.shelter.roofMaterial = pufRoof;
    state.shelter.roofThickness = 0.20;
    state.shelter.roofArea = 100;
    state.shelter.wallArea = 400;
    state.shelter.volume = 300;
    state.shelter.thermalMassKg = 65000;
    state.shelter.orientationDeg = 0; // True South
    state.shelter.aspectRatio = 1.5; // Elongated East-West
    state.shelter.windowArea = 18; // Solar collector façade
    state.shelter.glazingType = "double_lowe";
    state.shelter.glazingU = 1.8;
    state.shelter.glazingShgc = 0.72;
    state.shelter.nightShutters = "insulated_r2";
    state.shelter.nightShutterR = 2.0;
    state.shelter.infiltrationAch = 0.25;
    state.shelter.wallAlpha = 0.80;
    state.shelter.roofAlpha = 0.45;

    // Sync all DOM controls
    const elOrient = document.getElementById("geom-orientation");
    if (elOrient) elOrient.value = "0";

    const elAspect = document.getElementById("geom-aspect-ratio");
    if (elAspect) elAspect.value = "1.5";

    const elRoofArea = document.getElementById("geom-roof-area");
    if (elRoofArea) elRoofArea.value = "100";

    const elWallArea = document.getElementById("geom-wall-area");
    if (elWallArea) elWallArea.value = "400";

    const elVol = document.getElementById("geom-volume");
    if (elVol) elVol.value = "300";

    const elMass = document.getElementById("geom-mass");
    if (elMass) elMass.value = "65000";

    const elWin = document.getElementById("geom-window-area");
    if (elWin) elWin.value = "18";

    const elGlaze = document.getElementById("geom-glazing-type");
    if (elGlaze) elGlaze.value = "double_lowe";

    const elShutters = document.getElementById("geom-night-shutters");
    if (elShutters) elShutters.value = "insulated_r2";

    const elInfil = document.getElementById("geom-infiltration");
    if (elInfil) elInfil.value = "0.25";

    const elWallMat = document.getElementById("design-wall-mat");
    if (elWallMat) elWallMat.value = "Rammed Earth";

    const elWallThick = document.getElementById("slider-wall-thick");
    if (elWallThick) elWallThick.value = "0.35";

    const elRoofMat = document.getElementById("design-roof-mat");
    if (elRoofMat) elRoofMat.value = "PUF Sandwich Panel";

    const elRoofThick = document.getElementById("slider-roof-thick");
    if (elRoofThick) elRoofThick.value = "0.20";

    const elWallAlpha = document.getElementById("slider-wall-alpha");
    if (elWallAlpha) elWallAlpha.value = "0.80";

    const elRoofAlpha = document.getElementById("slider-roof-alpha");
    if (elRoofAlpha) elRoofAlpha.value = "0.45";

    const elClim = document.getElementById("sb-climate-select");
    if (elClim) elClim.value = "Ladakh";

    const elSol = document.getElementById("sb-solstice-select");
    if (elSol) elSol.value = "winter";

    updateClimateDisplay();
    updateDesignParameters();
    runSimulation();
    switchPage("simulate", document.querySelector('[data-page="simulate"]'));
}

// 17. ⚙️ ANSYS FEA MODEL EXPORT SCRIPT GENERATOR
function setAnsysFormat(fmt) {
    currentAnsysFormat = fmt;
    document.getElementById("btn-ansys-apdl").classList.toggle("active", fmt === "apdl");
    document.getElementById("btn-ansys-python").classList.toggle("active", fmt === "python");
    updateAnsysScriptPreview();
}

function generateAnsysScript(format = "apdl") {
    const s = state.shelter;
    const c = state.climate;
    const ar = s.aspectRatio || 1.5;
    const length = Math.sqrt(s.roofArea * ar);
    const width = Math.sqrt(s.roofArea / ar);
    const height = s.volume / s.roofArea;
    const hConv = 10.0 + 4.0 * c.wind;

    if (format === "apdl") {
        return `! ==============================================================================
! ANSYS Mechanical APDL (MAPDL) 3D Transient Thermal Simulation Batch Macro
! Project: THERMOSHELTER Area-Specific Standalone Passive Shelter
! Region: ${c.name} (${c.zone}) | Lat: ${c.lat}°N, Lon: ${c.lon}°E, Alt: ${c.alt}m
! Generated Parametrically from Active Shelter Specifications
! ==============================================================================

FINISH
/CLEAR, START
/FILNAME, thermoshelter_${c.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_fea, 1
/TITLE, Transient Thermal Analysis - Area-Specific Shelter Design for ${c.name}

/PREP7
/UNITS, SI   ! MKS Units (m, kg, s, W, K, J)

! --- 1. PARAMETRIC SHELTER GEOMETRY ---
L_X = ${length.toFixed(3)}      ! Length along East-West solar collector axis (m)
W_Y = ${width.toFixed(3)}       ! Width along North-South axis (m)
H_Z = ${height.toFixed(3)}      ! Clear interior shelter height (m)
T_WALL = ${s.wallThickness.toFixed(3)}  ! Wall thickness (m)
T_ROOF = ${s.roofThickness.toFixed(3)}  ! Roof thickness (m)
A_WIN = ${s.windowArea.toFixed(2)}      ! Glazing aperture area on South façade (m^2)

! --- 2. ELEMENT DEFINITIONS ---
ET, 1, SOLID70              ! 3D 8-Node Thermal Solid Element for Envelope Conduction
ET, 2, SURF152              ! 3D Thermal Surface Effect Element for Solar Influx & Convection
KEYOPT, 2, 4, 1             ! Include radiation & solar flux effects
KEYOPT, 2, 8, 1             ! Convection boundary layer formulation

! --- 3. MATERIAL THERMOPHYSICAL PROPERTIES ---
! Material 1: Exterior Wall Assembly (${s.wallMaterial.name})
MP, KXX,  1, ${s.wallMaterial.k.toFixed(3)}      ! Thermal Conductivity k (W/m.K)
MP, DENS, 1, ${s.wallMaterial.density}          ! Density rho (kg/m^3)
MP, C,    1, ${s.wallMaterial.c}                ! Specific Heat Capacity c (J/kg.K)

! Material 2: Roof Assembly (${s.roofMaterial.name})
MP, KXX,  2, ${s.roofMaterial.k.toFixed(3)}      ! Thermal Conductivity k (W/m.K)
MP, DENS, 2, ${s.roofMaterial.density}          ! Density rho (kg/m^3)
MP, C,    2, ${s.roofMaterial.c}                ! Specific Heat Capacity c (J/kg.K)

! --- 4. 3D SOLID GEOMETRY MODELING ---
BLOCK, 0, L_X, 0, W_Y, 0, H_Z
BLOCK, T_WALL, L_X-T_WALL, T_WALL, W_Y-T_WALL, 0, H_Z-T_ROOF
VSBV, 1, 2                  ! Hollow shelter volume enclosure

! Assign Attributes and Mesh
VSEL, S, , , ALL
VATT, 1, , 1, 0
ESIZE, 0.20                 ! 200mm Finite Element Mesh Resolution
VMESH, ALL
ALLSEL, ALL

! --- 5. TRANSIENT THERMAL BOUNDARY CONDITIONS (24-Hour Cycle) ---
/SOLU
ANTYPE, TRANS               ! Transient Thermal Analysis
TIMINT, ON
AUTOTS, ON
DELTIM, 1800, 300, 3600     ! Time step: 30 min nominal, 5 min min, 1 hr max
KBC, 0                      ! Ramped boundary loading between load steps

! Diurnal Meteorological Boundary Setup
T_AMB_AVG = ${c.avg.toFixed(2)} + 273.15
T_AMB_AMP = ${((c.max - c.min) / 2.0).toFixed(2)}
H_CONV    = ${hConv.toFixed(2)}    ! Convective film coefficient W/m^2.K

! Loop through 24 hourly load steps
*DO, HR, 1, 24
    TIME, HR * 3600
    RAD_ANG = (HR - 14.0) * 15.0 * 3.14159 / 180.0
    T_AMB_CURRENT = T_AMB_AVG + T_AMB_AMP * COS(RAD_ANG)
    
    ! Convective and ambient boundary on exterior walls
    ASEL, S, EXT
    SFA, ALL, 1, CONV, H_CONV, T_AMB_CURRENT
    
    ! Solar heat flux boundary (Peak ~750 W/m^2 mid-day)
    *IF, HR, GE, 7, AND, HR, LE, 17, THEN
        SOLAR_FLUX = 780 * SIN((HR - 6) * 15 * 3.14159 / 180.0)
        ASEL, S, LOC, Z, H_Z
        SFE, ALL, 2, HFLUX, , SOLAR_FLUX * ${s.roofAlpha.toFixed(2)}
    *ENDIF
    
    SOLVE
*ENDDO

! --- 6. POST-PROCESSING & RESULTS EXTRACTION ---
/POST26
NUMVAR, 20
NSOL, 2, NODE(L_X/2, W_Y/2, H_Z/2), TEMP, , T_INDOOR_CENTER
PLVAR, 2                    ! Plot 24-hr interior transient temperature profile
PRVAR, 2                    ! Print hourly temperatures to output file
FINISH
! ==============================================================================`;
    } else {
        return `"""
PyMAPDL Transient Thermal Analysis Model
Project: THERMOSHELTER Area-Specific Standalone Passive Shelter
Region: ${c.name} (${c.zone}) | Elevation: ${c.alt}m
Requires: pip install ansys-mapdl-core numpy matplotlib
"""

import numpy as np
from ansys.mapdl.core import launch_mapdl

def run_thermoshelter_ansys_simulation():
    # 1. Launch ANSYS MAPDL Instance
    mapdl = launch_mapdl(loglevel="WARNING")
    mapdl.clear()
    mapdl.title("THERMOSHELTER 3D FEA - ${c.name}")
    mapdl.prep7()
    mapdl.units("SI")

    # 2. Dimensions and Properties
    lx = ${length.toFixed(3)}
    wy = ${width.toFixed(3)}
    hz = ${height.toFixed(3)}
    t_wall = ${s.wallThickness.toFixed(3)}
    t_roof = ${s.roofThickness.toFixed(3)}

    # Element Types (SOLID70 Thermal Solid)
    mapdl.et(1, "SOLID70")

    # Wall Material (${s.wallMaterial.name})
    mapdl.mp("KXX", 1, ${s.wallMaterial.k})
    mapdl.mp("DENS", 1, ${s.wallMaterial.density})
    mapdl.mp("C", 1, ${s.wallMaterial.c})

    # Roof Material (${s.roofMaterial.name})
    mapdl.mp("KXX", 2, ${s.roofMaterial.k})
    mapdl.mp("DENS", 2, ${s.roofMaterial.density})
    mapdl.mp("C", 2, ${s.roofMaterial.c})

    # 3. Create Solid Geometry & Mesh
    mapdl.block(0, lx, 0, wy, 0, hz)
    mapdl.block(t_wall, lx - t_wall, t_wall, wy - t_wall, 0, hz - t_roof)
    mapdl.vsbv(1, 2)
    mapdl.vsel("S", "VOLU", "", "ALL")
    mapdl.vatt(1, 0, 1, 0)
    mapdl.esize(0.25)
    mapdl.vmesh("ALL")

    # 4. Transient Solution Setup (24-Hour Cycle)
    mapdl.solution()
    mapdl.antype("TRANS")
    mapdl.autots("ON")
    mapdl.deltim(1800, 300, 3600)

    t_avg = ${c.avg.toFixed(2)} + 273.15
    t_amp = ${((c.max - c.min) / 2.0).toFixed(2)}
    h_conv = ${hConv.toFixed(2)}

    print("[ANSYS FEA] Executing 24 transient load steps for ${c.name}...")
    for hr in range(1, 25):
        mapdl.time(hr * 3600)
        angle_rad = (hr - 14.0) * 15.0 * np.pi / 180.0
        t_amb = t_avg + t_amp * np.cos(angle_rad)

        # Apply ambient convective boundary
        mapdl.asel("S", "EXT")
        mapdl.sfa("ALL", 1, "CONV", h_conv, t_amb)

        # Apply solar flux to roof
        if 7 <= hr <= 17:
            solar_flux = 780 * np.sin((hr - 6) * 15 * np.pi / 180.0) * ${s.roofAlpha.toFixed(2)}
            mapdl.asel("S", "LOC", "Z", hz)
            mapdl.sfe("ALL", 2, "HFLUX", "", solar_flux)

        mapdl.solve()

    print("[ANSYS FEA] Simulation completed successfully.")
    mapdl.exit()

if __name__ == "__main__":
    run_thermoshelter_ansys_simulation()
`;
    }
}

function updateAnsysScriptPreview() {
    const codeEl = document.getElementById("ansys-script-content");
    const titleEl = document.getElementById("ansys-file-title");
    if (!codeEl) return;

    const scriptText = generateAnsysScript(currentAnsysFormat);
    codeEl.innerText = scriptText;

    if (titleEl) {
        titleEl.innerText = currentAnsysFormat === "apdl" ? "thermoshelter_ladakh_transient.mac" : "thermoshelter_pymapdl.py";
    }
}

function copyAnsysScript() {
    const scriptText = generateAnsysScript(currentAnsysFormat);
    navigator.clipboard.writeText(scriptText).then(() => {
        alert("✅ ANSYS simulation script copied to clipboard!");
    }).catch(err => {
        console.error("Clipboard copy failed:", err);
    });
}

function downloadAnsysScript() {
    const scriptText = generateAnsysScript(currentAnsysFormat);
    const filename = currentAnsysFormat === "apdl" ? "thermoshelter_ladakh_transient.mac" : "thermoshelter_pymapdl.py";
    const blob = new Blob([scriptText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/* ════════════════════════════════════════════════════════════════
   THERMOSHELTER — ARCHITECTURAL 3D SPATIAL MASSING & SOLAR FAÇADE
   ════════════════════════════════════════════════════════════════ */

// Architectural Material Color & Specular Palette
const ARCH_PALETTE = {
  walls: {
    "Brick": { base: 0xb94a30, spec: 0x331100, name: "Modular Red Clay Brick" },
    "AAC Block": { base: 0x94a3b8, spec: 0x223344, name: "Autoclaved Aerated Concrete" },
    "Concrete": { base: 0x64748b, spec: 0x222222, name: "Cast-in-Place Concrete" },
    "Mud/Adobe": { base: 0xa46848, spec: 0x221105, name: "Sun-Dried Adobe Mud" },
    "Compressed Earth Block": { base: 0xb3704d, spec: 0x221108, name: "Stabilized Compressed Earth" },
    "Stone": { base: 0x5a606d, spec: 0x333333, name: "Quarried Basalt / Granite Stone" },
    "Fly Ash Brick": { base: 0x78716c, spec: 0x222222, name: "Fly Ash Composite Brick" },
    "Hollow Concrete Block": { base: 0x71717a, spec: 0x222222, name: "Hollow Concrete Masonry" },
    "Laterite Block": { base: 0xb84b2c, spec: 0x330800, name: "Porous Laterite Stone" },
    "Rammed Earth": { base: 0xab6441, spec: 0x221108, name: "Compacted Rammed Earth" },
    "Porotherm Block": { base: 0xd96f3c, spec: 0x441100, name: "Perforated Porotherm Clay" },
    "Timber Wood": { base: 0x8f562e, spec: 0x331908, name: "Architectural Heavy Timber" },
    default: { base: 0x4a5568, spec: 0x222222, name: "Thermal Mass Wall" }
  },
  roofs: {
    "Clay Tile": { base: 0xb94e2a, spec: 0x442211, name: "Terracotta Spanish S-Tile" },
    "Terracotta Tile": { base: 0xb94e2a, spec: 0x442211, name: "Terracotta Roof Tiles" },
    "Cool Roof Coating": { base: 0xf8fafc, spec: 0x94a3b8, name: "High-Albedo Solar Reflective" },
    "PUF Sandwich Panel": { base: 0x1e293b, spec: 0x38bdf8, name: "Anthracite Standing Seam PUF" },
    "Metal Sheet": { base: 0x94a3b8, spec: 0xffffff, name: "Galvanized Corrugated Metal" },
    "GI Sheet": { base: 0x94a3b8, spec: 0xffffff, name: "Corrugated GI Steel" },
    "Aluminium Sheet": { base: 0xc4d1e2, spec: 0xffffff, name: "Reflective Aluminium" },
    "Insulated Metal Sheet": { base: 0x475569, spec: 0x94a3b8, name: "Insulated Metal Roof" },
    "Thatched Roof": { base: 0xa17438, spec: 0x221808, name: "Organic Thatched Reed" },
    "Bamboo/Composite Roof": { base: 0xb8860b, spec: 0x332200, name: "Bamboo Composite Truss" },
    "RCC": { base: 0x64748b, spec: 0x222222, name: "Reinforced Concrete Slab" },
    default: { base: 0x2e3846, spec: 0x334455, name: "Engineered Roof Assembly" }
  }
};

const _3D = {
  scene: null,
  camera: null,
  renderer: null,
  shelterMesh: null,
  sunGroup: null,
  sunLight: null,
  moonLight: null,
  ambientLight: null,
  hemiLight: null,
  animFrameId: null,
  rotationY: 0,
  isRotating: true,
  sunMode: '24h',
  xrayMode: false,
  initialized: false,
  isDragging: false,
  previousMouse: { x: 0, y: 0 },
  spherical: { radius: 22.0, theta: 0.85, phi: 1.15 },
  targetCenter: new THREE.Vector3(0, 2.0, 0),
  fov: 55, // Increased field of view (55° wide architectural perspective)
  raycaster: null,
  mouse: null,
  interactiveMeshes: [],
  // 24-Hour Solar & Time of Day Controller
  timeOfDay: 12.0, // starts at 12:00 PM (Noon / Solar Zenith)
  is24HPlaying: false, // user manual scrub / preset control by default
  playSpeed24H: 0.6, // 1 hour per 1.67s during playback (24h full loop in 40s)
  // Hand-Painted, Cartoonish & Illustrative Cel-Shading Engine
  toonGradientMap: null,
  cloudsGroup: null,
  sunRaysGroup: null,
  skyDome: null,
  sunMesh: null,
  sunCorona: null,
  sunRays: [],
  moonMesh: null,
  moonHalo: null,
  starsGroup: null,
  // Dense Illustrative Cartoon Forest (Ghibli Trees & Boulders)
  forestGroup: null,
  grassTufts: [],
  lastFrameTime: performance.now()
};

function init3DShelterViewer() {
  const container = document.getElementById('threejs-container');
  if (!container || _3D.initialized) return;

  if (typeof THREE === 'undefined') {
    container.innerHTML = `
      <div class="threejs-fallback">
        <span class="btn-icon">🏠</span>
        <p>3D architectural viewport unavailable — Three.js library couldn't be loaded.</p>
      </div>`;
    return;
  }

  const W = container.clientWidth  || 960;
  const H = container.clientHeight || 560;

  _3D.scene = new THREE.Scene();
  // Cheerful illustrative sky atmosphere (bright, warm, cartoonish)
  _3D.scene.background = new THREE.Color(0x7dd3fc);
  _3D.scene.fog = new THREE.FogExp2(0xdbeafe, 0.006);

  // Increased Field of View: 55° provides an expansive wide-angle view of the compound and terrain
  _3D.camera = new THREE.PerspectiveCamera(_3D.fov || 55, W / H, 0.1, 400);
  _updateCameraFromSpherical();

  _3D.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  _3D.renderer.setSize(W, H);
  _3D.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  _3D.renderer.shadowMap.enabled = true;
  _3D.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  _3D.renderer.toneMapping = THREE.LinearToneMapping; // Vibrant cartoon color saturation
  _3D.renderer.toneMappingExposure = 1.18;
  container.appendChild(_3D.renderer.domElement);

  // Initialize discrete 4-step cel-shading gradient map for cartoon light bands
  _3D.toonGradientMap = _createToonGradientMap();

  // Lighting Architecture (Cheerful illustrative daylight fill)
  _3D.ambientLight = new THREE.AmbientLight(0xffffff, 1.05);
  _3D.scene.add(_3D.ambientLight);

  _3D.hemiLight = new THREE.HemisphereLight(0x7dd3fc, 0x86efac, 0.85);
  _3D.scene.add(_3D.hemiLight);

  // Directional Sunlight (Positioned according to 24-hour celestial solar angle)
  _3D.sunLight = new THREE.DirectionalLight(0xfffaed, 2.3);
  _3D.sunLight.castShadow = true;
  _3D.sunLight.shadow.mapSize.width = 1024;
  _3D.sunLight.shadow.mapSize.height = 1024;
  _3D.sunLight.shadow.camera.near = 0.5;
  _3D.sunLight.shadow.camera.far = 80;
  _3D.sunLight.shadow.camera.left = -22;
  _3D.sunLight.shadow.camera.right = 22;
  _3D.sunLight.shadow.camera.top = 24;
  _3D.sunLight.shadow.camera.bottom = -10;
  _3D.sunLight.shadow.bias = -0.0005;
  _3D.scene.add(_3D.sunLight);
  _3D.scene.add(_3D.sunLight.target);

  // 1. Build Illustrative Sky Dome & Starfield
  _buildRealisticSky();

  // 2. Build Fluffy Stylized Cartoon Clouds
  _buildFluffyClouds();

  // 3. Build Stylized Sun with Rotating Comic Rays & Crescent Moon
  _buildSunAndMoon();

  // 4. Build Hand-Painted Ghibli Meadow & Stylized Cartoon Forest
  _buildRealisticGround();

  // 5. Build High-Visibility Cardinal Axis System (North, South, East, West)
  _buildCardinalAxesSystem();

  // Setup Raycaster for Interactive Hover Inspection
  _3D.raycaster = new THREE.Raycaster();
  _3D.mouse = new THREE.Vector2();

  // Orbit & Mouse Interaction Listeners
  _setup3DInteractions(container);

  const ro = new ResizeObserver(() => _onResize3D(container));
  ro.observe(container);
  _3D.initialized = true;

  update3DGeometry();
  setTimeOfDay24(12.0, true);
  animate3D();
}

function _updateCameraFromSpherical() {
  const { radius, theta, phi } = _3D.spherical;
  const x = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);
  _3D.camera.position.set(x, y, z).add(_3D.targetCenter);
  _3D.camera.lookAt(_3D.targetCenter);
}

function _setup3DInteractions(container) {
  const canvas = _3D.renderer.domElement;

  canvas.addEventListener('mousedown', (e) => {
    _3D.isDragging = true;
    _3D.previousMouse = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mousemove', (e) => {
    // 1. Orbit Drag
    if (_3D.isDragging) {
      const deltaX = e.clientX - _3D.previousMouse.x;
      const deltaY = e.clientY - _3D.previousMouse.y;
      _3D.spherical.theta -= deltaX * 0.008;
      _3D.spherical.phi = Math.max(0.12, Math.min(Math.PI / 2 - 0.04, _3D.spherical.phi - deltaY * 0.008));
      _updateCameraFromSpherical();
      _3D.previousMouse = { x: e.clientX, y: e.clientY };
      return;
    }

    // 2. Hover Raycasting for Architectural Components
    const rect = canvas.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      _3D.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      _3D.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      _3D.raycaster.setFromCamera(_3D.mouse, _3D.camera);
      const intersects = _3D.raycaster.intersectObjects(_3D.interactiveMeshes, false);

      const hudText = document.getElementById('viewport-hud-text');
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.label && hudText) {
          hudText.innerHTML = `<strong>${hit.userData.label}</strong>: ${hit.userData.desc || ''}`;
        }
      } else if (hudText) {
        hudText.innerText = `Azimuth: ${(Math.round(_3D.spherical.theta * 180 / Math.PI) % 360)}° • Drag to orbit • Scroll to zoom • Toggle Sun / X-Ray above`;
      }
    }
  });

  window.addEventListener('mouseup', () => {
    _3D.isDragging = false;
  });

  // Touch Support
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      _3D.isDragging = true;
      _3D.previousMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    if (_3D.isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - _3D.previousMouse.x;
      const deltaY = e.touches[0].clientY - _3D.previousMouse.y;
      _3D.spherical.theta -= deltaX * 0.009;
      _3D.spherical.phi = Math.max(0.12, Math.min(Math.PI / 2 - 0.04, _3D.spherical.phi - deltaY * 0.009));
      _updateCameraFromSpherical();
      _3D.previousMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    _3D.isDragging = false;
  });

  // Mouse Wheel Zoom
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    _3D.spherical.radius = Math.max(8.0, Math.min(48.0, _3D.spherical.radius + e.deltaY * 0.02));
    _updateCameraFromSpherical();
  }, { passive: false });
}

/* ════════════════════════════════════════════════════════════════
   DISASTER RELIEF & MILITARY TACTICAL SURVIVAL SHELTER COMPOUND
   Architectural 100-Person Habitation, Food Depot, Water & Life Support
   Real-World "IRL" Engineering, MEP Ductwork & Interior Human Workforce
   ════════════════════════════════════════════════════════════════ */

// ── Hand-Painted, Cartoonish & Illustrative Procedural Canvas Textures ──

function _createToonGradientMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 4;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  // 4 discrete stepped tones: shadow (0.35), mid-shadow (0.55), midtone (0.8), highlight (1.0)
  const tones = ['#52525b', '#71717a', '#a1a1aa', '#ffffff'];
  tones.forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.fillRect(i, 0, 1, 1);
  });
  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  return tex;
}

function _createCompositeWallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // 1. Hand-painted watercolor / gouache warm plaster base
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, 0, 512, 512);

  // Soft watercolor wash patches
  for (let i = 0; i < 40; i++) {
    const rx = Math.random() * 512;
    const ry = Math.random() * 512;
    const rad = 40 + Math.random() * 90;
    const grad = ctx.createRadialGradient(rx, ry, 5, rx, ry, rad);
    grad.addColorStop(0, Math.random() > 0.5 ? 'rgba(241, 245, 249, 0.45)' : 'rgba(148, 163, 184, 0.35)');
    grad.addColorStop(1, 'rgba(203, 213, 225, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(rx, ry, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Subtle architectural cross-hatch shading lines in corners
  ctx.strokeStyle = 'rgba(100, 116, 139, 0.22)';
  ctx.lineWidth = 1.2;
  for (let l = 0; l < 40; l++) {
    ctx.beginPath();
    ctx.moveTo(l * 6, 0);
    ctx.lineTo(0, l * 6);
    ctx.stroke();
  }

  // 3. Hand-drawn comic panel division seams (2x2 grid)
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 4.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(256, 0); ctx.lineTo(256, 512);
  ctx.moveTo(0, 256); ctx.lineTo(512, 256);
  ctx.stroke();

  // White inner bevel highlight line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(259, 0); ctx.lineTo(259, 512);
  ctx.moveTo(0, 259); ctx.lineTo(512, 259);
  ctx.stroke();

  // 4. Stylized Yellow & Black Cartoon Hazard Chevron Stripes
  const stripeY = 236;
  const stripeH = 18;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, stripeY, 512, stripeH);
  ctx.fillStyle = '#f59e0b';
  for (let s = -20; s < 530; s += 28) {
    ctx.beginPath();
    ctx.moveTo(s, stripeY);
    ctx.lineTo(s + 14, stripeY);
    ctx.lineTo(s + 4, stripeY + stripeH);
    ctx.lineTo(s - 10, stripeY + stripeH);
    ctx.closePath();
    ctx.fill();
  }

  // 5. Inked Comic Hex Bolts with white specular dot highlights
  const boltPositions = [
    [18, 18], [238, 18], [274, 18], [494, 18],
    [18, 238], [238, 238], [274, 238], [494, 238],
    [18, 274], [238, 274], [274, 274], [494, 274],
    [18, 494], [238, 494], [274, 494], [494, 494]
  ];
  boltPositions.forEach(([bx, by]) => {
    // Outer ink circle
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(bx, by, 6.5, 0, Math.PI * 2);
    ctx.fill();
    // Inner metallic yellow/silver fill
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(bx - 0.5, by - 0.5, 4.0, 0, Math.PI * 2);
    ctx.fill();
    // White specular glint
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(bx - 1.5, by - 1.5, 1.6, 0, Math.PI * 2);
    ctx.fill();
  });

  // 6. Hand-stenciled comic designation labels
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 15px "Outfit", "Inter", sans-serif';
  ctx.fillText('★ TAC-SHELTER • LIFE SUPPORT 01 ★', 22, 218);
  ctx.fillStyle = '#b45309';
  ctx.font = 'bold 13px "Outfit", "Inter", sans-serif';
  ctx.fillText('HUMANITARIAN RELIEF FACILITY', 272, 474);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 2);
  return tex;
}

function _createDiamondPlateTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Illustrative slate tile floor
  ctx.fillStyle = '#334155';
  ctx.fillRect(0, 0, 256, 256);

  // Bold cartoon floor grid with rounded bevels
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 3;
  for (let x = 0; x <= 256; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0); ctx.lineTo(x, 256);
    ctx.stroke();
  }
  for (let y = 0; y <= 256; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y); ctx.lineTo(256, y);
    ctx.stroke();
  }

  // Cartoon specular corner highlights
  ctx.fillStyle = '#64748b';
  for (let x = 4; x < 256; x += 64) {
    for (let y = 4; y < 256; y += 64) {
      ctx.fillRect(x, y, 10, 4);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  return tex;
}

function _createMRECartonTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Warm illustrated cardboard box
  ctx.fillStyle = '#d97706';
  ctx.fillRect(0, 0, 256, 256);

  // Inked border
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 248, 248);

  // Horizontal cardboard ribs
  ctx.strokeStyle = 'rgba(180, 83, 9, 0.4)';
  ctx.lineWidth = 3;
  for (let r = 16; r < 240; r += 16) {
    ctx.beginPath();
    ctx.moveTo(10, r); ctx.lineTo(246, r);
    ctx.stroke();
  }

  // Cute illustrated cartoon food icons!
  // 1. Hot Soup Bowl with steam
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(42, 60, 16, 0, Math.PI);
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2;
  ctx.stroke();
  // Steam curls
  ctx.strokeStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(38, 42); ctx.quadraticCurveTo(42, 34, 38, 26);
  ctx.moveTo(46, 42); ctx.quadraticCurveTo(50, 34, 46, 26);
  ctx.stroke();

  // 2. Crunchy Red Apple with green leaf
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(92, 48, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.stroke();
  // Green leaf
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.ellipse(96, 34, 6, 3, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  // 3. Loaf of bread
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.ellipse(146, 48, 18, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // Comic text stencils
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 15px "Outfit", "Inter", sans-serif';
  ctx.fillText('EMERGENCY RATIONS', 14, 110);
  ctx.font = 'bold 12px "Outfit", "Inter", sans-serif';
  ctx.fillText('100 OCCUPANTS • 3200 KCAL', 14, 130);
  ctx.fillText('LOT #TAC-SHELTER-2026', 14, 150);

  // Cute cartoon barcode
  ctx.fillStyle = '#0f172a';
  for (let b = 14; b < 160; b += 6) {
    if (Math.random() > 0.25) {
      ctx.fillRect(b, 168, 3.5, 34);
    }
  }

  // Packaging moisture-proof tape (bright cartoon orange)
  ctx.fillStyle = '#f97316';
  ctx.fillRect(4, 210, 248, 28);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('★ SEALED REFUGE SUPPLY ★', 28, 228);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function _createWaterTankTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Vibrant cartoon cyan cylinder
  const grad = ctx.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0, '#0369a1');
  grad.addColorStop(0.3, '#38bdf8');
  grad.addColorStop(0.7, '#0284c7');
  grad.addColorStop(1, '#0c4a6e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 512);

  // Inked border
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 248, 504);

  // Horizontal reinforcement bands
  for (let y = 60; y < 500; y += 80) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(4, y, 248, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(4, y + 2, 248, 2);
  }

  // Clear vertical cartoon water sight-tube (with bubbles)
  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
  ctx.fillRect(36, 90, 26, 320);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(39, 140, 20, 265); // water level at ~85%
  // Cartoon air bubbles
  ctx.fillStyle = '#ffffff';
  [160, 210, 270, 320, 370].forEach(by => {
    ctx.beginPath();
    ctx.arc(49, by, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Red cartoon valve handwheel
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(180, 260, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 3.5;
  ctx.stroke();
  // Handwheel spokes
  ctx.beginPath();
  ctx.moveTo(180, 232); ctx.lineTo(180, 288);
  ctx.moveTo(152, 260); ctx.lineTo(208, 260);
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(174, 254, 4, 0, Math.PI * 2);
  ctx.fill();

  // Bold cartoon stencils
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px "Outfit", "Inter", sans-serif';
  ctx.fillText('POTABLE WATER', 75, 140);
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('CAPACITY: 10,000 L', 75, 168);
  ctx.fillText('FILTER: REVERSE OSMOSIS', 75, 192);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// ── Main BIM Geometry Assembly ──

function update3DGeometry() {
  if (!_3D.initialized || !_3D.scene) return;

  const shelter = (window.state && window.state.shelter) || {};
  const wallMatName = (shelter.wallMaterial && shelter.wallMaterial.name) || "Concrete";
  const wallStyle = ARCH_PALETTE.walls[wallMatName] || ARCH_PALETTE.walls.default;

  if (_3D.shelterMesh) {
    _3D.scene.remove(_3D.shelterMesh);
    _3D.shelterMesh.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    });
  }

  _3D.interactiveMeshes = [];
  const shelterGroup = new THREE.Group();

  // Edge outline material for sharp hand-inked architectural comic drawing lines
  const cadEdgeMat = new THREE.LineBasicMaterial({
    color: 0x0f172a,
    transparent: true,
    opacity: 0.95,
    linewidth: 2
  });

  const wallOpacity = _3D.xrayMode ? 0.22 : 1.0;
  const roofOpacity = _3D.xrayMode ? 0.16 : 1.0;

  // Hand-Painted Illustrative Textures
  const wallTex = _createCompositeWallTexture();
  const diamondPlateTex = _createDiamondPlateTexture();
  const mreTex = _createMRECartonTexture();
  const waterTankTex = _createWaterTankTexture();

  // Illustrative Cel-Shaded Material Palette
  const wallMat = new THREE.MeshToonMaterial({
    color: wallStyle.base || 0xe2e8f0,
    map: wallTex,
    gradientMap: _3D.toonGradientMap,
    transparent: _3D.xrayMode,
    opacity: wallOpacity,
    depthWrite: !_3D.xrayMode
  });

  const roofMat = new THREE.MeshToonMaterial({
    color: 0x334155,
    gradientMap: _3D.toonGradientMap,
    transparent: _3D.xrayMode,
    opacity: roofOpacity,
    depthWrite: !_3D.xrayMode
  });

  const plinthMat = new THREE.MeshToonMaterial({
    color: 0x1e293b,
    map: diamondPlateTex,
    gradientMap: _3D.toonGradientMap
  });

  const steelMat = new THREE.MeshToonMaterial({
    color: 0x475569,
    gradientMap: _3D.toonGradientMap
  });

  const bunkFrameMat = new THREE.MeshToonMaterial({
    color: 0x0f172a,
    gradientMap: _3D.toonGradientMap
  });

  const mattressMat = new THREE.MeshToonMaterial({
    color: 0xf8fafc,
    gradientMap: _3D.toonGradientMap
  });

  // Cheerful storybook quilt blanket colors (warm mustard, teal, coral orange, navy, pink)
  const blanketColors = [0xeab308, 0x0d9488, 0xf97316, 0x1d4ed8, 0xec4899];

  const footlockerMat = new THREE.MeshToonMaterial({
    color: 0x334155,
    gradientMap: _3D.toonGradientMap
  });

  // 1. Civil Foundation Slab & Blast Plinth
  _buildShelterPlinth(shelterGroup, plinthMat, cadEdgeMat);

  // 2. Central Command, Comms & Tactical Operations Hub
  _buildCentralCommandHub(shelterGroup, wallMat, roofMat, steelMat, cadEdgeMat);

  // 3. 100-Person Bunk Berthing Module (50 Double-Bunk Units = 100 Cots)
  _buildBerthingModule100(shelterGroup, wallMat, roofMat, bunkFrameMat, mattressMat, blanketColors, footlockerMat, cadEdgeMat);

  // 4. Logistics Wing: Food Rations Depot, Field Galley & Potable Water Reserves
  _buildLogisticsWing(shelterGroup, wallMat, roofMat, steelMat, mreTex, waterTankTex, cadEdgeMat);

  // 5. Medical Triage Station & Life Support Power Plant
  _buildMedicalAndPowerWing(shelterGroup, wallMat, roofMat, steelMat, cadEdgeMat);

  // 6. Reinforced Blast Airlock Portal (South Entry)
  _buildBlastAirlockPortal(shelterGroup, steelMat, cadEdgeMat);

  // 7. Real-World Architectural MEP (Ceiling Air Ducts, I-Beams, Water Pipes)
  _buildOverheadMEPDuctwork(shelterGroup);

  // 8. Realistic Interior Room Illumination
  _buildInteriorLighting(shelterGroup);

  // 9. Active Human Workforce Working Inside the Shelter (Zero Humans Outside!)
  _buildInteriorPersonnel(shelterGroup);

  // Apply User-Defined Azimuth Orientation (0° = True South)
  const azimuthRad = (shelter.orientationDeg || 0) * Math.PI / 180.0;
  shelterGroup.rotation.y = azimuthRad;

  _3D.scene.add(shelterGroup);
  _3D.shelterMesh = shelterGroup;

  // Center camera target on shelter mass midpoint
  _3D.targetCenter.set(0, 2.0, 0);
  _updateCameraFromSpherical();

  // Update Azimuth Badge in Header
  const azChip = document.getElementById('solar-azimuth-chip');
  if (azChip) {
    const deg = Math.round(shelter.orientationDeg || 0);
    azChip.innerText = `${deg === 0 ? 'True South (0°)' : deg < 0 ? `South-East (${deg}°)` : `South-West (+${deg}°)`} • 100-Person Tactical Shelter`;
  }
}

function _buildShelterPlinth(group, mat, edgeMat) {
  const plinthW = 28.0, plinthD = 23.0, plinthH = 0.35;
  const plinth = _buildBox(group, plinthW, plinthH, plinthD, 0, plinthH / 2, 0, mat, edgeMat, {
    label: "Reinforced Civil Foundation Slab & Plinth",
    desc: "Reinforced concrete foundation engineered for shock dampening, geotechnical drainage, and heavy logistical distribution."
  });
  plinth.receiveShadow = true;

  // Perimeter boundary border
  const apronGeo = new THREE.RingGeometry(14.0, 15.2, 48);
  const apronMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
  const apron = new THREE.Mesh(apronGeo, apronMat);
  apron.rotation.x = -Math.PI / 2;
  apron.position.y = plinthH + 0.005;
  group.add(apron);
}

function _buildCentralCommandHub(group, wallMat, roofMat, steelMat, edgeMat) {
  const hubW = 7.6, hubD = 7.6, hubH = 4.0;
  const hubY = 0.35 + hubH / 2;

  // Outer structural shell
  _buildBox(group, hubW, hubH, hubD, 0, hubY, 0, wallMat, edgeMat, {
    label: "Tactical Operations & Command Hub (C4I)",
    desc: "Hardened communications and disaster coordination center with satellite uplink, radio telemetry, and microgrid controls."
  });

  // Flat reinforced roof with parapet
  _buildBox(group, hubW + 0.4, 0.22, hubD + 0.4, 0, 0.35 + hubH + 0.11, 0, roofMat, edgeMat, {
    label: "Hardened Rooftop Shielding & Solar Canopy",
    desc: "Reinforced composite roof deck with parapet coping, microgrid solar PV arrays, and omnidirectional antenna masts."
  });

  // ── Interior Command Furniture (visible in X-Ray) ──
  // Central Tactical Briefing Table
  const tableW = 3.0, tableD = 1.6, tableH = 0.85;
  const tableMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.6 });
  const table = new THREE.Mesh(new THREE.BoxGeometry(tableW, tableH, tableD), tableMat);
  table.position.set(0, 0.35 + tableH / 2, 0);
  group.add(table);

  // Glowing Holographic Situational Map Display on Table Top
  const holoGeo = new THREE.BoxGeometry(tableW * 0.85, 0.05, tableD * 0.8);
  const holoMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    emissive: 0x0284c7,
    emissiveIntensity: 0.7,
    roughness: 0.1
  });
  const holo = new THREE.Mesh(holoGeo, holoMat);
  holo.position.set(0, 0.35 + tableH + 0.03, 0);
  holo.userData = {
    label: "Tactical Situational Hologram Display",
    desc: "Real-time GIS telemetry display tracking perimeter environmental sensors, microgrid power, and regional crisis status."
  };
  group.add(holo);
  _3D.interactiveMeshes.push(holo);

  // 4 Command Chairs
  const chairMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
  [
    [-1.0, -1.2], [1.0, -1.2],
    [-1.0,  1.2], [1.0,  1.2]
  ].forEach(([cx, cz]) => {
    const chair = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.9, 0.5), chairMat);
    chair.position.set(cx, 0.35 + 0.45, cz);
    group.add(chair);
  });

  // Comms & Server Racks on North Hub wall
  for (let r = 0; r < 3; r++) {
    const rackMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.4, metalness: 0.7 });
    const rack = new THREE.Mesh(new THREE.BoxGeometry(0.85, 2.0, 0.6), rackMat);
    rack.position.set(-2.0 + r * 1.0, 0.35 + 1.0, hubD / 2 - 0.5);
    group.add(rack);

    // Glowing server status LEDs
    const ledMat = new THREE.MeshBasicMaterial({ color: r === 1 ? 0x22c55e : 0x06b6d4 });
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.08, 0.02), ledMat);
    led.position.set(-2.0 + r * 1.0, 0.35 + 1.6, hubD / 2 - 0.18);
    group.add(led);
  }

  // ── Rooftop Tactical Systems ──
  const roofTopY = 0.35 + hubH + 0.22;

  // 1. Parabolic Satellite Communications Uplink Dish
  const dishMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3, metalness: 0.7 });
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2.2), dishMat);
  dish.rotation.x = Math.PI / 3.2;
  dish.rotation.z = -Math.PI / 8;
  dish.position.set(1.8, roofTopY + 1.1, -1.5);
  dish.userData = {
    label: "Emergency Satellite Uplink Dish (Ku/Ka-Band)",
    desc: "Autonomous motorized transceiver maintaining encrypted satellite datalink for disaster telemetry and communications."
  };
  group.add(dish);
  _3D.interactiveMeshes.push(dish);

  // Dish mounting tripod
  const tripodMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8 });
  const tripod = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.9, 8), tripodMat);
  tripod.position.set(1.8, roofTopY + 0.45, -1.5);
  group.add(tripod);

  // 2. High-Frequency Communications Mast with Red Obstruction Beacon
  const mastMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.1, 4.2, 8), mastMat);
  mast.position.set(-2.4, roofTopY + 2.1, 2.0);
  group.add(mast);

  const beaconMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), beaconMat);
  beacon.position.set(-2.4, roofTopY + 4.25, 2.0);
  group.add(beacon);

  // 3. Four Solar Microgrid PV Panels tilted south
  const pvMat = new THREE.MeshPhysicalMaterial({
    color: 0x1e3a8a,
    roughness: 0.08,
    metalness: 0.85,
    reflectivity: 0.9
  });
  [-1.8, 0.2].forEach(px => {
    [-1.2, 0.8].forEach(pz => {
      const pv = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 1.2), pvMat);
      pv.position.set(px, roofTopY + 0.25, pz);
      pv.rotation.x = -0.32; // Tilted toward South (-Z)
      pv.userData = {
        label: "Rooftop Solar PV Microgrid Canopy",
        desc: "High-efficiency monocrystalline solar array providing continuous microgrid recharge for shelter battery banks."
      };
      group.add(pv);
      _3D.interactiveMeshes.push(pv);
    });
  });
}

function _buildBerthingModule100(group, wallMat, roofMat, bunkFrameMat, mattressMat, blanketColors, footlockerMat, edgeMat) {
  const wingW = 9.8, wingD = 14.0, wingH = 3.6;
  const wingX = 8.6, wingZ = 0.0;
  const wingY = 0.35 + wingH / 2;

  // Outer structural envelope
  _buildBox(group, wingW, wingH, wingD, wingX, wingY, wingZ, wallMat, edgeMat, {
    label: "100-Person Bunk Berthing Module (East Wing)",
    desc: "Fortified residential habitation quarters containing 50 double-tiered military bunk units (100 sleeping cots total), thermal bedding, and individual personal footlockers."
  });

  // Roof slab
  _buildBox(group, wingW + 0.2, 0.18, wingD + 0.2, wingX, 0.35 + wingH + 0.09, wingZ, roofMat, edgeMat);

  // ── 50 DOUBLE-TIER BUNK BED UNITS = 100 OCCUPANT COTS ──
  const xOffsets = [-3.6, -1.8, 0.0, 1.8, 3.6];
  const zOffsets = [-5.4, -4.2, -3.0, -1.8, -0.6, 0.6, 1.8, 3.0, 4.2, 5.4];

  const postGeo = new THREE.BoxGeometry(0.04, 1.7, 0.04);
  const frameGeo = new THREE.BoxGeometry(0.85, 0.05, 1.05);
  const mattressGeo = new THREE.BoxGeometry(0.78, 0.08, 0.98);
  const blanketGeo = new THREE.BoxGeometry(0.74, 0.05, 0.55);
  const pillowGeo = new THREE.BoxGeometry(0.68, 0.05, 0.25);
  const lockerGeo = new THREE.BoxGeometry(0.65, 0.22, 0.35);

  const pillowMat = new THREE.MeshStandardMaterial({ color: 0xf4f4f5, roughness: 0.9 });

  let bunkCount = 0;

  xOffsets.forEach(xOff => {
    zOffsets.forEach(zOff => {
      bunkCount++;
      const bx = wingX + xOff;
      const bz = wingZ + zOff;
      const baseY = 0.35;

      // 4 Steel Uprights
      const pW = 0.4, pD = 0.5;
      [-pW, pW].forEach(px => {
        [-pD, pD].forEach(pz => {
          const post = new THREE.Mesh(postGeo, bunkFrameMat);
          post.position.set(bx + px, baseY + 0.85, bz + pz);
          group.add(post);
        });
      });

      // Blanket color for this bunk
      const bMat = new THREE.MeshStandardMaterial({
        color: blanketColors[bunkCount % blanketColors.length],
        roughness: 0.85
      });

      // ── Lower Cot (Occupant Cot #1) ──
      const lowerY = baseY + 0.35;
      const lFrame = new THREE.Mesh(frameGeo, bunkFrameMat);
      lFrame.position.set(bx, lowerY, bz);
      group.add(lFrame);

      const lMattress = new THREE.Mesh(mattressGeo, mattressMat);
      lMattress.position.set(bx, lowerY + 0.06, bz);
      group.add(lMattress);

      const lBlanket = new THREE.Mesh(blanketGeo, bMat);
      lBlanket.position.set(bx, lowerY + 0.12, bz - 0.18);
      group.add(lBlanket);

      const lPillow = new THREE.Mesh(pillowGeo, pillowMat);
      lPillow.position.set(bx, lowerY + 0.12, bz + 0.32);
      group.add(lPillow);

      // ── Upper Cot (Occupant Cot #2) ──
      const upperY = baseY + 1.25;
      const uFrame = new THREE.Mesh(frameGeo, bunkFrameMat);
      uFrame.position.set(bx, upperY, bz);
      group.add(uFrame);

      const uMattress = new THREE.Mesh(mattressGeo, mattressMat);
      uMattress.position.set(bx, upperY + 0.06, bz);
      group.add(uMattress);

      const uBlanket = new THREE.Mesh(blanketGeo, bMat);
      uBlanket.position.set(bx, upperY + 0.12, bz - 0.18);
      group.add(uBlanket);

      const uPillow = new THREE.Mesh(pillowGeo, pillowMat);
      uPillow.position.set(bx, upperY + 0.12, bz + 0.32);
      group.add(uPillow);

      // Personal Footlocker Box under lower bunk
      const locker = new THREE.Mesh(lockerGeo, footlockerMat);
      locker.position.set(bx, baseY + 0.11, bz);
      group.add(locker);
    });
  });

  // Representative interactive hit zone for the berthing beds
  const berthingZone = new THREE.Mesh(
    new THREE.BoxGeometry(wingW * 0.9, 1.8, wingD * 0.9),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  berthingZone.position.set(wingX, 0.35 + 0.9, wingZ);
  berthingZone.userData = {
    label: "100-Person Berthing Interior (50 Double Bunks)",
    desc: "100 individual sleeping cots (50 double-tiered military steel bunks) equipped with high-density foam mattresses, thermal disaster blankets, and personal steel footlockers."
  };
  group.add(berthingZone);
  _3D.interactiveMeshes.push(berthingZone);
}

function _buildLogisticsWing(group, wallMat, roofMat, steelMat, mreTex, waterTankTex, edgeMat) {
  const wingW = 9.8, wingD = 14.0, wingH = 3.6;
  const wingX = -8.6, wingZ = 0.0;
  const wingY = 0.35 + wingH / 2;

  // Outer structural envelope
  _buildBox(group, wingW, wingH, wingD, wingX, wingY, wingZ, wallMat, edgeMat, {
    label: "Humanitarian Logistics, Food Depot & Water Wing (West Wing)",
    desc: "Critical survival commodities depot housing 90-day humanitarian MRE rations, grain pallets, mess galley, and 30,000L potable water reserve."
  });

  // Roof slab
  _buildBox(group, wingW + 0.2, 0.18, wingD + 0.2, wingX, 0.35 + wingH + 0.09, wingZ, roofMat, edgeMat);

  // ════════════════════════════════════════════════════════════
  // 1. FOOD STORAGE DEPOT (North zone of Logistics Wing, z > 1.5)
  // ════════════════════════════════════════════════════════════
  const palletMat = new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.85 });
  const mreMat = new THREE.MeshStandardMaterial({
    map: mreTex,
    roughness: 0.75
  });
  const grainMat = new THREE.MeshStandardMaterial({ color: 0xca8a04, roughness: 0.9 });
  const cannedMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.4, metalness: 0.6 });

  // 6 Cargo Pallets with Stacked MRE Ration Cartons & Grain Sacks
  const palletPositions = [
    [- wingW / 2 + 1.8, 2.5], [- wingW / 2 + 3.4, 2.5],
    [- wingW / 2 + 1.8, 4.5], [- wingW / 2 + 3.4, 4.5],
    [wingX - 1.2, 2.5],       [wingX - 1.2, 4.5]
  ];

  palletPositions.forEach(([px, pz], pIdx) => {
    // Wooden Euro pallet
    const pal = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 1.0), palletMat);
    pal.position.set(px, 0.35 + 0.06, pz);
    pal.receiveShadow = true;
    group.add(pal);

    // Stacked Ration / Grain Crates (2 tiers high)
    for (let tier = 0; tier < 2; tier++) {
      const cMat = (pIdx + tier) % 2 === 0 ? mreMat : grainMat;
      const crate = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.42, 0.85), cMat);
      crate.position.set(px, 0.35 + 0.12 + 0.21 + tier * 0.43, pz);
      crate.castShadow = true;
      crate.userData = {
        label: tier === 0 ? "Humanitarian MRE Food Ration Pallet" : "Emergency Grain & Flour Reserve",
        desc: "Calorie-dense survival nutrition packages (3,200 kcal/person/day) sealed in military-grade moisture-barrier packaging."
      };
      group.add(crate);
      _3D.interactiveMeshes.push(crate);
    }
  });

  // Heavy-Duty Multi-Tier Storage Shelving Rack on West wall
  const rackFrameMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.8, roughness: 0.3 });
  const rack = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.4, 3.8), rackFrameMat);
  rack.position.set(wingX - wingW / 2 + 0.6, 0.35 + 1.2, 4.2);
  rack.userData = {
    label: "Tactical Supply Storage Shelving Racks",
    desc: "Galvanized multi-tier shelving stacked with canned protein rations, infant formula, survival biscuits, and electrolyte supplies."
  };
  group.add(rack);
  _3D.interactiveMeshes.push(rack);

  // Canned Goods & Biscuit Tins on Shelves
  for (let s = 0; s < 3; s++) {
    const tins = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.28, 3.4), cannedMat);
    tins.position.set(wingX - wingW / 2 + 0.6, 0.35 + 0.4 + s * 0.75, 4.2);
    group.add(tins);
  }

  // ════════════════════════════════════════════════════════════
  // 2. FIELD GALLEY & MESS HALL (Center zone, -1.5 < z < 1.5)
  // ════════════════════════════════════════════════════════════
  const stainlessMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.2, metalness: 0.9 });
  const galleyTableMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
  const benchMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 });

  // Stainless-Steel Food Prep Counter
  const prepCounter = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.9, 0.85), stainlessMat);
  prepCounter.position.set(wingX, 0.35 + 0.45, 0.8);
  prepCounter.userData = {
    label: "Field Galley & Hot Food Serving Station",
    desc: "Commercial stainless-steel induction preparation surface and warming bain-maries for serving 100 occupants."
  };
  group.add(prepCounter);
  _3D.interactiveMeshes.push(prepCounter);

  // 2 Long Communal Dining Tables with Attached Benches
  [-0.6, -1.8].forEach(tz => {
    const dTable = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.75, 0.75), galleyTableMat);
    dTable.position.set(wingX, 0.35 + 0.375, tz);
    group.add(dTable);

    [-0.55, 0.55].forEach(bz => {
      const bench = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.42, 0.28), benchMat);
      bench.position.set(wingX, 0.35 + 0.21, tz + bz);
      group.add(bench);
    });
  });

  // ════════════════════════════════════════════════════════════
  // 3. POTABLE WATER STORAGE & PURIFICATION (South zone, z < -2.5)
  // ════════════════════════════════════════════════════════════
  const waterTankMat = new THREE.MeshStandardMaterial({
    map: waterTankTex,
    roughness: 0.35,
    metalness: 0.45
  });
  const tankBandMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.8 });

  // Two 15,000-Liter Tactical Cylindrical Cistern Tanks (Total 30,000L Reserve)
  [-wingW / 2 + 2.5, wingX + 1.2].forEach((tx, tIdx) => {
    const tankH = 2.6, tankRadius = 1.2;
    const tankGeo = new THREE.CylinderGeometry(tankRadius, tankRadius, tankH, 24);
    const tank = new THREE.Mesh(tankGeo, waterTankMat);
    tank.position.set(tx, 0.35 + tankH / 2, -4.6);
    tank.castShadow = true;
    tank.userData = {
      label: `Potable Water Cistern Tank #${tIdx + 1} (15,000L)`,
      desc: "Reinforced food-grade polyethylene cistern with internal ultraviolet sterilizer and continuous level sensor (150L/person 10-day reserve)."
    };
    group.add(tank);
    _3D.interactiveMeshes.push(tank);

    // Blue Potable Water Classification Identification Ring
    const band = new THREE.Mesh(new THREE.CylinderGeometry(tankRadius + 0.02, tankRadius + 0.02, 0.35, 24), tankBandMat);
    band.position.set(tx, 0.35 + tankH * 0.65, -4.6);
    group.add(band);

    // Top Manhole Inspection Hatch
    const hatch = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.12, 16), steelMat);
    hatch.position.set(tx, 0.35 + tankH + 0.06, -4.6);
    group.add(hatch);
  });

  // Reverse-Osmosis (RO) Water Filtration & UV Purification Skid
  const roSkidMat = new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.3, metalness: 0.7 });
  const roSkid = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 1.2), roSkidMat);
  roSkid.position.set(wingX + 3.0, 0.35 + 0.7, -4.6);
  roSkid.userData = {
    label: "Reverse-Osmosis (RO) Water Purification Skid",
    desc: "Multi-stage particulate pre-filters, reverse-osmosis membranes, and germicidal UV lamps filtering 1,200 liters/hour."
  };
  group.add(roSkid);
  _3D.interactiveMeshes.push(roSkid);
}

function _buildMedicalAndPowerWing(group, wallMat, roofMat, steelMat, edgeMat) {
  const wingW = 12.0, wingD = 5.2, wingH = 3.6;
  const wingX = 0.0, wingZ = 8.2;
  const wingY = 0.35 + wingH / 2;

  // Outer structural envelope
  _buildBox(group, wingW, wingH, wingD, wingX, wingY, wingZ, wallMat, edgeMat, {
    label: "Medical Triage Station & Life Support Power Plant (North Wing)",
    desc: "Emergency trauma surgical bay, isolation beds, 250 kW backup diesel generator, and positive-pressure CBRN air filtration plant."
  });

  // Roof slab
  _buildBox(group, wingW + 0.2, 0.18, wingD + 0.2, wingX, 0.35 + wingH + 0.09, wingZ, roofMat, edgeMat);

  // ════════════════════════════════════════════════════════════
  // 1. EMERGENCY MEDICAL TRIAGE BAY (East half, x > 0.5)
  // ════════════════════════════════════════════════════════════
  const gurneyMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6 });
  const crossMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const ivPoleMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.1 });
  const ivBagMat = new THREE.MeshPhysicalMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
  const o2Mat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.4, metalness: 0.5 });

  // 4 Emergency Trauma Gurneys / Stretchers
  [1.5, 3.0, 4.5].forEach((gx, gIdx) => {
    const gurney = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.65, 1.8), gurneyMat);
    gurney.position.set(gx, 0.35 + 0.325, wingZ - 0.3);
    gurney.userData = {
      label: `Emergency Trauma Stretcher Bed #${gIdx + 1}`,
      desc: "Adjustable critical-care gurney equipped with vital-sign telemetry, clean linen, and emergency immobilization restraints."
    };
    group.add(gurney);
    _3D.interactiveMeshes.push(gurney);

    // Red Cross Symbol on Mattress Center
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.42), crossMat);
    crossV.position.set(gx, 0.35 + 0.66, wingZ - 0.3);
    group.add(crossV);
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 0.12), crossMat);
    crossH.position.set(gx, 0.35 + 0.66, wingZ - 0.3);
    group.add(crossH);

    // Mobile IV Drip Stand beside each bed
    const ivPole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.7, 8), ivPoleMat);
    ivPole.position.set(gx + 0.52, 0.35 + 0.85, wingZ + 0.4);
    group.add(ivPole);

    const ivBag = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 0.06), ivBagMat);
    ivBag.position.set(gx + 0.52, 0.35 + 1.55, wingZ + 0.4);
    group.add(ivBag);
  });

  // Medical Oxygen Cylinders
  [1.0, 1.3, 1.6].forEach(ox => {
    const o2 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.9, 12), o2Mat);
    o2.position.set(ox, 0.35 + 0.45, wingZ + 1.8);
    group.add(o2);
  });

  // ════════════════════════════════════════════════════════════
  // 2. BACKUP GENERATOR & CBRN AIR FILTRATION (West half, x < -0.5)
  // ════════════════════════════════════════════════════════════
  const genMat = new THREE.MeshStandardMaterial({ color: 0xca8a04, roughness: 0.5, metalness: 0.4 });
  const bessMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.8 });

  // 250 kW Containerized Backup Diesel Generator
  const gen = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 1.8), genMat);
  gen.position.set(-2.4, 0.35 + 0.8, wingZ);
  gen.userData = {
    label: "250 kW Primary Backup Diesel Generator",
    desc: "Heavy-duty industrial generator with 1,500L belly fuel tank, automatic transfer switch (ATS), and sound-attenuated enclosure."
  };
  group.add(gen);
  _3D.interactiveMeshes.push(gen);

  // Generator exhaust muffler pipe extending through roof
  const exhaustMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9 });
  const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.4, 8), exhaustMat);
  exhaust.position.set(-2.4, 0.35 + wingH + 0.7, wingZ);
  group.add(exhaust);

  // 4 Microgrid Lithium Battery Energy Storage System (BESS) Racks
  [-4.2, -5.0].forEach(bx => {
    [-0.6, 0.6].forEach(bz => {
      const bess = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.8, 0.75), bessMat);
      bess.position.set(bx, 0.35 + 0.9, wingZ + bz);
      bess.userData = {
        label: "500 kWh Lithium Microgrid Battery Rack (BESS)",
        desc: "High-capacity battery storage banks providing seamless uninterruptible power supply (UPS) and solar storage."
      };
      group.add(bess);
      _3D.interactiveMeshes.push(bess);
    });
  });

  // Positive-Pressure CBRN Air Filtration & Overpressure Plant
  const cbrnMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.4, metalness: 0.5 });
  const cbrn = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.5, 1.2), cbrnMat);
  cbrn.position.set(-0.8, 0.35 + 0.75, wingZ + 1.2);
  cbrn.userData = {
    label: "Positive-Pressure CBRN/HEPA Air Filtration Plant",
    desc: "Nuclear, Biological & Chemical (CBRN) filtration unit maintaining 100 Pa positive pressure to prevent toxic contaminant intrusion."
  };
  group.add(cbrn);
  _3D.interactiveMeshes.push(cbrn);
}

function _buildBlastAirlockPortal(group, steelMat, edgeMat) {
  const airW = 4.6, airD = 3.4, airH = 3.2;
  const airX = 0.0, airZ = -5.4;
  const airY = 0.35 + airH / 2;

  // Reinforced concrete airlock vestibule
  const airlockMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8, metalness: 0.2 });
  _buildBox(group, airW, airH, airD, airX, airY, airZ, airlockMat, edgeMat, {
    label: "Reinforced Blast Airlock Portal & Decon Vestibule",
    desc: "Shock-resistant blast entrance vestibule equipped with dual interlocking blast doors, hermetic seals, and decontamination shower."
  });

  // Heavy steel blast door on South face
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.35, metalness: 0.85 });
  const door = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.4, 0.2), doorMat);
  door.position.set(0, 0.35 + 1.2, airZ - airD / 2 - 0.05);
  group.add(door);

  // Door locking wheel
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3, metalness: 0.8 });
  const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.04, 8, 24), wheelMat);
  wheel.position.set(0, 0.35 + 1.2, airZ - airD / 2 - 0.18);
  group.add(wheel);

  // Entrance Ramp with yellow/black hazard safety threshold
  const rampGeo = new THREE.BoxGeometry(2.6, 0.15, 2.0);
  const rampMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 });
  const ramp = new THREE.Mesh(rampGeo, rampMat);
  ramp.position.set(0, 0.15, airZ - airD / 2 - 1.0);
  ramp.rotation.x = 0.08;
  group.add(ramp);
}

// ── MEP Structural Detailing ──

function _buildOverheadMEPDuctwork(group) {
  const ductMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.8,
    roughness: 0.25
  });

  const ductH = 0.26, ductW = 0.42;
  const ceilingY = 0.35 + 3.2;

  // Main Trunk Duct running North-South from CBRN plant across the Command Hub
  const mainTrunk = new THREE.Mesh(new THREE.BoxGeometry(ductW, ductH, 18.0), ductMat);
  mainTrunk.position.set(0, ceilingY, 1.5);
  group.add(mainTrunk);

  // East Branch Duct feeding 100-person Berthing Module
  const eastBranch = new THREE.Mesh(new THREE.BoxGeometry(9.0, ductH, ductW), ductMat);
  eastBranch.position.set(8.5, ceilingY, 0);
  group.add(eastBranch);

  // West Branch Duct feeding Food Depot & Galley
  const westBranch = new THREE.Mesh(new THREE.BoxGeometry(9.0, ductH, ductW), ductMat);
  westBranch.position.set(-8.5, ceilingY, 0);
  group.add(westBranch);

  // Circular Air Diffuser Grilles hanging below ducts
  const diffuserMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.5 });
  const diffuserPositions = [
    [0, -2.5], [0, 0], [0, 2.5], [0, 6.0],
    [5.5, 0], [9.0, 0], [12.0, 0],
    [-5.5, 0], [-9.0, 0], [-12.0, 0]
  ];
  diffuserPositions.forEach(([dx, dz]) => {
    const diff = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.06, 12), diffuserMat);
    diff.position.set(dx, ceilingY - ductH / 2 - 0.03, dz);
    group.add(diff);
  });

  // Structural Steel I-Beams across ceilings
  const beamMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.3 });
  [-5.0, -1.5, 2.0, 5.5].forEach(bz => {
    const eBeam = new THREE.Mesh(new THREE.BoxGeometry(9.4, 0.18, 0.12), beamMat);
    eBeam.position.set(8.6, ceilingY + 0.12, bz);
    group.add(eBeam);

    const wBeam = new THREE.Mesh(new THREE.BoxGeometry(9.4, 0.18, 0.12), beamMat);
    wBeam.position.set(-8.6, ceilingY + 0.12, bz);
    group.add(wBeam);
  });

  // Potable Water Distribution Pipe connecting Cisterns toward Galley
  const pipeMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6, roughness: 0.3 });
  const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 5.5, 8), pipeMat);
  pipe.rotation.x = Math.PI / 2;
  pipe.position.set(-6.8, 0.35 + 0.2, -2.0);
  group.add(pipe);
}

// ── Realistic Interior Illumination ──

function _buildInteriorLighting(group) {
  // Command Hub: Cool Tactical Blue Situational Backlight
  const cmdLight = new THREE.PointLight(0x38bdf8, 1.4, 9.0);
  cmdLight.position.set(0, 0.35 + 2.8, 0);
  group.add(cmdLight);

  // Medical Triage: Clean 5000K Surgical White Illumination
  const medLight = new THREE.PointLight(0xffffff, 1.6, 8.0);
  medLight.position.set(2.8, 0.35 + 2.8, 8.0);
  group.add(medLight);

  // Food Depot & Galley: Warm Fluorescent Utility Illumination
  const foodLight = new THREE.PointLight(0xfef08a, 1.2, 10.0);
  foodLight.position.set(-8.6, 0.35 + 2.8, 3.5);
  group.add(foodLight);

  const galleyLight = new THREE.PointLight(0xffedd5, 1.1, 8.0);
  galleyLight.position.set(-8.6, 0.35 + 2.8, -1.0);
  group.add(galleyLight);

  // Berthing Module: Soft Amber Ambient Sleep-Cycle Lighting
  [-3.0, 3.0].forEach(bz => {
    const berthLight = new THREE.PointLight(0xfed7aa, 0.95, 9.0);
    berthLight.position.set(8.6, 0.35 + 2.8, bz);
    group.add(berthLight);
  });
}

// ── Procedural Human Character Generator & Interior Workforce ──

function _buildHumanWorker(group, x, y, z, rotY, roleConfig) {
  const person = new THREE.Group();
  person.position.set(x, y, z);
  person.rotation.y = rotY;

  const skinMat = new THREE.MeshToonMaterial({
    color: roleConfig.skinColor || 0xd29b76,
    gradientMap: _3D.toonGradientMap
  });

  const clothesMat = new THREE.MeshToonMaterial({
    color: roleConfig.clothesColor || 0x1e293b,
    gradientMap: _3D.toonGradientMap
  });

  const pantsMat = new THREE.MeshToonMaterial({
    color: roleConfig.pantsColor || 0x0f172a,
    gradientMap: _3D.toonGradientMap
  });

  const bootMat = new THREE.MeshToonMaterial({
    color: 0x18181b,
    gradientMap: _3D.toonGradientMap
  });

  const isSeated = roleConfig.isSeated || false;

  // 1. BOOTS & LEGS
  if (!isSeated) {
    [-0.1, 0.1].forEach(lx => {
      const boot = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.12, 0.22), bootMat);
      boot.position.set(lx, 0.06, 0.03);
      boot.castShadow = true;
      person.add(boot);

      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.075, 0.72, 8), pantsMat);
      leg.position.set(lx, 0.12 + 0.36, 0);
      leg.castShadow = true;
      person.add(leg);
    });
  } else {
    [-0.1, 0.1].forEach(lx => {
      const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.42), pantsMat);
      thigh.position.set(lx, 0.48, 0.21);
      person.add(thigh);

      const shin = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.42, 0.11), pantsMat);
      shin.position.set(lx, 0.21, 0.38);
      person.add(shin);

      const boot = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.1, 0.2), bootMat);
      boot.position.set(lx, 0.05, 0.44);
      person.add(boot);
    });
  }

  // 2. PELVIS & TORSO
  const torsoY = isSeated ? 0.54 : 0.84;
  
  const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.14, 0.22), pantsMat);
  pelvis.position.set(0, torsoY + 0.07, 0);
  person.add(pelvis);

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.46, 0.22), clothesMat);
  torso.position.set(0, torsoY + 0.35, 0);
  torso.castShadow = true;
  person.add(torso);

  if (roleConfig.hasVest) {
    const vestMat = new THREE.MeshToonMaterial({ color: 0xf59e0b, gradientMap: _3D.toonGradientMap });
    const vest = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.42, 0.24), vestMat);
    vest.position.set(0, torsoY + 0.34, 0);
    person.add(vest);
    const stripeMat = new THREE.MeshToonMaterial({ color: 0xf8fafc, gradientMap: _3D.toonGradientMap });
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.385, 0.06, 0.245), stripeMat);
    stripe.position.set(0, torsoY + 0.32, 0);
    person.add(stripe);
  } else if (roleConfig.hasApron) {
    const apronMat = new THREE.MeshToonMaterial({ color: 0xf8fafc, gradientMap: _3D.toonGradientMap });
    const apron = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.52, 0.02), apronMat);
    apron.position.set(0, torsoY + 0.28, 0.12);
    person.add(apron);
  }

  // 3. NECK & HEAD
  const neckY = torsoY + 0.58;
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.1, 8), skinMat);
  neck.position.set(0, neckY + 0.05, 0);
  person.add(neck);

  const headY = neckY + 0.1 + 0.11;
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.21, 0.18), skinMat);
  head.position.set(0, headY, 0);
  head.castShadow = true;
  person.add(head);

  if (roleConfig.headgear === 'cap') {
    const capMat = new THREE.MeshToonMaterial({ color: roleConfig.capColor || 0x1e293b, gradientMap: _3D.toonGradientMap });
    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.08, 0.22), capMat);
    cap.position.set(0, headY + 0.09, 0.02);
    person.add(cap);
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 0.1), capMat);
    visor.position.set(0, headY + 0.06, 0.14);
    person.add(visor);
  } else if (roleConfig.headgear === 'hardhat') {
    const hatMat = new THREE.MeshToonMaterial({ color: 0xfacc15, gradientMap: _3D.toonGradientMap });
    const hat = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10, 0, Math.PI * 2, 0, Math.PI / 1.9), hatMat);
    hat.position.set(0, headY + 0.06, 0);
    person.add(hat);
  } else if (roleConfig.headgear === 'headset') {
    const bandMat = new THREE.MeshToonMaterial({ color: 0x0f172a, gradientMap: _3D.toonGradientMap });
    const earMat = new THREE.MeshToonMaterial({ color: 0x38bdf8, gradientMap: _3D.toonGradientMap });
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.02, 6, 16, Math.PI), bandMat);
    band.rotation.x = -Math.PI / 2;
    band.position.set(0, headY + 0.08, 0);
    person.add(band);
    [-0.1, 0.1].forEach(ex => {
      const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 8), earMat);
      ear.rotation.z = Math.PI / 2;
      ear.position.set(ex, headY, 0);
      person.add(ear);
    });
  } else {
    const hairMat = new THREE.MeshToonMaterial({ color: roleConfig.hairColor || 0x27272a, gradientMap: _3D.toonGradientMap });
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.07, 0.19), hairMat);
    hair.position.set(0, headY + 0.09, -0.01);
    person.add(hair);
  }

  // 4. ARMS & HANDS
  const armLen = 0.34;
  const armThick = 0.08;
  const shoulderY = torsoY + 0.52;

  const leftArm = new THREE.Mesh(new THREE.BoxGeometry(armThick, armLen, armThick), clothesMat);
  leftArm.position.set(-0.23, shoulderY - armLen / 2, (roleConfig.armPose === 'carry' || roleConfig.armPose === 'clipboard') ? 0.12 : 0);
  if (roleConfig.armPose === 'carry') leftArm.rotation.x = -Math.PI / 3;
  if (roleConfig.armPose === 'clipboard') leftArm.rotation.x = -Math.PI / 2.6;
  if (roleConfig.armPose === 'table') leftArm.rotation.x = -Math.PI / 3.8;
  person.add(leftArm);

  const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.07, 0.06), skinMat);
  leftHand.position.set(-0.23, shoulderY - armLen - 0.03, (roleConfig.armPose === 'carry' || roleConfig.armPose === 'clipboard') ? 0.22 : 0);
  person.add(leftHand);

  const rightArm = new THREE.Mesh(new THREE.BoxGeometry(armThick, armLen, armThick), clothesMat);
  rightArm.position.set(0.23, shoulderY - armLen / 2, (roleConfig.armPose === 'carry' || roleConfig.armPose === 'reaching') ? 0.12 : 0);
  if (roleConfig.armPose === 'carry') rightArm.rotation.x = -Math.PI / 3;
  if (roleConfig.armPose === 'reaching') rightArm.rotation.x = -Math.PI / 2.4;
  if (roleConfig.armPose === 'table') rightArm.rotation.x = -Math.PI / 3.8;
  person.add(rightArm);

  const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.07, 0.06), skinMat);
  rightHand.position.set(0.23, shoulderY - armLen - 0.03, (roleConfig.armPose === 'carry' || roleConfig.armPose === 'reaching') ? 0.22 : 0);
  person.add(rightHand);

  // 5. ROLE-SPECIFIC ACCESSORY ITEMS
  if (roleConfig.accessory === 'clipboard') {
    const boardMat = new THREE.MeshToonMaterial({ color: 0x78350f, gradientMap: _3D.toonGradientMap });
    const paperMat = new THREE.MeshToonMaterial({ color: 0xf8fafc, gradientMap: _3D.toonGradientMap });
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.28, 0.02), boardMat);
    board.position.set(-0.16, shoulderY - 0.15, 0.26);
    board.rotation.x = -Math.PI / 3;
    person.add(board);
    const paper = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.24, 0.01), paperMat);
    paper.position.set(-0.16, shoulderY - 0.15, 0.275);
    paper.rotation.x = -Math.PI / 3;
    person.add(paper);
  } else if (roleConfig.accessory === 'crate') {
    const boxMat = new THREE.MeshToonMaterial({ color: 0xd97706, gradientMap: _3D.toonGradientMap });
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.26, 0.32), boxMat);
    box.position.set(0, shoulderY - 0.2, 0.32);
    box.castShadow = true;
    person.add(box);
  }

  // Hit box for raycaster hover metadata
  const hitBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 1.8, 0.7),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitBox.position.set(0, 0.9, 0);
  hitBox.userData = {
    label: roleConfig.name || "Shelter Personnel",
    desc: roleConfig.desc || "Active duty shelter operator."
  };
  person.add(hitBox);
  _3D.interactiveMeshes.push(hitBox);

  group.add(person);
  return person;
}

function _buildInteriorPersonnel(group) {
  // ── 1. C4I COMMAND & OPERATIONS HUB ──
  _buildHumanWorker(group, 0.0, 0.35, -1.1, 0, {
    name: "Captain J. Vance (Tactical C4I Commander)",
    desc: "Coordinating multi-agency disaster logistics, telemetry streams, and shelter microgrid priority allocation.",
    clothesColor: 0x365314, // olive drab tactical uniform
    pantsColor: 0x1c1917,   // tactical trousers
    headgear: 'headset',
    armPose: 'table',
    skinColor: 0xd29b76
  });

  _buildHumanWorker(group, -1.8, 0.35, 2.2, 0, {
    name: "Lt. Elena Rostova (Sensor & Telemetry Officer)",
    desc: "Monitoring satellite datalink, regional seismic sensors, and automated atmospheric contamination alarms.",
    clothesColor: 0x1e293b,
    pantsColor: 0x0f172a,
    headgear: 'headset',
    isSeated: true,
    skinColor: 0xe0a98b
  });

  // ── 2. LOGISTICS WING & MESS GALLEY ──
  _buildHumanWorker(group, -8.2, 0.35, 3.2, Math.PI / 2, {
    name: "Specialist Marcus Brody (Supply Logistics Officer)",
    desc: "Verifying 90-day humanitarian MRE pallet inventory, water ration quotas, and nutritional distribution logs.",
    clothesColor: 0x1e3a8a,
    pantsColor: 0x0f172a,
    hasVest: true,
    headgear: 'cap',
    capColor: 0xca8a04,
    armPose: 'clipboard',
    accessory: 'clipboard',
    skinColor: 0x8d5524
  });

  _buildHumanWorker(group, -10.2, 0.35, 4.0, -Math.PI / 4, {
    name: "Sergei Kozlov (Disaster Logistics Handler)",
    desc: "Moving sealed high-calorie MRE ration cartons from transport pallets to the heavy-duty storage shelving.",
    clothesColor: 0x374151,
    pantsColor: 0x1f2937,
    headgear: 'cap',
    capColor: 0x1f2937,
    armPose: 'carry',
    accessory: 'crate',
    skinColor: 0xc68642
  });

  _buildHumanWorker(group, -8.6, 0.35, 1.4, Math.PI, {
    name: "Chef Marco Alvarez (Field Galley Specialist)",
    desc: "Managing commercial induction cooktops and warming bain-maries to serve nutritious hot meals to 100 shelter occupants.",
    clothesColor: 0x1e293b,
    pantsColor: 0x0f172a,
    hasApron: true,
    headgear: 'cap',
    capColor: 0xf8fafc,
    armPose: 'table',
    skinColor: 0xd29b76
  });

  // ── 3. EMERGENCY MEDICAL TRIAGE STATION ──
  _buildHumanWorker(group, 2.2, 0.35, 7.5, -Math.PI / 2, {
    name: "Dr. Sarah Lin (Lead Trauma Surgeon)",
    desc: "Administering emergency medical care, vital signs triage assessment, and surgical stabilization on critical trauma cots.",
    clothesColor: 0x0891b2, // teal surgical scrubs
    pantsColor: 0x0891b2,
    headgear: 'cap',
    capColor: 0x0891b2,
    armPose: 'reaching',
    skinColor: 0xf1c27d
  });

  _buildHumanWorker(group, 3.6, 0.35, 8.4, -Math.PI / 3, {
    name: "Nurse David Okafor (Triage & Critical Care Specialist)",
    desc: "Calibrating intravenous saline infusion rates, monitoring oxygen regulators, and preparing crash cart medications.",
    clothesColor: 0x1d4ed8, // royal blue scrubs
    pantsColor: 0x1d4ed8,
    headgear: 'cap',
    capColor: 0x1d4ed8,
    armPose: 'reaching',
    skinColor: 0x5a3d28
  });

  // ── 4. 100-PERSON BUNK BERTHING MODULE ──
  _buildHumanWorker(group, 7.2, 0.35, 0.2, -Math.PI / 2, {
    name: "Specialist Tanya Miller (Shelter Habitability Crew)",
    desc: "Managing berthing rotation shifts, personal thermal bedding distribution, and occupant gear footlockers.",
    clothesColor: 0x0284c7,
    pantsColor: 0x334155,
    isSeated: true,
    skinColor: 0xe0a98b
  });

  // ── 5. LIFE SUPPORT & POWER GENERATION PLANT ──
  _buildHumanWorker(group, -3.2, 0.35, 8.0, 0, {
    name: "Chief Engineer Viktor Chen (Life Support Specialist)",
    desc: "Overseeing the 250 kW backup diesel generator, automatic transfer switches (ATS), and positive-pressure CBRN air filtration.",
    clothesColor: 0x1e3a8a,
    pantsColor: 0x1e3a8a,
    headgear: 'hardhat',
    armPose: 'reaching',
    skinColor: 0xd29b76
  });
}

function _buildBox(group, w, h, d, x, y, z, mat, edgeMat, meta) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  if (meta) mesh.userData = meta;
  group.add(mesh);

  const edges = new THREE.EdgesGeometry(geo);
  const line = new THREE.LineSegments(edges, edgeMat);
  line.position.copy(mesh.position);
  group.add(line);

  if (meta) _3D.interactiveMeshes.push(mesh);
  return mesh;
}

/* ════════════════════════════════════════════════════════════════
   REALISTIC CELESTIAL SKY, 10-SECOND DIURNAL CYCLE & STARFIELD
   ════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   HAND-PAINTED ILLUSTRATIVE SKY, FLUFFY CLOUDS & CARTOON CELESTIAL ENGINE
   ════════════════════════════════════════════════════════════════ */

function _buildRealisticSky() {
  // 1. Sky Dome Geometry (radius 135)
  const skyGeo = new THREE.SphereGeometry(135, 32, 20);
  
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Hand-painted watercolor sky gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0.0, '#0284c7'); // vibrant cobalt/azure zenith
  grad.addColorStop(0.35, '#38bdf8'); // cheerful sky blue
  grad.addColorStop(0.68, '#7dd3fc'); // bright anime daytime atmosphere
  grad.addColorStop(0.85, '#bae6fd'); // soft painterly horizon haze
  grad.addColorStop(0.93, '#fef08a'); // warm golden solar horizon warmth
  grad.addColorStop(1.0, '#4ade80');  // anime meadow blending
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 512);
  
  const skyTex = new THREE.CanvasTexture(canvas);
  const skyMat = new THREE.MeshBasicMaterial({
    map: skyTex,
    side: THREE.BackSide,
    depthWrite: false
  });
  
  const skyDome = new THREE.Mesh(skyGeo, skyMat);
  _3D.scene.add(skyDome);
  _3D.skyDome = skyDome;

  // 2. Starfield (350 cartoon sparkle stars for the moonlit night cycle)
  const starGeo = new THREE.BufferGeometry();
  const starPositions = [];
  for (let i = 0; i < 350; i++) {
    const u = Math.random();
    const v = Math.random() * 0.75 + 0.12;
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 128;
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = Math.abs(r * Math.cos(phi)) + 8;
    const z = r * Math.sin(phi) * Math.sin(theta);
    starPositions.push(x, y, z);
  }
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xfef08a,
    size: 2.2,
    transparent: true,
    opacity: 0.0 // hidden by default during day, smoothly fades in at night
  });
  const starsGroup = new THREE.Points(starGeo, starMat);
  _3D.scene.add(starsGroup);
  _3D.starsGroup = starsGroup;
}

function _buildFluffyClouds() {
  const cloudsGroup = new THREE.Group();
  _3D.cloudsGroup = cloudsGroup;

  const cloudMat = new THREE.MeshToonMaterial({
    color: 0xffffff,
    gradientMap: _3D.toonGradientMap
  });

  const cloudConfigs = [
    { r: 24, angle: 0.3, y: 22, s: 1.4 },
    { r: 30, angle: 1.2, y: 24, s: 1.7 },
    { r: 27, angle: 2.3, y: 21, s: 1.3 },
    { r: 34, angle: 3.4, y: 25, s: 1.9 },
    { r: 25, angle: 4.5, y: 23, s: 1.5 },
    { r: 32, angle: 5.4, y: 22, s: 1.6 }
  ];

  cloudConfigs.forEach(cfg => {
    const cloud = new THREE.Group();
    const cx = cfg.r * Math.cos(cfg.angle);
    const cz = cfg.r * Math.sin(cfg.angle);
    cloud.position.set(cx, cfg.y, cz);
    cloud.scale.set(cfg.s * 1.3, cfg.s * 0.75, cfg.s * 0.95);

    // 5 overlapping puffy spheres forming an organic cartoon cloud
    const puffOffsets = [
      { x: 0, y: 0, z: 0, r: 1.4 },
      { x: -1.2, y: -0.2, z: 0.1, r: 1.0 },
      { x: 1.2, y: -0.1, z: -0.1, r: 1.1 },
      { x: -0.4, y: 0.6, z: 0.2, r: 1.15 },
      { x: 0.5, y: 0.5, z: -0.2, r: 1.05 }
    ];

    puffOffsets.forEach(p => {
      const geo = new THREE.DodecahedronGeometry(p.r, 2);
      const mesh = new THREE.Mesh(geo, cloudMat);
      mesh.position.set(p.x, p.y, p.z);
      mesh.castShadow = true;
      cloud.add(mesh);
    });

    cloudsGroup.add(cloud);
  });

  _3D.scene.add(cloudsGroup);
}

function _buildSunAndMoon() {
  const celestialGroup = new THREE.Group();

  // ── CARTOON SUN (Daytime) ──
  const sunGeo = new THREE.SphereGeometry(1.6, 24, 24);
  const sunMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
  const sunMesh = new THREE.Mesh(sunGeo, sunMat);
  celestialGroup.add(sunMesh);
  _3D.sunMesh = sunMesh;

  // Rotating playful comic sun rays (12 triangular petals)
  const sunRaysGroup = new THREE.Group();
  const rayMat = new THREE.MeshBasicMaterial({
    color: 0xf59e0b,
    side: THREE.DoubleSide
  });

  for (let r = 0; r < 12; r++) {
    const rayAng = (r / 12) * Math.PI * 2;
    const rayGeo = new THREE.ConeGeometry(0.38, 1.2, 4);
    const rayMesh = new THREE.Mesh(rayGeo, rayMat);
    rayMesh.position.set(2.4 * Math.cos(rayAng), 2.4 * Math.sin(rayAng), 0);
    rayMesh.rotation.z = rayAng - Math.PI / 2;
    sunRaysGroup.add(rayMesh);
  }
  celestialGroup.add(sunRaysGroup);
  _3D.sunRaysGroup = sunRaysGroup;

  const coronaGeo = new THREE.RingGeometry(1.6, 3.6, 32);
  const coronaMat = new THREE.MeshBasicMaterial({
    color: 0xfde047,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide
  });
  const sunCorona = new THREE.Mesh(coronaGeo, coronaMat);
  celestialGroup.add(sunCorona);
  _3D.sunCorona = sunCorona;

  // Translucent Solar Rays Vector
  const lineRayMat = new THREE.LineDashedMaterial({
    color: 0xfacc15,
    dashSize: 0.8,
    gapSize: 0.4,
    transparent: true,
    opacity: 0.55
  });
  _3D.sunRays = [];
  [-3.8, 0, 3.8].forEach(xOff => {
    const rayGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(xOff, -22, 10)
    ]);
    const ray = new THREE.Line(rayGeo, lineRayMat);
    ray.computeLineDistances();
    celestialGroup.add(ray);
    _3D.sunRays.push(ray);
  });

  // ── CARTOON CRESCENT MOON (Nighttime) ──
  const moonTex = _createMoonTexture();
  const moonGeo = new THREE.SphereGeometry(1.4, 24, 24);
  const moonMat = new THREE.MeshBasicMaterial({
    map: moonTex
  });
  const moonMesh = new THREE.Mesh(moonGeo, moonMat);
  moonMesh.position.set(0, -60, 0); // below horizon initially
  celestialGroup.add(moonMesh);
  _3D.moonMesh = moonMesh;

  const haloGeo = new THREE.RingGeometry(1.4, 3.2, 32);
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0xfef08a,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide
  });
  const moonHalo = new THREE.Mesh(haloGeo, haloMat);
  moonHalo.position.set(0, -60, 0);
  celestialGroup.add(moonHalo);
  _3D.moonHalo = moonHalo;

  _3D.scene.add(celestialGroup);
  _3D.sunGroup = celestialGroup;

  // Directional Moonlight
  _3D.moonLight = new THREE.DirectionalLight(0xbae6fd, 0.0);
  _3D.moonLight.castShadow = true;
  _3D.moonLight.shadow.mapSize.width = 1024;
  _3D.moonLight.shadow.mapSize.height = 1024;
  _3D.moonLight.shadow.camera.near = 0.5;
  _3D.moonLight.shadow.camera.far = 80;
  _3D.moonLight.shadow.camera.left = -22;
  _3D.moonLight.shadow.camera.right = 22;
  _3D.moonLight.shadow.camera.top = 24;
  _3D.moonLight.shadow.camera.bottom = -10;
  _3D.scene.add(_3D.moonLight);
  _3D.scene.add(_3D.moonLight.target);
}

function _createMoonTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Pearl white-gray lunar regolith base
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, 0, 256, 256);

  // Procedural Lunar Maria (dark basaltic plains)
  ctx.fillStyle = '#94a3b8';
  const maria = [
    [70, 80, 45], [140, 60, 50], [175, 110, 38],
    [90, 150, 55], [170, 170, 42], [110, 190, 30]
  ];
  maria.forEach(([x, y, r]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Impact craters with rim highlights
  for (let c = 0; c < 24; c++) {
    const cx = (c * 67 + 31) % 240 + 8;
    const cy = (c * 89 + 17) % 240 + 8;
    const cr = (c % 5) * 3 + 4;
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx - 1, cy - 1, cr, 0, Math.PI * 2);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

/* ════════════════════════════════════════════════════════════════
   HIGH-VISIBILITY CARDINAL AXIS SYSTEM (NORTH, SOUTH, EAST, WEST)
   ════════════════════════════════════════════════════════════════ */

function _buildCardinalAxesSystem() {
  const axisGroup = new THREE.Group();
  axisGroup.position.set(0, 0.04, 0);

  // Concentric Ground Range Rings with degree ticks
  [6, 12, 18].forEach((r, idx) => {
    const ringGeo = new THREE.RingGeometry(r - 0.05, r + 0.05, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: idx === 2 ? 0x475569 : 0x334155,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    axisGroup.add(ring);
  });

  // Cardinal Axis Beams (North +Z, South -Z, East +X, West -X)
  const axes = [
    {
      dir: 'N',
      name: '▲ NORTH (True North)',
      color: 0x06b6d4, // Cyan
      hexStr: '#22d3ee',
      vec: new THREE.Vector3(0, 0, 1),
      len: 20.0
    },
    {
      dir: 'S',
      name: '▼ SOUTH (Solar Façade • 0°)',
      color: 0xf59e0b, // Amber Gold
      hexStr: '#f59e0b',
      vec: new THREE.Vector3(0, 0, -1),
      len: 20.0
    },
    {
      dir: 'E',
      name: '► EAST (Sunrise • 90°)',
      color: 0x10b981, // Emerald Green
      hexStr: '#34d399',
      vec: new THREE.Vector3(1, 0, 0),
      len: 20.0
    },
    {
      dir: 'W',
      name: '◄ WEST (Sunset • 270°)',
      color: 0xf43f5e, // Coral Rose
      hexStr: '#fb7185',
      vec: new THREE.Vector3(-1, 0, 0),
      len: 20.0
    }
  ];

  axes.forEach(a => {
    // 1. Thick Ground Line / Cylinder Beam
    const beamRadius = 0.06;
    const beamGeo = new THREE.CylinderGeometry(beamRadius, beamRadius, a.len, 8);
    const beamMat = new THREE.MeshBasicMaterial({ color: a.color });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    
    // Position beam extending from center (from r=4 to r=24)
    const midDist = 4 + a.len / 2;
    beam.position.copy(a.vec).multiplyScalar(midDist);
    beam.position.y = 0.03;
    
    // Orient beam along vector
    if (a.vec.z !== 0) {
      beam.rotation.x = Math.PI / 2;
    } else {
      beam.rotation.z = Math.PI / 2;
    }
    axisGroup.add(beam);

    // 2. 3D Arrowhead Cone at Axis Tip
    const coneRadius = 0.45;
    const coneHeight = 1.15;
    const coneGeo = new THREE.ConeGeometry(coneRadius, coneHeight, 16);
    const coneMat = new THREE.MeshStandardMaterial({
      color: a.color,
      emissive: a.color,
      emissiveIntensity: 0.35,
      roughness: 0.3
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    const tipPos = a.vec.clone().multiplyScalar(4 + a.len);
    cone.position.set(tipPos.x, 0.08, tipPos.z);
    
    // Point cone outwards along direction vector
    if (a.dir === 'N') cone.rotation.x = Math.PI / 2;
    else if (a.dir === 'S') cone.rotation.x = -Math.PI / 2;
    else if (a.dir === 'E') cone.rotation.z = -Math.PI / 2;
    else if (a.dir === 'W') cone.rotation.z = Math.PI / 2;
    axisGroup.add(cone);

    // 3. Floating 3D Badge Sprite with High-Contrast Dark Pill & Colored Title
    const canvas = document.createElement('canvas');
    canvas.width = 384;
    canvas.height = 96;
    const ctx = canvas.getContext('2d');

    // Rounded pill background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = a.hexStr;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(8, 8, 368, 80, 24);
    ctx.fill();
    ctx.stroke();

    // High-visibility glowing label
    ctx.fillStyle = a.hexStr;
    ctx.font = 'bold 28px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(a.name, 192, 48);

    const tex = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(4.8, 1.2, 1);
    const spritePos = a.vec.clone().multiplyScalar(4 + a.len + 2.8);
    sprite.position.set(spritePos.x, 0.75, spritePos.z);
    axisGroup.add(sprite);
  });

  _3D.scene.add(axisGroup);
}

/* ════════════════════════════════════════════════════════════════
   HAND-PAINTED GHIBLI MEADOW, CEL-SHADED TERRAIN & GARDEN
   ════════════════════════════════════════════════════════════════ */

function _createGrassLawnTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // 1. Warm Gouache Meadow Base
  ctx.fillStyle = '#2d6a4f';
  ctx.fillRect(0, 0, 512, 512);

  // 2. Watercolor painterly organic brush dabs
  const ghibliGreens = ['#40916c', '#52b788', '#74c69d', '#1b4332', '#95d5b2', '#2d6a4f'];
  for (let i = 0; i < 2600; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const rad = Math.random() * 9 + 4;
    ctx.fillStyle = ghibliGreens[Math.floor(Math.random() * ghibliGreens.length)];
    ctx.beginPath();
    ctx.ellipse(x, y, rad, rad * 0.6, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Cute Hand-Painted Three-Leaf Clover Clumps
  ctx.fillStyle = '#1e3a1e';
  for (let c = 0; c < 140; c++) {
    const cx = Math.random() * 512;
    const cy = Math.random() * 512;
    for (let pet = 0; pet < 3; pet++) {
      const pAng = (pet * Math.PI * 2) / 3;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(pAng) * 3.5, cy + Math.sin(pAng) * 3.5, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 4. Studio Ghibli-Style White Daisy Wildflowers with Golden Centers
  for (let f = 0; f < 85; f++) {
    const fx = Math.random() * 512;
    const fy = Math.random() * 512;
    // White flower petals
    ctx.fillStyle = '#ffffff';
    for (let p = 0; p < 5; p++) {
      const pAng = (p * Math.PI * 2) / 5;
      ctx.beginPath();
      ctx.arc(fx + Math.cos(pAng) * 3.8, fy + Math.sin(pAng) * 3.8, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    // Golden-orange flower center
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(fx, fy, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. Stylized Flagstone Stepping Stones Path
  ctx.fillStyle = '#cbd5e1';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.5;
  const stones = [
    { x: 256, y: 120, rx: 14, ry: 9, rot: 0.1 },
    { x: 265, y: 170, rx: 16, ry: 10, rot: -0.15 },
    { x: 248, y: 220, rx: 15, ry: 9.5, rot: 0.2 },
    { x: 258, y: 270, rx: 17, ry: 11, rot: 0.05 },
    { x: 245, y: 320, rx: 14, ry: 9, rot: -0.2 }
  ];
  stones.forEach(st => {
    ctx.save();
    ctx.translate(st.x, st.y);
    ctx.rotate(st.rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, st.rx, st.ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Inner pebble specular highlight
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(-st.rx * 0.3, -st.ry * 0.3, st.rx * 0.4, st.ry * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(10, 10);
  return tex;
}

function _buildRealisticGround() {
  const groundGroup = new THREE.Group();

  // 1. Illustrative Circular Grass Meadow (Radius 34m, no square borders)
  const grassTex = _createGrassLawnTexture();
  const groundGeo = new THREE.CircleGeometry(34, 64);
  const groundMat = new THREE.MeshToonMaterial({
    map: grassTex,
    gradientMap: _3D.toonGradientMap,
    side: THREE.DoubleSide
  });
  const groundMesh = new THREE.Mesh(groundGeo, groundMat);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = 0.0;
  groundMesh.receiveShadow = true;
  groundGroup.add(groundMesh);

  // Outer dark ink border ring for the meadow perimeter
  const groundBorderGeo = new THREE.RingGeometry(33.85, 34.0, 64);
  const groundBorderMat = new THREE.MeshBasicMaterial({ color: 0x0f172a, side: THREE.DoubleSide });
  const groundBorderMesh = new THREE.Mesh(groundBorderGeo, groundBorderMat);
  groundBorderMesh.rotation.x = -Math.PI / 2;
  groundBorderMesh.position.y = 0.005;
  groundGroup.add(groundBorderMesh);

  // 2. Tactical Compacted Perimeter Pad surrounding foundation plinth
  const apronGeo = new THREE.RingGeometry(14.0, 16.8, 48);
  const apronMat = new THREE.MeshToonMaterial({
    color: 0x3b4758,
    gradientMap: _3D.toonGradientMap,
    side: THREE.DoubleSide
  });
  const apronMesh = new THREE.Mesh(apronGeo, apronMat);
  apronMesh.rotation.x = -Math.PI / 2;
  apronMesh.position.y = 0.012;
  apronMesh.receiveShadow = true;
  groundGroup.add(apronMesh);

  // Comic Ink Outline Rings around the Apron
  [14.0, 16.8].forEach(r => {
    const ringGeo = new THREE.RingGeometry(r - 0.06, r + 0.06, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x0f172a, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.015;
    groundGroup.add(ring);
  });

  // 3. Dense Illustrative Surrounding Forest (72 cartoon pine & broadleaf trees + boulders + shrubs)
  _buildRealisticForest(groundGroup);

  // 4. Cel-Shaded Swaying Grass Tufts
  _3D.grassTufts = [];
  const tuftMat = new THREE.MeshToonMaterial({
    color: 0x4ade80,
    gradientMap: _3D.toonGradientMap,
    side: THREE.DoubleSide
  });
  for (let g = 0; g < 45; g++) {
    const ang = Math.random() * Math.PI * 2;
    const r = 17.2 + Math.random() * 11.5;
    const gx = r * Math.cos(ang);
    const gz = r * Math.sin(ang);

    const tuftGroup = new THREE.Group();
    tuftGroup.position.set(gx, 0, gz);
    tuftGroup.userData = { phase: Math.random() * Math.PI * 2 };

    for (let b = 0; b < 3; b++) {
      const blade = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.48 + Math.random() * 0.25, 4), tuftMat);
      blade.position.set((b - 1) * 0.08, 0.24, 0);
      blade.rotation.z = (b - 1) * 0.25;
      tuftGroup.add(blade);
    }
    groundGroup.add(tuftGroup);
    _3D.grassTufts.push(tuftGroup);
  }

  _3D.scene.add(groundGroup);
}

/* ════════════════════════════════════════════════════════════════
   DENSE REALISTIC SURROUNDING FOREST (72 TREES, BOULDERS & SHRUBS)
   Surrounds the perimeter pad with realistic conifers & deciduous trees
   ════════════════════════════════════════════════════════════════ */

function _buildRealisticForest(groundGroup) {
  const forestGroup = new THREE.Group();
  _3D.forestGroup = forestGroup;

  // Shared reusable materials for cel-shaded cartoon aesthetic
  const trunkPineMat = new THREE.MeshToonMaterial({
    color: 0x451a03,
    gradientMap: _3D.toonGradientMap
  });
  const trunkDecidMat = new THREE.MeshToonMaterial({
    color: 0x582f0e,
    gradientMap: _3D.toonGradientMap
  });

  // Cel-shaded foliage materials: vibrant Ghibli anime greens
  const pineMats = [
    new THREE.MeshToonMaterial({ color: 0x15803d, gradientMap: _3D.toonGradientMap }),
    new THREE.MeshToonMaterial({ color: 0x166534, gradientMap: _3D.toonGradientMap }),
    new THREE.MeshToonMaterial({ color: 0x14532d, gradientMap: _3D.toonGradientMap }),
    new THREE.MeshToonMaterial({ color: 0x22c55e, gradientMap: _3D.toonGradientMap })
  ];

  const decidMats = [
    new THREE.MeshToonMaterial({ color: 0x4ade80, gradientMap: _3D.toonGradientMap }),
    new THREE.MeshToonMaterial({ color: 0x22c55e, gradientMap: _3D.toonGradientMap }),
    new THREE.MeshToonMaterial({ color: 0x84cc16, gradientMap: _3D.toonGradientMap }),
    new THREE.MeshToonMaterial({ color: 0x65a30d, gradientMap: _3D.toonGradientMap })
  ];

  const boulderMat = new THREE.MeshToonMaterial({
    color: 0x64748b,
    gradientMap: _3D.toonGradientMap
  });
  const mossBoulderMat = new THREE.MeshToonMaterial({
    color: 0x475569,
    gradientMap: _3D.toonGradientMap
  });
  const shrubMat = new THREE.MeshToonMaterial({
    color: 0x16a34a,
    gradientMap: _3D.toonGradientMap
  });

  // Reusable Geometries
  const coneGeoT1 = new THREE.ConeGeometry(1.8, 2.4, 7);
  const coneGeoT2 = new THREE.ConeGeometry(1.4, 2.1, 7);
  const coneGeoT3 = new THREE.ConeGeometry(1.0, 1.8, 7);
  const coneGeoT4 = new THREE.ConeGeometry(0.6, 1.5, 7);

  const lobeGeo1 = new THREE.DodecahedronGeometry(1.3, 1);
  const lobeGeo2 = new THREE.DodecahedronGeometry(1.0, 1);
  const lobeGeo3 = new THREE.DodecahedronGeometry(0.8, 1);

  // 1. Generate 72 Realistic Procedural Trees surrounding the circular pad (r = 17m to 32.5m)
  const treeCount = 72;
  for (let i = 0; i < treeCount; i++) {
    // Distributed radial placement with slight natural jitter
    const angle = (i / treeCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.08;
    // Two rings of trees: inner tree line (r=17.2-24m) and dense deep forest perimeter (r=24-32.5m)
    const isOuter = (i % 2 === 0);
    const r = isOuter
      ? 24.0 + Math.random() * 8.5
      : 17.2 + Math.random() * 6.5;

    const tx = r * Math.cos(angle);
    const tz = r * Math.sin(angle);

    const isConifer = (i % 3 !== 0); // 66% Alpine Conifers, 34% Deciduous Broadleaf
    const treeScale = 0.75 + Math.random() * 0.55; // 0.75x to 1.3x natural scale

    const treeGroup = new THREE.Group();
    treeGroup.position.set(tx, 0, tz);
    treeGroup.scale.set(treeScale, treeScale, treeScale);
    // Slight natural wind/growth lean
    treeGroup.rotation.y = Math.random() * Math.PI * 2;
    treeGroup.rotation.z = (Math.random() - 0.5) * 0.06;
    treeGroup.rotation.x = (Math.random() - 0.5) * 0.06;

    if (isConifer) {
      // ── CONIFER / ALPINE SPRUCE PINE ──
      const trunkH = 5.2 + Math.random() * 1.5;
      const trunkGeo = new THREE.CylinderGeometry(0.12, 0.22, trunkH, 7);
      const trunk = new THREE.Mesh(trunkGeo, trunkPineMat);
      trunk.position.y = trunkH * 0.45;
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      treeGroup.add(trunk);

      // Multi-tiered needles (3 or 4 conical tiers)
      const pMat = pineMats[i % pineMats.length];
      const tierLevels = [
        { geo: coneGeoT1, y: trunkH * 0.55 },
        { geo: coneGeoT2, y: trunkH * 0.72 },
        { geo: coneGeoT3, y: trunkH * 0.88 },
        { geo: coneGeoT4, y: trunkH * 1.02 }
      ];

      tierLevels.forEach(t => {
        const tier = new THREE.Mesh(t.geo, pMat);
        tier.position.y = t.y;
        tier.castShadow = true;
        tier.receiveShadow = true;
        treeGroup.add(tier);
      });
    } else {
      // ── DECIDUOUS BROADLEAF OAK / BIRCH ──
      const trunkH = 4.2 + Math.random() * 1.2;
      const trunkGeo = new THREE.CylinderGeometry(0.16, 0.26, trunkH, 7);
      const trunk = new THREE.Mesh(trunkGeo, trunkDecidMat);
      trunk.position.y = trunkH * 0.45;
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      treeGroup.add(trunk);

      // Organic multi-cluster leafy canopy
      const dMat = decidMats[i % decidMats.length];
      const lobeOffsets = [
        { geo: lobeGeo1, x: 0, y: trunkH + 0.4, z: 0 },
        { geo: lobeGeo2, x: 0.65, y: trunkH + 0.1, z: 0.4 },
        { geo: lobeGeo2, x: -0.65, y: trunkH + 0.2, z: -0.3 },
        { geo: lobeGeo3, x: 0.3, y: trunkH + 0.7, z: -0.5 },
        { geo: lobeGeo3, x: -0.4, y: trunkH + 0.6, z: 0.45 }
      ];

      lobeOffsets.forEach(lo => {
        const lobe = new THREE.Mesh(lo.geo, dMat);
        lobe.position.set(lo.x, lo.y, lo.z);
        lobe.castShadow = true;
        lobe.receiveShadow = true;
        treeGroup.add(lobe);
      });
    }

    forestGroup.add(treeGroup);
  }

  // 2. Weathered Granite Woodland Boulders (24 boulders scattered at tree bases)
  for (let b = 0; b < 24; b++) {
    const ang = (b / 24) * Math.PI * 2 + Math.random() * 0.2;
    const br = 17.5 + Math.random() * 13.5;
    const bx = br * Math.cos(ang);
    const bz = br * Math.sin(ang);

    const bSize = 0.4 + Math.random() * 0.55;
    const bGeo = new THREE.DodecahedronGeometry(bSize, 1);
    const bMesh = new THREE.Mesh(bGeo, (b % 2 === 0) ? boulderMat : mossBoulderMat);
    bMesh.position.set(bx, bSize * 0.5, bz);
    bMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    bMesh.scale.set(1.0 + Math.random() * 0.4, 0.7 + Math.random() * 0.4, 1.0 + Math.random() * 0.3);
    bMesh.castShadow = true;
    bMesh.receiveShadow = true;
    forestGroup.add(bMesh);
  }

  // 3. Dense Understory Woodland Shrubs (30 shrub clumps bridging tree roots)
  for (let s = 0; s < 30; s++) {
    const ang = Math.random() * Math.PI * 2;
    const sr = 17.0 + Math.random() * 14.5;
    const sx = sr * Math.cos(ang);
    const sz = sr * Math.sin(ang);

    const sSize = 0.45 + Math.random() * 0.4;
    const shrub = new THREE.Mesh(new THREE.DodecahedronGeometry(sSize, 1), shrubMat);
    shrub.position.set(sx, sSize * 0.6, sz);
    shrub.scale.set(1.2, 0.8, 1.2);
    shrub.castShadow = true;
    shrub.receiveShadow = true;
    forestGroup.add(shrub);
  }

  groundGroup.add(forestGroup);
}

function _updateGrass(timeSec) {
  _3D.grassTufts.forEach(t => {
    t.rotation.z = Math.sin(timeSec * 2.4 + t.userData.phase) * 0.14;
  });
}

/* ════════════════════════════════════════════════════════════════
   24-HOUR TIME-OF-DAY CONTROLLER & SOLAR SIMULATION ENGINE
   Full 00:00 to 24:00 interactive scrub, presets (Dawn, Noon, Sunset, Night)
   ════════════════════════════════════════════════════════════════ */

function setTimeOfDay24(hour, updateSlider = true) {
  if (!_3D.scene || !_3D.sunLight) return;

  // Clamp hour between 0.0 and 24.0
  hour = Math.max(0.0, Math.min(24.0, Number(hour)));
  _3D.timeOfDay = hour;

  // Format 12-hour and 24-hour time strings
  const hInt = Math.floor(hour) % 24;
  const mInt = Math.floor((hour % 1) * 60);
  const isPM = hInt >= 12;
  const h12 = hInt % 12 || 12;
  const time12 = `${String(h12).padStart(2, '0')}:${String(mInt).padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
  const time24 = `${String(hInt).padStart(2, '0')}:${String(mInt).padStart(2, '0')}`;

  const dist = 38.0;
  const isDay = hour >= 6.0 && hour <= 18.0;

  let clockIcon = "☀️";
  let solarStatus = "";
  let hudTextStr = "";

  if (isDay) {
    // ── DAYTIME (06:00 to 18:00) ──
    const p = (hour - 6.0) / 12.0; // 0.0 (06:00 Dawn) to 1.0 (18:00 Sunset)

    // Solar Elevation: 0° at Sunrise -> 68° at Noon (p=0.5) -> 0° at Sunset
    const altRad = Math.sin(p * Math.PI) * (68.0 * Math.PI / 180.0);

    // Azimuth: East (+X) -> True South (-Z) -> West (-X)
    const sunX = dist * Math.cos(p * Math.PI);
    const sunY = 2.0 + dist * Math.sin(altRad);
    const sunZ = -dist * Math.sin(p * Math.PI) * 0.70;

    _3D.sunLight.position.set(sunX, sunY, sunZ);
    _3D.sunLight.target.position.set(0, 2.0, 0);

    const solarIntensity = 2.5 * Math.sin(p * Math.PI) + 0.35;
    _3D.sunLight.intensity = solarIntensity;

    // Sun Sphere, Comic Rays & Corona positioning
    if (_3D.sunMesh) _3D.sunMesh.position.set(sunX, sunY, sunZ);
    if (_3D.sunRaysGroup) {
      _3D.sunRaysGroup.position.set(sunX, sunY, sunZ);
      if (_3D.camera) _3D.sunRaysGroup.lookAt(_3D.camera.position);
    }
    if (_3D.sunCorona) {
      _3D.sunCorona.position.set(sunX, sunY, sunZ);
      if (_3D.camera) _3D.sunCorona.lookAt(_3D.camera.position);
    }

    // Hide Moon below horizon & extinguish moonlight
    if (_3D.moonMesh) _3D.moonMesh.position.set(0, -60, 0);
    if (_3D.moonHalo) _3D.moonHalo.position.set(0, -60, 0);
    if (_3D.moonLight) _3D.moonLight.intensity = 0.0;

    // Stars hidden during day
    if (_3D.starsGroup) _3D.starsGroup.material.opacity = 0.0;

    // Illustrative Color temperatures across the day
    if (hour < 7.5) {
      // Dawn / Sunrise - Soft lavender-pink watercolor anime morning
      clockIcon = "🌅";
      solarStatus = "• Sunrise / Dawn";
      _3D.sunLight.color.setHex(0xfb923c); // Warm sunrise amber
      _3D.scene.background.setHex(0xa5b4fc); // Soft pastel lavender sky
      _3D.scene.fog.color.setHex(0xfecdd3); // Gentle rose horizon mist
      if (_3D.ambientLight) {
        _3D.ambientLight.color.setHex(0xffedd5);
        _3D.ambientLight.intensity = 0.90;
      }
      if (_3D.hemiLight) {
        _3D.hemiLight.color.setHex(0xfdba74);
        _3D.hemiLight.groundColor.setHex(0x2d6a4f);
        _3D.hemiLight.intensity = 0.75;
      }
      hudTextStr = `🌅 <strong>${time12} (${time24}) Illustrative Dawn</strong> • Soft Lavender & Rose Sky • Warm Morning Shadows`;
    } else if (hour > 16.5) {
      // Sunset / Golden Hour - Vibrant peach, coral and apricot Ghibli dusk
      clockIcon = "🌇";
      solarStatus = "• Sunset / Dusk";
      _3D.sunLight.color.setHex(0xf97316); // Golden hour amber
      _3D.scene.background.setHex(0xfca5a5); // Warm peach coral
      _3D.scene.fog.color.setHex(0xfef08a); // Apricot golden glow
      if (_3D.ambientLight) {
        _3D.ambientLight.color.setHex(0xffedd5);
        _3D.ambientLight.intensity = 0.90;
      }
      if (_3D.hemiLight) {
        _3D.hemiLight.color.setHex(0xfb923c);
        _3D.hemiLight.groundColor.setHex(0x2d6a4f);
        _3D.hemiLight.intensity = 0.75;
      }
      hudTextStr = `🌇 <strong>${time12} (${time24}) Sunset Glow</strong> • Coral & Apricot Horizon • Warm Cel-Shaded Silhouette`;
    } else {
      // Midday / Solar Noon - Brilliant vivid anime blue and lush green bounce
      clockIcon = "☀️";
      solarStatus = hour >= 11.5 && hour <= 12.5 ? "• Solar Zenith" : "• Daylight";
      _3D.sunLight.color.setHex(0xfffaed); // Pure crisp daylight 5500K
      _3D.scene.background.setHex(0x7dd3fc); // Vibrant anime sky blue
      _3D.scene.fog.color.setHex(0xbae6fd); // Gentle cyan sky mist
      if (_3D.ambientLight) {
        _3D.ambientLight.color.setHex(0xffffff);
        _3D.ambientLight.intensity = 1.0;
      }
      if (_3D.hemiLight) {
        _3D.hemiLight.color.setHex(0x7dd3fc);
        _3D.hemiLight.groundColor.setHex(0x4ade80);
        _3D.hemiLight.intensity = 0.8;
      }
      hudTextStr = `☀️ <strong>${time12} (${time24}) Solar Midday</strong> • Clear Cartoon Sky • High Direct Trombe Wall Illumination`;
    }
  } else {
    // ── NIGHTTIME (18:00 to 06:00) ──
    // Normalized lunar progress q from 0.0 (18:00) to 1.0 (06:00), with 0.5 at 00:00 Midnight
    const q = ((hour + 6.0) % 24.0) / 12.0;

    // Lunar Elevation: 0° at Moonrise -> 56° at Midnight (q=0.5) -> 0° at Moonset
    const altRad = Math.sin(q * Math.PI) * (56.0 * Math.PI / 180.0);

    // Azimuth: East (+X) -> True South (-Z) -> West (-X)
    const moonX = dist * Math.cos(q * Math.PI);
    const moonY = 2.0 + dist * Math.sin(altRad);
    const moonZ = -dist * Math.sin(q * Math.PI) * 0.70;

    if (_3D.moonMesh) _3D.moonMesh.position.set(moonX, moonY, moonZ);
    if (_3D.moonHalo) {
      _3D.moonHalo.position.set(moonX, moonY, moonZ);
      if (_3D.camera) _3D.moonHalo.lookAt(_3D.camera.position);
    }

    // Hide Sun & Comic Rays below horizon
    if (_3D.sunMesh) _3D.sunMesh.position.set(0, -60, 0);
    if (_3D.sunRaysGroup) _3D.sunRaysGroup.position.set(0, -60, 0);
    if (_3D.sunCorona) _3D.sunCorona.position.set(0, -60, 0);
    _3D.sunLight.intensity = 0.0;

    // Directional Moonlight
    if (_3D.moonLight) {
      _3D.moonLight.position.set(moonX, moonY, moonZ);
      _3D.moonLight.target.position.set(0, 2.0, 0);
      _3D.moonLight.intensity = 0.95 * Math.sin(q * Math.PI) + 0.18;
    }

    // Starfield in night sky
    if (_3D.starsGroup) {
      _3D.starsGroup.material.opacity = 0.88 * Math.sin(q * Math.PI);
    }

    // Comic Indigo Night Ambiance
    _3D.scene.background.setHex(0x0f172a);
    _3D.scene.fog.color.setHex(0x0f172a);

    if (_3D.ambientLight) {
      _3D.ambientLight.color.setHex(0x38bdf8);
      _3D.ambientLight.intensity = 0.58 + 0.18 * Math.sin(q * Math.PI);
    }
    if (_3D.hemiLight) {
      _3D.hemiLight.color.setHex(0x1e293b);
      _3D.hemiLight.groundColor.setHex(0x064e3b);
      _3D.hemiLight.intensity = 0.45;
    }

    clockIcon = "🌙";
    if (hour >= 23.0 || hour <= 1.0) {
      solarStatus = "• Midnight";
      hudTextStr = `🌙 <strong>${time12} (${time24}) Midnight</strong> • True South Moon • Nighttime Radiation & Starfield`;
    } else if (hour < 6.0) {
      solarStatus = "• Pre-Dawn";
      hudTextStr = `✨ <strong>${time12} (${time24}) Pre-Dawn</strong> • Starfield Active • Cold Storage Passive Phase`;
    } else {
      solarStatus = "• Night / Twilight";
      hudTextStr = `🌙 <strong>${time12} (${time24}) Night</strong> • Moonlit Compound • Interior Emergency Lighting Active`;
    }
  }

  // Update UI Elements
  if (updateSlider) {
    const slider = document.getElementById('slider-24h-time');
    if (slider) slider.value = hour.toFixed(1);
  }

  const clockEl = document.getElementById('label-clock-24h');
  if (clockEl) {
    clockEl.innerHTML = `<span class="clock-icon">${clockIcon}</span> <span class="clock-time">${time12}</span> <span class="clock-status">${solarStatus}</span>`;
  }

  // Update Preset Buttons Active State
  const pDawn = document.getElementById('preset-dawn');
  const pNoon = document.getElementById('preset-noon');
  const pDusk = document.getElementById('preset-dusk');
  const pNight = document.getElementById('preset-night');

  if (pDawn) pDawn.classList.toggle('active', Math.abs(hour - 6.0) < 1.0);
  if (pNoon) pNoon.classList.toggle('active', Math.abs(hour - 12.0) < 1.5);
  if (pDusk) pDusk.classList.toggle('active', Math.abs(hour - 18.0) < 1.0);
  if (pNight) pNight.classList.toggle('active', hour <= 1.5 || hour >= 23.0);

  // Update Viewport HUD Text
  const hudText = document.getElementById('viewport-hud-text');
  if (hudText && !_3D.isDragging) {
    hudText.innerHTML = hudTextStr;
  }
}

function toggle24HPlayback() {
  _3D.is24HPlaying = !_3D.is24HPlaying;
  const btn = document.getElementById('btn-play-24h');
  const icon = document.getElementById('icon-play-24h');
  const label = document.getElementById('label-play-24h');
  if (btn) btn.classList.toggle('active', _3D.is24HPlaying);
  if (icon) icon.innerText = _3D.is24HPlaying ? '⏸️' : '▶️';
  if (label) label.innerText = _3D.is24HPlaying ? 'Pause' : 'Play';

  const hudText = document.getElementById('viewport-hud-text');
  if (hudText) {
    hudText.innerHTML = _3D.is24HPlaying
      ? `▶️ <strong>24-Hour Solar Simulation Playing</strong> • Sun and Moon Orbiting (24h loop)`
      : `⏸️ <strong>24-Hour Solar Simulation Paused</strong> • Use Slider or Presets to Choose Hour`;
  }
}

function onTimeSliderChange(val) {
  const hour = parseFloat(val);
  // Pause automatic playback so user scrubbing takes full immediate control
  if (_3D.is24HPlaying) {
    toggle24HPlayback();
  }
  setTimeOfDay24(hour, false);
}

// Backward compatibility fallbacks
function toggleDiurnalCycle() {
  toggle24HPlayback();
}

function cycleSunMode() {
  toggle24HPlayback();
}

// ── Interactive Viewport Toolbar Callbacks ──
function toggle3DRotation() {
  _3D.isRotating = !_3D.isRotating;
  const btn = document.getElementById('btn-3d-rotate');
  const icon = document.getElementById('icon-3d-rotate');
  if (btn) btn.classList.toggle('active', _3D.isRotating);
  if (icon) icon.innerText = _3D.isRotating ? '⏸️' : '▶️';
}

function toggleXRayMode() {
  _3D.xrayMode = !_3D.xrayMode;
  const btn = document.getElementById('btn-3d-xray');
  if (btn) btn.classList.toggle('active', _3D.xrayMode);
  update3DGeometry();

  const hudText = document.getElementById('viewport-hud-text');
  if (hudText) {
    hudText.innerHTML = _3D.xrayMode
      ? `🪟 X-Ray Active: <strong>Viewing 100-Bed Berthing, Food Rations Depot, Water Cisterns & Triage</strong>`
      : `Fortified Envelope Active: <strong>Tactical Survival Shelter for 100 Occupants</strong>`;
  }
}

function reset3DCamera() {
  _3D.spherical.radius = 22.0;
  _3D.spherical.theta = 0.85;
  _3D.spherical.phi = 1.15;
  _3D.targetCenter.set(0, 2.0, 0);
  _3D.fov = 55;
  if (_3D.camera) {
    _3D.camera.fov = 55;
    _3D.camera.updateProjectionMatrix();
  }
  _updateCameraFromSpherical();

  const label = document.getElementById('label-3d-fov');
  if (label) label.innerText = 'FOV: 55°';

  const hudText = document.getElementById('viewport-hud-text');
  if (hudText) {
    hudText.innerText = "Camera reset to wide architectural 3/4 viewpoint (FOV: 55°)";
  }
}

function cycle3DFOV() {
  const fovOptions = [55, 65, 42];
  const curFov = _3D.camera ? Math.round(_3D.camera.fov) : 55;
  let nextIdx = 0;
  for (let i = 0; i < fovOptions.length; i++) {
    if (Math.abs(fovOptions[i] - curFov) < 4) {
      nextIdx = (i + 1) % fovOptions.length;
      break;
    }
  }
  const newFov = fovOptions[nextIdx];
  _3D.fov = newFov;
  if (_3D.camera) {
    _3D.camera.fov = newFov;
    _3D.camera.updateProjectionMatrix();
  }
  const label = document.getElementById('label-3d-fov');
  if (label) label.innerText = `FOV: ${newFov}°`;
  const hudText = document.getElementById('viewport-hud-text');
  if (hudText) {
    const desc = newFov === 65 ? 'Ultra-Wide Panoramic' : newFov === 55 ? 'Wide Architectural' : 'Focused Cinematic';
    hudText.innerHTML = `📷 Camera Field of View: <strong>${newFov}° (${desc})</strong>`;
  }
}

function zoom3DCamera(delta) {
  _3D.spherical.radius = Math.max(8.0, Math.min(48.0, _3D.spherical.radius + delta));
  _updateCameraFromSpherical();
  const hudText = document.getElementById('viewport-hud-text');
  if (hudText) {
    const zoomPct = Math.round((24 / _3D.spherical.radius) * 100);
    hudText.innerText = `🔍 3D Zoom: ${zoomPct}% • Distance: ${_3D.spherical.radius.toFixed(1)}m • Drag to orbit 360°`;
  }
}

function toggle3DExpand() {
  const wrapper = document.querySelector('.viewport-3d-wrapper');
  const btn = document.getElementById('btn-3d-expand');
  const icon = document.getElementById('icon-3d-expand');
  const label = document.getElementById('label-3d-expand');
  if (!wrapper) return;

  wrapper.classList.toggle('expanded');
  const isExpanded = wrapper.classList.contains('expanded');
  if (btn) btn.classList.toggle('active', isExpanded);
  if (icon) icon.innerText = isExpanded ? '🗗' : '⛶';
  if (label) label.innerText = isExpanded ? 'Compact' : 'Expand';

  const container = document.getElementById('threejs-container');
  if (container) {
    setTimeout(() => {
      _onResize3D(container);
    }, 280);
  }

  const hudText = document.getElementById('viewport-hud-text');
  if (hudText) {
    hudText.innerHTML = isExpanded
      ? `⛶ <strong>Cinematic Tall Viewport Active (800px)</strong> • High-Definition Architectural Inspection`
      : `⛶ <strong>Standard Viewport Active (560px)</strong>`;
  }
}

function animate3D() {
  _3D.animFrameId = requestAnimationFrame(animate3D);
  if (document.hidden) return;

  const now = performance.now();
  const delta = Math.min((now - _3D.lastFrameTime) / 1000, 0.1);
  _3D.lastFrameTime = now;

  // 1. Advance 24-Hour Solar Simulation if Playing
  if (_3D.is24HPlaying) {
    _3D.timeOfDay = (_3D.timeOfDay + delta * _3D.playSpeed24H) % 24.0;
    setTimeOfDay24(_3D.timeOfDay, true);
  }

  // 2. Animate Gentle Grass Sway
  _updateGrass(now * 0.001);

  // 3. Gentle Auto-Orbit
  if (_3D.isRotating && !_3D.isDragging) {
    _3D.spherical.theta += 0.0035;
    _updateCameraFromSpherical();
  }

  // 4. Drift Fluffy Cartoon Clouds
  if (_3D.cloudsGroup) {
    _3D.cloudsGroup.rotation.y += delta * 0.04;
  }

  // 5. Spin Playful Comic Sun Rays
  if (_3D.sunRaysGroup && _3D.timeOfDay >= 6.0 && _3D.timeOfDay <= 18.0) {
    _3D.sunRaysGroup.rotation.z += delta * 0.5;
  }

  if (_3D.renderer && _3D.scene && _3D.camera) {
    _3D.renderer.render(_3D.scene, _3D.camera);
  }
}

function _onResize3D(container) {
  if (!_3D.renderer || !_3D.camera) return;
  const W = container.clientWidth;
  const H = container.clientHeight || 560;
  _3D.camera.aspect = W / H;
  _3D.camera.updateProjectionMatrix();
  _3D.renderer.setSize(W, H);
}

function renderEnvelopeCutaway(T_out, T_in) {
  const canvas = document.getElementById('envelopeCutawayCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  const sim = window.state && window.state.currentSimulation;
  T_out = (T_out !== undefined) ? T_out : (sim ? sim.outMin : -12);
  T_in  = (T_in  !== undefined) ? T_in  : (sim ? sim.inMin : 20);

  ctx.clearRect(0, 0, W, H);
  const PAD_L = 54, PAD_R = 20, PAD_T = 36, PAD_B = 42;
  const drawW = W - PAD_L - PAD_R;
  const drawH = H - PAD_T - PAD_B;
  const x0 = PAD_L, y0 = PAD_T;

  const layers = [
    { name: 'Ext. Plaster', frac: 0.08, color: '#4a5568', T_frac: 0.00 },
    { name: 'Core Insulation', frac: 0.22, color: '#1e3a5f', T_frac: 0.40 },
    { name: 'Trombe / Earth Mass', frac: 0.48, color: '#2d4a3e', T_frac: 0.78 },
    { name: 'Interior Space', frac: 0.22, color: '#1a2e1a', T_frac: 1.00 },
  ];

  let cumFrac = 0;
  layers.forEach(l => {
    l.x = x0 + cumFrac * drawW;
    cumFrac += l.frac;
    l.xEnd = x0 + cumFrac * drawW;
  });

  ctx.fillStyle = '#0a0f16';
  ctx.fillRect(0, 0, W, H);

  layers.forEach(l => {
    ctx.fillStyle = l.color;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(l.x, y0, l.xEnd - l.x, drawH);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(l.xEnd, y0);
    ctx.lineTo(l.xEnd, y0 + drawH);
    ctx.stroke();
  });

  const T_range = (T_in - T_out) || 1;
  const curvePoints = [{ x: x0, T: T_out }];
  layers.forEach(l => curvePoints.push({ x: l.xEnd, T: T_out + l.T_frac * T_range }));

  const tempToY = T => (y0 + drawH - 4) - ((T - T_out) / T_range) * (drawH - 8);

  ctx.save();
  const grad = ctx.createLinearGradient(x0, 0, x0 + drawW, 0);
  grad.addColorStop(0, 'rgba(147, 197, 253, 0.20)');
  grad.addColorStop(0.5, 'rgba(251, 191, 36, 0.15)');
  grad.addColorStop(1, 'rgba(252, 165, 165, 0.25)');
  ctx.beginPath();
  ctx.moveTo(curvePoints[0].x, tempToY(curvePoints[0].T));
  for (let i = 1; i < curvePoints.length; i++) {
    const prev = curvePoints[i - 1], curr = curvePoints[i];
    const cpX = (prev.x + curr.x) / 2;
    ctx.bezierCurveTo(cpX, tempToY(prev.T), cpX, tempToY(curr.T), curr.x, tempToY(curr.T));
  }
  ctx.lineTo(curvePoints[curvePoints.length - 1].x, y0 + drawH);
  ctx.lineTo(x0, y0 + drawH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.moveTo(curvePoints[0].x, tempToY(curvePoints[0].T));
  for (let i = 1; i < curvePoints.length; i++) {
    const prev = curvePoints[i - 1], curr = curvePoints[i];
    const cpX = (prev.x + curr.x) / 2;
    ctx.bezierCurveTo(cpX, tempToY(prev.T), cpX, tempToY(curr.T), curr.x, tempToY(curr.T));
  }
  ctx.stroke();
  ctx.restore();

  curvePoints.forEach((pt, i) => {
    const cx = pt.x, cy = tempToY(pt.T);
    ctx.save();
    ctx.fillStyle = i === 0 ? '#93c5fd' : i === curvePoints.length - 1 ? '#fca5a5' : '#fbbf24';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = '#e6edf3';
    ctx.font = 'bold 10px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${pt.T.toFixed(1)}°C`, cx, cy + (i % 2 === 0 ? -10 : 16));
    ctx.restore();
  });

  const ticks = _niceAxisTicks(T_out, T_in, 5);
  ctx.save();
  ctx.fillStyle = '#8b949e';
  ctx.font = '9px "Inter", monospace';
  ctx.textAlign = 'right';
  ticks.forEach(T => {
    const y = tempToY(T);
    ctx.fillText(`${T}°`, x0 - 4, y + 3);
  });
  ctx.restore();

  ctx.save();
  ctx.fillStyle = '#8b949e';
  ctx.font = '9px "Inter", sans-serif';
  ctx.textAlign = 'center';
  layers.forEach(l => {
    const cx = (l.x + l.xEnd) / 2;
    const words = l.name.split(' ');
    words.forEach((w, wi) => ctx.fillText(w, cx, y0 + drawH + 14 + wi * 11));
  });
  ctx.restore();

  ctx.save();
  ctx.fillStyle = '#c9d1d9';
  ctx.font = 'bold 11px "Inter", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Wall Envelope Cross-Section | Thermal Gradient', x0, y0 - 12);
  ctx.restore();
}

function _niceAxisTicks(min, max, n) {
  const range = max - min;
  const step  = Math.max(1, Math.ceil(range / n / 5) * 5);
  const start = Math.ceil(min / step) * step;
  const ticks = [];
  for (let v = start; v <= max; v += step) ticks.push(v);
  return ticks;
}
