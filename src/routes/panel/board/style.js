import styled from "styled-components";

export const BoardStyle = styled.div`
    width: 100%;
    .board-overflow{
        overflow-y: scroll;
        padding: 0 1.8rem;
        height: calc(100vh - 62px);
    }
`;

export const BoardEl = styled.div`
    background-color: var(--white);
    border: 2px solid #EEF2F4;
    height: 200px;
    margin-bottom: 1rem;
    border-radius: .5rem;
    padding: .8rem;
    &:first-child {
        margin-top: 1.6rem; 
    }

    &:last-child {
        margin-bottom: 1.6rem;
    }
    .flex{
        display: flex;
        gap: .8rem;
        margin-bottom: .8rem;
        .skeleton-img{
            height: 50px;
            width: 50px;
            border-radius: 50px;
        }
        .skeleton-author{
            width: 160px;
            margin-top: .4rem;
        }
    }
    .skeleton-content{
        margin-top: .4rem;
    }
    
`;