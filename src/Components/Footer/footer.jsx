import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index";

const footer = () => {
  return (
    <section className="relative overflow-hidden py-10 mt-10 bg-gray-400 border-t-2 border-t-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          {/* Logo Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12 flex flex-col justify-between">
            <div className="mb-4 inline-flex items-center justify-center md:justify-start">
              <Logo width="100px" />
            </div>
            <div>
              <p className="text-sm text-gray-600 text-center md:text-left">
                &copy; Copyright 2024. All Rights Reserved by MSN.
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-500 text-center md:text-left">
                Company
              </h3>
              <ul className="space-y-2">
                {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        className="text-base font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200"
                        to="/"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-500 text-center md:text-left">
                Support
              </h3>
              <ul className="space-y-2">
                {["Account", "Help", "Contact Us", "Customer Support"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        className="text-base font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200"
                        to="/"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-500 text-center md:text-left">
                Legals
              </h3>
              <ul className="space-y-2">
                {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        className="text-base font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200"
                        to="/"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default footer;
