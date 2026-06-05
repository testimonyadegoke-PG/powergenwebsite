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
    title: "Transformative Renewable Energy Platform Established",
    tag: "LATEST NEWS",
    date: "June 04, 2026",
    author: "Fatima Diallo",
    authorTitle: "VP of Strategic Partnerships",
    image: "/images/hero_projects.png",
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
    title: "Financial Times Ranks PowerGen Among Africa's Fastest Growing Companies",
    tag: "FINANCIAL TIMES",
    date: "March 15, 2024",
    author: "Marcus Vance",
    authorTitle: "Chief Executive Officer",
    image: "/images/hero_services.png",
    pullQuote: "Being recognized by the Financial Times highlights our model's resilience. Energy infrastructure is the bedrock of business continuity, and our growth follows our customers' commercial success.",
    paragraphs: [
      "The Financial Times has released its annual 'Africa's Fastest Growing Companies' list, with PowerGen Renewable Energy ranking in the top 40. This ranking honors businesses that have demonstrated exceptional revenue growth and operations resilience over a multi-year period.",
      "The evaluation period highlighted companies that navigated the complex economic disruptions of the post-pandemic cycle, currency fluctuations, and localized supply chain constraints. PowerGen's growth was driven by its strong expansion in the Commercial & Industrial (C&I) sector, helping businesses replace expensive diesel fuels with fixed-tariff solar options.",
      "By partnering with corporate agricultural firms and large manufacturing clients in Kenya and Nigeria, PowerGen has locked in long-term Power Purchase Agreements (PPAs) that protect businesses from volatility while generating stable utility revenues.",
      "This ranking solidifies our position as a leading strategic partner for institutional developers looking to deploy impact capital into commercially viable, high-growth energy assets across Africa."
    ]
  },
  {
    id: "afsia-award-2023",
    title: "Toto Mini-Grid Honored as AFSIA Mini-Grid Project of the Year",
    tag: "AWARDS",
    date: "November 28, 2023",
    author: "Alhassan Ibrahim",
    authorTitle: "Country Director, Nigeria",
    image: "/images/hero_about.png",
    pullQuote: "The Toto project is a blueprint for community electrification. It proves that remote towns can bypass the national grid and jump directly to clean, automated solar utilities.",
    paragraphs: [
      "The Africa Solar Industry Association (AFSIA) has honored PowerGen's Toto Solar Mini-grid project in Nassarawa State, Nigeria, as the 'Mini-Grid Project of the Year 2023'. The award was presented at the annual clean energy summit in Cape Town.",
      "The panel of international judges highlighted Toto's innovative engineering approach, which pairs a 350 kWp ground-mounted solar field with a containerized 1.2 MWh Battery Energy Storage System (BESS) and an advanced prepaid micro-grid distribution setup.",
      "Beyond technical specifications, AFSIA emphasized the project's socio-economic impact. By delivering constant 24/7 electricity, local healthcare clinics can run cold-chain refrigeration for vaccines, local mills have stabilized processing volumes, and residential users have access to clean, affordable light.",
      "PowerGen's remote asset management suite allows teams to monitor the entire grid's health from our control hubs, ensuring prompt O&M intervention and maintaining over 99.9% power uptime for the community."
    ]
  }
];
