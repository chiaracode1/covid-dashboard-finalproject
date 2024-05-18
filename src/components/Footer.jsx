import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center bg-gray-800 text-white fixed bottom-0 w-full mt-auto">
      <div className="flex space-x-2">
        <a
          href="https://github.com/chiaracode1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base sm:text-lg"
        >
         <h2 className="text-1xl">Github</h2>
        </a>
        <a
          href="https://linkedin.com/in/chiaraceriola"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base sm:text-lg"
        >
          <h2 className="text-1xl">LinkedIn</h2>
        </a>
      </div>
        <p className="text-xs sm:text-sm mt-auto">Powered by <a href="https://covid-api.com/" target="_blank" rel="noopener noreferrer" className="underline">COVID-19 API</a></p>
      <div className="text-xs sm:text-sm mt-auto">Chiara Ceriola ©</div>
    </footer>
  );
};

export default Footer;
