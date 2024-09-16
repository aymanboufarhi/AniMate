import React, { useState, useEffect } from 'react';
import Header from './Header';
import AnimeCard from './AnimeCard';
import './App.css';

function App() {
  const [animes, setAnimes] = useState([]);
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [relatedAnimes, setRelatedAnimes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then(response => response.json())
      .then(data => {
        setAnimes(data);
        setFilteredAnimes(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredAnimes(animes);
    } else {
      setFilteredAnimes(
        animes.filter(anime =>
          anime.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, animes]);

  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  const handleAnimeClick = (anime) => {
    setSelectedAnime(anime);

    // Extract and clean the genres of the selected anime
    const selectedGenres = new Set(anime.genre.split(',').map(g => g.trim()));
    
    console.log('Selected Anime:', anime);
    console.log('Selected Genres:', selectedGenres);

    // Find related animes
    const related = animes.filter(a => {
      const hasSameClass = a.clas === anime.clas;
      const hasSimilarGenre = a.genre.split(',').map(g => g.trim()).some(genre => selectedGenres.has(genre));
      
      // Log for debugging
      console.log('Comparing with Anime:', a);
      console.log('Has Same Class:', hasSameClass);
      console.log('Has Similar Genre:', hasSimilarGenre);
      
      return hasSameClass && hasSimilarGenre && a.id !== anime.id;
    });

    const shuffled = shuffleArray(related);
    setRelatedAnimes(shuffled.slice(0, 6)); // Take the first 4 after shuffling

    console.log('Related Animes:', shuffled.slice(0, 4));
  };

  const handleBackClick = () => {
    setSelectedAnime(null);
    setRelatedAnimes([]);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="anime-gallery">
        {selectedAnime ? (
          <div>
            <button onClick={handleBackClick} className="back-button">
              Back to All Animes
            </button>
            <h2>{selectedAnime.title}</h2>
            <div className="related-animes">
              {relatedAnimes.map(anime => (
                <AnimeCard key={anime.id} anime={anime} onClick={() => handleAnimeClick(anime)} />
              ))}
            </div>
          </div>
        ) : (
          filteredAnimes.length > 0 ? (
            filteredAnimes.map(anime => (
              <div className="anime-card" key={anime.id}>
                <AnimeCard anime={anime} onClick={() => handleAnimeClick(anime)} />
              </div>
            ))
          ) : (
            <p>No animes found.</p>
          )
        )}
      </div>
    </div>
  );
}

export default App;