const LandingStats = () => {
  return (
    <>
      <section className="py-20 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-12 border border-purple-600/30 backdrop-blur-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[
                { title: "Fast", desc: "Lightning-quick bill generation" },
                {
                  title: "Simple",
                  desc: "Intuitive interface, no learning curve",
                },
                { title: "Powerful", desc: "Complete business management" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-5xl font-black gradient-text mb-2">
                    {stat.title}
                  </div>
                  <p className="text-gray-400">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default LandingStats;