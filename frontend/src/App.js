import { useRef, useEffect, useState } from 'react';
import Nav from './Component/Nav';
import { Analytics } from "@vercel/analytics/react"
import {
  BookOpen,
  Briefcase,
  FolderGit2,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Moon,
  Sun,
  Code,
} from 'lucide-react';
import {
  FaReact,
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3,
  FaJs,
  FaCode,
  FaGithub, // Correct import for GitHub
} from 'react-icons/fa';
import {
  SiMysql,
  SiPostgresql,
  SiDjango,
  SiAmazonwebservices,
  SiGooglecloud,
  SiKubernetes,
  SiMongodb,
  SiTypescript, // Correct import for TypeScript
} from 'react-icons/si';
import { VscAzure, VscVscode } from "react-icons/vsc";



const API_BASE_URL = 'https://portfolio-p2k3.onrender.com';

const iconMapping = {
  Python: FaPython, // Python
  Java: FaJava, // Java
  JavaScript: FaJs, // JavaScript
  React: FaReact, // React
  MySQL: SiMysql, // MySQL
  PostgreSQL: SiPostgresql, // PostgreSQL
  HTML5: FaHtml5, // HTML5
  Django: SiDjango, // Django
  AWS: SiAmazonwebservices, // AWS
  GCP: SiGooglecloud, // Google Cloud Platform
  Azure: VscAzure, // Azure
  RDBMS: SiMysql, // RDBMS (similar icon to MySQL)
  Kubernetes: SiKubernetes, // Kubernetes
  //GitHub: FaGithub, // GitHub (fixed)git 
  Vscode: VscVscode, // VSCode
  //TypeScript: SiTypescript, // TypeScript (fixed)
  CSS: FaCss3, // CSS
  MongoDB: SiMongodb,
  C: FaCode, 
};



function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [data, setData] = useState({
    education: [],
    work: [],
    portfolio: [],
    skills: [],
  });

  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const workRef = useRef(null);
  const portfolioRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const endpoints = {
        education: `${API_BASE_URL}/education/`,
        work: `${API_BASE_URL}/work/`,
        portfolio: `${API_BASE_URL}/portfolio/`,
        skills: `${API_BASE_URL}/skills/`,
      };

      const responses = await Promise.all(
        Object.entries(endpoints).map(async ([key, url]) => {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to fetch ${key} data`);
          const data = await response.json();
          return data.sort((a, b) => (a.ordinal || 0) - (b.ordinal || 0));
        })
      );

      setData({
        education: responses[0],
        work: responses[1],
        portfolio: responses[2],
        skills: responses[3],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-red-800 text-xl font-bold mb-2">Error Loading Data</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'dark bg-gray-900' : 'bg-white'
      }`}
    >
      <div className="fixed bottom-6 right-6 space-y-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-500" />
          ) : (
            <Moon className="w-6 h-6 text-gray-600" />
          )}
        </button>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-cyan-500 shadow-lg hover:shadow-xl transition-all"
          >
            <Code className="w-6 h-6 text-white" />
          </button>
        )}
      </div>

      <Nav {...{ homeRef, skillsRef, educationRef, workRef, portfolioRef, darkMode }} />

      <main className="relative container mx-auto px-4">
        <HeroSection homeRef={homeRef} darkMode={darkMode} />
        <SkillsSection
          skillsRef={skillsRef}
          skills={data.skills}
          darkMode={darkMode}
        />
        <EducationSection
          educationRef={educationRef}
          data={data.education}
          darkMode={darkMode}
        />
        <WorkSection
          workRef={workRef}
          data={data.work}
          darkMode={darkMode}
        />
        <PortfolioSection
          portfolioRef={portfolioRef}
          data={data.portfolio}
          darkMode={darkMode}
        />
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}

const SectionTitle = ({ icon: Icon, title, darkMode }) => (
  <div className="flex items-center mb-12 relative">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl -z-10" />
    <Icon className={`w-8 h-8 mr-4 ${darkMode ? 'text-cyan-400' : 'text-cyan-900'}`} />
    <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
  </div>
);

