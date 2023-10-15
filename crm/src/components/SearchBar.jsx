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

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === "Enter") {
  //       props.onEnterKeyPress(searchValue);
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [searchValue, props]);

  const handleInputChange = (e) => {
    const newValue = e;
    setSearchValue(newValue);
    props.onEnterKeyPress(newValue);
  };
  // // Function to handle Enter key press
  // const handleEnterKeyPress = async (event) => {
  //   if (event.key === "Enter") {
  //     // Pass the search value to the parent component
  //     await props.onEnterKeyPress(searchValue);
  //   //   props.setChildSearchValue("");
  //     setSearchValue("");
  //   //   await props.onEnterKeyPress(searchValue);

  //   }
  // };

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

            // onChange={(e) => setSearchValue(e)}
            // onKeyDown={handleEnterKeyPress}
        />
    </SearchBoxContainer>
  );

  // return (
  //   <SearchBoxContainer>
  //     <input
  //       style={{
  //         backgroundColor: "hsla(278, 69%, 38%, 0.11)",
  //         position: "absolute",
  //         top: "0rem",
  //         right: "0rem",
  //         width: "13rem",
  //       }}
  //       placeholder="Search"
  //       onChange={(e) => setSearchValue(e.target.value)}
  //       value={searchValue}
  //       onKeyPress={handleEnterKeyPress}
  //     />
  //   </SearchBoxContainer>
  // );
}
