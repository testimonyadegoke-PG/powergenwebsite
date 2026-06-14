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
  gallery?: string[];
}

export const projectsData: ProjectModel[] = [
  {
    id: "toto",
    title: "Toto Project",
    tag: "COMMUNITY SOLAR & STORAGE",
    location: "Nasarawa State, Nigeria",
    image: "/images/toto-community-solar-installation-inspection9.webp",
    shortDesc: "A flagship mini-grid providing 24/7 utility-grade power to a large agricultural town in Nigeria.",
    challenge: "The town of Toto was completely cut off from the national grid, relying on expensive, carbon-heavy, and noisy diesel generators. Local clinics could not preserve vaccines, businesses faced high operating expenses, and residential access was non-existent. Fluctuating fuel costs created economic volatility for the community.",
    solution: "PowerGen developed a 352.24 kWp ground-mounted solar PV array paired with a heavy-duty 972 kWh lithium-ion Battery Energy Storage System (BESS). The system was coupled with a smart prepaid mini-grid distribution network spanning 12km. Real-time telemetry monitoring optimizes charge levels, ensuring grid stabilization and load balancing.",
    impact: "Replaced over 200 decentralized diesel generators, cutting carbon emissions by 400 metric tons annually. Over 2,500 grid connections established, stabilizing power for local healthcare clinics and increasing merchant operating profits by 35% through affordable, fixed tariffs.",
    table: {
      "Project": "Toto Community Mini Grid Project",
      "Location": "Nasarawa State, Nigeria",
      "Mount System": "Ground",
      "Model": "Interconnected Mini Grid",
      "Capacity": "352.24 kWp / 972 kWh BESS",
      "Configuration": "PV + BESS",
      "Commission Date": "11/2023",
      "Status": "Commissioned & Fully Operational"
    },
    specifications: {
      "PV Module Brand": "Tier-1 Monocrystalline Bifacial",
      "Inverter Technology": "Smart Bidirectional Grid-Forming Inverters",
      "Battery Cells": "Lithium Iron Phosphate (LFP)",
      "Prepaid Meters": "PowerGen Smart Metering Core (GSM enabled)",
      "Grid Voltage": "Low-Voltage 3-Phase Distribution"
    },
    gallery: [
      "/images/toto-community-solar-installation-inspection1-thegem-product-justified-square-l.webp",
      "/images/toto-community-solar-mini-grid2-thegem-product-justified-square-l.webp",
      "/images/toto-community-solar-installation-inspection5-thegem-product-justified-square-l.webp",
      "/images/toto-community-solar-installation-inspection16-thegem-product-justified-square-l.webp"
    ]
  },
  {
    id: "sgb",
    title: "SGB Project",
    tag: "COMMERCIAL & INDUSTRIAL (C&I)",
    location: "Lubumbashi, DRC",
    image: "/images/sgb2-1.webp",
    shortDesc: "Commercial hybrid solar and storage power system securing beverage manufacturing operations in Lubumbashi.",
    challenge: "Société Générale des Boissons (SGB) in Lubumbashi, DRC needed to reduce high energy expenditures and improve supply reliability for beverage manufacturing operations. High reliance on expensive diesel generation was eroding margins and conflicting with corporate sustainability goals.",
    solution: "PowerGen designed and commissioned a customized 305.37 kWp ground-mounted solar PV array integrated with a 430 kWh lithium BESS battery system. The hybrid controller manages solar-battery-diesel integration to maximize fuel savings.",
    impact: "Substantially reduced diesel fuel consumption and decreased emissions for the manufacturing plant. The PV+BESS hybrid system provides reliable electricity to support continuous bottling operations.",
    table: {
      "Project": "SGB Project",
      "Location": "Lubumbashi, DRC",
      "Mount System": "Ground",
      "Model": "C&I",
      "Capacity": "305.37 KWp / 430KWh BESS",
      "Configuration": "PV + BESS",
      "Commission Date": "07/2025",
      "Partners": "PowerGen Equity"
    },
    specifications: {
      "PV Array Sizing": "305.37 kWp ground-mounted arrays",
      "Storage": "430 kWh LFP Battery Systems",
      "Inverter Technology": "Smart Hybrid Commercial Inverters",
      "Controller System": "PowerGen EMS Hybrid Core",
      "Status": "Fully Commissioned"
    },
    gallery: [
      "/images/sgb5-1-thegem-product-justified-square-l.webp",
      "/images/sgb4-1-thegem-product-justified-square-l.webp",
      "/images/sgb1-1-thegem-product-justified-square-l.webp",
      "/images/sgb3-1-thegem-product-justified-square-l.webp"
    ]
  },
  {
    id: "css_farms",
    title: "CSS Farms",
    tag: "COMMERCIAL & INDUSTRIAL (C&I)",
    location: "Nasarawa State, Nigeria",
    image: "/images/css-farms-solar-mingrid-13.webp",
    shortDesc: "High-efficiency hybrid grid powering cooling reserves and critical milling load profiles.",
    challenge: "CSS Farms, a key food supplier, faced huge crop losses due to power interruptions on cold storage refrigeration. Traditional grid power was unstable, and running heavy diesel units continuously eroded commercial margins, conflicting with corporate decarbonization directives.",
    solution: "PowerGen designed and financed a customized 527.04 kWp commercial ground-mounted hybrid solar plant. The plant features a high-density 387 kWh LFP battery integrated with a centralized Energy Management System (EMS) that regulates backup dispatch during peak processing hours.",
    impact: "Guaranteed 99.9% power uptime for cold storage facilities, reducing tomato spoilage rates to near zero. Cut annual operations energy costs by 45%, saving the agribusiness millions of liters in diesel purchases.",
    table: {
      "Project": "CSS Farms Solar Installation",
      "Location": "Nasarawa State, Nigeria",
      "Mount System": "Ground",
      "Model": "Captive (C & I)",
      "Capacity": "527.04 kWp / 387kWh BESS",
      "Configuration": "PV + BESS",
      "Commission Date": "05/2025",
      "Status": "Commissioned & Operational"
    },
    specifications: {
      "PV Array Sizing": "527.04 kWp DC Installed",
      "BESS Capacity": "387 kWh LFP Unit",
      "Controller System": "PowerGen EMS Hybrid Core",
      "Fuel Integration": "Dual Auto-Synchronized Genset Backups",
      "Carbon Offset": "Approx. 450 tons CO2 / year"
    },
    gallery: [
      "/images/css-farms-solar-mingrid-11-thegem-product-justified-square-l.webp",
      "/images/css-farms-solar-mingrid-6-thegem-product-justified-square-l.webp",
      "/images/css-farms-solar-mingrid-2-thegem-product-justified-square-l.webp",
      "/images/css-farms-solar-mingrid-7-thegem-product-justified-square-l.webp"
    ]
  },
  {
    id: "ijebu",
    title: "Ijebu Project",
    tag: "COMMUNITY METRO-GRIDS",
    location: "Ogun State, Nigeria",
    image: "/images/ijebu.jpg",
    shortDesc: "Isolated solar and battery storage system serving critical healthcare infrastructure at Ijebu Eye Foundation.",
    challenge: "Frequent outages in Ogun State interrupted critical medical procedures, diagnostic labs, and operations at Ijebu Eye Foundation Hospital. Capital spent on diesel generator operations and maintenance was restricting funding for patient care.",
    solution: "PowerGen engineered and installed an isolated 179.82 kWp ground-mounted solar PV and 182 kWh lithium-ion battery system. The setup prioritizes solar usage and charges batteries with excess yield to handle night-time medical load profiles.",
    impact: "Ensured uninterrupted operations for eye surgeries and stabilized voltage for sensitive ophthalmology equipment, saving over 40% in monthly energy expenditures.",
    table: {
      "Project": "Ijebu Eye Foundation Hospital",
      "Location": "Ogun State, Nigeria",
      "Mount System": "Ground",
      "Model": "Isolated",
      "Capacity": "179.82 kWp / 182kWh BESS",
      "Configuration": "PV + BESS",
      "Commission Date": "01/12/2022"
    },
    specifications: {
      "PV Array Sizing": "179.82 kWp Ground-mounted PV",
      "BESS Capacity": "182 kWh Lithium Storage",
      "Inverters": "3-Phase Hybrid Smart Inverters",
      "Monitoring": "PowerGen Client Dashboard Portal",
      "O&M Contract": "Long-term Full Performance Guarantee"
    },
    gallery: [
      "/images/Ijebu-Ode-Eye-Foundation-Hospital12-thegem-product-justified-square-l.webp",
      "/images/Ijebu-Ode-Eye-Foundation-Hospital11-thegem-product-justified-square-l.webp",
      "/images/Ijebu-Ode-Eye-Foundation-Hospital1-thegem-product-justified-square-l.webp",
      "/images/Ijebu-Ode-Eye-Foundation-Hospital6-thegem-product-justified-square-l.webp"
    ]
  },
  {
    id: "ofosu_owode",
    title: "Ofosu-Owode Project",
    tag: "COMMUNITY METRO-GRIDS",
    location: "Ondo State, Nigeria",
    image: "/images/owode_ofosu.webp",
    shortDesc: "Isolated hybrid solar mini-grids serving communities in Ondo State, expanding retail trading hours.",
    challenge: "The rural communities of Ofosu and Owode in Ondo State had no grid access, constraining business development and lowering standard of living. Local shops closed at sundown and health posts lacked cold storage.",
    solution: "PowerGen deployed a decentralized 435.96 kWp ground-mounted solar field and a massive 1,145.6 kWh lithium BESS battery container, connected to a localized distribution network.",
    impact: "Enabled round-the-clock power for retail shops, health clinics, and homes. Sparked local business growth and eliminated reliance on noisy and polluting individual small generators.",
    table: {
      "Project": "Ofosu / Owode",
      "Location": "Ondo State, Nigeria",
      "Mount System": "Ground",
      "Model": "Isolated",
      "Capacity": "435.96 kWp / 1145.6 kWh BESS",
      "Configuration": "PV + BESS",
      "Commission Date": "01/01/2025"
    },
    specifications: {
      "Solar Arrays": "435.96 kWp ground-mounted arrays",
      "Storage": "1,145.6 kWh LFP Battery Systems",
      "Distribution Length": "Local low-voltage distribution grids",
      "Active Connections": "Smart prepaid meters",
      "Billing Tech": "PowerGen Mobile Pay API"
    },
    gallery: [
      "/images/Ofosu-Community-solar-mingrid11-1-thegem-product-justified-square-l.webp",
      "/images/Ofosu-Community-solar-mingrid13-1-thegem-product-justified-square-l.webp",
      "/images/Ofosu-Community-solar-mingrid2-1-thegem-product-justified-square-l.webp",
      "/images/Ofosu-Community-solar-mingrid10-1-thegem-product-justified-square-l.webp"
    ]
  },
  {
    id: "choithram",
    title: "Choithram International School",
    tag: "COMMERCIAL & INDUSTRIAL (C&I)",
    location: "Freetown, Sierra Leone",
    image: "/images/choithrams-international-school.webp",
    shortDesc: "Custom rooftop solar integration saving educational facilities on utility budgets.",
    challenge: "Frequent outages in Freetown interrupted computer labs, labs, and classroom lights at Choithrams International School. High expenditures on generator maintenance diverted capital from teacher hires and student learning equipment.",
    solution: "We engineered a clean 125 kWp roof-mounted solar plant paired with a 20 kWh lithium battery storage cabinet. The system prioritizes solar generation for active campus hours, charging the battery with excess yield and running in grid-tied configuration.",
    impact: "Slashed the school's monthly energy expenses while providing a silent, emission-free learning environment. Serves as a live learning laboratory for students exploring science and technology.",
    table: {
      "Project": "Choithrams International School",
      "Location": "Free Town, Sierra Leone",
      "Mount System": "Roof-mounted",
      "Capacity": "125 kWp / 20kWh BESS",
      "Configuration": "PV Plus BESS (Grid Tied)",
      "Commission Date": "15 March 2025"
    },
    specifications: {
      "Rooftop Sizing": "125 kWp Monocrystalline PV",
      "BESS Unit": "20 kWh LFP Modular System",
      "Inverters": "3-Phase Hybrid Smart Inverters (Grid Tied)",
      "Monitoring": "PowerGen Client Dashboard Portal",
      "Contract Duration": "10-Year Performance Agreement"
    },
    gallery: []
  }
];
