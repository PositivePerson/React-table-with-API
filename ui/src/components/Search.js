import React from 'react'

import SearchIcon from '@material-ui/icons/Search';

import styled from 'styled-components'

const SearchBar = styled.input`
    font-size: 14px;
    box-sizing: border-box;
    height: 38px;
    width: 263px;
    border: 2px solid #D4D7E1;
    background-color: #F2F3F6;
    border-radius: 2em;

    padding: 13px 0 14px 49px;
    outline: none;
    
    &::-webkit-input-placeholder {
        color: #A9AEC1;
      }
`;

const SearchComponent = styled.div`
  position: relative;
  display: flex;  
  align-items: center;
`

const StyledSearchIcon = styled(SearchIcon)`
    margin-left: 1rem;
    position: absolute;
    color: #A9AEC1;

    && {
        width: 21px;
    }
`;

const Search = ({ filterText, setFilterText }) => {
    return (
        <SearchComponent>
            <StyledSearchIcon />
            <SearchBar id='search' type='text' placeholder='Search' aria-label='Search Input' value={filterText} onChange={e => setFilterText(e.target.value)} />
        </SearchComponent>
    )
}

export default Search
