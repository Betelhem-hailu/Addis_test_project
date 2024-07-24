import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import styled from '@emotion/styled';

const Statistics: React.FC = () => {
  const { songs } = useSelector((state: RootState) => state.songs);

  const totalSongs = songs.length;
  const uniqueArtists = [...new Set(songs.map(song => song.artist))].length;

  const genreCounts: { [key: string]: number } = songs.reduce((acc, song) => {
    acc[song.genre] = (acc[song.genre] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const Menu = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap:30px
    `;

    const Item = styled.a`
    text-transform: uppercase;
    text-decoration: none;
    color: rgb(27, 27, 27);
    padding: 10px 30px;
    border: 1px solid;
    border-color: rgb(252, 83, 5);
    border-radius: 1000px;
    display: inline-block;
    transition: all 0.2s;
    position: relative;
    text-align: center;
  `;


  return (
    <div>
      <Menu>
      <Item>{totalSongs} Songs</Item>
      <Item>{uniqueArtists} Artists</Item>
      {Object.entries(genreCounts).map(([genre, count]) => (
      <Item key={genre}>{count} {genre}</Item>
    ))}
      
    </Menu>
    </div>
  );
};

export default Statistics;
