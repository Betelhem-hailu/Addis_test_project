// src/components/SongList.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchSongsRequest, deleteSong } from "../redux/slices/songSlice";
import { Song } from "../types/songTypes";
import SongForm from "./SongForm";
import styled from "@emotion/styled";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const SongList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, loading, error } = useSelector(
    (state: RootState) => state.songs
  );
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [genre, setGenre] = useState<string>("");
  const [album, setAlbum] = useState<string>("");

  useEffect(() => {
    dispatch(fetchSongsRequest({ genre, album }));
  }, [dispatch, genre, album]);

  const handleDelete = (id: number) => {
    console.log(id);
    dispatch(deleteSong(id));
  };

  const handleUpdate = (song: Song) => {
    setEditingSong(song); // Set the song to be edited
  };

  const handleCloseForm = () => {
    setEditingSong(null); // Close the form
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(event.target.value);
  };

  const handleAlbumChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAlbum(event.target.value);
  };

  console.log("songs", songs);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  interface ActionButtonProps {
    textColor?: string;
    hoverTextColor?: string;
  }

  const Container = styled.ul`
    width: 95vw;
  `;

  const Heading = styled.h2`
    font-size: 40px;
    font-weight: 700;
    font-family: robot;
    text-transform: uppercase;
    line-height: 2rem;
    align-self: center;
    margin: 40px;
  `;

  const Filters = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  `;

  const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 14px;
  `;

  const Select = styled.select`
    padding: 8px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  `;

  const Menu = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 10px;
  `;

  const List = styled.li`
    height: 50px;
    display: flex;
    align-items: bottom;
    gap: 50px;
    box-shadow: 0 0.2em 0.3em -0.1em rgb(0, 0, 0, 0.1);
  `;

  const Item = styled.div`
    text-transform: capitalize;
    text-decoration: none;
    color: rgb(27, 27, 27);
    position: relative;
    text-align: left;
    width: 400px;
    font-size: 16px;
    font-weight: 200;
  `;
  const ActionButton = styled.button<ActionButtonProps>`
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #ffffff;
    border: none;
    color: ${(props) => props.textColor || "rgba(0, 0, 0, 0.85)"};
    cursor: pointer;
    display: inline-flex;
    font-family: system-ui, -apple-system, system-ui, "Helvetica Neue",
      Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    line-height: 1.25;
    padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
    text-decoration: none;
    transition: all 250ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    width: auto;
    height: 2.5rem;
    &:hover {
      border-color: rgba(0, 0, 0, 0.15);
      box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
      color: ${(props) => props.hoverTextColor || "rgba(0, 0, 0, 0.65)"};
      transform: translateY(-1px);
    }
  `;

  const uniqueGenres = Array.from(new Set(songs.map((song) => song.genre)));
  const uniqueAlbums = Array.from(new Set(songs.map((song) => song.album)));

  return (
    <Container>
      <Heading>Song List</Heading>
      <Filters>
        <Label>
          Filter by Genre:
          <Select value={genre} onChange={handleGenreChange}>
            <option value=''>All</option>
            {uniqueGenres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </Select>
        </Label>
        <Label>
          Filter by Album:
          <Select value={album} onChange={handleAlbumChange}>
            <option value=''>All</option>
            {uniqueAlbums.map((album, index) => (
              <option key={index} value={album}>
                {album}
              </option>
            ))}
          </Select>
        </Label>
      </Filters>
      <Menu>
        {Array.isArray(songs) &&
          songs.map((song: Song) => (
            <List key={song._id}>
              <Item>{song.title}</Item>
              <Item>{song.artist} </Item>
              <Item> {song.genre}</Item>
              <ActionButton
                textColor="#04BE04"
                hoverTextColor="rgba(4, 190, 4, 0.5)"
                onClick={() => handleUpdate(song)}
              >
                <FiEdit3 size={24} />
                Update
              </ActionButton>
              <ActionButton
                textColor="#FF0004"
                hoverTextColor="rgba(255, 0, 4, 0.5)"
                onClick={() => handleDelete(song._id)}
              >
                <RiDeleteBin6Line size={24} />
                Delete
              </ActionButton>
            </List>
          ))}
      </Menu>
      {editingSong && (
        <div>
          <SongForm song={editingSong} onClose={handleCloseForm} />
        </div>
      )}
    </Container>
  );
};

export default SongList;
