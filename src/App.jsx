import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const categories = ["football", "cricket", "basketball", "tennis", "billiards", "hockey"]; // predefined categories

export default function App() {
  const [matches, setMatches] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('https://streamed.su/api/matches/all');
        const categorizedMatches = categorizeMatches(response.data);
        setMatches(categorizedMatches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const categorizeMatches = (matches) => {
    let categorized = {};
    categories.forEach((category) => {
      categorized[category] = matches.filter((match) => match.category === category);
    });
    return categorized;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Live Sports Streaming</h1>
      
      {/* Category Slider */}
      <div className="flex overflow-x-auto space-x-6 mb-8">
        {categories.map((category) => (
          <div key={category} className="flex-none w-1/4">
            <h2 className="font-bold text-xl text-center mb-4">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div className="space-y-4">
              {matches[category]?.map((match) => (
                <div key={match.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={match.poster ? `https://streamed.su/api/images/proxy/${match.poster.split('/')[3]}.webp` : '/fallback-image.jpg'}
                    alt={match.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-xl">{match.title}</h3>
                    <p className="text-sm text-gray-500">Date: {new Date(match.date).toLocaleDateString()}</p>
                    <Link
                      to={`/match/${match.id}`}  // Navigate to the match detail page
                      className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                      Watch
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}