import Navbar from "../navbar";
import building from "../assets/building.jpg";
import teamMeeting from "../assets/residential-1.jpg";
import { FaCheck, FaBolt, FaShieldAlt, FaClock, FaChartLine } from 'react-icons/fa';

function About() {
  const milestones = [
    { year: "2010", title: "Company Founded", description: "Established as a small electrical contractor serving local businesses." },
    { year: "2013", title: "First Major Contract", description: "Secured our first large-scale industrial project with a mining company." },
    { year: "2015", title: "ISO Certification", description: "Achieved ISO 9001 certification for quality management systems." },
    { year: "2018", title: "Newmont Partnership", description: "Became a preferred electrical contractor for Newmont Ghana operations." },
    { year: "2022", title: "Regional Expansion", description: "Expanded services to cover all major mining regions in Ghana." }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Banner */}
      <section 
        className="relative text-white py-32 px-6 md:px-12 lg:px-24 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${building})`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            About EAC Electrical
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-medium text-blue-200">
            Powering Ghana's Mining Industry Since 2010
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="bg-blue-50 px-6 py-3 rounded-full inline-block mb-6">
                <h2 className="text-xl font-bold text-blue-700">OUR STORY</h2>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Delivering Excellence in Electrical Solutions
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2010, EAC Electrical Solution Limited has grown from a small local contractor to Ghana's premier provider of specialized electrical services for the mining industry. Our journey has been powered by a commitment to quality, safety, and innovation.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Today, we're proud to be the trusted electrical partner for Newmont Ghana and other major mining operations, delivering complex electrical infrastructure projects with precision and reliability.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-blue-600 text-2xl mb-2">
                    <FaBolt />
                  </div>
                  <h4 className="font-bold text-gray-800">15M+</h4>
                  <p className="text-gray-600 text-sm">Safe Work Hours</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-blue-600 text-2xl mb-2">
                    <FaShieldAlt />
                  </div>
                  <h4 className="font-bold text-gray-800">100%</h4>
                  <p className="text-gray-600 text-sm">Safety Record</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src={teamMeeting} 
                alt="EAC team meeting" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="bg-blue-50 px-6 py-3 rounded-full inline-block mb-6">
              <h2 className="text-xl font-bold text-blue-700">OUR MISSION</h2>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Powering Progress Through Electrical Excellence
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We exist to deliver safe, reliable, and innovative electrical solutions that power Ghana's mining industry and drive sustainable development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaCheck className="text-blue-600 text-xl" />
              </div>
              <h4 className="text-xl font-bold text-center mb-3">Quality</h4>
              <p className="text-gray-600 text-center">
                We maintain the highest standards in all our work, ensuring reliable electrical systems that stand the test of time.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaShieldAlt className="text-blue-600 text-xl" />
              </div>
              <h4 className="text-xl font-bold text-center mb-3">Safety</h4>
              <p className="text-gray-600 text-center">
                Safety is our top priority in every project, protecting both our team and our clients' operations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaChartLine className="text-blue-600 text-xl" />
              </div>
              <h4 className="text-xl font-bold text-center mb-3">Innovation</h4>
              <p className="text-gray-600 text-center">
                We continuously adopt new technologies to deliver more efficient and sustainable electrical solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="bg-blue-50 px-6 py-3 rounded-full inline-block mb-6">
              <h2 className="text-xl font-bold text-blue-700">OUR JOURNEY</h2>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Key Milestones in Our Growth
            </h3>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-100 transform -translate-x-1/2"></div>
            
            {/* Milestone items */}
            <div className="space-y-8 md:space-y-16">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                >
                  <div className="md:w-1/2 p-4 md:p-8">
                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                      <h4 className="text-xl font-bold text-blue-600 mb-2">{milestone.title}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center relative">
                    <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold relative z-10 shadow-lg">
                      {milestone.year}
                    </div>
                    <div className="md:hidden absolute top-1/2 left-0 right-0 h-1 bg-blue-100 transform -translate-y-1/2 z-0"></div>
                  </div>
                  <div className="md:w-1/2 p-4 md:p-8">
                    {/* Empty div for spacing on alternating sides */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Power Your Project?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're planning a new mining operation or need to upgrade existing electrical infrastructure, our team is ready to help.
          </p>
          <button className="px-8 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg transform hover:scale-105">
            Contact Our Team
          </button>
        </div>
      </section>
    </div>
  );
}

export default About;