import React, { useState } from 'react';
import * as S from './style';
import { NavLink, Outlet } from 'react-router-dom';


function Friends() {
    return (
        <S.FriendsStyle>
            <div className="friends-nav">
                <NavLink to='/friends'>MY FRIENDS</NavLink>
                <NavLink to='/all-people'>ALL PEOPLE</NavLink>
            </div>
            <Outlet />
        </S.FriendsStyle>
    )
}

export default Friends;


