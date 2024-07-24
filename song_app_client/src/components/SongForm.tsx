import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addSong, updateSong } from "../redux/slices/songSlice";
import { Song, SongNew } from "../types/songTypes";
import styled from "@emotion/styled";

interface SongFormProps {
  song: SongNew | null;
  onClose: () => void; // Function to call when closing the form
}

interface ActionButtonProps {
  backgroundColor?: string;
  hoverBackgroundColor?: string;
}

const SongForm: React.FC<SongFormProps> = ({ song, onClose }) => {
  const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  const ModalContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 450px;
    width: 100%;
    height: 600px;
  `;

  const Form = styled.form`
    padding: 20px;
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  `;

  const Heading = styled.h4`
    font-size: 20px;
    font-weight: 500;
    font-family: robot;
    text-transform: capitalize;
    line-height: 1rem;
    align-self: center;Heading
    margin: 5px;
  `;

  const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;

    &:focus {
      border-color: rgb(252, 83, 5, 0.75);
      outline: none;
    }
  `;

  const StyledButton = styled.button<ActionButtonProps>`
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: ${(props) => props.backgroundColor || "rgb(252, 83, 5)"};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${(props) =>
        props.hoverBackgroundColor || "rgb(252, 83, 0.75)"};
    }
  `;

  const [title, setTitle] = useState(song?.title || "");
  const [artist, setArtist] = useState(song?.artist || "");
  const [album, setAlbum] = useState(song?.album || "");
  const [genre, setGenre] = useState(song?.genre || "");

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({
    title: null,
    artist: null,
    album: null,
    genre: null,
  });

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSong: SongNew = {
      title,
      artist,
      album,
      genre,
    };

    if (song) {
      const updatedSong: Song = {
        _id: song._id, // Ensure song is not null before accessing _id
        ...newSong,
      };
      dispatch(updateSong(updatedSong));
    } else {
      dispatch(addSong(newSong));
    }
    
    setTitle("");
    setArtist("");
    setAlbum("");
    setGenre("");
    onClose();
  };

  useEffect(() => {
    // Focus on the input field corresponding to the changed state
    if (title !== "") inputRefs.current.title?.focus();
    if (artist !== "") inputRefs.current.artist?.focus();
    if (album !== "") inputRefs.current.album?.focus();
    if (genre !== "") inputRefs.current.genre?.focus();
  }, [title, artist, album, genre]);

  return (
    <Overlay>
      <ModalContainer>
        <Form onSubmit={handleSubmit}>
          <Heading>Add your song</Heading>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            ref={(el) => (inputRefs.current.title = el)}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Artist"
            value={artist}
            ref={(el) => (inputRefs.current.artist = el)}
            onChange={(e) => setArtist(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Album"
            value={album}
            ref={(el) => (inputRefs.current.album = el)}
            onChange={(e) => setAlbum(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Genre"
            value={genre}
            ref={(el) => (inputRefs.current.genre = el)}
            onChange={(e) => setGenre(e.target.value)}
          />
          <StyledButton
            backgroundColor="rgb(252, 83, 5)"
            hoverBackgroundColor="rgb(252, 83, 5, 0.75)"
            type="submit"
          >
            {song ? "Update" : "Add"} Song
          </StyledButton>
          <StyledButton
            backgroundColor="rgb(217,217,217)"
            type="button"
            onClick={onClose}
          >
            Cancel
          </StyledButton>
        </Form>
      </ModalContainer>
    </Overlay>
  );
};

export default SongForm;
