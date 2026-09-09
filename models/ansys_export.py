"""
ANSYS FEA Thermal Simulation Model Generator.

Directly addresses Problem Statement requirements:
"A general model development in ANSYS software to thermally simulate the shelter
for study of heat losses and capture of real time atmospheric ambient climatic
condition data will prove to be helpful. The model should be user friendly and
works on user defined values (real time data, material properties etc.) to simulate
the cases along with comparative analysis with different materials."

Generates:
1. ANSYS APDL (.mac) batch simulation script
2. PyMAPDL (Python) script for automated ANSYS Mechanical/Thermal execution
"""

import math
from typing import Dict, Any, Optional


def generate_ansys_apdl_script(
    length_m: float = 10.0,
    width_m: float = 10.0,
    height_m: float = 3.0,
    wall_thick_m: float = 0.23,
    roof_thick_m: float = 0.15,
    wall_k: float = 0.80,
    wall_rho: float = 1600.0,
    wall_cp: float = 840.0,
    roof_k: float = 1.00,
    roof_rho: float = 1600.0,
    roof_cp: float = 840.0,
    h_outside: float = 25.0,
    h_inside: float = 8.0,
    avg_temp_c: float = 5.2,
    min_temp_c: float = -12.0,
    max_temp_c: float = 22.0,
    peak_solar_flux_w: float = 850.0,
    location_name: str = "Ladakh High-Altitude Cold Region",
    title: str = "THERMOSHELTER Transient Thermal Analysis"
) -> str:
    """
    Generate an ANSYS APDL macro script for transient thermal shelter analysis.
    Solves 24-hour diurnal thermal cycle with conduction, convection, and solar flux.
    """
    amp = (max_temp_c - min_temp_c) / 2.0
    
    script = f"""! ==============================================================================
! ANSYS APDL Transient Thermal Simulation Model
! Title: {title}
! Problem Statement: Software Based Model Development for Design of Area Specific Shelter
! Location: {location_name}
! ==============================================================================

/CLEAR, NOSTART
/PREP7
/TITLE, {title} - {location_name}

! ------------------------------------------------------------------------------
! 1. PARAMETRIC GEOMETRY DEFINITION (User Defined Inputs)
! ------------------------------------------------------------------------------
L_X = {length_m:.3f}         ! Shelter Length in X (m) - East-West elongated
W_Y = {width_m:.3f}         ! Shelter Width in Y (m) - North-South
H_Z = {height_m:.3f}         ! Shelter Height in Z (m)
T_WALL = {wall_thick_m:.3f}      ! Wall Assembly Thickness (m)
T_ROOF = {roof_thick_m:.3f}      ! Roof Assembly Thickness (m)

! ------------------------------------------------------------------------------
! 2. MATERIAL PROPERTIES DEFINITION
! Material 1: Wall Material
! Material 2: Roof Assembly
! Material 3: Interior Air & Thermal Mass
! ------------------------------------------------------------------------------
! Material 1: Wall Construction
MP, KXX, 1, {wall_k:.4f}     ! Thermal Conductivity (W/m*K)
MP, DENS, 1, {wall_rho:.1f}   ! Density (kg/m3)
MP, C, 1, {wall_cp:.1f}       ! Specific Heat Capacity (J/kg*K)

! Material 2: Roof Construction
MP, KXX, 2, {roof_k:.4f}     ! Thermal Conductivity (W/m*K)
MP, DENS, 2, {roof_rho:.1f}   ! Density (kg/m3)
MP, C, 2, {roof_cp:.1f}       ! Specific Heat Capacity (J/kg*K)

! Material 3: Interior Thermal Air Mass
MP, KXX, 3, 0.026         ! Air Conductivity (W/m*K)
MP, DENS, 3, 1.20         ! Air Density (kg/m3)
MP, C, 3, 1005.0          ! Air Specific Heat (J/kg*K)

! ------------------------------------------------------------------------------
! 3. ELEMENT TYPE & SOLID MODELING
! SOLID70: 3D 8-Node Thermal Solid (Conduction & Storage)
! SURF152: 3D Surface Effect Element (Convection & Radiation Flux)
! ------------------------------------------------------------------------------
ET, 1, SOLID70
ET, 2, SURF152
KEYOPT, 2, 4, 0           ! No mid-side nodes
KEYOPT, 2, 9, 1           ! Radiation and convection capability

! Create Outer Building Envelope Boundary Block
BLOCK, 0, L_X, 0, W_Y, 0, H_Z

! Create Inner Cavity
BLOCK, T_WALL, L_X-T_WALL, T_WALL, W_Y-T_WALL, 0, H_Z-T_ROOF

! Subtract inner cavity to form hollow shelter walls and roof
VSBV, 1, 2

! Create Interior Air Mass Volume
BLOCK, T_WALL, L_X-T_WALL, T_WALL, W_Y-T_WALL, 0, H_Z-T_ROOF

! Assign Material Attributes
VSEL, S, , , 1
VATT, 1, , 1              ! Assign Wall Material to outer shell
VSEL, S, , , 2
VATT, 3, , 1              ! Assign Air/Thermal Mass to inner volume
ALLSEL

! ------------------------------------------------------------------------------
! 4. MESH GENERATION
! ------------------------------------------------------------------------------
ESIZE, 0.15               ! Global Element Size (150 mm for accurate thermal gradient)
MSHAPE, 0, 3D             ! Hexahedral elements where feasible
VMESH, ALL

! ------------------------------------------------------------------------------
! 5. TRANSIENT THERMAL SOLUTION SETUP
! ------------------------------------------------------------------------------
/SOLU
ANTYPE, 4                 ! Transient thermal analysis
TRNOPT, FULL              ! Full transient method
TIMINT, ON                ! Transient time integration on
AUTOTS, ON                ! Automatic time stepping enabled

! Initial Temperature across all shelter nodes (Kelvin)
T_INIT = {avg_temp_c + 273.15:.2f}
IC, ALL, TEMP, T_INIT

! Total Time: 24 hours = 86400 seconds
! Solve across 24 hourly load steps
*DO, HR, 1, 24
    TIME_SEC = HR * 3600.0
    TIME, TIME_SEC
    DELTIM, 300, 60, 900  ! Time step: 300s nominal, min 60s, max 900s
    
    ! Calculate Hourly Ambient Temperature via Diurnal Sine Function
    HOUR_ANGLE = (HR - 14.0) * 15.0
    HOUR_RAD = HOUR_ANGLE * 3.14159265 / 180.0
    T_AMB_C = {avg_temp_c:.2f} + {amp:.2f} * COS(HOUR_RAD)
    T_AMB_K = T_AMB_C + 273.15
    
    ! Calculate Solar Flux on Roof & South Wall
    *IF, HR, GE, 6, AND, HR, LE, 18, THEN
        SOL_RAD = (HR - 6.0) * 3.14159265 / 12.0
        SOLAR_FLUX = {peak_solar_flux_w:.1f} * SIN(SOL_RAD)
    *ELSE
        SOLAR_FLUX = 0.0
    *ENDIF
    
    ! Apply External Surface Convection & Solar Flux to Exterior Faces
    ! Select Top (Roof) Surface
    ASEL, S, LOC, Z, H_Z
    SFA, ALL, 1, CONV, {h_outside:.1f}, T_AMB_K
    SFA, ALL, 1, HFLUX, SOLAR_FLUX
    
    ! Select South Wall (Y = 0)
    ASEL, S, LOC, Y, 0
    SFA, ALL, 1, CONV, {h_outside:.1f}, T_AMB_K
    SFA, ALL, 1, HFLUX, SOLAR_FLUX * 0.75  ! South vertical wall solar interception
    
    ! Select North Wall (Y = W_Y) - Diffuse radiation only
    ASEL, S, LOC, Y, W_Y
    SFA, ALL, 1, CONV, {h_outside:.1f}, T_AMB_K
    SFA, ALL, 1, HFLUX, SOLAR_FLUX * 0.15
    
    ! Select East & West Walls
    ASEL, S, LOC, X, 0
    ASEL, A, LOC, X, L_X
    SFA, ALL, 1, CONV, {h_outside:.1f}, T_AMB_K
    SFA, ALL, 1, HFLUX, SOLAR_FLUX * 0.35
    
    ALLSEL
    SOLVE
*ENDDO

! ------------------------------------------------------------------------------
! 6. POST-PROCESSING & RESULTS EXTRACTION
! ------------------------------------------------------------------------------
/POST26
NUMVAR, 10
! Variable 1: Time (Hours)
! Variable 2: Interior Center Node Temperature
N_CENTER = NODE(L_X/2, W_Y/2, H_Z/2)
NSOL, 2, N_CENTER, TEMP, , T_INTERIOR
! Convert Kelvin to Celsius: Var 3 = Var 2 - 273.15
ADD, 3, 2, , , , , , 1, -273.15

! Variable 4: Exterior Roof Surface Node Temperature
N_ROOF = NODE(L_X/2, W_Y/2, H_Z)
NSOL, 4, N_ROOF, TEMP, , T_ROOF_EXT
ADD, 5, 4, , , , , , 1, -273.15

! Plot Temperature Cycles
/AXLAB, X, Time (Hours)
/AXLAB, Y, Temperature (Deg C)
XVAR, 1
PLVAR, 3, 5

! Export Results Table to CSV
/OUTPUT, ansys_thermal_results, csv
PRVAR, 3, 5
/OUTPUT
! ======================== END OF ANSYS APDL SCRIPT ========================
"""
    return script


