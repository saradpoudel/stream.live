import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MatchDetail() {
  const { matchId } = useParams();  // Get the full match ID from the URL
  const [streams, setStreams] = useState([]);
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use a regular expression to extract the match ID correctly
  const extractMatchId = (matchId) => {
    const regex = /^(.*?)-\d+$/; // This captures everything before the last hyphen and digits.
    const match = matchId.match(regex);
    return match ? match[1] : matchId; // Return the extracted match ID, or the full matchId if no match
  };

  useEffect(() => {
    const fetchMatchDetails = async () => {
      setLoading(true);
      try {
        // Extract the correct match ID from the URL
        const correctMatchId = extractMatchId(matchId);

        // Fetch stream data for the selected match
        const streamResponse = await axios.get(`https://streamed.su/api/stream/alpha/${correctMatchId}`);
        setStreams(streamResponse.data);

        // Fetch match details (e.g., title, poster)
        const matchInfoResponse = await axios.get(`https://streamed.su/api/matches/${correctMatchId}`);
        setMatchDetails(matchInfoResponse.data);
      } catch (error) {
        console.error('Error fetching match details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId]); // Re-run this effect when the matchId changes

  if (loading) {
    return <p className="text-center text-xl">Loading match details...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">{matchDetails?.title}</h1>
      {matchDetails?.poster && (
        <img
          src={`https://streamed.su/api/images/proxy/${matchDetails.poster.split('/')[3]}.webp`}
          alt={matchDetails.title}
          className="w-full h-64 object-cover mb-6"
        />
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Choose Your Stream</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {streams.map((stream) => (
            <a
              key={stream.streamNo}
              href={stream.embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-center"
            >
              {stream.source.toUpperCase()} - {stream.language} {stream.hd ? '(HD)' : '(SD)'}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}