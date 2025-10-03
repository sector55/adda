import React from 'react';

interface HeaderProps {
  setView: (view: 'home' | 'quiz' | 'profile' | 'chat' | 'community') => void;
}

const Header: React.FC<HeaderProps> = ({ setView }) => {
  const handleNavClick = (view: 'home' | 'quiz' | 'profile' | 'chat' | 'community') => {
    setView(view);
  };

  return (
    <header className="bg-black/30 backdrop-blur-lg sticky top-0 z-50 border-b border-indigo-500/20">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-baseline gap-x-8">
              <NavItem onClick={() => handleNavClick('home')}>خانه</NavItem>
              <NavItem onClick={() => handleNavClick('quiz')}>تست روانشناسی</NavItem>
              <NavItem onClick={() => handleNavClick('chat')}>مشاور هوشمند</NavItem>
              <NavItem onClick={() => handleNavClick('community')}>جامعه</NavItem>
          </div>
          <div className="flex-shrink-0">
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 font-serif transition-all duration-300 hover:brightness-110">
              addaperfume
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

const NavItem: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <a
    href="#"
    onClick={(e) => { e.preventDefault(); onClick(); }}
    className="relative text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-colors duration-300 group"
  >
    {children}
    <span className="absolute bottom-0 left-0 block w-full h-[2px] bg-gradient-to-r from-purple-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></span>
  </a>
);

export default Header;