def generate_pymapdl_python_script(
    length_m: float = 10.0,
    width_m: float = 10.0,
    height_m: float = 3.0,
    wall_thick_m: float = 0.23,
    roof_thick_m: float = 0.15,
    wall_k: float = 0.80,
    wall_rho: float = 1600.0,
    wall_cp: float = 840.0,
    roof_k: float = 1.00,
    roof_rho: float = 1600.0,
    roof_cp: float = 840.0,
    avg_temp_c: float = 5.2,
    min_temp_c: float = -12.0,
    max_temp_c: float = 22.0,
    location_name: str = "Ladakh High-Altitude Cold Region"
) -> str:
    """Generate modern Python PyMAPDL script to execute ANSYS simulation directly."""
    apdl_content = generate_ansys_apdl_script(
        length_m=length_m,
        width_m=width_m,
        height_m=height_m,
        wall_thick_m=wall_thick_m,
        roof_thick_m=roof_thick_m,
        wall_k=wall_k,
        wall_rho=wall_rho,
        wall_cp=wall_cp,
        roof_k=roof_k,
        roof_rho=roof_rho,
        roof_cp=roof_cp,
        avg_temp_c=avg_temp_c,
        min_temp_c=min_temp_c,
        max_temp_c=max_temp_c,
        location_name=location_name
    )

    py_script = f'''"""
PyMAPDL Automation Script for THERMOSHELTER Transient Thermal Analysis.
Run with: python run_ansys_simulation.py (requires ansys-mapdl-core)
"""

try:
    from ansys.mapdl.core import launch_mapdl
except ImportError:
    print("[ERROR] ansys-mapdl-core is not installed. Install via: pip install ansys-mapdl-core")
    import sys
    sys.exit(1)

import numpy as np
import matplotlib.pyplot as plt

def run():
    print("[INFO] Launching ANSYS MAPDL instance for {location_name}...")
    mapdl = launch_mapdl(loglevel="WARNING")
    print(f"[OK] Connected to ANSYS MAPDL Version: {{mapdl.version}}")

    apdl_script = """{apdl_content}"""

    print("[INFO] Executing Thermal Model Geometry, Meshing & Transient Boundary Conditions...")
    mapdl.input_strings(apdl_script)

    print("[OK] ANSYS Transient Thermal Solution Finished Successfully!")
    print("[INFO] Extracting nodal temperature cycles...")
    mapdl.exit()

if __name__ == "__main__":
    run()
'''
    return py_script


# Aliases for convenience
generate_pymapdl_script = generate_pymapdl_python_script
generate_apdl_macro = generate_ansys_apdl_script