const HeroSection = ({ homeRef, darkMode }) => (
  <section ref={homeRef} className="min-h-screen flex items-center justify-center py-20">
    <div className="flex flex-col items-center relative">
      <div className="relative group">
        {/* Outer Gradient Blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-3xl opacity-20" />
        
        {/* Larger Circular Image */}
        <img
          src="/KrishPic.jpg"
          alt="Krish Naresh Patil"
          className="w-60 h-60 object-cover rounded-full shadow-2xl ring-8 ring-cyan-500 transition-transform duration-300 transform hover:scale-105"
        />
      </div>
      
      <div className="text-center mt-8">
        <h1 className={`text-6xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Krish Naresh Patil
        </h1>
        <p className={`text-xl max-w-3xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Innovative Full Stack Developer with expertise in scalable web applications, cloud solutions, and cutting-edge technologies.
        </p>
        
        <div className="flex gap-6 justify-center">
          <a
            href="/Resume_KrishPatil.pdf"
            className="inline-flex items-center px-6 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            View Resume
          </a>
          
          <a
            href="mailto:krishpatil4151@gmail.com"
            className="inline-flex items-center px-6 py-3 border-2 border-cyan-500 text-cyan-500 rounded-full hover:bg-cyan-50 transition-colors"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Me
          </a>
        </div>
      </div>
    </div>
  </section>
);


const SkillsSection = ({ skillsRef, skills, darkMode }) => (
  <section ref={skillsRef} className="py-20">
    <SectionTitle icon={Code} title="Technical Skills" darkMode={darkMode} />
    <div
      className="flex flex-wrap justify-center gap-y-10 gap-x-6"
      style={{
        margin: "0 auto",
        maxWidth: "1200px", // Limit the width to avoid stretching
      }}
    >
      {skills.map((skill, index) => {
        const Icon = iconMapping[skill.skillName] || null;
        return (
          <div
            key={index}
            className={`group relative flex flex-col items-center justify-center text-center p-4 rounded-xl transition-transform transform hover:scale-105
              ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`
            }
            style={{ width: "150px" }} // Ensure consistent box sizes
          >
            {Icon && <Icon className="w-10 h-10 mb-2 text-cyan-500" />}
            <h4 className="text-lg font-semibold">{skill.skillName}</h4>
          </div>
        );
      })}
    </div>
  </section>
);

const EducationSection = ({ educationRef, data, darkMode }) => (
  <section ref={educationRef} className="py-20">
    <SectionTitle icon={BookOpen} title="Education" darkMode={darkMode} />
    <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-6 justify-center">
      {data.map(edu => (
        <div
          key={edu.id}
          className={`group flex flex-col items-center text-center rounded-xl hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden
            ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
          style={{ minHeight: '300px' }} // Ensure equal height for all cards
        >
          {edu.image && (
            <img
              src={edu.image}
              alt={edu.school}
              className="w-32 h-32 object-contain rounded-full mb-4"
            />
          )}
          <h3 className="text-xl font-semibold">{edu.school}</h3>
          <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {edu.degree}
          </p>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {edu.years}
          </p>
        </div>
      ))}
    </div>
  </section>
);

const WorkSection = ({ workRef, data, darkMode }) => (
  <section ref={workRef} className="py-20">
    <SectionTitle icon={Briefcase} title="Work Experience" darkMode={darkMode} />
    <div className="space-y-8">
      {data.map((job) => (
        <div
          key={job.id}
          className={`flex flex-col lg:flex-row items-center justify-center gap-10 rounded-xl hover:shadow-xl transition-all duration-300 p-6 relative
            ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
        >
          {/* Company Info */}
          <div className="flex flex-col items-center text-center w-full lg:w-1/4">
            {job.image && (
              <img
                src={job.image}
                alt={job.company}
                className="w-24 h-24 object-cover rounded-full ring-2 ring-cyan-500 shadow-md transform hover:scale-105 transition-transform"
              />
            )}
            <h3 className="text-lg font-semibold mt-4">{job.company}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {job.years}
            </p>
          </div>
          {/* Divider for Desktop */}
          <div
            className={`hidden lg:block border-l ${
              darkMode ? 'border-gray-700' : 'border-gray-300'
            }`}
          />
          {/* Description */}
          <div className="w-full lg:w-3/4 lg:text-left">
            <ul className={`list-disc pl-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {job.description.split('\n').map((point, idx) => (
                <li key={idx} className="mb-2">{point.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const PortfolioSection = ({ portfolioRef, data, darkMode }) => (
  <section ref={portfolioRef} className="py-20">
    <SectionTitle icon={FolderGit2} title="Portfolio" darkMode={darkMode} />
    <div className="relative">
      {/* Timeline Line for Medium and Larger Screens */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full border-l-2 border-gray-300 dark:border-gray-700 hidden lg:block"></div>
      {data.map((project, idx) => (
        <div
          key={project.id}
          className={`relative mb-12 flex flex-col lg:flex-row items-center ${
            idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
          }`}
        >
          {/* Timeline Point */}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center justify-center lg:flex`}
          >
            <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center">
              <FolderGit2
                className={`w-4 h-4 ${
                  darkMode ? 'text-cyan-400' : 'text-cyan-600'
                }`}
              />
            </div>
          </div>

          {/* Card */}
          <div
            className={`relative z-10 w-full lg:w-5/12 rounded-xl p-6 ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } ${idx % 2 === 0 ? 'lg:ml-8' : 'lg:mr-8'}`}
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded-lg mb-4 transform transition-transform duration-300 hover:scale-105 border-2 border-cyan-500"
              />
            )}
            {/* Project Title and Year */}
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
              {project.title}
              <span className={`text-sm ml-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {project.years}
              </span>
            </h3>
            <ul
              className={`mb-4 list-disc pl-5 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {project.description.split('\n').map((point, idx) => (
                <li key={idx}>{point.trim()}</li>
              ))}
            </ul>
            <a
              href={project.url}
              className={`inline-flex items-center transition-colors ${
                darkMode
                  ? 'text-cyan-400 hover:text-cyan-300'
                  : 'text-cyan-600 hover:text-cyan-700'
              }`}
            >
              View Project <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Footer = ({ darkMode }) => (
  <footer className={`py-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'}`}>
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">About Me</h4>
          <p className="text-gray-400">
            Innovative Full Stack Developer with expertise in scalable web applications, cloud solutions, and cutting-edge technologies.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="homeRef" className="text-gray-400 hover:text-white transition-colors">Home</a>
            </li>
            <li>
              <a href="portfolioRef" className="text-gray-400 hover:text-white transition-colors">Portfolio</a>
            </li>
            <li>
              <a href="/Resume_KrishPatil.pdf" className="text-gray-400 hover:text-white transition-colors">Resume</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4">
            <a href="https://github.com/krish1700" 
               className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/krish-patil-877549208/" 
               className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:krishpatil4151@gmail.com" 
               className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Krish Naresh Patil. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default App;