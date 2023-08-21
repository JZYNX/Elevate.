import React from 'react';
import styled from 'styled-components';
import {SidebarData} from './SidebarData';

const SidebarContainer = styled.div`
    height: 100%;
    width: 20%;
    background-color: #0a1172;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
`;

const SidebarTitle = styled.div`
    display: flex;
    flex-direction: row;
    color: white;
    justify-content: center;
    align-items: center;
    padding-top: 5vh;

    h2.sidebar-title {
        font-size: 36px;
        font-weight: Normal;
        letter-spacing: 0.06em;
        color: white;
    }
`;

const SidebarList = styled.div`
    height: auto;
    padding-top: 30px;
    width: 100%;
`;

const ListrowItem = styled.div`
    width: 100%;
    height: 12vh;
    background-color: #0a1172;
    list-style-type: none;
    margin: 0;
    display: flex;
    flex-direction: row;
    color: white;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
        background-color: rgb(0,0,0,0.2);
    }
`;

const IconContainer = styled.div`
    flex: 30%;
    display: grid;
    place-items: center;
`;

const TitleContainer = styled.div`
    flex: 70%;
    h3.sidebar-text {
        font-size: 16px;
        letter-spacing: 0.06em;
        color: white;
    }
`;

function Sidebar() {
    return (
        <SidebarContainer> 
            <SidebarTitle><h2 className="sidebar-title"><strong>ELEVATE.</strong></h2></SidebarTitle>
            <SidebarList>
                {SidebarData.map((val, key)=>{
                    return (
                        <ListrowItem 
                            key={key} 
                            onClick={()=>{
                                window.location.pathname = val.link
                                }}
                        > 
                        <IconContainer>{val.icon}</IconContainer> 
                        <TitleContainer><h3 className="sidebar-text">{val.title}</h3></TitleContainer>
                        </ListrowItem>
                    );  
                })}
            </SidebarList>
        </SidebarContainer>
    )
}

export default Sidebar;