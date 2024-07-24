import { Image } from "rebass";
import styled from "@emotion/styled";
import logo from "../assets/beatmusic.png";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import SongForm from "./SongForm";

const Header = () => {
  const Navbar = styled.div`
    width: 100vw;
    box-shadow: 0 0.2em 0.7em -0.1em rgb(0, 0, 0, 0.1);
  `;
  const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
  `;

  const Create = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.1em;
    font-family: inherit;
    font-weight: 600;
    font-size: 16px;
    padding: 0.3em 1em;
    color: white;
    height: 50px;
    width: 200px;
    background: linear-gradient(
      0deg,
      rgba(255, 61, 0, 1) 0%,
      rgba(250, 194, 100, 1) 100%
    );
    border: none;
    outline: none;
    border-bottom: 3px solid rgb(1300, 60, 40);
    box-shadow: 0 0.5em 0.5em -0.4em rgb(0, 0, 0, 0.5);
    letter-spacing: 0.05em;
    border-radius: 20em;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      filter: brightness(1.2);
      color: rgb(0, 0, 0, 0.5);
    }
  `;

  const [addingSong, setAddingSong] = useState<boolean>(false);

  const handleAdd = () => {
    setAddingSong(true); // Set the song to be edited
  };

  const handleCloseForm = () => {
    setAddingSong(false); // Close the form
  };

  return (
    <Navbar>
      <Content>
        <Image
          src={logo}
          sx={{
            width: ["100px"],
            height: ["100px"],
            alignSelf: "center",
            margin: "20px",
          }}
        />

        <Create onClick={() => handleAdd()}>
          <FaPlus />
          <span>Add Song</span>
        </Create>
      </Content>
      {addingSong && (
        <div>
          <SongForm song={null} onClose={handleCloseForm} />
        </div>
      )}
    </Navbar>
  );
};

export default Header;
