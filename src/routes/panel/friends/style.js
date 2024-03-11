import styled from "styled-components";

export const FriendsSidebar = styled.div`
    width: 100%;
    .inv-section{
        height: 36vh;
        margin-top: 2rem;
        h4{
            color: var(--gray);
            margin: 1rem;
        }
        .inv-scrollbar{
            height: 100%;
            overflow-y: scroll;
            padding: 0 1.2rem;
            .no-inv-info{
                padding-left: 1rem;
                p{
                    color: var(--gray);
                    font-size: .9rem;
                    font-weight: 500;
                }
                button{
                    font-weight: 600;
                    font-size: .9rem;
                    width: 9rem;
                }
            }
        }
    }
`;

export const FriendElStyle = styled.div`
    width: 100%;
    height: 70px;
    background-color: var(--gray);
    margin-bottom: .5rem;
    border-radius: .4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .flex{
        margin-left: .8rem;
        display: flex;
        align-items: center;
        height: 100%;
        gap: .8rem;
        .img{
            height: 40px;
            width: 40px;
            border-radius: 40px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .skeleton-author{
            width: 160px;
            margin-top: .2rem;
        }
        .post-info{
            h6{
                font-size: .9rem;
                font-weight: 600;
                margin: 0 0 .2rem 0;
            }
            p{
                margin: 0;
                color: grey;
                font-size: .8rem;
            }
        }
    }
    .inv-action{
        margin-right: .8rem;
        button{
            display: block;
            width: 40px;
            margin: .2rem 0;
            border: none;
            border-radius: .2rem;
            height: 24px;
            cursor: pointer;
        }
        .accept{
            background-color: #117e11;
        }
        .decline{
            background-color: #bf1616;
        }
    }
`;

export const FriendsStyle = styled.div`
    .friends-nav{
        display: flex;
        margin: .8rem 1.4rem;
        a{
            display: block;
            padding: .5rem .7rem;
            border: 2px solid var(--main-color);
            background-color: var(--gray);
            color: var(--main-color);
            text-decoration: none;
            font-size: .7rem;
            font-weight: 700;
            &:first-child {
                border-radius: .4rem 0 0 .4rem;
            }

            &:last-child {
                border-radius: 0 .4rem .4rem 0;
            }
        }
        .active{
            background-color: var(--main-color);
            color: var(--gray);
        }
    }
`;