import React, { useState } from "react";

const HeroTest = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      id="section"
      className={`bg-gradient-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] h-full ${menuOpen ? "overflow-hidden" : ""
        }`}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-6 w-full">
        <a href="https://prebuiltui.com">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/prebuiltuiDummyLogo.svg"
            alt="PrebuiltUI Logo"
          />
        </a>

        {/* Navigation */}
        <nav
          className={`items-center justify-center transition-[width] flex-col md:flex-row flex gap-8 text-gray-900 text-sm font-normal
            max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden max-md:bg-white/50 backdrop-blur
            ${menuOpen ? "max-md:w-full max-md:h-full" : "max-md:w-0"}`}
        >
          <a className="hover:text-indigo-600" href="#">
            Products
          </a>
          <a className="hover:text-indigo-600" href="#">
            Customer Stories
          </a>
          <a className="hover:text-indigo-600" href="#">
            Pricing
          </a>
          <a className="hover:text-indigo-600" href="#">
            Docs
          </a>
          {/* Close Menu Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="md:hidden text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <a
            className="text-indigo-600 bg-indigo-100 px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 transition"
            href="#"
          >
            Login
          </a>
          <a
            className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
            href="#"
          >
            Sign up
          </a>
        </div>

        {/* Open Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Main Section */}
      <main className="flex flex-col md:flex-row items-center max-md:text-center justify-between mt-16 pb-16 px-6 sm:px-10 md:px-24 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center md:items-start">
          <button
            className="mt-16 mb-6 flex items-center space-x-2 border border-indigo-600 text-indigo-600 text-xs rounded-full px-4 pr-1.5 py-1.5 hover:bg-indigo-50 transition"
            type="button"
          >
            <span>Explore how we help grow brands.</span>
            <span className="flex items-center justify-center size-6 p-1 rounded-full bg-indigo-600">
              <svg
                width="14"
                height="11"
                viewBox="0 0 16 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 6.5h14M9.5 1 15 6.5 9.5 12"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>

          <h1 className="text-gray-900 font-semibold text-3xl sm:text-4xl md:text-5xl max-w-xl">
            Preferred choice of leaders in{" "}
            <span className="text-indigo-600">every industry</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
            Learn why professionals trust our solution to complete their
            customer journey.
          </p>

          <div className="flex flex-col md:flex-row items-center mt-8 gap-3">
            <button
              className="bg-indigo-600 text-white px-6 pr-2.5 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-indigo-700 transition"
              type="button"
            >
              <span>Read Success Stories</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <a
              className="text-indigo-600 bg-indigo-100 px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 transition"
              href="#"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Images */}
        <div
          aria-label="Photos of leaders"
          className="mt-12 grid grid-cols-2 gap-6 pb-6"
        >
          <img
            alt=""
            className="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg"
            src="https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?q=80&w=735&auto=format&fit=crop"
          />
          <img
            alt=""
            className="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg"
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=687&auto=format&fit=crop"
          />
          <img
            alt=""
            className="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg"
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop"
          />
          <img
            alt=""
            className="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg"
            src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=687&auto=format&fit=crop"
          />
        </div>
      </main>
    </section>
  );
};

export default HeroTest;
