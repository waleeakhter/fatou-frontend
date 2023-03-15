let x=[
'Hospital & Health Care',
'Construction',
'Retail',
'Education Management',
'Financial Services',
'Accounting',
'Computer Software',
'Higher Education',
'Automotive',
'Government Administration',
'Marketing and Advertising',
'Banking',
'Health, Wellness and Fitness',
'Real Estate',
'Food & Beverages',
'Telecommunications',
'Oil & Energy',
'Hospitality',
'Mechanical or Industrial Engineering',
'Primary/Secondary Education',
'Internet',
'Electrical/Electronic Manufacturing',
'Insurance',
'Medical Practice',
'Human Resources',
'Consumer Services',
'Transportation/Trucking/Railroad',
'Pharmaceuticals',
'Restaurants',
'Management Consulting',
'Civil Engineering',
'Research',
'Design',
'Logistics and Supply Chain',
'Law Practice',
'Architecture & Planning',
'Apparel & Fashion',
'Consumer Goods',
'Facilities Services',
'Food Production',
'Non-Profit Organization Management',
'Machinery',
'Entertainment',
'Chemicals',
'Wholesale',
'Arts and Crafts',
'Utilities',
'Farming',
'Legal Services',
'Mining & Metals',
'Airlines/Aviation',
'Leisure, Travel & Tourism',
'Sports',
'Building Materials',
'Environmental Services',
'Professional Training & Coaching',
'Medical Devices',
'Music',
'Individual & Family Services',
'Cosmetics',
'Mental Health Care',
'Industrial Automation',
'Security and Investigations',
'Staffing and Recruiting',
'Aviation & Aerospace',
'Graphic Design',
'Biotechnology',
'Textiles',
'Import and Export',
'Consumer Electronics',
'Public Relations and Communications',
'Broadcast Media',
'Business Supplies and Equipment',
'Writing and Editing',
'Military',
'Media Production',
'Computer Networking',
'International Trade and Development',
'Renewables & Environment',
'Events Services',
'Civic & Social Organization',
'Photography',
'Computer Hardware',
'Defense & Space',
'Furniture',
'Computer & Network Security',
'Printing',
'Fine Art',
'Investment Management',
'E-Learning',
'Outsourcing/Offshoring',
'Warehousing',
'Law Enforcement',
'Publishing',
'Religious Institutions',
'Maritime',
'Information Services',
'Supermarkets',
'Executive Office',
'Animation',
'Government Relations',
'Semiconductors',
'Program Development',
'Plastics',
'Online Media',
'Public Safety',
'Packaging and Containers',
'Judiciary',
'Alternative Medicine',
'Performing Arts',
'Commercial Real Estate',
'Motion Pictures and Film',
'Veterinary',
'Computer Games',
'Luxury Goods & Jewelry',
'International Affairs',
'Investment Banking',
'Market Research',
'Wine and Spirits',
'Package/Freight Delivery',
'Newspapers',
'Translation and Localization',
'Recreational Facilities and Services',
'Sporting Goods',
'Public Policy',
'Capital Markets',
'Paper & Forest Products Librarie',
'Wireles',
'Venture Capital & Private Equity Gambling & Casinos',
'Ranching',
'Glass, Ceramics & Concrete',
'Philanthropy',
'Dairy',
'Museums and Institutions',
'Shipbuilding',
'Think Tanks',
'Political Organization',
'Fishery',
'Fund-Raising',
'Tobacco',
'Railroad Manufacture',
'Alternative Dispute Resolution',
'Nanotechnology',
'Legislative Office',
'Mobile Games'
]

