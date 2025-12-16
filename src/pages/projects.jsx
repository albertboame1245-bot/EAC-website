import { useState } from 'react';
import Navbar from "../navbar";

// Project Images - Replace with actual EAC project photos
import projectHero from "../assets/emergency-2.png";
import newmontProject1 from "../assets/emergency-2.png";
import newmontProject2 from "../assets/emergency-2.png";
import newmontProject3 from "../assets/emergency-2.png";
import streetLighting1 from "../assets/emergency-2.png";
import streetLighting2 from "../assets/emergency-2.png";
import industrialPanel1 from "../assets/emergency-2.png";
import industrialPanel2 from "../assets/emergency-2.png";
import miningElectrical1 from "../assets/emergency-2.png";
import miningElectrical2 from "../assets/emergency-2.png";
import solarFarm1 from "../assets/emergency-2.png";
import solarFarm2 from "../assets/emergency-2.png";
import hospitalProject1 from "../assets/emergency-2.png";
import hospitalProject2 from "../assets/emergency-2.png";
import commercialProject1 from "../assets/emergency-2.png";
import commercialProject2 from "../assets/emergency-2.png";

const projectsData = [
  {
    id: "newmont-ahafo",
    title: "Newmont Ahafo Mine Electrical Infrastructure",
    client: "Newmont Ghana Gold Limited",
    location: "Ahafo Region, Ghana",
    year: "2023",
    duration: "8 Months",
    category: "Mining",
    status: "completed",
    description: "Complete electrical infrastructure upgrade for Newmont's Ahafo mine, including high-voltage distribution, substation installation, and automation systems.",
    fullDescription: "This project involved the complete overhaul of the electrical infrastructure at Newmont's Ahafo mine site. Our team installed new high-voltage distribution systems, upgraded existing substations, implemented state-of-the-art automation controls, and provided comprehensive testing and commissioning services. The project increased electrical efficiency by 35% and reduced downtime by 60%.",
    images: [newmontProject1, newmontProject2, newmontProject3],
    features: [
      "132kV Substation Installation",
      "Mining Equipment Electrification",
      "PLC Automation Systems",
      "Power Quality Monitoring",
      "Emergency Backup Systems",
      "Lightning Protection"
    ],
    scope: [
      "Design and engineering of electrical systems",
      "Procurement of specialized mining equipment",
      "Installation of HV/MV switchgear",
      "Testing and commissioning",
      "Operator training",
      "Ongoing maintenance contract"
    ],
    stats: [
      { label: "Power Capacity", value: "45MW", icon: "⚡" },
      { label: "Cable Length", value: "28KM", icon: "📏" },
      { label: "Efficiency Gain", value: "35%", icon: "📈" },
      { label: "Project Team", value: "45", icon: "👥" }
    ]
  },
  {
    id: "accra-street-lighting",
    title: "Accra Metropolitan Street Lighting Project",
    client: "Accra Metropolitan Assembly",
    location: "Accra, Ghana",
    year: "2023",
    duration: "6 Months",
    category: "Municipal",
    status: "completed",
    description: "City-wide LED street lighting installation and smart grid implementation across major Accra roads.",
    fullDescription: "This municipal project involved the installation of 5,000 energy-efficient LED street lights across Accra's major roads and highways. We implemented a smart grid system with remote monitoring and control capabilities, allowing for efficient energy management and predictive maintenance. The project has reduced energy consumption by 60% and improved public safety significantly.",
    images: [streetLighting1, streetLighting2],
    features: [
      "Smart LED Lighting System",
      "Remote Monitoring & Control",
      "Solar Hybrid Options",
      "Automatic Fault Detection",
      "Energy Consumption Analytics",
      "Weather-resistant Fixtures"
    ],
    scope: [
      "Site survey and planning",
      "Pole foundation and installation",
      "Electrical wiring and connections",
      "Smart control system integration",
      "Testing and commissioning",
      "Maintenance training"
    ],
    stats: [
      { label: "Lights Installed", value: "5,000", icon: "💡" },
      { label: "Energy Savings", value: "60%", icon: "💰" },
      { label: "Road Coverage", value: "42KM", icon: "🛣️" },
      { label: "Completion Time", value: "6 Months", icon: "⏱️" }
    ]
  },
  {
    id: "industrial-panel-manufacturing",
    title: "Industrial Control Panel Manufacturing Facility",
    client: "Volta Aluminum Company (VALCO)",
    location: "Tema, Ghana",
    year: "2023",
    duration: "10 Months",
    category: "Industrial",
    status: "completed",
    description: "Design and installation of custom electrical control panels for aluminum smelting operations.",
    fullDescription: "We designed and manufactured specialized electrical control panels for VALCO's aluminum smelting operations. The project included custom MCCs, PLC panels, and distribution boards specifically engineered for high-temperature industrial environments. All panels feature advanced safety systems and remote monitoring capabilities.",
    images: [industrialPanel1, industrialPanel2],
    features: [
      "Custom MCC Design",
      "High-temperature Components",
      "PLC & HMI Integration",
      "Arc Flash Protection",
      "Remote Diagnostics",
      "Redundant Power Supplies"
    ],
    scope: [
      "Custom panel design and engineering",
      "Component sourcing and procurement",
      "Panel assembly and wiring",
      "Testing and quality control",
      "Installation and commissioning",
      "Operator training"
    ],
    stats: [
      { label: "Panels Manufactured", value: "85", icon: "🔌" },
      { label: "Power Rating", value: "25MW", icon: "⚡" },
      { label: "Safety Rating", value: "IP65", icon: "🛡️" },
      { label: "Temperature Range", value: "50°C", icon: "🌡️" }
    ]
  },
  {
    id: "mining-electrical-grid",
    title: "Mining Electrical Grid Reinforcement",
    client: "Gold Fields Ghana",
    location: "Tarkwa, Western Region",
    year: "2022",
    duration: "12 Months",
    category: "Mining",
    status: "completed",
    description: "Grid reinforcement and power quality improvement for Gold Fields' Tarkwa mining operations.",
    fullDescription: "This project involved reinforcing the electrical grid infrastructure at Gold Fields' Tarkwa mine to accommodate increased production capacity. We installed additional transformers, upgraded existing transmission lines, and implemented advanced power quality monitoring systems to ensure stable and reliable power supply for critical mining operations.",
    images: [miningElectrical1, miningElectrical2],
    features: [
      "Grid Reinforcement",
      "Power Quality Improvement",
      "Transformer Upgrades",
      "Harmonic Filtering",
      "Load Balancing",
      "Predictive Maintenance"
    ],
    scope: [
      "Grid capacity analysis",
      "Transformer installation",
      "Transmission line upgrades",
      "Power quality monitoring",
      "System integration",
      "Performance optimization"
    ],
    stats: [
      { label: "Capacity Increase", value: "30MW", icon: "📈" },
      { label: "Power Quality", value: "99.8%", icon: "🎯" },
      { label: "Uptime", value: "99.9%", icon: "✅" },
      { label: "Cost Savings", value: "25%", icon: "💰" }
    ]
  },
  {
    id: "solar-farm-installation",
    title: "10MW Solar Farm Installation",
    client: "Bui Power Authority",
    location: "Bui, Bono Region",
    year: "2022",
    duration: "9 Months",
    category: "Renewable Energy",
    status: "completed",
    description: "Complete design and installation of 10MW grid-tied solar farm with battery storage.",
    fullDescription: "We designed and installed a 10MW grid-tied solar farm for Bui Power Authority, featuring advanced bifacial solar panels and lithium-ion battery storage. The system includes smart inverters, remote monitoring capabilities, and seamless grid integration, providing clean energy to approximately 8,000 households.",
    images: [solarFarm1, solarFarm2],
    features: [
      "Bifacial Solar Panels",
      "Lithium-ion Battery Storage",
      "Smart Grid Integration",
      "Remote Monitoring System",
      "Weather Tracking",
      "Automated Cleaning"
    ],
    scope: [
      "Site assessment and planning",
      "Solar panel installation",
      "Battery storage system",
      "Grid connection",
      "Monitoring system setup",
      "Maintenance program"
    ],
    stats: [
      { label: "Capacity", value: "10MW", icon: "☀️" },
      { label: "Households Served", value: "8,000", icon: "🏠" },
      { label: "CO2 Reduction", value: "12,000T", icon: "🌍" },
      { label: "Battery Storage", value: "4MWh", icon: "🔋" }
    ]
  },
  {
    id: "hospital-electrical-upgrade",
    title: "Teaching Hospital Electrical System Upgrade",
    client: "Komfo Anokye Teaching Hospital",
    location: "Kumasi, Ashanti Region",
    year: "2022",
    duration: "7 Months",
    category: "Healthcare",
    status: "completed",
    description: "Complete electrical system upgrade for critical care areas with redundant power supply.",
    fullDescription: "We upgraded the entire electrical system of Komfo Anokye Teaching Hospital's critical care areas, including operating theaters, ICU, and emergency departments. The project included installation of redundant power supplies, advanced UPS systems, and specialized medical-grade electrical infrastructure to ensure uninterrupted power for life-saving equipment.",
    images: [hospitalProject1, hospitalProject2],
    features: [
      "Redundant Power Supply",
      "Medical-grade Electrical",
      "Advanced UPS Systems",
      "Emergency Generator Backup",
      "Power Quality Monitoring",
      "Isolated Power Systems"
    ],
    scope: [
      "Critical area assessment",
      "Redundant system design",
      "Medical-grade installation",
      "UPS system integration",
      "Testing and validation",
      "Staff training"
    ],
    stats: [
      { label: "Critical Areas", value: "45", icon: "🏥" },
      { label: "Backup Runtime", value: "72H", icon: "⏱️" },
      { label: "Uptime Guarantee", value: "99.99%", icon: "✅" },
      { label: "Response Time", value: "<2s", icon: "⚡" }
    ]
  },
  {
    id: "commercial-complex",
    title: "Mixed-Use Commercial Complex Electrification",
    client: "Devtraco Group",
    location: "Airport City, Accra",
    year: "2023",
    duration: "14 Months",
    category: "Commercial",
    status: "ongoing",
    description: "Complete electrical design and installation for 25-story mixed-use commercial development.",
    fullDescription: "We are providing complete electrical services for a state-of-the-art 25-story mixed-use commercial complex. The project includes high-rise electrical distribution, smart building automation, energy management systems, and sustainable energy solutions. Our team is implementing cutting-edge technology to ensure energy efficiency and occupant comfort.",
    images: [commercialProject1, commercialProject2],
    features: [
      "Smart Building Automation",
      "Energy Management System",
      "EV Charging Stations",
      "Solar Water Heating",
      "LED Lighting Automation",
      "Fire Alarm & Security"
    ],
    scope: [
      "Complete electrical design",
      "Smart system integration",
      "Sustainable solutions",
      "Testing and commissioning",
      "Building automation",
      "Maintenance planning"
    ],
    stats: [
      { label: "Building Height", value: "25 Floors", icon: "🏢" },
      { label: "Total Area", value: "85,000m²", icon: "📐" },
      { label: "Energy Target", value: "LEED Gold", icon: "🌿" },
      { label: "Completion", value: "85%", icon: "📊" }
    ]
  }
];

