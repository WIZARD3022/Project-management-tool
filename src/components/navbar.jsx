import React from "react";
import gitlogo from "/icons/github.svg";

const More = () => {
  document.querySelector(".rule").innerHTML = `<ol>
          <li>Your Password will must be combination of Minimum any 8 Character.</li>
          <li>Your Password will must contain Number.</li>
          <li>Your Password will must contain Both Upper And Lower Case Character.</li>
          <li>Your Password will must contain Special-Character.</li>
          <li>Your Password don't contain Spaces.</li>
        </ol>
        `;
};

const Less = () => {
  document.querySelector(".rule").innerHTML = ``;
};

const navbar = () => {
  return (
    <>
      <nav className="flex bg-slate-900 flex-row w-auto h-20 justify-around items-center font-bold shadow-md shadow-black">
        <div className="text-center">
          <span className="text-blue-700 text-3xl pt-4 flex items-center flex-row">
            &lt;
            <span className="text-white flex items-center flex-row">
              <span>
                <lord-icon
                  src="https://cdn.lordicon.com/depeqmsz.json"
                  trigger="hover"
                  colors="primary:#ffffff"
                  className=""
                ></lord-icon>
              </span>
              <span className="bold">
                {" "}
                <span className="text-blue-400 hover:text-blue-600">
                  Project
                </span>{" "}
                Management Tool
              </span>
            </span>
            &gt;
          </span>
        </div>
        <div className="flex relative flex-col text-center justify-center text-white hover:opacity-50">
          <img className="invert w-20" src={gitlogo} alt="github-logo" />
          <span className="absolute left-5 top-16 text-sm">
            <a href="">Github</a>
          </span>
        </div>
      </nav>
      <div className="bg-blue-600 h-auto w-full text-white text-center py-2">
        <button className="text-white bg-gradient-to-r from-slate-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-slate-400 dark:focus:ring-white font-medium rounded-lg text-base px-2.5 py-2 text-center me-1 mb-1 cursor-pointer " onClick={More}>
          &darr; Click to View Rule for Registration &darr;
        </button>
        <div className="rule"></div>
        <button className="text-white bg-gradient-to-r from-slate-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-slate-400 dark:focus:ring-white font-medium rounded-lg text-base px-2.5 py-2 text-center me-1 mb-1 cursor-pointer" onClick={Less}>&uarr;Minimize&uarr;</button>
      </div>
    </>
  );
};

export default navbar;
