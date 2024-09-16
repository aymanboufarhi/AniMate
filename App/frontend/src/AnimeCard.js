import React, { useState } from 'react';
import './AnimeCard.css';

const AnimeCard = ({ anime, onClick }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDetailsToggle = (event) => {
    event.stopPropagation();
    setShowDetails(prev => !prev);
  };

  return (
    <div className="anime-card" onClick={() => onClick(anime)}>
      <img src={anime.img_url} alt={anime.title} />
      <h3>{anime.title}</h3>
      <button className="details-button" onClick={handleDetailsToggle}>
        {showDetails ? '−' : '+'}
      </button>
      {showDetails && (
        <div className="anime-details">
          <p><strong>Genres:</strong> {anime.genre}</p>
          <p><strong>Aired:</strong> {anime.aired}</p>
          <p><strong>Episodes:</strong> {anime.episodes}</p>
          <p><strong>Members:</strong> {anime.members}</p>
          <p><strong>Popularity:</strong> {anime.popularity}</p>
          <p><strong>Ranked:</strong> {anime.ranked}</p>
          <p><strong>Score:</strong> {anime.score}</p>
        </div>
      )}
    </div>
  );
};

export default AnimeCard;