const categories = ["All", "Mining", "Municipal", "Industrial", "Renewable Energy", "Healthcare", "Commercial"];
const statuses = ["All", "completed", "ongoing", "upcoming"];

function ProjectCard({ project, onViewDetails }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={project.images[0]} 
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
            project.status === 'completed' ? 'bg-green-100 text-green-800' :
            project.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
            {project.category}
          </span>
        </div>
        
        {/* Year Badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <span className="text-gray-800 font-bold">{project.year}</span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{project.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-4">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{project.location}</span>
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>
        
        {/* Client Info */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Client</p>
              <p className="font-semibold text-gray-800">{project.client}</p>
            </div>
          </div>
        </div>
        
        {/* Stats Preview */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-700 mb-1">{project.duration}</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Duration</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-700 mb-1">{project.status === 'completed' ? 'Completed' : 'In Progress'}</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Status</div>
          </div>
        </div>
        
        <button
          onClick={() => onViewDetails(project.id)}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg"
        >
          View Project Details
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = projectsData.filter(project => {
    const categoryMatch = activeCategory === "All" || project.category === activeCategory;
    const statusMatch = activeStatus === "All" || project.status === activeStatus;
    return categoryMatch && statusMatch;
  });

  const handleViewDetails = (projectId) => {
    const project = projectsData.find(p => p.id === projectId);
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-8">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-medium">18+ Years of Excellence</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Our Electrical Projects
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Showcasing our expertise in delivering complex electrical solutions across Ghana
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-semibold">Over 500 Projects Completed</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-semibold">100% Client Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Portfolio</h2>
              <p className="text-gray-600">Filter projects by category or status</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Showing <span className="font-bold text-blue-600">{filteredProjects.length}</span> of {projectsData.length} projects
              </div>
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">By Category</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Status Filters */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">By Status</h3>
            <div className="flex flex-wrap gap-3">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeStatus === status
                      ? 'bg-gray-800 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'completed' && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  {status === 'ongoing' && (
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  )}
                  {status === 'upcoming' && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Project Excellence by Numbers</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">Our track record speaks for itself through measurable achievements</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">500+</div>
              <div className="text-blue-200 font-medium">Projects Completed</div>
              <div className="text-sm text-blue-300 mt-2">Across 7 categories</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">18+</div>
              <div className="text-blue-200 font-medium">Years Experience</div>
              <div className="text-sm text-blue-300 mt-2">Industry leadership</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">100%</div>
              <div className="text-blue-200 font-medium">Safety Record</div>
              <div className="text-sm text-blue-300 mt-2">Zero major incidents</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">45+</div>
              <div className="text-blue-200 font-medium">Certified Engineers</div>
              <div className="text-sm text-blue-300 mt-2">Specialized teams</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Start Your Next Project?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Partner with EAC Electrical for expert electrical solutions. Our team is ready to discuss your project requirements and deliver outstanding results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Request a Quote
              </button>
              <button className="px-8 py-3 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-lg border-2 border-blue-600 transition-all duration-300">
                Call: +233 24 123 4567
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-80 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 p-6 border-b flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                    selectedProject.status === 'completed' ? 'bg-green-100 text-green-800' :
                    selectedProject.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
                  </span>
                  <span className="px-3 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedProject.title}</h2>
                <p className="text-gray-600 mt-2">{selectedProject.description}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6">
              {/* Image Gallery */}
              <div className="mb-8 rounded-xl overflow-hidden bg-gray-100">
                <div className="relative h-96">
                  <img 
                    src={selectedProject.images[currentImageIndex]} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Overview</h3>
                    <p className="text-gray-600">{selectedProject.fullDescription}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Scope</h3>
                    <ul className="space-y-2">
                      {selectedProject.scope.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Client</span>
                        <span className="font-semibold text-gray-800">{selectedProject.client}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Location</span>
                        <span className="font-semibold text-gray-800">{selectedProject.location}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Year</span>
                        <span className="font-semibold text-gray-800">{selectedProject.year}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-semibold text-gray-800">{selectedProject.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedProject.stats.map((stat, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-blue-700 mb-2">{stat.value}</div>
                      <div className="text-gray-600">{stat.label}</div>
                      <div className="mt-2 text-2xl">{stat.icon}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Interested in Similar Projects?</h3>
                    <p className="text-blue-100">Contact our team for a detailed consultation</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-lg transition-all duration-300">
                      Download Case Study
                    </button>
                    <button className="px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-all duration-300">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;