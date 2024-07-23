import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSong, updateSong } from '../redux/slices/songSlice';
import { Song, SongNew } from '../types/songTypes';

interface SongFormProps {
    song: SongNew;
    onClose: () => void; // Function to call when closing the form
  }

const SongForm: React.FC<SongFormProps> = ({ song, onClose }) => {
  const [title, setTitle] = useState(song?.title || '');
  const [artist, setArtist] = useState(song?.artist || '');
  const [album, setAlbum] = useState(song?.album || '');
  const [genre, setGenre] = useState(song?.genre || '');

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSong: SongNew = {
      title,
      artist,
      album,
      genre
    };

    const updatedSong: Song ={
        _id: song._id,
        ...newSong
    }
    if (song) {
      dispatch(updateSong(updatedSong));
    } else {
      dispatch(addSong(newSong));
    }

    setTitle('');
    setArtist('');
    setAlbum('');
    setGenre('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <input
        type="text"
        placeholder="Album"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <button type="submit">{song ? 'Update' : 'Add'} Song</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default SongForm;
