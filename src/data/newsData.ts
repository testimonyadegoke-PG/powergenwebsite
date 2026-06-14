export interface NewsArticleModel {
  id: string;
  title: string;
  tag: string;
  date: string;
  author: string;
  authorTitle: string;
  image: string;
  pullQuote: string;
  paragraphs: string[];
}

export const newsData: NewsArticleModel[] = [
  {
    id: "platform-launch",
    title: "Africa: Transformative renewable energy platform established by PowerGen and leading investors",
    tag: "NEWS",
    date: "June 04, 2026",
    author: "Fatima Diallo",
    authorTitle: "VP of Strategic Partnerships",
    image: "/images/series-c-thegem-blog-justified.jpg",
    pullQuote: "This capital vehicle allows us to move away from site-by-site financing and scale utility deployment across Africa with institutional velocity.",
    paragraphs: [
      "PowerGen Renewable Energy has successfully joined forces with a consortium of top international development finance institutions, including PIDG Infraco Africa, the Danish Investment Fund for Developing Countries (IFU), ElectriFI, and the African Development Bank (AfDB) to establish a major new energy platform.",
      "The newly initialized platform represents a commitment to deploy over 120 MW of clean solar energy generation and battery storage capacities in target sub-Saharan markets. The primary initial regions include the Democratic Republic of Congo (DRC), Nigeria, and Sierra Leone, where access to grid utilities remains constrained.",
      "By structuring this platform, the partners are shifting away from traditional project-level debt cycles, instead creating a revolving equity framework. This ensures that assets can be engineered, constructed, and operationalized at speed, bringing power to communities and C&I clients without multi-year financing bottlenecks.",
      "Operational assets deployed through this platform will be monitored under the PowerGen O&M Command center, ensuring optimal battery cycle management and long-term grid stability."
    ]
  },
  {
    id: "ft-ranking-2024",
    title: "The Ranking: Africa’s Fastest Growing Companies 2024",
    tag: "FINANCIAL TIMES",
    date: "March 15, 2024",
    author: "Marcus Vance",
    authorTitle: "Chief Executive Officer",
    image: "/images/large-field-solar-panels-illuminated-by-sun-1-thegem-blog-justified.webp",
    pullQuote: "Being recognized by the Financial Times highlights our model's resilience. Energy infrastructure is the bedrock of business continuity, and our growth follows our customers' commercial success.",
    paragraphs: [
      "The third year of our now expanded ranking of Africa’s Fastest Growing Companies comes against a background in which many economies are struggling to recover from the Covid pandemic. Economic growth in Africa, overall, in 2023 was 3.2 per cent, according to the IMF — lower than in Asia, which grew at nearly 5 per cent. And, given the African continent’s fast population expansion, this underperformance is even starker in per capita terms. Rather than closing the gap with wealthier regions, on aggregate, Africa is falling further behind.",
      "PowerGen Renewable Energy has ranked in the top 40 of businesses recognized for resilience and success despite the challenges of the Covid pandemic and Africa’s economic hurdles. This ranking honors businesses that have demonstrated exceptional revenue growth and operations resilience over a multi-year period.",
      "The evaluation period highlighted companies that navigated the complex economic disruptions of the post-pandemic cycle, currency fluctuations, and localized supply chain constraints. PowerGen's growth was driven by its strong expansion in the Commercial & Industrial (C&I) sector, helping businesses replace expensive diesel fuels with fixed-tariff solar options."
    ]
  },
  {
    id: "afsia-award-2023",
    title: "Mini-Grid Project of the Year 2023",
    tag: "AWARDS",
    date: "November 28, 2023",
    author: "Alhassan Ibrahim",
    authorTitle: "Country Director, Nigeria",
    image: "/images/afsia-awards-to-powergen-thegem-blog-justified.webp",
    pullQuote: "The Toto project is a blueprint for community electrification. It proves that remote towns can bypass the national grid and jump directly to clean, automated solar utilities.",
    paragraphs: [
      "PowerGen Renewable Energy’s solar PV mini‑grid in Toto, Nasarawa State, earned the Mini‑Grid Project of the Year 2023 award from the Africa Solar Industry Association, recognizing its innovative hybrid, interconnected design.",
      "An Innovative Hybrid Design: The system combines a 352.24 kWp solar array with 972 kWh of battery storage and a diesel generator. It integrates with the dormant national grid, reviving 10-year-old infrastructure and draws up to six hours of nighttime power from Abuja DisCo under a formal agreement.",
      "This system now serves over 2,800 households, alongside 141 businesses, 18 productive users, and 45 public facilities in Toto. It provides consistent day‑night electricity, reduces battery dependency, cuts costs compared to diesel, and offsets about 1,920 t of CO₂ annually. Local enterprises, like a yoghurt factory, save around ₦11 500 (~€60) daily on fuel.",
      "The Toto mini‑grid showcases how hybrid systems combining solar generation, upgraded grid infrastructure, smart metering, and IoT, can deliver reliable and affordable power. PowerGen is now pursuing similar projects at over ten times the scale. The initiative supports Nigeria’s 2030 electricity access goals and the 2023 Electricity Act push toward decentralized generation.",
      "Toto’s recognition as Mini-Grid Project of the Year highlights Africa’s potential for innovative, integrated energy systems. Through smart collaboration, simple finance, and technology, PowerGen alongside government and development partners, is lighting the way forward."
    ]
  },
  {
    id: "interconnected-mini-grid",
    title: "Nigeria’s First Interconnected Hybrid Solar Mini-Grid Plant Commissioned",
    tag: "PRESS RELEASE",
    date: "November 15, 2023",
    author: "Alhassan Ibrahim",
    authorTitle: "Country Director, Nigeria",
    image: "/images/toto-community-solar-mini-grid-commissioning-thegem-blog-justified.webp",
    pullQuote: "The Toto plant is the first of its kind in Nigeria, designed to provide reliable, renewable electricity to a significant number of households and businesses.",
    paragraphs: [
      "The Rural Electrification Agency (REA) has achieved yet another incredible milestone with the commissioning of Nigeria’s first Interconnected Solar Hybrid Mini Grid in Toto community, Nasarawa State.",
      "This milestone has been achieved in collaboration with PowerGen Nigeria Limited and Abuja Electricity Distribution Plc (AEDC). This 352kWp solar hybrid mini grid project is a testament of renewed efforts of collaboration between the Federal Government and the Private Sector towards closing the electricity gap in Nigeria.",
      "The 352.24KWP Interconnected Hybrid Solar Mini-Grid Plant in Toto is the first of its kind in Nigeria, designed to provide reliable, renewable electricity to a significant number of households and businesses."
    ]
  }
];
