
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 shadow-inner mt-12">
      <div className="container mx-auto py-6 px-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} addaperfume. All rights reserved.</p>
        <p className="text-sm">Crafted with AI, for the love of scent.</p>
      </div>
    </footer>
  );
};

export default Footer;
