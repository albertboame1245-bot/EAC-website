import { useState, useEffect, useRef } from 'react';
import Navbar from "../navbar";
import electricianImage from "../assets/Certified-Electrician.jpg";
import distributionBoard from "../assets/distributionBoard.jpg";
// Import service images
import streetLights1 from "../assets/streetLights-1.jpg";
import streetLights2 from "../assets/streetLights-2.jpg";
import distributionBoard3 from "../assets/distributionBoard-3.jpg";
import distributionBoard2 from "../assets/distributionBoard-2.jpg";
import Emergency1 from "../assets/emergency-1.png";
import Emergency2 from "../assets/emergency-2.png";

// Add more background images for the slideshow
const backgroundImages = [
  distributionBoard,
  electricianImage,
  distributionBoard2,
  streetLights1,
];

// Hero content array that corresponds to each background image
const heroContent = [
  {
    title: "EACssss ELECTRICAL SOLUTION LIMITED",
    subtitle: "Powering Newmont Ghana's Mining Operations",
    description: "As a premier electrical contractor for Newmont Ghana, we specialize in industrial-grade electrical solutions for mining operations with certified professionals and cutting-edge technology.",
    ctaText: "Request Quotes"
  },
  {
    title: "Certified Electrical Solutions",
    subtitle: "Expert Installation & Maintenance",
    description: "Our certified electricians provide top-quality electrical installations, maintenance, and repairs for industrial, commercial, and residential properties across Ghana.",
    ctaText: "Get Certified Service"
  },
  {
    title: "Electrical Panel Specialists",
    subtitle: "Advanced Power Distribution Systems",
    description: "Professional installation and maintenance of electrical panels and distribution boards for optimal power management and safety compliance.",
    ctaText: "Panel Solutions"
  },
  {
    title: "Street Lighting Experts",
    subtitle: "Illuminating Communities & Highways",
    description: "Complete street lighting solutions including installation, maintenance, and energy-efficient upgrades for municipalities and urban developments.",
    ctaText: "Lighting Solutions"
  }
];

