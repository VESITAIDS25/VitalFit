import React,{ useState } from 'react';

import { Link } from 'react-router-dom';
import illustrationIntro from '../assets/images/illustration-intro.svg';

import companyLogo from '../assets/images/logo-t1.png'
import { useAuth } from '../Context/authContext';

const One = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [auth,setAuth] = useAuth();

  return (
    <>
      <nav className="relative container mx-auto p-6">
        {/* Flex Container */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="pt-2">
            <img src={companyLogo} alt="VitaLFit" className="h-12" />
          </div>
          {/* Menu Items */}

          {/* Button */}
          <Link
            to="/register"
            className="hidden  pt-2 text-black bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
          >
            Sign Up
          </Link>
          <Link
            to="/dashboard"
            className="hidden pt-2 text-black bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
          >
           Dashboard
          </Link>
          <button
            className={
              toggleMenu
                ? 'open block hamburger md:hidden focus:outline-none'
                : 'block hamburger md:hidden focus:outline-none'
            }
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
        <div className="md:hidden">
          <div
            className={
              toggleMenu
                ? 'absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-black sm:w-auto sm:self-center left-6 right-6 drop-shadow-md'
                : 'absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-black sm:w-auto sm:self-center left-6 right-6 drop-shadow-md'
            }
          >
            <Link to="#">Pricing</Link>
            <Link to="#">Product</Link>
            <Link to="#">About Us</Link>
            <Link to="#">Careers</Link>
            <Link to="#">Community</Link>
          </div>
        </div>
      </nav>
      <section id="hero">
        {/* Flex Container */}
        <div className="container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row">
          {/* Left Item */}
          <div className="flex flex-col mb-32 space-y-12 md:w-1/2">
            <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
              Get Fit With Vital Fit
            </h1>
            <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
              Manage makes it simple for software teams to plan your day-to-day
              schedules.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link
                to="/register"
                className="p-3 px-6 pt-2 text-black bg-brightRed rounded-full baseline hover:bg-brightRedLight"
              >
                Sign Up
              </Link>
            </div>
          </div>
          {/* Image */}
          <div className="md:w-1/2">
            <img src={illustrationIntro} alt="" />
          </div>
        </div>
      </section>
      <section id="features">
        {/* Flex Container */}
        <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row">
          {/* What's Different */}
          <div className="flex flex-col space-y-12 md:w-1/2">
            <h2 className="max-w-md text-4xl font-bold text-center md:text-left">
              What's different about Fitness?
            </h2>
            <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
              Manage provides all the functionality your team needs, without the
              complexity. Our software is tailor-made for modern digital product
              teams.
            </p>
          </div>

          {/* Numbered List */}
          <div className="flex flex-col space-y-8 md:w-1/2">
            {/* List Item 1 */}
            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              {/* Heading */}
              <div className="rounded-l-full bg-brightRedSupLight md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-black rounded-full md:py-1 bg-brightRed">
                    01
                  </div>
                  <h3 className="text-base font-bold md:mb-4 md:hidden">
                    Track your Overall Steps
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="hidden mb-4 text-lg font-bold md:block">
                  Track your Overall Steps
                </h3>
                <p className="text-darkGrayishBlue">
                  See how your day-to-day tasks fit into the wider vision. Go
                  from tracking progress at the milestone level all the way done
                  to the smallest of details. Never lose sight of the bigger
                  picture again.
                </p>
              </div>
            </div>

            {/* List Item 2 */}
            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              {/* Heading */}
              <div className="rounded-l-full bg-brightRedSupLight md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-black rounded-full md:py-1 bg-brightRed">
                    02
                  </div>
                  <h3 className="text-base font-bold md:mb-4 md:hidden">
                    Calculate Calories
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="hidden mb-4 text-lg font-bold md:block">
                  Calculate Calories
                </h3>
                <p className="text-darkGrayishBlue">
                  Set internal delivery estimates and track progress toward
                  company goals. Our customisable dashboard helps you build out
                  the reports you need to keep key stakeholders informed.
                </p>
              </div>
            </div>

            {/* List Item 3 */}
            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              {/* Heading */}
              <div className="rounded-l-full bg-brightRedSupLight md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-black rounded-full md:py-1 bg-brightRed">
                    03
                  </div>
                  <h3 className="text-base font-bold md:mb-4 md:hidden">
                    Get your Statistics
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="hidden mb-4 text-lg font-bold md:block">
                  Get your Statistics
                </h3>
                <p className="text-darkGrayishBlue pb-9">
                  Stop jumping from one service to another to communicate, store
                  files, track tasks and share documents. Manage offers an
                  all-in-one team productivity solution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="cta" className="bg-brightRed">
        {/* Flex Container */}
        <div className="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0">
          {/* Heading */}
          <h2 className="text-5xl font-bold leading-tight text-center text-black md:text-4xl md:max-w-xl md:text-left">
            Simplify how your team works today
          </h2>
          {/* Button */}
          <div>
            <Link
              to="#"
              className="p-3 px-6 pt-2 text-white bg-black rounded-full shadow-2xl baseline hover:bg-white-900"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default One;
