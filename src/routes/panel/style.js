import styled from "styled-components";

export const LayoutStyle = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    .panel-sidebar{
        width: 18%;
        background-image: linear-gradient(45deg, #4c5d70, var(--main-color));
        .user-element{
            width: 100%;
            margin-top: 1.6rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            .user-img{
                width: 80px;
                height: 80px;
                border-radius: 80px;
                border: .3rem solid white;
                overflow: hidden;
                box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            h5{
                color: var(--gray);
                font-size: 1rem;
                font-weight: 600;
                margin: .7rem 0;
            }
        }
        .user-info{
            color: var(--gray);
            display: flex;
            justify-content: space-around;
            width: 100%;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--gray);
            .info-el{
                text-align: center;
                margin-top: .5rem;
                h6{
                    font-size: 1rem;
                    margin: 0;
                }
                p{
                    font-size: .7rem;
                    margin: .2rem;
                }
            }   
        }
    }
    .panel-main{
        width: 82%;
        .panel-header{
            height: 60px;
            background-color: var(--white);
            border-bottom: 2px solid #EEF2F4;
            display: flex;
            justify-content: flex-end;
            padding: 0 1.6rem;
            align-items: center;
            gap: 1rem;
            .icon{
                width: 30px;
                img{
                    width: 26px;
                    position: relative;
                    right: 5px;
                }
                i{
                    cursor: pointer;
                }
            }
        }
        .panel-flex{
            display: flex;
            height: calc(100vh - 62px);
            .panel-content{
                width: 71%;
                background-color: var(--gray);
            }
            .right-side{
                width: 29% !important;
                position: relative;
            }
        }
    }
`;

export const Navigation = styled.div`
    width: 100%;
    margin-top: 1.6rem;
    ul{
        list-style: none;
        padding: 0;
        margin: 0;
        li{
            height: 50px;
            width: 100%;
            margin: 0;
            a{
                margin: 0;
                height: 100%;
                padding-left: 2rem;
                display: flex;
                align-items: center;
                border-left: 4px solid transparent;
                text-decoration: none;
                color: var(--gray);
                font-size: .9rem;
                font-weight: 500;
                .icon{
                    width: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }   
                p{
                    margin: 0;
                }
            }
            .active{
                border-left: 4px solid var(--second-color);
                background-color: #65707b;
                color: white !important;
                i{
                    color: white !important;
                }
            }
        }
        
    }
`;

export const Ad = styled.div`
    position: absolute;
    width: 80%;
    height: 300px;
    background-color: var(--gray);
    border-radius: .4rem;
    bottom: 1rem;
    left: 50%;
    transform: translate(-50%, 0);
    img{
        width: 90%;
        height: auto;
        margin-top: 1rem;
        border-radius: .4rem;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
    }
    h4, a, p{
        padding: 0 1rem;
    }
    h4{
        color: black;
        font-weight: 600;
        margin: .2rem 0;
    }
    a{
        text-decoration: none;
        font-size: .7rem;
        font-weight: 600;
        margin: 0;
    }
    p{
        font-size: .6rem;
        color: gray;
        font-weight: 500;
        margin: 0;
    }
`;