const servicesData = [
  {
    title: "Street Lights Installation",
    desc: "Complete street lighting solutions for urban and rural areas",
    images: [streetLights1, streetLights2],
    details: [
      "Wiring and rewiring",
      "Lighting installation",
      "Electrical panel upgrades",
      "Safety inspections"
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    title: "Electrical Panel Solutions",
    desc: "Expert installation and building of electrical panels for commercial and industrial needs.",
    images: [distributionBoard, distributionBoard2],
    details: [
      "Custom panel design & installation",
      "Circuit protection & distribution",
      "Load balancing & upgrades",
      "Compliance with safety standards"
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: "Emergency Electrical Repairs",
    desc: "24/7 emergency services for urgent electrical issues",
    images: [Emergency1, Emergency2],
    details: [
      "24/7 availability",
      "Rapid response",
      "Troubleshooting",
      "Temporary fixes"
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  }
];

function ServiceCard({ service, isActive }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (!isActive || !isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isActive, isAutoPlaying, service.images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 7000);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + service.images.length) % service.images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 7000);
  };

  useEffect(() => {
    if (isActive) {
      setCurrentImageIndex(0);
      setIsAutoPlaying(true);
    }
  }, [isActive]);

  return (
    <div className={`bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-500 ease-in-out flex flex-col h-[550px] ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Image Gallery */}
        <div className="w-full md:w-1/2 relative overflow-hidden group">
          <div className="relative w-full h-full">
            {service.images.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={service.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
              />
            ))}
          </div>
          
          {/* Image navigation dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {service.images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`w-3 h-3 rounded-full transition-all ${currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'}`}
                aria-label={`View image ${index + 1} of ${service.title}`}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-full mr-4 text-white shadow-lg">
              {service.icon}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {service.title}
              </h3>
              <p className="text-lg text-gray-600 mt-2">{service.desc}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Service Features:
            </h4>
            <ul className="space-y-3">
              {service.details.map((detail, i) => (
                <li key={i} className="flex items-start group hover:bg-blue-50 p-2 rounded-lg transition-all duration-300">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1 flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 group-hover:text-blue-800 transition-colors duration-300">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto">
            <a href="/requestquotes">
              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Request Service
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Background slideshow state
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHeroContentVisible, setIsHeroContentVisible] = useState(true);
  
  // Text animation state
  const [currentTextStage, setCurrentTextStage] = useState(0);
  const [displayedText, setDisplayedText] = useState({
    title: '',
    subtitle: '',
    description: ''
  });

  // Ref for hero content
  const heroRef = useRef(null);

  // Get current hero content based on background index
  const currentHeroContent = heroContent[currentBgIndex] || heroContent[0];

  // Auto-rotate services every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % servicesData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate background images every 10 seconds with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      // Start content fade out
      setIsTransitioning(true);
      setIsHeroContentVisible(false);
      
      setTimeout(() => {
        // Change background
        setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
        setCurrentTextStage(0);
        
        // Reset displayed text
        setDisplayedText({
          title: '',
          subtitle: '',
          description: ''
        });
        
        // Start fade in with delay
        setTimeout(() => {
          setIsHeroContentVisible(true);
          setIsTransitioning(false);
        }, 500);
      }, 1000);

    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for hero content
  useEffect(() => {
    if (!isHeroContentVisible || currentTextStage >= 3) return;

    const content = currentHeroContent;
    let currentIndex = 0;
    let currentText = '';
    let targetText = '';

    switch (currentTextStage) {
      case 0:
        targetText = content.title;
        break;
      case 1:
        targetText = content.subtitle;
        break;
      case 2:
        targetText = content.description;
        break;
    }

    const interval = setInterval(() => {
      if (currentIndex < targetText.length) {
        currentText += targetText[currentIndex];
        setDisplayedText(prev => ({
          ...prev,
          [currentTextStage === 0 ? 'title' : currentTextStage === 1 ? 'subtitle' : 'description']: currentText
        }));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentTextStage(prev => prev + 1);
        }, currentTextStage === 2 ? 1000 : 500);
      }
    }, currentTextStage === 0 ? 20 : currentTextStage === 1 ? 15 : 10);

    return () => clearInterval(interval);
  }, [currentTextStage, isHeroContentVisible, currentHeroContent]);

  // Manual background navigation with smooth transitions
  const nextBackground = () => {
    setIsHeroContentVisible(false);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
      setCurrentTextStage(0);
      setDisplayedText({
        title: '',
        subtitle: '',
        description: ''
      });
      
      setTimeout(() => {
        setIsHeroContentVisible(true);
        setIsTransitioning(false);
      }, 500);
    }, 500);
  };

  const prevBackground = () => {
    setIsHeroContentVisible(false);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentBgIndex((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
      setCurrentTextStage(0);
      setDisplayedText({
        title: '',
        subtitle: '',
        description: ''
      });
      
      setTimeout(() => {
        setIsHeroContentVisible(true);
        setIsTransitioning(false);
      }, 500);
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToPrevService = () => {
    setCurrentServiceIndex((prev) => (prev - 1 + servicesData.length) % servicesData.length);
  };

  const goToNextService = () => {
    setCurrentServiceIndex((prev) => (prev + 1) % servicesData.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      
      {/* Hero Section with Animated Background Slideshow */}
      <section className="relative text-white py-32 px-6 md:px-12 lg:px-24 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Slideshow Container */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentBgIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-110'
              }`}
            >
              <img 
                src={image} 
                alt={`Background ${index + 1}`}
                className="w-full h-full object-cover"
                style={{
                  filter: 'brightness(0.7) contrast(1.1)',
                  transform: `scale(${index === currentBgIndex ? '1' : '1.1'})`,
                  transition: 'transform 3000ms ease-in-out, opacity 1000ms ease-in-out'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/65" />
              
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-yellow-600/10 animate-gradient-shift" />
            </div>
          ))}
          
          {/* Subtle animated overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-purple-900/30 transition-opacity duration-1000 ${isTransitioning ? 'opacity-50' : 'opacity-20'}`} />
          
          {/* Slow fade overlay for smoother transitions */}
          <div className={`absolute inset-0 bg-black transition-opacity duration-1000 ${isTransitioning ? 'opacity-30' : 'opacity-0'}`} />
        </div>

        {/* Background Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsHeroContentVisible(false);
                setIsTransitioning(true);
                
                setTimeout(() => {
                  setCurrentBgIndex(index);
                  setCurrentTextStage(0);
                  setDisplayedText({
                    title: '',
                    subtitle: '',
                    description: ''
                  });
                  
                  setTimeout(() => {
                    setIsHeroContentVisible(true);
                    setIsTransitioning(false);
                  }, 500);
                }, 500);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBgIndex 
                  ? 'bg-yellow-500 scale-125 shadow-lg shadow-yellow-500/50' 
                  : 'bg-white/60 hover:bg-white/90 hover:scale-110'
              }`}
              aria-label={`Go to background ${index + 1}`}
            />
          ))}
        </div>

        {/* Background Navigation Arrows */}
        <button 
          onClick={prevBackground}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-110 backdrop-blur-sm"
          aria-label="Previous background"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextBackground}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-110 backdrop-blur-sm"
          aria-label="Next background"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Hero Content - Dynamically Changing with Typewriter Effect */}
        <div 
          ref={heroRef}
          className={`max-w-5xl mx-auto text-center relative z-10 transition-all duration-1000 ${
            isHeroContentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Title with typewriter effect */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="relative bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
              {displayedText.title}
              <span className="inline-block w-[3px] h-[1.2em] ml-1 bg-yellow-400 animate-pulse typewriter-cursor"></span>
            </span>
          </h1>
          
          {/* Subtitle with fade-in effect */}
          <div className={`transition-opacity duration-1000 delay-300 ${
            currentTextStage >= 1 ? 'opacity-100' : 'opacity-0'
          }`}>
            <p className="text-xl md:text-2xl mb-8 font-semibold text-yellow-300 tracking-wide drop-shadow-lg">
              {displayedText.subtitle}
            </p>
          </div>
          
          {/* Description with slide-up effect */}
          <div className={`transition-all duration-1000 delay-500 ${
            currentTextStage >= 2 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-lg md:text-xl mb-12 opacity-95 max-w-4xl mx-auto leading-relaxed font-light">
              {displayedText.description}
            </p>
          </div>
          
          {/* CTA Button with bounce animation */}
          <div className={`transition-all duration-1000 delay-700 ${
            currentTextStage >= 3 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-95'
          }`}>
            <a href="/requestquotes" className="inline-block">
              <button className="group px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-600 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-500 text-gray-900 font-bold text-lg rounded-xl transition-all duration-300 shadow-2xl hover:shadow-yellow-500/30 transform hover:scale-105 hover:-translate-y-1 animate-float">
                <span className="flex items-center justify-center gap-3">
                  {currentHeroContent.ctaText}
                  <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 left-4 md:left-10 z-10 hidden lg:block">
          <div className="flex items-center gap-2 text-yellow-300/70">
            <div className="w-8 md:w-12 h-[2px] bg-yellow-300/50"></div>
            <span className="text-xs md:text-sm font-medium tracking-wider">TRUSTED ELECTRICAL PARTNER</span>
          </div>
        </div>
        
        <div className="absolute top-4 md:top-10 right-4 md:right-10 z-10 hidden lg:block">
          <div className="bg-white/10 backdrop-blur-sm px-3 md:px-4 py-1 md:py-2 rounded-full">
            <span className="text-xs md:text-sm font-medium tracking-wider">24/7 SERVICE</span>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3 rounded-full mb-8 border border-blue-200">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">WHY CHOOSE US</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-b from-white to-blue-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 border border-blue-100 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Certified Professionals</h3>
              <p className="text-gray-600">Our team consists of fully licensed and certified electricians with specialized mining expertise.</p>
            </div>
            
            <div className="bg-gradient-to-b from-white to-blue-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 border border-blue-100 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">24/7 Availability</h3>
              <p className="text-gray-600">Round-the-clock emergency services to keep your mining operations running smoothly.</p>
            </div>
            
            <div className="bg-gradient-to-b from-white to-blue-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 border border-blue-100 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Rapid Response</h3>
              <p className="text-gray-600">Quick deployment teams ready to address your electrical needs within hours.</p>
            </div>
          </div>
          
          <a href="/requestquotes">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-3xl transition-all duration-300 shadow-lg transform hover:scale-105 hover:-translate-y-1">
              Get A Free Quote
            </button>
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Specialized Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive electrical solutions tailored for mining operations and industrial facilities
            </p>
          </div>
          
          <div className="relative">
            {/* Navigation arrows */}
            <button 
              onClick={goToPrevService}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 -ml-4 hover:scale-110 border border-blue-200"
              aria-label="Previous service"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={goToNextService}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 -mr-4 hover:scale-110 border border-blue-200"
              aria-label="Next service"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Service Cards */}
            <div className="relative h-[600px] flex justify-center">
              {servicesData.map((service, index) => (
                <ServiceCard 
                  key={index} 
                  service={service} 
                  isActive={index === currentServiceIndex}
                />
              ))}
            </div>
            
            {/* Service indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {servicesData.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentServiceIndex(index)}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    index === currentServiceIndex 
                      ? 'text-blue-600 scale-110' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  aria-label={`Go to ${service.title} service`}
                >
                  <div className={`w-4 h-4 rounded-full mb-2 transition-all duration-300 ${
                    index === currentServiceIndex 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-800 scale-125' 
                      : 'bg-gray-300'
                  }`} />
                  <span className="text-sm font-medium">{service.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Trusted by mining companies and industrial facilities across Ghana</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "EAC's expertise in high-voltage systems kept our mining operations running smoothly during critical production periods.",
                author: "Mr. Kofi Mensah",
                position: "Operations Manager, Newmont Ghana",
                rating: 5
              },
              {
                quote: "Their team demonstrated exceptional professionalism and technical knowledge during our facility upgrade.",
                author: "Ama Serwaa",
                position: "Facility Manager, Gold Fields Ghana",
                rating: 5
              },
              {
                quote: "Professional, reliable, and technically excellent. EAC is our go-to electrical contractor.",
                author: "Yaw Boateng",
                position: "Chief Engineer, AngloGold Ashanti",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-b from-white to-blue-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 border border-blue-100 hover:-translate-y-2">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="border-t border-blue-100 pt-4">
                  <p className="font-bold text-gray-800">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 bg-gradient-to-b from-gray-100 to-white" id="contact">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Our Team</h2>
            <p className="text-xl text-gray-600">Get in touch for all your electrical service needs</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-blue-100">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-gradient-to-br from-blue-700 to-blue-900 text-white p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6">How Can We Help?</h3>
                <p className="mb-8 text-blue-100">
                  Contact our team of electrical experts for any inquiries or service requests.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-lg mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Phone</h4>
                      <p className="text-blue-100">+233 24 123 4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-lg mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Email</h4>
                      <p className="text-blue-100">info@eacelectrical.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-lg mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Address</h4>
                      <p className="text-blue-100">123 Industrial Area, Accra, Ghana</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 p-8 md:p-12">
                {submitSuccess ? (
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 text-green-800 p-6 rounded-lg text-center shadow-inner">
                    <svg className="w-12 h-12 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                    <p>We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required 
                        placeholder="Albert Boame"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email *</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required 
                          placeholder="your@email.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone *</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required 
                          placeholder="+233 XX XXX XXXX"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">How Can We Help? *</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required
                        placeholder="Describe your electrical needs..."
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                EAC Electrical
              </h3>
              <p className="text-gray-400">
                Premier electrical contractors specializing in mining and industrial solutions across Ghana.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {servicesData.map((service, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Home</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Contact</a></li>
                <li><a href="/requestquotes" className="text-gray-400 hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Request Quote</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors duration-300 transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors duration-300 transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors duration-300 transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EAC Electrical Solution Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes typewriter-blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .typewriter-cursor {
          animation: typewriter-blink 1s step-end infinite;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
}

export default Home;