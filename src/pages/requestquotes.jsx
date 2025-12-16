import React, { useState, useEffect, useRef } from 'react';

const RequestQuote = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    description: '',
    budget: '',
    timeline: ''
  });

  const [quotationForm, setQuotationForm] = useState({
    serviceType: '',
    quantity: 1,
    unitPrice: '',
    totalAmount: '',
    discount: 0,
    taxRate: 15, // VAT in Ghana
    netAmount: '',
    paymentTerms: '30 days',
    validityPeriod: '30 days'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Dashboard states
  const [metrics, setMetrics] = useState({
    projectsCompleted: 0,
    responseTime: '24h',
    satisfactionRate: 0,
    activeProjects: 0
  });
  
  const [powerConsumption, setPowerConsumption] = useState([]);
  const [quoteTrend, setQuoteTrend] = useState([]);
  const [activeTab, setActiveTab] = useState('form');
  
  // Live Chat states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I\'m EAC Assist, your Electrical Safety & Project Consultant. For urgent issues, please call our emergency line: +233 123 456 789. How can I assist with your electrical project today?', time: '10:00 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const chatContainerRef = useRef(null);

  // Emergency keywords and safety intents
  const emergencyKeywords = [
    "shock", "sparks", "fire", "burning", "smoke", "flames",
    "electrocuted", "short circuit", "explosion", "arc flash",
    "overheating", "melting", "burning smell", "electrical fire"
  ];

  const unsafeAdviceTriggers = [
    "fix it myself", "DIY", "open panel", "touch wires",
    "bypass safety", "ignore tripping", "no permit",
    "live work", "no isolation"
  ];

  const intents = [
    {
      keywords: ["hello", "hi", "hey", "greetings"],
      responses: [
        "Hello 👋 I'm EAC Assist. What type of electrical project are you working on?",
        "Welcome to EAC Electrical Solutions ⚡ Are you planning a new installation or needing maintenance?"
      ],
      clarifying: "Could you specify if this is for residential, commercial, or industrial needs?"
    },
    {
      keywords: ["solar", "inverter", "renewable", "photovoltaic", "battery"],
      responses: [
        "Great choice! Renewable energy solutions can reduce costs by 30-60%. Is this for residential or commercial use?",
        "Solar systems require proper load analysis. What's your average daily consumption in kWh?"
      ],
      clarifying: "What's your roof area or available space for panels?"
    },
    {
      keywords: ["price", "cost", "quotation", "quote", "budget"],
      responses: [
        "To provide an accurate quotation, I need to know: 1) Project scope 2) Location 3) Timeline. Can you share these details?",
        "Costs vary based on materials, labor, and compliance requirements. Is this a new installation or upgrade?"
      ],
      clarifying: "What's your approximate budget range? (e.g., ₵50k-₵250k)"
    },
    {
      keywords: ["fault", "problem", "no power", "outage", "tripping", "flickering"],
      responses: [
        "I can help diagnose electrical issues. Is this affecting one circuit or the entire property?",
        "For safety, let me ask: Are there any unusual sounds, smells, or visible damage?"
      ],
      clarifying: "Has this been inspected by a certified electrician before?"
    },
    {
      keywords: ["timeline", "duration", "how long", "schedule"],
      responses: [
        "Project duration depends on scope and permits. Is this urgent or planned maintenance?",
        "Typical timelines: Minor repairs (1-3 days), Installations (2-4 weeks), Major projects (4-8 weeks)"
      ],
      clarifying: "Do you need temporary power during the work?"
    },
    {
      keywords: ["safety", "certification", "compliance", "standard", "code"],
      responses: [
        "All EAC work follows Ghana Energy Commission standards and IEC regulations.",
        "Safety first! We provide certified installations with proper earthing and protection devices."
      ],
      clarifying: "Are you aware of the specific safety requirements for your project type?"
    },
    {
      keywords: ["maintenance", "inspection", "checkup", "service"],
      responses: [
        "Regular maintenance prevents 80% of electrical failures. When was your last inspection?",
        "Our maintenance packages include thermal imaging, load testing, and safety certification."
      ],
      clarifying: "Is this for preventative maintenance or responding to specific issues?"
    },
    {
      keywords: ["wiring", "cabling", "rewire", "circuit"],
      responses: [
        "Proper wiring is critical for safety. What's the age of your current electrical system?",
        "We use Ghana Standards Authority approved cables with proper sizing for load requirements."
      ],
      clarifying: "What's the main purpose of this wiring project? (e.g., capacity upgrade, safety improvement)"
    }
  ];

  // Service types for quotation
  const serviceTypes = [
    { id: 1, name: 'Electrical Installation', unit: 'per point', basePrice: 250 },
    { id: 2, name: 'Panel Board Installation', unit: 'per unit', basePrice: 5000 },
    { id: 3, name: 'Cable Laying', unit: 'per meter', basePrice: 150 },
    { id: 4, name: 'Transformer Installation', unit: 'per unit', basePrice: 25000 },
    { id: 5, name: 'Solar System Installation', unit: 'per kW', basePrice: 8000 },
    { id: 6, name: 'Maintenance Service', unit: 'per hour', basePrice: 300 },
    { id: 7, name: 'Troubleshooting', unit: 'per hour', basePrice: 400 },
    { id: 8, name: 'Site Assessment', unit: 'per visit', basePrice: 1500 },
    { id: 9, name: 'Emergency Response', unit: 'per hour', basePrice: 800 },
    { id: 10, name: 'Safety Audit', unit: 'per audit', basePrice: 3500 }
  ];

  useEffect(() => {
    // Simulate live metrics updates
    const metricsInterval = setInterval(() => {
      setMetrics(prev => ({
        projectsCompleted: 1287 + Math.floor(Math.random() * 10),
        responseTime: `${Math.floor(Math.random() * 4) + 20}h`,
        satisfactionRate: 96 + Math.random() * 3,
        activeProjects: 42 + Math.floor(Math.random() * 5)
      }));
    }, 5000);

    // Simulate power consumption data
    const powerData = Array.from({ length: 12 }, (_, i) => ({
      hour: `${i + 6}:00`,
      consumption: Math.floor(Math.random() * 100) + 50,
      load: Math.floor(Math.random() * 100)
    }));
    setPowerConsumption(powerData);

    // Simulate quote trend data
    const trendData = [
      { month: 'Jan', quotes: 45 },
      { month: 'Feb', quotes: 52 },
      { month: 'Mar', quotes: 48 },
      { month: 'Apr', quotes: 65 },
      { month: 'May', quotes: 72 },
      { month: 'Jun', quotes: 68 }
    ];
    setQuoteTrend(trendData);

    return () => clearInterval(metricsInterval);
  }, []);

  // Calculate quotation amounts
  useEffect(() => {
    const calculateTotal = () => {
      const quantity = quotationForm.quantity || 1;
      const unitPrice = quotationForm.unitPrice || 0;
      const discount = quotationForm.discount || 0;
      const taxRate = quotationForm.taxRate || 15;

      const subtotal = quantity * unitPrice;
      const discountAmount = subtotal * (discount / 100);
      const taxableAmount = subtotal - discountAmount;
      const taxAmount = taxableAmount * (taxRate / 100);
      const netAmount = taxableAmount + taxAmount;

      setQuotationForm(prev => ({
        ...prev,
        totalAmount: subtotal.toFixed(2),
        netAmount: netAmount.toFixed(2)
      }));
    };

    calculateTotal();
  }, [quotationForm.quantity, quotationForm.unitPrice, quotationForm.discount, quotationForm.taxRate]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleQuotationChange = (e) => {
    const { name, value } = e.target;
    setQuotationForm(prevState => ({
      ...prevState,
      [name]: value
    }));

    // If service type changes, update unit price
    if (name === 'serviceType') {
      const selectedService = serviceTypes.find(s => s.id === parseInt(value));
      if (selectedService) {
        setQuotationForm(prev => ({
          ...prev,
          unitPrice: selectedService.basePrice
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      console.log('Form submitted:', { ...formData, quotation: quotationForm });
      
      // Update metrics on submission
      setMetrics(prev => ({
        ...prev,
        activeProjects: prev.activeProjects + 1
      }));

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          description: '',
          budget: '',
          timeline: ''
        });
        setQuotationForm({
          serviceType: '',
          quantity: 1,
          unitPrice: '',
          totalAmount: '',
          discount: 0,
          taxRate: 15,
          netAmount: '',
          paymentTerms: '30 days',
          validityPeriod: '30 days'
        });
        setSubmitted(false);
        setActiveTab('form');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced Chat Response System
  const generateResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    
    // EMERGENCY DETECTION - Priority 1
    const emergencyFound = emergencyKeywords.some(keyword => 
      lowerText.includes(keyword)
    );
    
    if (emergencyFound) {
      return {
        text: "🚨 **EMERGENCY DETECTED** 🚨\n\n" +
              "1. **IMMEDIATELY CALL** our emergency line: +233 123 456 789\n" +
              "2. **DISCONNECT POWER** at main switch if safe to do so\n" +
              "3. **EVACUATE AREA** if fire or smoke present\n" +
              "4. **DO NOT TOUCH** any electrical equipment\n\n" +
              "Our emergency team has been alerted. Please provide your location.",
        type: 'emergency',
        escalate: true
      };
    }
    
    // TECHNICIAN REQUEST - Priority 2
    if (lowerText.includes("technician") || lowerText.includes("engineer") || lowerText.includes("expert")) {
      return {
        text: "🔧 **Connecting to Certified Technician**\n\n" +
              "I'm routing you to one of our master electricians. For faster service:\n" +
              "• Phone: +233 234 567 890\n" +
              "• Location: (Please share your area)\n" +
              "• Issue type: (Brief description)\n\n" +
              "Our average response time: Urban (2h), Rural (4h)",
        type: 'escalation',
        escalate: true
      };
    }
    
    // UNSAFE ADVICE DETECTION - Priority 3
    const unsafeFound = unsafeAdviceTriggers.some(keyword =>
      lowerText.includes(keyword)
    );
    
    if (unsafeFound) {
      return {
        text: "⚠️ **SAFETY ALERT** ⚠️\n\n" +
              "Electrical work requires certified professionals. DIY attempts can cause:\n" +
              "• Fire hazards\n" +
              "• Electrocution risk\n" +
              "• Insurance voidance\n" +
              "• Code violations\n\n" +
              "Our certified electricians provide safe, compliant solutions. Would you like a consultation?",
        type: 'safety',
        escalate: false
      };
    }
    
    // INTENT MATCHING - Priority 4
    for (const intent of intents) {
      if (intent.keywords.some(keyword => lowerText.includes(keyword))) {
        const randomResponse = intent.responses[Math.floor(Math.random() * intent.responses.length)];
        const clarifying = intent.clarifying || "Could you provide more details about your specific requirements?";
        
        return {
          text: `${randomResponse}\n\n${clarifying}`,
          type: 'normal',
          escalate: false
        };
      }
    }
    
    // DEFAULT RESPONSES
    const defaultResponses = [
      "Thank you for your inquiry. For accurate assistance, could you specify:\n• Project type (e.g., installation, repair)\n• Location\n• Timeline urgency",
      "I'd like to help you effectively. Could you provide more details about your electrical needs?",
      "To ensure safety and compliance, I recommend a site assessment. Are you available for a consultation?",
      "Based on Ghana electrical standards, I suggest professional evaluation. Would you like me to connect you with our technical team?"
    ];
    
    return {
      text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      type: 'default',
      escalate: false
    };
  };

  // Enhanced Chat Function
  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Generate AI response
    setTimeout(() => {
      const response = generateResponse(newMessage);
      
      const botResponse = {
        id: chatMessages.length + 2,
        sender: 'bot',
        text: response.text,
        type: response.type,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, botResponse]);
      
      // Show emergency alert if detected
      if (response.type === 'emergency') {
        setShowEmergencyAlert(true);
        setTimeout(() => setShowEmergencyAlert(false), 10000);
      }
      
      setIsTyping(false);
    }, 1500);
  };

  const quickChatOptions = [
    "Emergency electrical help?",
    "Solar installation cost?",
    "Safety inspection needed?",
    "Connect to technician?",
    "Maintenance package?",
    "Wiring upgrade quote?",
    "Compliance requirements?"
  ];

  const projectTypes = [
    'Mining Electrical Systems',
    'Industrial Automation',
    'Power Distribution',
    'Renewable Energy Solutions',
    'Maintenance & Repair',
    'Safety Audit',
    'Emergency Response',
    'Other'
  ];

  const budgetRanges = [
    'Less than ₵50,000',
    '₵50,000 - ₵250,000',
    '₵250,000 - ₵500,000',
    '₵500,000 - ₵2,500,000',
    '₵2,500,000+'
  ];

  // Emergency Alert Component
  const EmergencyAlert = () => (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-96 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl shadow-2xl z-50 p-4 transition-all duration-500 ${showEmergencyAlert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold">🚨</span>
          </div>
          <div>
            <h4 className="font-bold">Electrical Emergency Detected</h4>
            <p className="text-sm opacity-90">Emergency team alerted • Call +233 123 456 789</p>
          </div>
        </div>
        <button 
          onClick={() => setShowEmergencyAlert(false)}
          className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
        >
          ×
        </button>
      </div>
    </div>
  );

  // Quotation Summary Component
  const QuotationSummary = () => (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-6 mb-6">
      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3">
          <span className="text-white font-bold">₵</span>
        </div>
        Quotation Summary
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Service:</span>
            <span className="font-semibold">
              {serviceTypes.find(s => s.id === parseInt(quotationForm.serviceType))?.name || 'Not selected'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Quantity:</span>
            <span className="font-semibold">{quotationForm.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Unit Price:</span>
            <span className="font-semibold">₵{parseFloat(quotationForm.unitPrice || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold">₵{parseFloat(quotationForm.totalAmount || 0).toLocaleString()}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Discount ({quotationForm.discount}%):</span>
            <span className="font-semibold text-red-600">
              -₵{((parseFloat(quotationForm.totalAmount || 0) * (quotationForm.discount || 0)) / 100).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">VAT ({quotationForm.taxRate}%):</span>
            <span className="font-semibold">
              ₵{((parseFloat(quotationForm.totalAmount || 0) * (quotationForm.taxRate || 15)) / 100).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-gray-700 font-bold">Net Amount:</span>
            <span className="text-2xl font-bold text-blue-600">
              ₵{parseFloat(quotationForm.netAmount || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Payment Terms: {quotationForm.paymentTerms}</p>
        <p>Quotation Valid for: {quotationForm.validityPeriod}</p>
      </div>
    </div>
  );

  // Enhanced Live Chat Component
  const LiveChat = () => (
    <div className={`fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 transform transition-all duration-300 ${isChatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-t-2xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-bold">EA</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-bold">EAC Assist</h3>
              <p className="text-sm opacity-90">Certified Electrical AI • Safety First</p>
            </div>
          </div>
          <button 
            onClick={() => setIsChatOpen(false)}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
          >
            ×
          </button>
        </div>
        
        {/* Safety Status */}
        <div className="mt-2 flex items-center space-x-2 text-xs">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            <span>Safety Compliant</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
            <span>GEC Standards</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="h-96 overflow-y-auto p-4 bg-gray-50"
      >
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}
          >
            <div className={`inline-block max-w-[80%] rounded-2xl p-3 ${
              message.sender === 'user' 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-none' 
                : message.type === 'emergency'
                ? 'bg-gradient-to-r from-red-100 to-orange-50 border-2 border-red-200 rounded-bl-none'
                : message.type === 'safety'
                ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-bl-none'
                : 'bg-white border border-gray-200 rounded-bl-none'
            }`}
            >
              <p className={`${message.type === 'emergency' ? 'text-red-800 font-semibold' : 
                           message.type === 'safety' ? 'text-yellow-800' : ''}`}>
                {message.text}
              </p>
              <div className={`flex justify-between items-center mt-2 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                <span className="text-xs">{message.time}</span>
                {message.type === 'emergency' && (
                  <span className="text-xs font-bold text-red-600">🚨 EMERGENCY</span>
                )}
                {message.type === 'safety' && (
                  <span className="text-xs font-bold text-yellow-600">⚠️ SAFETY</span>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="mb-4">
            <div className="inline-block bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-2xl rounded-bl-none p-3">
              <div className="flex space-x-2 items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-sm text-blue-600">EAC Assist is analyzing your request for safety compliance...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Options */}
      <div className="px-4 py-2 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 mb-2">
          {quickChatOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                setNewMessage(option);
                setTimeout(() => {
                  const quickBtn = document.getElementById('send-chat-btn');
                  if (quickBtn) quickBtn.click();
                }, 100);
              }}
              className="px-3 py-1 text-xs bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 rounded-full transition border border-gray-200"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Safety Disclaimer */}
      <div className="px-4 py-2 bg-gradient-to-r from-yellow-50 to-amber-50 border-t border-yellow-200">
        <p className="text-xs text-yellow-700 flex items-center">
          <span className="mr-1">⚠️</span>
          Safety First: This AI provides guidance only. All electrical work must be performed by certified professionals.
        </p>
      </div>

      {/* Chat Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Describe your electrical needs safely..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            id="send-chat-btn"
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition font-semibold"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );

  // Chat Toggle Button
  const ChatToggleButton = () => (
    <button
      onClick={() => setIsChatOpen(!isChatOpen)}
      className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl hover:scale-110 transition-all duration-300 z-40"
    >
      <div className="relative">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {!isChatOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
        )}
      </div>
    </button>
  );

  // Dashboard Components
  const MetricsDashboard = () => (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <div className="w-6 h-6 text-blue-400 font-bold">E</div>
          </div>
          <h3 className="text-2xl font-bold text-white">Live Performance Dashboard</h3>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm">LIVE</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Projects Completed</p>
              <p className="text-2xl font-bold text-white">{metrics.projectsCompleted.toLocaleString()}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center">
              <span className="text-white font-bold">✓</span>
            </div>
          </div>
          <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
              style={{ width: '85%' }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Response Time</p>
              <p className="text-2xl font-bold text-white">{metrics.responseTime}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
          </div>
          <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              style={{ width: '92%' }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Satisfaction Rate</p>
              <p className="text-2xl font-bold text-white">{metrics.satisfactionRate.toFixed(1)}%</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-400 flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
          </div>
          <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full"
              style={{ width: `${metrics.satisfactionRate}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Projects</p>
              <p className="text-2xl font-bold text-white">{metrics.activeProjects}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
          </div>
          <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full animate-pulse"
              style={{ width: `${(metrics.activeProjects / 50) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Power Consumption Chart */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-white mb-4">Power Consumption Analysis</h4>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {powerConsumption.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xs text-gray-400 mb-2">{data.hour}</div>
              <div className="relative">
                <div 
                  className="w-8 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg"
                  style={{ height: `${data.consumption}px` }}
                ></div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                  {data.load}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Trend Chart */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Monthly Quote Trends</h4>
        <div className="flex items-end space-x-2 h-32">
          {quoteTrend.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg transition-all duration-500 hover:opacity-80"
                style={{ height: `${data.quotes * 1.5}px` }}
              ></div>
              <div className="text-xs text-gray-400 mt-2">{data.month}</div>
              <div className="text-xs text-white font-semibold">{data.quotes}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProjectFlowVisualization = () => {
    const steps = [
      { 
        title: 'Safety Assessment', 
        desc: 'Mandatory first step', 
        color: 'from-red-500 to-orange-500',
        bgColor: 'bg-gradient-to-br from-red-50 to-orange-50',
        borderColor: 'border-red-300',
        textColor: 'text-red-700',
        stepNumber: '01',
        icon: '⚠️'
      },
      { 
        title: 'Quote Request', 
        desc: 'You are here', 
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
        borderColor: 'border-blue-300',
        textColor: 'text-blue-700',
        stepNumber: '02',
        icon: '⚡'
      },
      { 
        title: 'Design Phase', 
        desc: '72h average', 
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
        borderColor: 'border-green-300',
        textColor: 'text-green-700',
        stepNumber: '03',
        icon: '📐'
      },
      { 
        title: 'Implementation', 
        desc: '2-4 weeks', 
        color: 'from-yellow-500 to-orange-500',
        bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
        borderColor: 'border-yellow-300',
        textColor: 'text-yellow-700',
        stepNumber: '04',
        icon: '🔧'
      },
      { 
        title: 'Quality & Safety Check', 
        desc: '48h average', 
        color: 'from-purple-500 to-pink-500',
        bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
        borderColor: 'border-purple-300',
        textColor: 'text-purple-700',
        stepNumber: '05',
        icon: '✅'
      },
      { 
        title: 'Project Live', 
        desc: 'Certification issued', 
        color: 'from-indigo-500 to-purple-500',
        bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
        borderColor: 'border-indigo-300',
        textColor: 'text-indigo-700',
        stepNumber: '06',
        icon: '🎯'
      }
    ];

    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Project Implementation Flow</h3>
        
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-blue-500 via-green-500 via-yellow-500 via-purple-500 to-indigo-500 -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`
                  relative z-10 p-4 rounded-xl border-2 ${step.borderColor} ${step.bgColor}
                  text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                  ${index === 1 ? 'scale-105 shadow-lg ring-2 ring-blue-300' : ''}
                `}>
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-xs">{step.stepNumber}</span>
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.color} mx-auto mb-2 flex items-center justify-center shadow-md`}>
                    <span className="text-white text-sm">{step.icon}</span>
                  </div>
                  
                  <h4 className={`font-bold text-sm ${step.textColor} mb-1`}>{step.title}</h4>
                  <p className="text-xs text-gray-600">{step.desc}</p>
                  
                  {index === 1 && (
                    <div className="absolute -top-2 -left-2">
                      <div className="relative">
                        <div className="w-5 h-5 bg-blue-500 rounded-full animate-ping"></div>
                        <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-2 flex justify-center">
                    <div className={`
                      w-2 h-2 rounded-full ${index === 1 ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}
                      ${index === 0 ? 'bg-red-500' : ''}
                      ${index === 2 ? 'bg-green-500' : ''}
                      ${index === 3 ? 'bg-yellow-500' : ''}
                      ${index === 4 ? 'bg-purple-500' : ''}
                      ${index === 5 ? 'bg-indigo-500' : ''}
                    `}></div>
                  </div>
                </div>
                
                {index < 5 && (
                  <div className="absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent transform translate-x-1/2 hidden md:block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-600">Safety</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-xs text-gray-600">Current</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600">Design</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-gray-600">Install</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span className="text-xs text-gray-600">Inspection</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <span className="text-xs text-gray-600">Complete</span>
          </div>
        </div>
      </div>
    );
  };

  // Updated Sidebar with Chat Integration
  const SidebarDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-2xl p-6 text-white">
        <h3 className="text-2xl font-bold mb-4">Safety & Compliance</h3>
        <ul className="space-y-3">
          {[
            { text: 'Ghana Energy Commission Certified', color: 'from-green-400 to-emerald-400' },
            { text: 'ISO 45001 Safety Management', color: 'from-purple-400 to-pink-400' },
            { text: '24/7 Emergency Response Team', color: 'from-red-400 to-rose-400' },
            { text: 'Real-time Load Monitoring', color: 'from-blue-400 to-cyan-400' },
            { text: 'Thermal Imaging Inspections', color: 'from-yellow-400 to-orange-400' }
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <div className={`mr-3 mt-1 w-6 h-6 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                <span className="text-white font-bold text-xs">✓</span>
              </div>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Quick Stats</h3>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold">S</span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Today's Quotes</span>
              <span className="text-sm font-bold text-blue-600">8</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Team Availability</span>
              <span className="text-sm font-bold text-green-600">95%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Emergency Contacts</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-gradient-to-r from-red-800/50 to-orange-800/50 rounded-lg">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
            <div>
              <p className="text-white font-medium">Emergency Line</p>
              <p className="text-gray-300 text-sm">+233 123 456 789</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-800/50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <div>
              <p className="text-white font-medium">Technical Support</p>
              <p className="text-gray-400 text-sm">+233 234 567 890</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-800/50 rounded-lg">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
            <div>
              <p className="text-white font-medium">Safety Hotline</p>
              <p className="text-gray-400 text-sm">+233 345 678 901</p>
            </div>
          </div>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:-translate-y-1"
          >
            Live Chat with EAC Assist
          </button>
        </div>
      </div>
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center text-5xl font-bold mx-auto mb-6">
              ✓
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-ping">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Power Connected!
          </h2>
          <p className="text-gray-600 mb-2">Your quote request has been successfully submitted.</p>
          <p className="text-gray-600 mb-6">EAC Assist will review your quotation within {metrics.responseTime}.</p>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-2">
                  <span className="text-white font-bold">EA</span>
                </div>
                <span className="text-sm text-gray-700">EAC Assist Assigned</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-2">
                  <span className="text-white font-bold">₵</span>
                </div>
                <span className="text-sm text-gray-700">Quotation Prepared</span>
              </div>
            </div>
          </div>
          
          <button 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg shadow-md"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <EmergencyAlert />
      
      <div className="max-w-7xl mx-auto">
        {/* Header with Tabs */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Request <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Power Quote</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Energize your projects with certified, safe electrical solutions
              </p>
            </div>
            
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'form' ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 inline-flex items-center justify-center mr-2">
                  <span className="text-white text-xs font-bold">F</span>
                </div>
                Request Form
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 inline-flex items-center justify-center mr-2">
                  <span className="text-white text-xs font-bold">D</span>
                </div>
                Live Dashboard
              </button>
            </div>
          </div>

          {activeTab === 'dashboard' ? (
            <div className="space-y-6">
              <MetricsDashboard />
              <ProjectFlowVisualization />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mr-3">
                      <span className="text-white font-bold">!</span>
                    </div>
                    Safety Alerts
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                      <span>Load Safety Margin</span>
                      <span className="font-bold text-green-600">32% Safe</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg">
                      <span>Emergency Calls Today</span>
                      <span className="font-bold text-red-600">3 Active</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3">
                      <span className="text-white font-bold">T</span>
                    </div>
                    Team Status
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <span>Certified Electricians</span>
                      <span className="font-bold text-green-600">12 Available</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <span>Safety Inspectors</span>
                      <span className="font-bold text-green-600">4 Available</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                      <span>Emergency Response</span>
                      <span className="font-bold text-yellow-600">On Duty</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-8">
                <ProjectFlowVisualization />
                
                {/* Quotation Form Section */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">Detailed Quotation Form</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-600">Safety Compliant</span>
                      </div>
                    </div>
                    
                    <QuotationSummary />
                    
                    <form onSubmit={handleSubmit}>
                      {/* Service Details */}
                      <div className="mb-8">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                            <span className="text-white font-bold">₵</span>
                          </div>
                          Service Details
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Service Type *
                            </label>
                            <select
                              name="serviceType"
                              value={quotationForm.serviceType}
                              onChange={handleQuotationChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                            >
                              <option value="">Select Service Type</option>
                              {serviceTypes.map((service) => (
                                <option key={service.id} value={service.id}>
                                  {service.name} (₵{service.basePrice} {service.unit})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Quantity
                            </label>
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => setQuotationForm(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                                className="px-3 py-2 bg-gray-200 rounded-l-lg hover:bg-gray-300"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                name="quantity"
                                value={quotationForm.quantity}
                                onChange={handleQuotationChange}
                                min="1"
                                className="w-full px-4 py-2 border-t border-b border-gray-300 text-center"
                              />
                              <button
                                type="button"
                                onClick={() => setQuotationForm(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                                className="px-3 py-2 bg-gray-200 rounded-r-lg hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Unit Price (₵)
                            </label>
                            <input
                              type="number"
                              name="unitPrice"
                              value={quotationForm.unitPrice}
                              onChange={handleQuotationChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Discount (%)
                            </label>
                            <input
                              type="number"
                              name="discount"
                              value={quotationForm.discount}
                              onChange={handleQuotationChange}
                              min="0"
                              max="100"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              VAT Rate (%)
                            </label>
                            <input
                              type="number"
                              name="taxRate"
                              value={quotationForm.taxRate}
                              onChange={handleQuotationChange}
                              min="0"
                              max="100"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Payment Terms */}
                      <div className="mb-8">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-3">
                            <span className="text-white font-bold">P</span>
                          </div>
                          Payment Terms
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Payment Terms
                            </label>
                            <select
                              name="paymentTerms"
                              value={quotationForm.paymentTerms}
                              onChange={handleQuotationChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="30 days">30 days</option>
                              <option value="50% advance, 50% on completion">50% advance, 50% on completion</option>
                              <option value="100% advance">100% advance</option>
                              <option value="Custom">Custom</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Quotation Validity
                            </label>
                            <select
                              name="validityPeriod"
                              value={quotationForm.validityPeriod}
                              onChange={handleQuotationChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="30 days">30 days</option>
                              <option value="15 days">15 days</option>
                              <option value="7 days">7 days</option>
                              <option value="Custom">Custom</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Original Project Information */}
                      <div className="mb-8">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3">
                            <span className="text-white font-bold">C</span>
                          </div>
                          Contact Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="John Doe"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="john@company.com"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Submit Section */}
                      <div className="pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                          <p className="text-sm text-gray-500">* Required fields</p>
                          <div className="text-sm text-blue-600">
                            Safety Verified by: <span className="font-bold">EAC Assist</span>
                          </div>
                        </div>
                        
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="group w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Safety Review & Quotation...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center">
                              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-2 group-hover:animate-pulse">
                                <span className="text-white font-bold">⚡</span>
                              </div>
                              Submit Safety-Certified Quotation
                            </span>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <SidebarDashboard />
            </div>
          )}
        </div>
      </div>

      {/* Live Chat Components */}
      <LiveChat />
      <ChatToggleButton />
    </div>
  );
};

export default RequestQuote;