x=x.map((t)=>{
   z=t
    z=z.replaceAll('&','and')
    z=z.replaceAll(' ','-')
    z=z.toLocaleLowerCase()
    return {value:z,label:t}
})


 objectarr=[
    "hospital-and-health-care",
    "construction",
    "retail",
    "education-management",
    "financial-services",
    "accounting",
    "computer-software",
    "higher-education",
    "automotive",
    "government-administration",
    "marketing-and-advertising",
    "banking",
    "health,-wellness-and-fitness",
    "real-estate",
    "food-and-beverages",
    "telecommunications",
    "oil-and-energy",
    "hospitality",
    "mechanical-or-industrial-engineering",
    "primary/secondary-education",
    "internet",
    "electrical/electronic-manufacturing",
    "insurance",
    "medical-practice",
    "human-resources",
    "consumer-services",
    "transportation/trucking/railroad",
    "pharmaceuticals",
    "restaurants",
    "management-consulting",
    "civil-engineering",
    "research",
    "design",
    "logistics-and-supply-chain",
    "law-practice",
    "architecture-and-planning",
    "apparel-and-fashion",
    "consumer-goods",
    "facilities-services",
    "food-production",
    "non-profit-organization-management",
    "machinery",
    "entertainment",
    "chemicals",
    "wholesale",
    "arts-and-crafts",
    "utilities",
    "farming",
    "legal-services",
    "mining-and-metals",
    "airlines/aviation",
    "leisure,-travel-and-tourism",
    "sports",
    "building-materials",
    "environmental-services",
    "professional-training-and-coaching",
    "medical-devices",
    "music",
    "individual-and-family-services",
    "cosmetics",
    "mental-health-care",
    "industrial-automation",
    "security-and-investigations",
    "staffing-and-recruiting",
    "aviation-and-aerospace",
    "graphic-design",
    "biotechnology",
    "textiles",
    "import-and-export",
    "consumer-electronics",
    "public-relations-and-communications",
    "broadcast-media",
    "business-supplies-and-equipment",
    "writing-and-editing",
    "military",
    "media-production",
    "computer-networking",
    "international-trade-and-development",
    "renewables-and-environment",
    "events-services",
    "civic-and-social-organization",
    "photography",
    "computer-hardware",
    "defense-and-space",
    "furniture",
    "computer-and-network-security",
    "printing",
    "fine-art",
    "investment-management",
    "e-learning",
    "outsourcing/offshoring",
    "warehousing",
    "law-enforcement",
    "publishing",
    "religious-institutions",
    "maritime",
    "information-services",
    "supermarkets",
    "executive-office",
    "animation",
    "government-relations",
    "semiconductors",
    "program-development",
    "plastics",
    "online-media",
    "public-safety",
    "packaging-and-containers",
    "judiciary",
    "alternative-medicine",
    "performing-arts",
    "commercial-real-estate",
    "motion-pictures-and-film",
    "veterinary",
    "computer-games",
    "luxury-goods-and-jewelry",
    "international-affairs",
    "investment-banking",
    "market-research",
    "wine-and-spirits",
    "package/freight-delivery",
    "newspapers",
    "translation-and-localization",
    "recreational-facilities-and-services",
    "sporting-goods",
    "public-policy",
    "capital-markets",
    "paper-and-forest-products-librarie",
    "wireles",
    "venture-capital-and-private-equity-gambling-and-casinos",
    "ranching",
    "glass,-ceramics-and-concrete",
    "philanthropy",
    "dairy",
    "museums-and-institutions",
    "shipbuilding",
    "think-tanks",
    "political-organization",
    "fishery",
    "fund-raising",
    "tobacco",
    "railroad-manufacture",
    "alternative-dispute-resolution",
    "nanotechnology",
    "legislative-office",
    "mobile-games"
]

 arr=[
    {
        "value": "hospital-and-health-care",
        "label": "Hospital & Health Care"
    },
    {
        "value": "construction",
        "label": "Construction"
    },
    {
        "value": "retail",
        "label": "Retail"
    },
    {
        "value": "education-management",
        "label": "Education Management"
    },
    {
        "value": "financial-services",
        "label": "Financial Services"
    },
    {
        "value": "accounting",
        "label": "Accounting"
    },
    {
        "value": "computer-software",
        "label": "Computer Software"
    },
    {
        "value": "higher-education",
        "label": "Higher Education"
    },
    {
        "value": "automotive",
        "label": "Automotive"
    },
    {
        "value": "government-administration",
        "label": "Government Administration"
    },
    {
        "value": "marketing-and-advertising",
        "label": "Marketing and Advertising"
    },
    {
        "value": "banking",
        "label": "Banking"
    },
    {
        "value": "health,-wellness-and-fitness",
        "label": "Health, Wellness and Fitness"
    },
    {
        "value": "real-estate",
        "label": "Real Estate"
    },
    {
        "value": "food-and-beverages",
        "label": "Food & Beverages"
    },
    {
        "value": "telecommunications",
        "label": "Telecommunications"
    },
    {
        "value": "oil-and-energy",
        "label": "Oil & Energy"
    },
    {
        "value": "hospitality",
        "label": "Hospitality"
    },
    {
        "value": "mechanical-or-industrial-engineering",
        "label": "Mechanical or Industrial Engineering"
    },
    {
        "value": "primary/secondary-education",
        "label": "Primary/Secondary Education"
    },
    {
        "value": "internet",
        "label": "Internet"
    },
    {
        "value": "electrical/electronic-manufacturing",
        "label": "Electrical/Electronic Manufacturing"
    },
    {
        "value": "insurance",
        "label": "Insurance"
    },
    {
        "value": "medical-practice",
        "label": "Medical Practice"
    },
    {
        "value": "human-resources",
        "label": "Human Resources"
    },
    {
        "value": "consumer-services",
        "label": "Consumer Services"
    },
    {
        "value": "transportation/trucking/railroad",
        "label": "Transportation/Trucking/Railroad"
    },
    {
        "value": "pharmaceuticals",
        "label": "Pharmaceuticals"
    },
    {
        "value": "restaurants",
        "label": "Restaurants"
    },
    {
        "value": "management-consulting",
        "label": "Management Consulting"
    },
    {
        "value": "civil-engineering",
        "label": "Civil Engineering"
    },
    {
        "value": "research",
        "label": "Research"
    },
    {
        "value": "design",
        "label": "Design"
    },
    {
        "value": "logistics-and-supply-chain",
        "label": "Logistics and Supply Chain"
    },
    {
        "value": "law-practice",
        "label": "Law Practice"
    },
    {
        "value": "architecture-and-planning",
        "label": "Architecture & Planning"
    },
    {
        "value": "apparel-and-fashion",
        "label": "Apparel & Fashion"
    },
    {
        "value": "consumer-goods",
        "label": "Consumer Goods"
    },
    {
        "value": "facilities-services",
        "label": "Facilities Services"
    },
    {
        "value": "food-production",
        "label": "Food Production"
    },
    {
        "value": "non-profit-organization-management",
        "label": "Non-Profit Organization Management"
    },
    {
        "value": "machinery",
        "label": "Machinery"
    },
    {
        "value": "entertainment",
        "label": "Entertainment"
    },
    {
        "value": "chemicals",
        "label": "Chemicals"
    },
    {
        "value": "wholesale",
        "label": "Wholesale"
    },
    {
        "value": "arts-and-crafts",
        "label": "Arts and Crafts"
    },
    {
        "value": "utilities",
        "label": "Utilities"
    },
    {
        "value": "farming",
        "label": "Farming"
    },
    {
        "value": "legal-services",
        "label": "Legal Services"
    },
    {
        "value": "mining-and-metals",
        "label": "Mining & Metals"
    },
    {
        "value": "airlines/aviation",
        "label": "Airlines/Aviation"
    },
    {
        "value": "leisure,-travel-and-tourism",
        "label": "Leisure, Travel & Tourism"
    },
    {
        "value": "sports",
        "label": "Sports"
    },
    {
        "value": "building-materials",
        "label": "Building Materials"
    },
    {
        "value": "environmental-services",
        "label": "Environmental Services"
    },
    {
        "value": "professional-training-and-coaching",
        "label": "Professional Training & Coaching"
    },
    {
        "value": "medical-devices",
        "label": "Medical Devices"
    },
    {
        "value": "music",
        "label": "Music"
    },
    {
        "value": "individual-and-family-services",
        "label": "Individual & Family Services"
    },
    {
        "value": "cosmetics",
        "label": "Cosmetics"
    },
    {
        "value": "mental-health-care",
        "label": "Mental Health Care"
    },
    {
        "value": "industrial-automation",
        "label": "Industrial Automation"
    },
    {
        "value": "security-and-investigations",
        "label": "Security and Investigations"
    },
    {
        "value": "staffing-and-recruiting",
        "label": "Staffing and Recruiting"
    },
    {
        "value": "aviation-and-aerospace",
        "label": "Aviation & Aerospace"
    },
    {
        "value": "graphic-design",
        "label": "Graphic Design"
    },
    {
        "value": "biotechnology",
        "label": "Biotechnology"
    },
    {
        "value": "textiles",
        "label": "Textiles"
    },
    {
        "value": "import-and-export",
        "label": "Import and Export"
    },
    {
        "value": "consumer-electronics",
        "label": "Consumer Electronics"
    },
    {
        "value": "public-relations-and-communications",
        "label": "Public Relations and Communications"
    },
    {
        "value": "broadcast-media",
        "label": "Broadcast Media"
    },
    {
        "value": "business-supplies-and-equipment",
        "label": "Business Supplies and Equipment"
    },
    {
        "value": "writing-and-editing",
        "label": "Writing and Editing"
    },
    {
        "value": "military",
        "label": "Military"
    },
    {
        "value": "media-production",
        "label": "Media Production"
    },
    {
        "value": "computer-networking",
        "label": "Computer Networking"
    },
    {
        "value": "international-trade-and-development",
        "label": "International Trade and Development"
    },
    {
        "value": "renewables-and-environment",
        "label": "Renewables & Environment"
    },
    {
        "value": "events-services",
        "label": "Events Services"
    },
    {
        "value": "civic-and-social-organization",
        "label": "Civic & Social Organization"
    },
    {
        "value": "photography",
        "label": "Photography"
    },
    {
        "value": "computer-hardware",
        "label": "Computer Hardware"
    },
    {
        "value": "defense-and-space",
        "label": "Defense & Space"
    },
    {
        "value": "furniture",
        "label": "Furniture"
    },
    {
        "value": "computer-and-network-security",
        "label": "Computer & Network Security"
    },
    {
        "value": "printing",
        "label": "Printing"
    },
    {
        "value": "fine-art",
        "label": "Fine Art"
    },
    {
        "value": "investment-management",
        "label": "Investment Management"
    },
    {
        "value": "e-learning",
        "label": "E-Learning"
    },
    {
        "value": "outsourcing/offshoring",
        "label": "Outsourcing/Offshoring"
    },
    {
        "value": "warehousing",
        "label": "Warehousing"
    },
    {
        "value": "law-enforcement",
        "label": "Law Enforcement"
    },
    {
        "value": "publishing",
        "label": "Publishing"
    },
    {
        "value": "religious-institutions",
        "label": "Religious Institutions"
    },
    {
        "value": "maritime",
        "label": "Maritime"
    },
    {
        "value": "information-services",
        "label": "Information Services"
    },
    {
        "value": "supermarkets",
        "label": "Supermarkets"
    },
    {
        "value": "executive-office",
        "label": "Executive Office"
    },
    {
        "value": "animation",
        "label": "Animation"
    },
    {
        "value": "government-relations",
        "label": "Government Relations"
    },
    {
        "value": "semiconductors",
        "label": "Semiconductors"
    },
    {
        "value": "program-development",
        "label": "Program Development"
    },
    {
        "value": "plastics",
        "label": "Plastics"
    },
    {
        "value": "online-media",
        "label": "Online Media"
    },
    {
        "value": "public-safety",
        "label": "Public Safety"
    },
    {
        "value": "packaging-and-containers",
        "label": "Packaging and Containers"
    },
    {
        "value": "judiciary",
        "label": "Judiciary"
    },
    {
        "value": "alternative-medicine",
        "label": "Alternative Medicine"
    },
    {
        "value": "performing-arts",
        "label": "Performing Arts"
    },
    {
        "value": "commercial-real-estate",
        "label": "Commercial Real Estate"
    },
    {
        "value": "motion-pictures-and-film",
        "label": "Motion Pictures and Film"
    },
    {
        "value": "veterinary",
        "label": "Veterinary"
    },
    {
        "value": "computer-games",
        "label": "Computer Games"
    },
    {
        "value": "luxury-goods-and-jewelry",
        "label": "Luxury Goods & Jewelry"
    },
    {
        "value": "international-affairs",
        "label": "International Affairs"
    },
    {
        "value": "investment-banking",
        "label": "Investment Banking"
    },
    {
        "value": "market-research",
        "label": "Market Research"
    },
    {
        "value": "wine-and-spirits",
        "label": "Wine and Spirits"
    },
    {
        "value": "package/freight-delivery",
        "label": "Package/Freight Delivery"
    },
    {
        "value": "newspapers",
        "label": "Newspapers"
    },
    {
        "value": "translation-and-localization",
        "label": "Translation and Localization"
    },
    {
        "value": "recreational-facilities-and-services",
        "label": "Recreational Facilities and Services"
    },
    {
        "value": "sporting-goods",
        "label": "Sporting Goods"
    },
    {
        "value": "public-policy",
        "label": "Public Policy"
    },
    {
        "value": "capital-markets",
        "label": "Capital Markets"
    },
    {
        "value": "paper-and-forest-products-librarie",
        "label": "Paper & Forest Products Librarie"
    },
    {
        "value": "wireles",
        "label": "Wireles"
    },
    {
        "value": "venture-capital-and-private-equity-gambling-and-casinos",
        "label": "Venture Capital & Private Equity Gambling & Casinos"
    },
    {
        "value": "ranching",
        "label": "Ranching"
    },
    {
        "value": "glass,-ceramics-and-concrete",
        "label": "Glass, Ceramics & Concrete"
    },
    {
        "value": "philanthropy",
        "label": "Philanthropy"
    },
    {
        "value": "dairy",
        "label": "Dairy"
    },
    {
        "value": "museums-and-institutions",
        "label": "Museums and Institutions"
    },
    {
        "value": "shipbuilding",
        "label": "Shipbuilding"
    },
    {
        "value": "think-tanks",
        "label": "Think Tanks"
    },
    {
        "value": "political-organization",
        "label": "Political Organization"
    },
    {
        "value": "fishery",
        "label": "Fishery"
    },
    {
        "value": "fund-raising",
        "label": "Fund-Raising"
    },
    {
        "value": "tobacco",
        "label": "Tobacco"
    },
    {
        "value": "railroad-manufacture",
        "label": "Railroad Manufacture"
    },
    {
        "value": "alternative-dispute-resolution",
        "label": "Alternative Dispute Resolution"
    },
    {
        "value": "nanotechnology",
        "label": "Nanotechnology"
    },
    {
        "value": "legislative-office",
        "label": "Legislative Office"
    },
    {
        "value": "mobile-games",
        "label": "Mobile Games"
    }
]




 x=[
    "High School",
"GED",
"Associate Degree",
"Bachelor's Degree",
"Master's Degree",
"JD",
"PHD",
"Others (Manual Option)"]

