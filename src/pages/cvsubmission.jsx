import React, { useState, useRef } from 'react';
import Navbar from "../navbar";
import { 
  FaUpload, FaFilePdf, FaTimes, FaCheck, FaUser, 
  FaEnvelope, FaPhone, FaBriefcase, FaFileAlt, 
  FaPaperPlane, FaShieldAlt, FaBuilding, 
  FaGraduationCap, FaCertificate, FaMapMarkerAlt 
} from 'react-icons/fa';

function CVSubmission() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: '',
    file: null
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit');
        return;
      }
      
      // Check file type
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        alert('Please upload a PDF, DOC, or DOCX file');
        return;
      }

      setFormData(prev => ({ ...prev, file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Manual validation
    if (!formData.fullName.trim()) {
      alert('Please enter your full name');
      return;
    }
    
    if (!formData.email.trim()) {
      alert('Please enter your email address');
      return;
    }
    
    if (!formData.phone.trim()) {
      alert('Please enter your phone number');
      return;
    }
    
    if (!formData.position) {
      alert('Please select a position');
      return;
    }
    
    if (!formData.coverLetter.trim() || formData.coverLetter.length < 150) {
      alert('Please write a cover letter with at least 150 characters');
      return;
    }
    
    if (!formData.file) {
      alert('Please upload your resume/CV');
      return;
    }

    console.log('Form submitted:', formData);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        coverLetter: '',
        file: null
      });
      setFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1500);
  };

  const availablePositions = [
    'Senior Electrical Engineer',
    'Project Manager',
    'Safety Officer',
    'Electrical Technician',
    'CAD Designer',
    'Quality Control Inspector',
    'Maintenance Supervisor',
    'Other (Specify in Cover Letter)'
  ];

  const removeFile = () => {
    setFormData(prev => ({ ...prev, file: null }));
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Professional Header */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <FaBuilding className="text-xl text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">EAC Electrical Careers</h1>
                  <p className="text-blue-200">Ghana's Leading Electrical Solutions Provider</p>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Join Our Professional Team
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl">
                Submit your CV to become part of Ghana's premier electrical engineering team. 
                We're looking for talented professionals to power innovative projects.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <FaUser className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Quick Application</h3>
                    <p className="text-sm text-blue-200">Complete in 5 minutes</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">Professional review process</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">Confidential handling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">Direct HR contact</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Application Form */}
      <div className="max-w-4xl mx-auto px-4 py-12 -mt-8">
        {/* Application Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
          {/* Progress Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <FaUpload className="text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Professional Application</h2>
                  <p className="text-blue-100">Submit your credentials for review</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">Application Form</span>
                <div className="w-32 h-1.5 bg-white/30 rounded-full mt-2">
                  <div className="w-1/2 h-full bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {isSubmitted ? (
              /* Success State */
              <div className="text-center py-12">
                <div className="inline-block relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-white rounded-full flex items-center justify-center mx-auto shadow-lg border border-blue-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <FaCheck className="text-white text-2xl" />
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-400 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Application Received
                </h3>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                  Thank you for your interest in EAC Electrical. Your application has been submitted successfully and is now under review by our HR team.
                </p>
                <div className="space-y-6">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Another Application
                  </button>
                  <div className="bg-gray-50 p-6 rounded-xl max-w-md mx-auto">
                    <p className="text-gray-700 font-semibold mb-4">Next Steps:</p>
                    <div className="space-y-3">
                      {['Initial review (3-5 days)', 'Phone screening if selected', 'Technical interview', 'Final decision'].map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 text-xs font-bold">{idx + 1}</span>
                          </div>
                          <span className="text-gray-600">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Application Form */
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <div className="pb-4 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FaUser className="text-blue-600" />
                        </div>
                        Personal Information
                      </h3>
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                          placeholder="john.doe@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                          placeholder="+233 XX XXX XXXX"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Application Details */}
                  <div className="space-y-6">
                    <div className="pb-4 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FaBriefcase className="text-blue-600" />
                        </div>
                        Application Details
                      </h3>
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Position Applying For *
                        </label>
                        <select
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white"
                        >
                          <option value="">Select a position</option>
                          {availablePositions.map((pos, index) => (
                            <option key={index} value={pos}>{pos}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Cover Letter *
                        </label>
                        <textarea
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleChange}
                          required
                          minLength="150"
                          rows="4"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                          placeholder="Briefly describe your qualifications and interest in this position..."
                        ></textarea>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm text-gray-500">Minimum 150 characters</span>
                          <span className={`text-sm font-medium ${formData.coverLetter.length >= 150 ? 'text-blue-600' : 'text-gray-500'}`}>
                            {formData.coverLetter.length}/150
                          </span>
                        </div>
                      </div>

                      {/* File Upload */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Resume / CV *
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                          <input
                            type="file"
                            id="cv-upload"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />
                          <label htmlFor="cv-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                                <FaFilePdf className="text-3xl text-blue-500" />
                              </div>
                              <p className="text-gray-700 font-medium mb-2">
                                {fileName || 'Upload your resume'}
                              </p>
                              <p className="text-gray-500 text-sm mb-4">
                                PDF, DOC, DOCX (Max 5MB)
                              </p>
                              {fileName ? (
                                <div className="flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                                  <FaCheck className="text-blue-500" />
                                  <span className="font-medium truncate max-w-xs">{fileName}</span>
                                  <button
                                    type="button"
                                    onClick={removeFile}
                                    className="text-gray-400 hover:text-gray-600"
                                  >
                                    <FaTimes />
                                  </button>
                                </div>
                              ) : (
                                <span className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                                  Select File
                                  <FaUpload />
                                </span>
                              )}
                            </div>
                          </label>
                        </div>
                        {!formData.file && (
                          <p className="text-red-500 text-sm mt-2">Please upload your resume/CV</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy Agreement */}
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaShieldAlt className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Privacy Agreement</h4>
                      <p className="text-gray-600 text-sm">
                        Your information will be used solely for recruitment purposes. 
                        By submitting this application, you agree to our privacy policy 
                        and consent to the processing of your personal data.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                  <p className="text-gray-500 text-sm text-center mt-3">
                    You'll receive a confirmation email upon submission
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Company Benefits */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FaGraduationCap className="text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-800 mb-3">Professional Development</h4>
            <ul className="space-y-2">
              {['Technical Training', 'Certification Support', 'Leadership Programs', 'Workshops'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FaCertificate className="text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-800 mb-3">Compensation & Benefits</h4>
            <ul className="space-y-2">
              {['Competitive Salary', 'Health Insurance', 'Performance Bonuses', 'Retirement Plan'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FaMapMarkerAlt className="text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-800 mb-3">Work Environment</h4>
            <ul className="space-y-2">
              {['Modern Facilities', 'Safety First Culture', 'Team Collaboration', 'Work-Life Balance'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-white rounded-xl p-8 border border-blue-100">
          <div className="text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-2">Questions?</h4>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Our HR team is available to assist you with the application process.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="mailto:careers@eacelectrical.com"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <FaEnvelope />
                careers@eacelectrical.com
              </a>
              <div className="text-gray-600">
                <span className="text-sm">Mon-Fri, 8AM-5PM GMT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CVSubmission;