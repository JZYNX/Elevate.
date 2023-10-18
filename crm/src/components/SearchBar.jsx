import React, { useState } from "react";
import styled from "styled-components";
import ReactSearchBox from "react-search-box";
import SearchIcon from '@mui/icons-material/Search';

const SearchBoxContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 3rem;
  z-index: 999;
`;

export default function SearchBar(props) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    const newValue = e;
    setSearchValue(newValue);
    props.onEnterKeyPress(newValue);
  };

  return (
    <SearchBoxContainer>
        <ReactSearchBox
            placeholder="Search"
            value={searchValue}
            inputHeight="1.5rem"
            inputBorderColor="hsla(278, 69%, 38%, 0.01)"
            inputBackgroundColor="hsla(278, 69%, 38%, 0.11)"
            leftIcon={<SearchIcon fontSize=""/>}
            iconBoxSize={"1.75rem"}
            onChange={handleInputChange}
        />
    </SearchBoxContainer>
  );
}
