import { useState, useEffect } from 'react';
import { Menu, X, Code, Terminal, Github } from 'lucide-react';

const Nav = ({ homeRef, skillsRef, educationRef, workRef, portfolioRef, darkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScrollProgress);
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const refs = { homeRef, skillsRef, educationRef, workRef, portfolioRef };
      const scrollPosition = window.scrollY + 100;

      Object.entries(refs).forEach(([key, ref]) => {
        if (!ref?.current) return;

        const element = ref.current;
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(key.replace('Ref', ''));
        }
      });
    };

    const debouncedHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [homeRef, skillsRef, educationRef, workRef, portfolioRef]);

  const scrollToSection = (ref) => {
    setIsMenuOpen(false);
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navItems = [
    { key: 'home', ref: homeRef, label: 'Home' },
    { key: 'skills', ref: skillsRef, label: 'Skills' },
    { key: 'education', ref: educationRef, label: 'Education' },
    { key: 'work', ref: workRef, label: 'Experience' },
    { key: 'portfolio', ref: portfolioRef, label: 'Projects' }
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <li key={item.key}>
          <button
            onClick={() => scrollToSection(item.ref)}
            className={`
              px-4 py-2 rounded-lg transition-all duration-200
              font-medium relative overflow-hidden group
              ${activeSection === item.key
                ? darkMode
                  ? 'text-cyan-400 bg-gray-800'
                  : 'text-cyan-900 bg-cyan-50'
                : darkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <span className="relative z-10">{item.label}</span>
          </button>
        </li>
      ))}
    </>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b shadow-sm
      ${darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'}`}
    >
      <div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Code className={`w-6 h-6 ${darkMode ? 'text-cyan-400' : 'text-cyan-900'}`} />
            <span className={`text-xl font-bold ${
              darkMode 
                ? 'text-white' 
                : 'bg-gradient-to-r from-cyan-900 to-blue-900 bg-clip-text text-transparent'
            }`}>
              DevPortfolio
            </span>
          </div>

          <ul className="hidden md:flex items-center space-x-1">
            <NavLinks />
            <li>
              <a
                href="https://github.com/krish1700"
                target="_blank"
                rel="noopener noreferrer"
                className={`ml-4 inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-200
                  ${darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
              >
                <Github className="w-4 h-4 mr-2" />
                <span>GitHub</span>
              </a>
            </li>
          </ul>

          <button
            className={`md:hidden p-2 rounded-lg transition-colors duration-200
              ${darkMode
                ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <ul className="py-4 space-y-2">
            <NavLinks />
            <li className="pt-2">
              <a
                href="https://github.com/krish1700"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center px-6 py-3 rounded-lg text-sm transition-colors duration-200
                  ${darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                style={{ width: '100%' }}
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
