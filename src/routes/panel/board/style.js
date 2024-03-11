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
    min-height: 200px;
    height: auto;
    margin-bottom: 1rem;
    border-radius: .5rem;
    padding: .8rem .8rem 0 .8rem;
    position: relative;
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
        .img{
            height: 50px;
            width: 50px;
            border-radius: 50px;
            overflow: hidden;
            border: 1px solid #EEF2F4;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .post-info{
            h6{
                margin: 0;
                font-size: .9rem;
                font-weight: 500;
                margin: .5rem 0 .2rem 0;
                span{
                    color: black;
                    font-size: 1rem;
                    font-weight: 700;
                    &:first-child {
                        margin-right: .5rem; 
                    }

                    &:last-child {
                        margin-left: .5rem;
                    } 
                }
            }
            p{
                margin: 0;
                color: grey;
                font-size: .8rem;
            }
        }
        .skeleton-author{
            width: 160px;
            margin-top: .4rem;
        }
    }
    .skeleton-content{
        margin-top: .4rem;
    }
    .content{
        margin-top: .4rem;
        padding: 0 1rem;
        p{
            font-size: 1rem;
            line-height: 1.5rem;
        }
    }
    .post-action{
        height: 50px;
        padding-right: 1rem;
        margin: 0;
        display: flex;
        gap: 1.4rem;
        padding: 0 1rem;
        .action-el{
            display: flex;
            align-items: center;
            gap: .6rem;
            .fa-heart{
                cursor: pointer;
            }
            p{
                font-size: .7rem;
            }
        }
    }
    .add-comment-area{
        height: 50px;
        width: 100%;
        padding: 0 1rem 0 1rem;
        form{
            display: flex;
            input[type="text"]{
                background-color: var(--gray);
                padding: .4rem .8rem;
                width: 88%;
                border: 1px solid var(--main-color);
            }
            button[type="submit"]{
                background-color: var(--main-color);
                border: none;
                cursor: pointer;
                width: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 25px;
                    height: 25px;
                    margin: 0;
                }
            }
        }
    }
    .comment-area{
        padding: 0 1rem;
        .comment{
            width: 100%;
            height: auto;
            .img{
                width: 35px !important;
                height: 35px !important;
                border-radius: 35px !important;
            }
            .post-info{
                h6{
                    margin: 0 0 .1rem 0;
                    span{
                        margin-left: 0 !important;
                        color: black;
                        font-size: .8rem;
                        font-weight: 600;
                    }
                }
                p{
                    font-size: .7rem;
                }
            }
            .comment-content{
                margin-top: .4rem;
                padding: 0 1rem;
                p{
                    font-size: .9rem;
                    line-height: 1.4rem;
                }
            }
        }
        .show-more{
            color: #54B1F6;
            font-size: .7rem;
            font-weight: 700;
            cursor: pointer;
        }
    }
    
`;