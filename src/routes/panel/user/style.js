import styled from "styled-components";

export const UserViewStyle = styled.div`
  width: 100%;
    .user-info{
        height: 160px;
        background-color: var(--white);
        border-radius: .6rem;
        width: 96%;
        margin-top: 1rem;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        .flex{
            display: flex;
            gap: .8rem;
            margin: .8rem;
            align-items: center;
            }
            .img{
                height: 75px;
                width: 75px;
                border-radius: 75px;
                overflow: hidden;
                margin-top: .8rem;
                box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .post-info{
                h6{
                    margin: 0;
                    color: black;
                    font-size: 1.1rem;
                    font-weight: 700;
                }
                p{
                    margin: .3rem 0 0 0;
                    color: grey;
                    font-size: .8rem;
                }
            }
            .skeleton-author{
                width: 160px;
                margin-top: .4rem;
            }
            .content{
                padding: 0 1.8rem;
                p{
                    font-weight: 500;
                    font-size: .9rem;
                }
            }
            .skeleton-content{
                width: 90%;
                margin-left: 1.8rem;
            }
        
    }
    .view-overflow{
        overflow-y: scroll;
        padding: 0 1.8rem;
        height: calc(100vh - 308px);
        
        .box{
            margin: .4rem 2rem;
            height: 100px;
            background-color: gray;
        }
    }
`;

export const UserViewBoard = styled.div`
    
`;