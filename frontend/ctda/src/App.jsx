import React, { useState } from "react";
import {
  BarChart3,
  MessageSquare,
  Brain,
  Clock,
  ArrowRight,
  Github,
} from "lucide-react";
import FileUploader from "./components/FileUploader";
import Results from "./components/Results";

function App() {
  const [showResults, setShowResults] = useState(false);

  // Function to toggle Results view
  const handleShowResults = () => {
    setShowResults(true);
  };

  return showResults ? (
    <Results />
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F3EF] to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#364C63] mb-6">
            Transform Your Chat Data Into
            <span className="text-[#F3B340]"> Actionable Insights</span>
          </h1>
          <p className="text-xl text-[#364C63]/80 mb-8">
            CTDA analyzes your professional conversations to uncover patterns,
            topics, and interaction dynamics, helping you make data-driven
            decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-[#364C63] text-white rounded-lg font-semibold hover:bg-[#2a3b4e] transition flex items-center justify-center gap-2">
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
            <a target="blank" href="https://github.com/drone-cr2/ctda">
              <button className="px-8 py-3 bg-[#F4F3EF] cursor-pointer text-[#364C63] border border-[#364C63]/20 rounded-lg font-semibold hover:bg-[#e9e7e0] transition flex items-center justify-center gap-2">
                <Github className="w-5 h-5" /> View on GitHub
              </button>
            </a>
          </div>
        </div>
      </header>

      {/* File Upload Section */}
      <div className="flex justify-center mb-16">
        <FileUploader onAnalyze={handleShowResults} />
      </div>

      {/* Features Section */}
      <section className="py-16 bg-[#F4F3EF]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8 text-[#F3B340]" />}
              title="Chat Analysis"
              description="Process and analyze exported chat data from WhatsApp and other platforms with ease."
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-[#F3B340]" />}
              title="Topic Modeling"
              description="Automatically identify key topics and themes from your conversations."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-[#F3B340]" />}
              title="Visual Insights"
              description="View beautiful, interactive visualizations of your conversation patterns."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-[#F4F3EF] rounded-xl hover:shadow-lg transition border border-[#364C63]/10">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-[#364C63] mb-2">{title}</h3>
      <p className="text-[#364C63]/80">{description}</p>
    </div>
  );
}

export default App;
