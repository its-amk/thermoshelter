# THERMOSHELTER: Software-Based Model Development for Area-Specific Shelter Design

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/)
[![Tests Passing](https://img.shields.io/badge/tests-99%2F99%20passing-brightgreen.svg)](tests/)
[![Standard](https://img.shields.io/badge/standard-ASHRAE%2055--2023-orange.svg)](https://www.ashrae.org/)
[![FEA](https://img.shields.io/badge/FEA-ANSYS%20APDL%20%2F%20PyMAPDL-red.svg)](models/ansys_export.py)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An interactive, high-fidelity physical simulation platform and software model for designing **area-specific, self-sustained standalone passive shelters** to maintain thermal comfort across distinct climatic zones—specifically conceptualized for **High-Altitude Cold Regions like Ladakh** and exportable to **ANSYS Finite Element Analysis (FEA) software**.

---

## 🌟 Problem Statement Fulfillment

### 1. High-Altitude Cold Region (Ladakh) Passive Solar Design
- **Solar Irradiance:** 1,900–2,100 kWh/m²/year with 7.9 hours average daily sunshine and 300+ cloud-free days.
- **Thermal Challenge:** Overcomes severe post-sunset nocturnal temperature drops (-12°C to -20°C) caused by high heat losses through traditional corrugated tin roofs, uninsulated masonry, and drafty openings.
- **Standalone Passive Solution:** Direct South-facing solar collector glazing ($SHGC = 0.72$), 350mm high-thermal mass rammed earth storage (65,000 kg sensible mass), multi-layer insulated night shutters ($R = 2.0\text{ m}^2\text{K/W}$), and 200mm continuous PUF insulated roof ($U = 0.12\text{ W/m}^2\text{K}$).
- **Fossil Fuel Displaced:** Eliminates 1,480 Litres of kerosene heating per shelter each winter season, saving ₹ 98,500/year and avoiding 3,720 kg of $\text{CO}_2$ emissions.

### 2. The 3 Core Tasks
1. **Task 1: Inside Temperature Prediction:** Solves 24-hour diurnal transient thermal state using thermal mass capacitance ($C_{total} = M \cdot c$), predicting indoor air temperature, operative temperature ($T_{op}$), and ASHRAE 55 PMV/PPD comfort levels.
2. **Task 2: Solar Thermal Energy Generation:** Models hourly direct beam and isotropic diffuse solar flux on horizontal roofs, vertical facades, and window glazing openings ($Q_{solar} = Q_{roof} + Q_{wall} + Q_{window}$).
3. **Task 3: Heat Flow Details by Temperature Difference ($\Delta T$):** Real-time decomposition across opaque wall/roof conduction ($Q_{cond}$), glazing aperture heat flow ($Q_{glaze}$), wind-driven convection ($Q_{conv}$), air infiltration leakage ($Q_{infil}$), and Stefan-Boltzmann sky radiation ($Q_{rad}$).

### 3. ANSYS Software FEA Integration
Automated parametric generation of:
- **ANSYS APDL (`.mac`)**: Batch macro utilizing `SOLID70` (3D 8-node thermal solids) and `SURF152` (surface radiation and solar flux), 24 transient load steps (`ANTYPE, 4`), and `/POST26` nodal time-history extraction.
- **PyMAPDL Python Script (`.py`)**: Script utilizing `ansys-mapdl-core` for automated programmatic execution.

### 4. 26 Indian States & UTs with Real-Time WMO Live Weather
Classified across all Indian climate zones (Hot-Arid, Composite, Hot-Humid, Warm-Humid, Temperate, Cold-Mountain, Cold-Temperate, Cold-Arid, Semi-Arid, Sub-Tropical) with instant search, regional tabs, and live meteorological telemetry stream via Open-Meteo.

---

## 🚀 Quick Start (Local Run)

```bash
# 1. Clone or navigate to the repository
cd thermoshelter-report

# 2. Start the local server
python serve.py
```
Open your browser to: **`http://localhost:8080/`**

---

## 🧪 Testing & Validation

Run the test suite (99 unit tests passing):
```bash
python -m unittest discover tests
```

Run the end-to-end physics smoke test:
```bash
python smoke_test.py
```

---

## ☁️ How to Deploy to Cloud & Share

### Option 1: GitHub & GitHub Pages (Easiest Free Hosting)
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of THERMOSHELTER platform"
   ```
2. Create a repository on [GitHub](https://github.com/new) named `thermoshelter`.
3. Push your code:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/thermoshelter.git
   git branch -M main
   git push -u origin main
   ```
4. Enable **GitHub Pages**:
   - Go to your repository **Settings** > **Pages**.
   - Under **Build and deployment** > **Branch**, select `main` / `root`, and click **Save**.
   - Your public link will be live at: `https://<YOUR_USERNAME>.github.io/thermoshelter/`

### Option 2: Deploy to Vercel (Zero Config)
1. Install Vercel CLI or visit [vercel.com](https://vercel.com/):
   ```bash
   npx vercel
   ```
2. Follow the prompts to get an instant `https://thermoshelter-xyz.vercel.app` shareable link.

### Option 3: Deploy to Netlify
1. Drag and drop this folder directly into [app.netlify.com/drop](https://app.netlify.com/drop).
2. Get an immediate free `https://thermoshelter-xyz.netlify.app` public link.

---

## 📁 Repository Structure

```
thermoshelter-report/
├── index.html              # Streamlit-style interactive UI application
├── style.css               # Modern dark-mode styling and responsive layouts
├── script.js               # Client-side transient simulation engine & ANSYS generator
├── serve.py                # Multi-threaded server with live weather proxy
├── smoke_test.py           # Verification script for 8 physical laws
├── models/
│   ├── simulation.py       # 24-hour transient thermal simulation solver
│   ├── shelter.py          # ShelterDesign dataclass and Ladakh preset factory
│   ├── ansys_export.py     # Parametric ANSYS APDL and PyMAPDL script generator
│   ├── solar.py            # Spencer solar altitude, declination, and radiation
│   ├── heat_transfer.py    # Conduction, convection, and radiation equations
│   ├── comfort.py          # ASHRAE 55 PMV/PPD thermal comfort engine
│   └── materials.py        # Material properties and database reader
├── data/
│   ├── climates.csv        # 26 Indian States meteorological profiles
│   └── materials.csv       # 37 building materials specifications
└── tests/
    ├── test_solar_model.py
    ├── test_heat_transfer.py
    ├── test_comfort.py
    ├── test_thermal_model.py
    └── test_ansys_export.py
```

---

## 📜 License
MIT License. Developed for Research, Engineering, and Thermal Shelter Optimization.
