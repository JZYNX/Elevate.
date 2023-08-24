import React from 'react';
import styled from 'styled-components';
import {SidebarData} from './SidebarData';

const SidebarContainer = styled.div`
    height: 100%;
    width: 15%;
    // background-color: rgba(112, 38, 112, 0.5);
    background: linear-gradient(to bottom, #87CEEB, #D34DD2);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 0px 19px rgba(0, 0, 0, 0.5);
`;

const SidebarTitle = styled.div`
    display: flex;
    flex-direction: row;
    color: white;
    justify-content: center;
    align-items: center;
    h2.sidebar-title {
        font-size: 40px;
        font-weight: Normal;
        letter-spacing: 0.00em;
        font-family: 'Poppins', sans-serif;
        color: #0A0072;
    }
`;

const SidebarList = styled.div`
    height: auto;
    padding-top: 80px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ListrowItem = styled.div`
    width: 85%;
    height: 6.5vh;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    font-family: 'Poppins', sans-serif;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    background-color: white;
    justify-content: center;
    align-items: center;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    border-radius: 0.7em;
    // background-color: ${props => props.isActive ? 'rgba(255,255,255, 1)' : 'rgba(255,255,255, 1)'  };
    transition: background-color 0.3s;
    
    &:hover {
        cursor: pointer;
        background-color: rgba(255,255,255,0.8);
    }
`;

const IconContainer = styled.div`
    flex: 30%;
    display: grid;
    place-items: center;
    color: #0A0072  ;
`;

const TitleContainer = styled.div`
    flex: 70%;
    h3.sidebar-text {
    font-size: 1em;
        letter-spacing: 0.01em;
        color: #0A0072;
        // font-weight: ${props => props.isActive ? "Bold" : "normal"};
        font-weight: normal;
    }
`;

function Sidebar() {
    return (
        <SidebarContainer> 
            <SidebarTitle><h2 className="sidebar-title"><strong>elevate.</strong></h2></SidebarTitle>
            <SidebarList>
                {SidebarData.map((val, key)=>{
                    return (
                        <ListrowItem 
                            key={key}
                            isActive={window.location.pathname === val.link} // Add an active state based on the current URL
                            onClick={()=>{
                                window.location.pathname = val.link;
                            }}
                        > 
                            <IconContainer>{val.icon}</IconContainer> 
                            <TitleContainer><h3 className="sidebar-text">{val.title}</h3></TitleContainer>
                        </ListrowItem>
                    );  
                })}
            </SidebarList>
        </SidebarContainer>
    );
}

export default Sidebar;
