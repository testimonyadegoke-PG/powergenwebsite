export interface ProjectModel {
  id: string;
  title: string;
  tag: string;
  location: string;
  image: string;
  shortDesc: string;
  challenge: string;
  solution: string;
  impact: string;
  table: Record<string, string>;
  specifications: Record<string, string>;
}

export const projectsData: ProjectModel[] = [
  {
    id: "toto",
    title: "Toto Mini-Grid",
    tag: "COMMUNITY SOLAR & STORAGE",
    location: "Nassarawa, Nigeria",
    image: "/images/project_toto.png",
    shortDesc: "A flagship mini-grid providing 24/7 utility-grade power to a large agricultural town in Nigeria.",
    challenge: "The town of Toto was completely cut off from the national grid, relying on expensive, carbon-heavy, and noisy diesel generators. Local clinics could not preserve vaccines, businesses faced high operating expenses, and residential access was non-existent. Fluctuating fuel costs created economic volatility for the community.",
    solution: "PowerGen developed a 350 kWp ground-mounted solar PV array paired with a heavy-duty 1.2 MWh lithium-ion Battery Energy Storage System (BESS). The system was coupled with a smart prepaid mini-grid distribution network spanning 12km. Real-time telemetry monitoring optimizes charge levels, ensuring grid stabilization and load balancing.",
    impact: "Replaced over 200 decentralized diesel generators, cutting carbon emissions by 400 metric tons annually. Over 2,500 grid connections established, stabilizing power for local healthcare clinics and increasing merchant operating profits by 35% through affordable, fixed tariffs.",
    table: {
      "Location": "Toto, Nassarawa State, Nigeria",
      "Solar Capacity": "350 kWp Solar PV",
      "Storage Capacity": "1.2 MWh BESS (Battery Energy Storage System)",
      "Customers Connected": "2,500+ Grid Customers (residential & commercial)",
      "Key Accomplishment": "Awarded 2023 AFSIA Mini-Grid Project of the Year",
      "Status": "Commissioned & Fully Operational"
    },
    specifications: {
      "PV Module Brand": "Tier-1 Monocrystalline Bifacial",
      "Inverter Technology": "Smart Bidirectional Grid-Forming Inverters",
      "Battery Cells": "Lithium Iron Phosphate (LFP)",
      "Prepaid Meters": "PowerGen Smart Metering Core (GSM enabled)",
      "Grid Voltage": "Low-Voltage 3-Phase Distribution"
    }
  },
  {
    id: "css_farms",
    title: "CSS Farms Agribusiness Grid",
    tag: "COMMERCIAL & INDUSTRIAL (C&I)",
    location: "Nigeria",
    image: "/images/project_css_farms.png",
    shortDesc: "High-efficiency hybrid grid powering cooling reserves and critical milling load profiles.",
    challenge: "CSS Farms, a key food supplier, faced huge crop losses due to power interruptions on cold storage refrigeration. Traditional grid power was unstable, and running heavy diesel units continuously eroded commercial margins, conflicting with corporate decarbonization directives.",
    solution: "PowerGen designed and financed a customized 1.2 MWp commercial hybrid solar plant. The solar modules are split between factory rooftops and a adjacent tracking ground mount. The plant features a high-density 2.5 MWh LFP battery container integrated with a centralized Energy Management System (EMS) that regulates backup dispatch during peak processing hours.",
    impact: "Guaranteed 99.9% power uptime for cold storage facilities, reducing tomato spoilage rates to near zero. Cut annual operations energy costs by 45%, saving the agribusiness millions of liters in diesel purchases and aligning operations with international green agriculture metrics.",
    table: {
      "Client": "CSS Farms Ltd.",
      "Location": "Nigeria",
      "System Type": "Rooftop & Ground-mount Hybrid Solar",
      "Capacity": "1.2 MWp Solar PV / 2.5 MWh Battery Storage",
      "Application": "Cold storage preservation, processing mills, and water irrigation pumping",
      "Downtime Rate": "< 0.5% (Guaranteed 99.9% Uptime)"
    },
    specifications: {
      "PV Array Sizing": "1.2 MWp DC Installed",
      "BESS Capacity": "2.5 MWh LFP Containerized Unit",
      "Controller System": "PowerGen EMS Hybrid Core",
      "Fuel Integration": "Dual Auto-Synchronized Genset Backups",
      "Carbon Offset": "Approx. 1,100 tons CO2 / year"
    }
  },
  {
    id: "ijebu",
    title: "Ijebu / Owode / Ofosu",
    tag: "COMMUNITY METRO-GRIDS",
    location: "Ondo State, Nigeria",
    image: "/images/project_metro_grid.png",
    shortDesc: "Interconnected low-voltage distribution metro-grids serving thousands of grid customers.",
    challenge: "High-density trading corridors in Ondo State were choked by high-cost electricity, limiting merchant activities. A lack of infrastructure meant traders had to close shops at sunset, capping household incomes and retarding local economic loops.",
    solution: "PowerGen engineered a modular 'Metro-Grid' infrastructure grid across Ijebu, Owode, and Ofosu. It incorporates a decentralized 850 kWp solar field and 1.8 MWh of battery storage connected to a 25km low-voltage distribution network. The grid relies on smart billing nodes that interface with local mobile wallet systems.",
    impact: "Extended operating hours for over 800 local retail vendors, sparking a 50% increase in average trading revenues. The utility serves 5,000 active prepaid customers, supported by localized O&M teams and remote telemetry systems.",
    table: {
      "Project Region": "Ondo & Ogun States, Nigeria",
      "Solar Installed": "850 kWp Solar PV",
      "Battery Installed": "1.8 MWh Battery Energy Storage",
      "Grid Network": "Over 25km of local low-voltage distribution grids",
      "O&M Service": "Smart prepaid billing & mobile money integration",
      "Subsidies / Support": "Nigeria Electrification Project (NEP) Performance-Based Grants"
    },
    specifications: {
      "Solar Arrays": "850 kWp ground-mounted arrays",
      "Storage": "1.8 MWh LFP Battery Systems",
      "Distribution Length": "25.4 kilometers",
      "Active Connections": "5,000+ Smart prepaid meters",
      "Billing Tech": "PowerGen Mobile Pay API"
    }
  },
  {
    id: "choithrams",
    title: "Choithrams School Grid",
    tag: "COMMERCIAL & INDUSTRIAL (C&I)",
    location: "Freetown, Sierra Leone",
    image: "/images/project_school.png",
    shortDesc: "Custom rooftop solar integration saving educational facilities 42% on utility budgets.",
    challenge: "Frequent outages in Freetown interrupted computer labs, labs, and classroom lights at Choithrams International School. High expenditures on generator maintenance diverted capital from teacher hires and student learning equipment.",
    solution: "We engineered a clean 250 kWp rooftop solar plant paired with a 450 kWh lithium battery storage cabinet. The system prioritizes solar generation for active campus hours, charging the battery with excess yield. The battery provides quiet backup power during grid cuts, stabilizing voltages across classroom electronics.",
    impact: "Slashed the school's monthly energy expenses by 42% while providing a silent, emission-free learning environment. Serves as a live learning laboratory for students exploring science, technology, engineering, and mathematics (STEM) fields.",
    table: {
      "Client": "Choithrams International School",
      "Location": "Freetown, Sierra Leone",
      "Application": "Rooftop Commercial Solar & Battery Backup",
      "Capacity": "250 kWp Solar PV / 450 kWh Lithium Storage",
      "Direct Savings": "Over 42% reduction in monthly electricity expenditure",
      "O&M Contract": "10-Year Full Performance Guarantee"
    },
    specifications: {
      "Rooftop Sizing": "250 kWp Monocrystalline PV",
      "BESS Unit": "450 kWh LFP Modular System",
      "Inverters": "3-Phase Hybrid Smart Inverters",
      "Monitoring": "PowerGen Client Dashboard Portal",
      "Contract Duration": "10-Year Performance Agreement"
    }
  }
];
