import React, { useState, useEffect } from "react";
import {
  BarChart3,
  MessageSquare,
  Brain,
  Github,
} from "lucide-react";
import FileUploader from "./components/FileUploader";
import Results from "./components/Results";
import { motion, AnimatePresence } from "framer-motion";
import logo_no_bg from "./assets/Logo_no_bg.png"
import logo from "./assets/Logo.png"

function App() {
  const [showResults, setShowResults] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleShowResults = () => {
    setShowResults(true);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen />
      ) : showResults ? (
        <motion.div
          key={selectedUser}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Results
            users={users}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm">
              <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src={logo} className="w-8 h-8 text-indigo-600" />
                  <span className="font-bold text-xl text-gray-900">CTDA</span>
                </div>
                <div className="flex items-center space-x-10">
                  <a href="/features" className="text-gray-600 hover:text-gray-900">
                    Features
                  </a>
                  <a href="/about" className="text-gray-600 hover:text-gray-900">
                    About
                  </a>
                  <a
                    href="https://github.com/drone-cr2/ctda"
                    className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                    target="blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </nav>
            </header>

            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16 md:py-24">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  Transform Your Chat Data Into
                  <span className="text-indigo-600"> Actionable Insights</span>
                </h1>
                <p className="text-xl text-gray-900/80 mb-8">
                  CTDA analyzes your professional conversations to uncover
                  patterns, topics, and interaction dynamics, helping you make
                  data-driven decisions.
                </p>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="flex justify-center mb-16">
              <FileUploader
                onAnalyze={handleShowResults}
                users={users}
                setUsers={setUsers}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            </div>

            {/* Features Section */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <FeatureCard
                    icon={<MessageSquare className="w-8 h-8 text-indigo-600" />}
                    title="Chat Analysis"
                    description="Process and analyze exported chat data from WhatsApp and other platforms with ease."
                  />
                  <FeatureCard
                    icon={<Brain className="w-8 h-8 text-indigo-600" />}
                    title="Topic Modeling"
                    description="Automatically identify key topics and themes from your conversations."
                  />
                  <FeatureCard
                    icon={<BarChart3 className="w-8 h-8 text-indigo-600" />}
                    title="Visual Insights"
                    description="View beautiful, interactive visualizations of your conversation patterns."
                  />
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const FeatureCard = ({ icon, title, description }) => {

  return (
    <motion.div
      className="p-6 bg-[#fafafa] rounded-xl hover:shadow-lg transition border border-[#364C63]/10"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-[#364C63] mb-2">{title}</h3>
      <p className="text-[#364C63]/80">{description}</p>
    </motion.div>
  );
}



const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gray-900 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.5,
        }}
        className="flex flex-col items-center space-y-1"
      >
        <img
          src={logo_no_bg}
          width={160}
          height={160}
          alt="CTDA Logo"
          className="drop-shadow-lg animate-bounce"
        />
        <p className="text-[#FFD700] text-5xl font-medium">
          <hr></hr>
          CTDA
        </p>
      </motion.div>
    </motion.div>
  );
}


export default App;
