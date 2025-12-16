import { ErrorBoundary } from 'react-error-boundary';
import { Routes, Route } from "react-router-dom";  // ✅ No BrowserRouter or Router here
import Navbar from "./navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Teams from './pages/team';
import Services from './pages/services';
import Projects from './pages/projects';
import Contact from './pages/contact';
import CVSubmission from './pages/cvsubmission';
import Requestquotes from './pages/requestquotes';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Forgotpassword from './pages/forgotpassword';









function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-4 bg-red-50 text-red-700 rounded-lg max-w-md mx-auto mt-10">
      <h2 className="font-bold text-lg">Something went wrong</h2>
      <pre className="whitespace-pre-wrap my-2">{error.message}</pre>
      <button 
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/about" element={<About />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cvsubmission" element={<CVSubmission />} />
        <Route path="/requestquotes" element={<Requestquotes />} />
         <Route path="/signin" element={<Signin />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/forgotpassword" element={<Forgotpassword />} />






      </Routes>
    </ErrorBoundary>
  );
}

export default App;
