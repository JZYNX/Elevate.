import React from "react";
import styled from "styled-components";
import ReactSearchBox from "react-search-box";
import SearchIcon from '@mui/icons-material/Search';

const SearchBoxContainer = styled.div`
    position: absolute;
    top: 1rem;
    right: 3rem;
    z-index: 999;
`

export default function SearchBar(props) {
    const data = [
        {
        key: "john",
        value: "John Doe",
        },
        {
        key: "jane",
        value: "Jane Doe",
        },
        {
        key: "mary",
        value: "Mary Phillips",
        },
        {
        key: "robert",
        value: "Robert",
        },
        {
        key: "karius",
        value: "Karius",
        },
    ];

    return (
        <SearchBoxContainer>
            <ReactSearchBox
                placeholder="Search"
                value="Doe"
                data={data}
                callback={(record) => console.log(record)}
                inputHeight="1.5rem"
                inputBorderColor="hsla(278, 69%, 38%, 0.01)"
                inputBackgroundColor="hsla(278, 69%, 38%, 0.11)"
                leftIcon={<SearchIcon fontSize=""/>}
                iconBoxSize={"2rem"}
            />
        </SearchBoxContainer>
      
    );
}