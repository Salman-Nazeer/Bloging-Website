import React, { useState } from "react";
import { Container, Logo, LogoutBTN } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "LogIn",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Post",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <Container>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
              <Link to="/">
                <Logo />
              </Link>
              <div className="hidden  sm:block">
                <div className="flex space-x-4">
                  {navItems.map((item) =>
                    item.active ? (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.slug)}
                        className="inline-block px-6 border-2 py-2 duration-200 hover:bg-gray-700 text-white hover:text-black rounded-full"
                      >
                        {item.name}
                      </button>
                    ) : null
                  )}

                  {authStatus && (
                    <div>
                      <LogoutBTN />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <DisclosurePanel className="sm:hidden">
        <div className="border-2 flex flex-col space-y-1 px-2 pb-3 pt-2">
          {navItems.map((item) =>
            item.active ? (
              <Disclosure.Button
                key={item.name}
                as="button"
                onClick={() => navigate(item.slug)}
                className="hover:bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                {item.name}
              </Disclosure.Button>
            ) : null
          )}

          {authStatus && (
            <div>
              <LogoutBTN />
            </div>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default header;

//     <header className="py-3 shadow bg-gray-500">
//       <Container>
//         <nav className="flex">
//           <div className="mr-4">
//             <Link to="/">
//               <Logo width="70px" />
//             </Link>
//           </div>

//           <ul className="flex ml-auto">
//             {navItems.map((item) =>
//               item.active ? (
//                 <li key={item.name}>
//                   <button
//                     onClick={() => navigate(item.slug)}
//                     className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
//                   >
//                     {item.name}
//                   </button>
//                 </li>
//               ) : null
//             )}

//             {authStatus && (
//               <li>
//                 <LogoutBTN />
//               </li>
//             )}
//           </ul>
//         </nav>
//       </Container>
//     </header>
//   );
// };
