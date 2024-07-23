import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Statistics: React.FC = () => {
  const { songs } = useSelector((state: RootState) => state.songs);

  const totalSongs = songs.length;
  const uniqueArtists = [...new Set(songs.map(song => song.artist))].length;

  const genreCounts: { [key: string]: number } = songs.reduce((acc, song) => {
    acc[song.genre] = (acc[song.genre] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Songs: {totalSongs}</p>
      <p>Unique Artists: {uniqueArtists}</p>
      <h3>Genre Breakdown:</h3>
      <ul>
        {Object.entries(genreCounts).map(([genre, count]) => (
          <li key={genre}>
            {genre}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Statistics;
