import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center bg-gray-800 text-white fixed bottom-0 w-full px-4 py-2">
      <div className="flex space-x-4">
        <a
          href="https://github.com/chiaracode1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base"
        >
          <h2 className="">GitHub</h2>
        </a>
        <a
          href="https://linkedin.com/in/chiaraceriola"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base"
        >
          <h2 className="">LinkedIn</h2>
        </a>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-xs sm:text-sm mr-0">
          Powered by <a href="https://covid-api.com/" target="_blank" rel="noopener noreferrer" className="underline">COVID-19 API</a>
        </p>
        <p className="text-xs sm:text-sm">Chiara Ceriola ©</p>
      </div>
    </footer>
  );
};

export default Footer;
