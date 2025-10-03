import { Link, useLocation } from "react-router-dom";

import { useState } from "react";
import Logo from "./logo";
import CreateBill from "./create-bill";
import AddProduct from "./add-product";
import ViewProducts from "./view-products";
import BillHistory from "./bill-history";
import HamburgerButton from "./hamburger-btn";
import { SignedIn, SignedOut, useUser, UserButton } from "@clerk/clerk-react";
import Pricing from "./pricing";
import Login from "./login";
import SignUp from "./signup";

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <nav className="hidden md:flex space-x-8">
            <SignedOut>
              <Pricing isActive={isActive} />
              <Login isActive={isActive} />
              <SignUp isActive={isActive} />
            </SignedOut>
            <SignedIn>
              <CreateBill isActive={isActive} />
              <AddProduct isActive={isActive} />
              <ViewProducts isActive={isActive} />
              <BillHistory isActive={isActive} />
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {user?.firstName || "User"}
                </span>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-5 h-5",
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            </SignedIn>
          </nav>

          <div className="md:hidden">
            <HamburgerButton
              toggleMobileMenu={toggleMobileMenu}
              isMobileMenuOpen={isMobileMenuOpen}
            />
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700 flex-col  ">
              <SignedOut>
                <SignUp
                  isActive={isActive}
                  isMobileMenuOpen={isMobileMenuOpen}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
                <Login
                  isActive={isActive}
                  isMobileMenuOpen={isMobileMenuOpen}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
                <Pricing
                  isActive={isActive}
                  isMobileMenuOpen={isMobileMenuOpen}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
              </SignedOut>
              <SignedIn>
                <div>
                  <CreateBill
                    isActive={isActive}
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                  />
                </div>

                <div>
                  <AddProduct
                    isActive={isActive}
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                  />
                </div>
                <div>
                  <ViewProducts
                    isActive={isActive}
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                  />
                </div>
                <div>
                  <BillHistory
                    isActive={isActive}
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    {user?.firstName || "User"}
                  </span>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-5 h-5",
                      },
                    }}
                    afterSignOutUrl="/"
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
