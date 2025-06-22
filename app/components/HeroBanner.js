import { useState, useEffect } from 'react';

export default function HeroBanner({ searchTerm, setSearchTerm, onSearch }) {
  const [currentQuote, setCurrentQuote] = useState(0);

  const fitnessQuotes = [
    "Discipline is choosing between what you want now and what you want most.",
    "Consistency is the mother of mastery.",
    "The groundwork for all happiness is good health.",
    "Take care of your body. It's the only place you have to live.",
    "Fitness is not about being better than someone else. It's about being better than you used to be."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % fitnessQuotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Transform Your Body
        </h1>
        
        <div className="mb-8 h-16 flex items-center justify-center">
          <p className="text-xl md:text-2xl italic font-light transition-opacity duration-500">
            "{fitnessQuotes[currentQuote]}"
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search exercises (e.g., push up, squat, bicep curl)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-6 py-4 text-gray-800 rounded-lg text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-lg transition-colors focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-orange-400">1000+</div>
            <div className="text-lg">Exercises</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-400">50+</div>
            <div className="text-lg">Body Parts</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-400">100+</div>
            <div className="text-lg">Equipment Types</div>
          </div>
        </div>
      </div>
    </div>
  );
}