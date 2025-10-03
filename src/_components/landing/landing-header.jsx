import { Link } from "react-router-dom";

const LandingHeader = () => {
  const data = [
    { href: "#home", title: "Home" },
    { href: "#features", title: "Features" },
    { href: "#showcase", title: "ShowCase" },
    { href: "#contact", title: "Contact" },
  ];
  return (
    <>
      <nav className="fixed top-0 w-full px-8 py-6 flex justify-between items-center bg-black/80 backdrop-blur-lg z-50 border-b border-purple-600/30">
        <div className="text-3xl font-bold gradient-text tracking-wider">
          BillG
        </div>
        <ul className="flex gap-8">
          {data.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-white hover:text-purple-500 transition-all duration-300 relative group"
              >
                {item.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
export default LandingHeader;
