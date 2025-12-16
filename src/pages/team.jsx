import React, { useState, useEffect } from 'react';
import Navbar from "../navbar";
import team from "../assets/team.jpg";
import { FaLinkedin, FaTwitter, FaEnvelope, FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Teams() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Hero banner slider images (replace with your actual image imports)
  const heroImages = [
    { 
      url: team, 
      title: "Our Expert Team",
      subtitle: "The skilled professionals behind EAC's electrical excellence",
      gradient: "linear-gradient(rgba(18,126,173,0.85), rgba(0, 0, 0, 0.7))"
    },
    { 
      url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Electrical Excellence",
      subtitle: "Powering Ghana's mining industry with expertise",
      gradient: "linear-gradient(rgba(18,126,173,0.85), rgba(0, 0, 0, 0.6))"
    },
    { 
      url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Innovation & Safety",
      subtitle: "Leading with cutting-edge technology and uncompromised safety",
      gradient: "linear-gradient(rgba(18,126,173,0.85), rgba(0, 0, 0, 0.65))"
    }
  ];

  const teamMembers = [
    { 
      name: "Mr Kofi Kugbe", 
      role: "CEO & Founder", 
      bio: "With over 20 years in the electrical industry, Kofi founded EAC Electrical to bring world-class electrical solutions to Ghana's mining sector.", 
      image: "",
      social: [
        { icon: <FaLinkedin />, url: "#" },
        { icon: <FaTwitter />, url: "#" },
        { icon: <FaWhatsapp />, url: "#" }
      ]
    },
    { 
      name: "Kenneth Osei", 
      role: "Operations Director", 
      bio: "Kenneth oversees all field operations, ensuring projects are completed on time, within budget, and to the highest safety standards.", 
      image: "",
      social: [
        { icon: <FaLinkedin />, url: "#" },
        { icon: <FaTwitter />, url: "#" }
      ]
    },
    { 
      name: "Ama Mensah", 
      role: "Chief Engineer", 
      bio: "Ama leads our engineering team, designing innovative electrical systems for complex mining environments.", 
      image: "",
      social: [
        { icon: <FaLinkedin />, url: "#" },
        { icon: <FaEnvelope />, url: "#" }
      ]
    },
    { 
      name: "Kwame Asare", 
      role: "Safety Officer", 
      bio: "Kwame ensures all EAC projects meet and exceed international safety standards, maintaining our perfect safety record.", 
      image: "",
      social: [
        { icon: <FaLinkedin />, url: "#" }
      ]
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Banner with Slider */}
      <section className="relative h-screen max-h-[800px] overflow-hidden">
        {/* Image Slider */}
        <div className="relative h-full w-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image with Gradient */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `${image.gradient}, url(${image.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              {/* Content */}
              <div className="relative h-full flex items-center justify-center">
                <div className="max-w-4xl mx-auto text-center px-6 md:px-12 lg:px-24">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white animate-fade-in-up">
                    {image.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 font-medium text-blue-200 animate-fade-in-up animation-delay-200">
                    {image.subtitle}
                  </p>
                  <button 
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105 animate-fade-in-up animation-delay-400"
                    onClick={() => document.getElementById('team-section').scrollIntoView({ behavior: 'smooth' })}
                  >
                    Meet Our Team
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 z-20"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 z-20"
          aria-label="Next slide"
        >
          <FaChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Leadership That Powers Success
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated team driving innovation and excellence in every project we undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="group relative">
                <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-300">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center text-gray-400 p-4">
                      <div className="text-7xl mb-4">👤</div>
                      <p className="text-center text-sm">No image available</p>
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-sm">{member.bio}</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mt-1">{member.role}</p>
                  <div className="mt-4 flex justify-center space-x-4">
                    {member.social.map((socialItem, i) => (
                      <a
                        key={i}
                        href={socialItem.url}
                        className="text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
                        aria-label={`${member.name}'s social media`}
                      >
                        {React.cloneElement(socialItem.icon, { className: "h-5 w-5" })}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team Culture</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              What makes our team exceptional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-600 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Collaboration</h3>
              <p className="text-gray-600">
                We work together across disciplines to deliver integrated electrical solutions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-600 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Expertise</h3>
              <p className="text-gray-600">
                Continuous learning ensures we stay at the forefront of electrical technology.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-600 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Commitment</h3>
              <p className="text-gray-600">
                Dedicated to excellence in every project, no matter the scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">Join Our Growing Team</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're looking for passionate electrical professionals to help power Ghana's future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg transform hover:scale-105">
              View Open Positions
            </button>
            <a 
              href="/cvsubmission"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-700 transition duration-300 inline-block text-center transform hover:scale-105"
            >
              Submit Your CV
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// Add these styles to your CSS file or use a CSS-in-JS solution
const styles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }
  
  .animation-delay-200 {
    animation-delay: 200ms;
  }
  
  .animation-delay-400 {
    animation-delay: 400ms;
  }
  
  /* Ensure full background coverage */
  .bg-cover-full {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export default Teams;