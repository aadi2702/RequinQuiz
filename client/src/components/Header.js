// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import SideNav from './SideNav';

// const Header = () => {
//   const [searchQuery, setSearchQuery] = useState('');

//   // Toggle the menu for mobile screens
//   const [showNav, setShowNav] = useState(false);


//   return (
//     <header className="bg-primaryColor text-primaryText shadow-lg">
//       <div className="container mx-auto flex justify-between items-center px-8 py-4">
//         {/* Logo Section - Left Aligned */}
//         <div className="flex items-center space-x-4">
//           <img
//             src="logo.png"
//             alt="requin Logo Image"
//             className="h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 transition-all duration-300"
//           />
//         </div>

//         {/* Menu Button for Smaller Screens */}
//         <button
//           className="md:hidden text-accent focus:outline-none transform transition-all duration-300 ease-in-out"
//           // onClick={toggleMenu}
//           onClick={() => setShowNav(!showNav)}
//         >
//           <svg
//             className="w-8 h-8"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16M4 18h16"
//             ></path>
//           </svg>
//         </button>

//         {/* Search Bar (Hidden on Small Screens) */}
//         <div className="relative hidden md:block">
//           <input
//             type="text"
//             className="px-4 py-2 rounded-lg bg-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {/* Navigation Links */}
//         <nav
//           // className={`${
//           //   isMenuOpen ? 'block' : 'hidden'
//           // } absolute top-16 left-0 w-full bg-white bg-opacity-95 md:static md:flex md:space-x-8 md:w-auto md:bg-transparent md:opacity-100 transition-all duration-300 ease-in-out`}
//           className='hidden md:flex space-x-8 font-sans'
//         >
//           <NavLink
//             exact
//             to="/"
//             className="text-primaryText hover:text-accent py-3 px-5 text-lg md:text-xl font-medium transition-all ease-in-out duration-300"
//             activeClassName="text-accent font-semibold"
//           >
//             Home
//           </NavLink>

//           <NavLink
//             to="/about"
//             className="text-primaryText hover:text-accent py-3 px-5 text-lg md:text-xl font-medium transition-all ease-in-out duration-300"
//             activeClassName="text-accent font-semibold"
//           >
//             About Us
//           </NavLink>

//           <NavLink
//             to="/projects"
//             className="text-primaryText hover:text-accent py-3 px-5 text-lg md:text-xl font-medium transition-all ease-in-out duration-300"
//             activeClassName="text-accent font-semibold"
//           >
//             Projects
//           </NavLink>

//           <NavLink
//             to="/contact"
//             className="text-primaryText hover:text-accent py-3 px-5 text-lg md:text-xl font-medium transition-all ease-in-out duration-300"
//             activeClassName="text-accent font-semibold"
//           >
//             Contact
//           </NavLink>

//           <NavLink
//             to="/services"
//             className="text-primaryText hover:text-accent py-3 px-5 text-lg md:text-xl font-medium transition-all ease-in-out duration-300"
//             activeClassName="text-accent font-semibold"
//           >
//             Services
//           </NavLink>

//           <NavLink
//             to="/termsandconditions"
//             className="text-primaryText hover:text-accent py-3 px-5 text-lg md:text-xl font-medium transition-all ease-in-out duration-300"
//             activeClassName="text-accent font-semibold"
//           >
//             Terms and Conditions
//           </NavLink>
//         </nav>
//         <SideNav isOpen={showNav} onClose={() => setShowNav(false)} />
//       </div>
//     </header>
//   );
// };

// export default Header;







// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import SideNav from './SideNav';

// const Header = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showNav, setShowNav] = useState(false); // Toggle state for mobile menu

//   return (
//     <header className="bg-primaryColor text-primaryText shadow-lg">
//       <div className="container mx-auto flex justify-between items-center px-4 py-3 md:py-4">
//         {/* Logo Section - Left Aligned */}
//         <div className="flex items-center space-x-2 md:space-x-4">
//           <img
//             src="logo.png"
//             alt="Requin Logo"
//             className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 transition-all duration-300"
//           />
//         </div>

//         {/* Menu Button for Smaller Screens */}
//         <button
//           className="md:hidden text-accent focus:outline-none"
//           onClick={() => setShowNav(!showNav)}
//         >
//           <svg
//             className="w-6 h-6 sm:w-8 sm:h-8"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16M4 18h16"
//             ></path>
//           </svg>
//         </button>

//         {/* Search Bar (Hidden on Small Screens) */}
//         <div className="relative hidden md:block flex-grow max-w-xs lg:max-w-sm xl:max-w-md">
//           <input
//             type="text"
//             className="w-full px-3 py-2 rounded-lg bg-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {/* Desktop Navigation Links */}
//         <nav className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-8">
//           {['Home', 'About Us', 'Projects', 'Contact', 'Services', 'Terms and Conditions'].map(
//             (item, index) => (
//               <NavLink
//                 key={index}
//                 exact
//                 to={`/${item.toLowerCase().replace(/ /g, '')}`}
//                 className="text-primaryText hover:text-accent py-2 px-3 text-sm lg:text-base xl:text-lg font-medium transition-all ease-in-out duration-300"
//                 activeClassName="text-accent font-semibold"
//               >
//                 {item}
//               </NavLink>
//             )
//           )}
//         </nav>

//         {/* Mobile Side Navigation */}
//         <SideNav isOpen={showNav} onClose={() => setShowNav(false)} />
//       </div>
//     </header>
//   );
// };

// export default Header;





import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SideNav from './SideNav';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNav, setShowNav] = useState(false);

  return (
    <header className="bg-primaryColor text-primaryText shadow-lg overflow-hidden">
      <div className="container mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        
        {/* Logo Section - Left Aligned */}
        <a href='/' className="flex items-center space-x-4 min-w-[100px]">
          <img
            src="logo.png"
            alt="Requin Logo"
            className="h-20 xl:h-24 transition-all duration-500 ease-in-out"
          />
        </a>

        {/* Centered Search Bar for Medium Screens */}
          {/* <div className="relative hidden md:flex md:flex-grow md:justify-center max-w-[300px] transition-all duration-500 ease-in-out">
            <input
              type="text"
              className="hidden md:flex w-full px-4 py-2 rounded-lg bg-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div> */}

        {/* Menu Button for Smaller Screens */}
        <button
          className="md:hidden text-accent focus:outline-none"
          onClick={() => setShowNav(!showNav)}
        >
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg" 
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" 
            ></path>
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-8">
          {['About Us', 'Contact'].map(
            (item, index) => (  
              <NavLink
                key={index}
                exact
                to={`/${item.toLowerCase().replace(/ /g, '')}`}
                className="text-primaryText hover:text-accent py-2 px-3 text-lg xl:text-xl font-medium transition-all ease-in-out duration-300"
                activeClassName="text-accent font-semibold"
              >
                {item}
              </NavLink>
            )
          )}
        </nav>

        {/* Mobile Side Navigation */}
        <SideNav isOpen={showNav} onClose={() => setShowNav(false)} />
      </div>
    </header>
  );
};

export default Header;
