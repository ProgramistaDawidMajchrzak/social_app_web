import React from 'react';
import { useSelector } from 'react-redux';
import * as S from './style';

function Board() {
    const user = useSelector((state) => state.user);

    return (
        <S.BoardStyle>

        </S.BoardStyle>
    )
}

export default Board;