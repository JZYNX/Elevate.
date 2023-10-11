import React, { useState } from "react";
import styled from "styled-components";

const SearchBoxContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 3rem;
  z-index: 999;
`;

export default function SearchBar(props) {
  const [searchValue, setSearchValue] = useState("");

  // Function to handle Enter key press
  const handleEnterKeyPress = async (event) => {
    if (event.key === "Enter") {
      // Pass the search value to the parent component
      await props.onEnterKeyPress(searchValue);
    //   props.setChildSearchValue("");
      setSearchValue("");
    //   await props.onEnterKeyPress(searchValue);

    }
  };

  return (
    <SearchBoxContainer>
      <input
        style={{
          backgroundColor: "hsla(278, 69%, 38%, 0.11)",
          position: "absolute",
          top: "0rem",
          right: "0rem",
          width: "13rem",
        }}
        placeholder="Search"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        onKeyPress={handleEnterKeyPress}
      />
    </SearchBoxContainer>
  );
}
