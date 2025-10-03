const LandingFooter = () => {
  return (
    <>
      <footer className="py-12 px-8 border-t border-purple-600/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-3xl font-bold gradient-text mb-4">BillG</div>
          <p className="text-gray-400 mb-6">
            Smart Billing & Inventory Management
          </p>
          <div className="flex gap-8 justify-center text-gray-400">
            {["Privacy Policy", "Terms of Service", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-purple-500 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-gray-600 mt-8">
            © 2025 BillG. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};
export default LandingFooter;
