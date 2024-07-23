// src/components/SongList.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchSongsRequest, deleteSong } from '../redux/slices/songSlice';
import { Song } from '../types/songTypes';
import SongForm from './SongForm';

const SongList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    console.log(id)
    dispatch(deleteSong(id));
  };

  const handleUpdate = (song: Song) => {
    setEditingSong(song); // Set the song to be edited
  };

  const handleCloseForm = () => {
    setEditingSong(null); // Close the form
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Song List</h2>
      <ul>
        {Array.isArray(songs) && songs.map((song: Song) => (
          <li key={song._id}>
            {song.title} - {song.artist} - {song.genre}
            <button onClick={() => handleUpdate(song)}>Update</button>
            <button onClick={() => handleDelete(song._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingSong && (
        <div>
          <SongForm song={editingSong} onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
};

export default SongList;