objectarr=[
    {
        "value": "high-school",
        "label": "High School"
    },
    {
        "value": "ged",
        "label": "GED"
    },
    {
        "value": "associate-degree",
        "label": "Associate Degree"
    },
    {
        "value": "bachelor's-degree",
        "label": "Bachelor's Degree"
    },
    {
        "value": "master's-degree",
        "label": "Master's Degree"
    },
    {
        "value": "jd",
        "label": "JD"
    },
    {
        "value": "phd",
        "label": "PHD"
    },
    {
        "value": "others-(manual-option)",
        "label": "Others (Manual Option)"
    }
]
arr=[
    "high-school",
    "ged",
    "associate-degree",
    "bachelor's-degree",
    "master's-degree",
    "jd",
    "phd",
    "others-(manual-option)"
]

x=[
"Design",
"Designer/UX",
"DevOps",
"Engineering",
"Data Science",
"Product",
"IT/Infrastructure",
"Finance",
"Marketing",
"Sales",
"Growth",
"Legal",
"Human Resources",
"Talent Acquisition",
"Operations",
"Other (manual Option)"
]


objectarr=[
    {
        "value": "design",
        "label": "design"
    },
    {
        "value": "designer/ux",
        "label": "designer/ux"
    },
    {
        "value": "devops",
        "label": "devops"
    },
    {
        "value": "engineering",
        "label": "engineering"
    },
    {
        "value": "data-science",
        "label": "data-science"
    },
    {
        "value": "product",
        "label": "product"
    },
    {
        "value": "it/infrastructure",
        "label": "it/infrastructure"
    },
    {
        "value": "finance",
        "label": "finance"
    },
    {
        "value": "marketing",
        "label": "marketing"
    },
    {
        "value": "sales",
        "label": "sales"
    },
    {
        "value": "growth",
        "label": "growth"
    },
    {
        "value": "legal",
        "label": "legal"
    },
    {
        "value": "human-resources",
        "label": "human-resources"
    },
    {
        "value": "talent-acquisition",
        "label": "talent-acquisition"
    },
    {
        "value": "operations",
        "label": "operations"
    },
    {
        "value": "other-(manual-option)",
        "label": "other-(manual-option)"
    }
]


arr=[
    "design",
    "designer/ux",
    "devops",
    "engineering",
    "data-science",
    "product",
    "it/infrastructure",
    "finance",
    "marketing",
    "sales",
    "growth",
    "legal",
    "human-resources",
    "talent-acquisition",
    "operations",
    "other-(manual-option)"
]