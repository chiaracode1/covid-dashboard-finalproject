import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center bg-gray-800 text-white fixed bottom-0 w-full">
      <div className="flex space-x-4">
        <a
          href="https://github.com/chiaracode1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl"
        >
          <h2>Github</h2>
        </a>
        <a
          href="https://linkedin.com/in/chiaraceriola"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl"
        >
          <h2>LinkedIn</h2>
        </a>
      </div>
      <div className="mt-2">
        <p className="text-sm">Powered by <a href="https://covid-api.com/" target="_blank" rel="noopener noreferrer" className="underline">COVID-19 API</a></p>
      </div>
      <div className="mt-2">Chiara Ceriola ©</div>
    </footer>
  );
};

export default Footer;
