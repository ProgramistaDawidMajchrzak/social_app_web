import styled from "styled-components";

export const AuthContainer = styled.div`
    height: 100vh;
    display: flex;
    .auth-container{
        width: 100%;
        height: 100%;
        //background-color: var(--main-color);
        background-image: linear-gradient(45deg, var(--main-color), #6f78bd);
        div{
            width: 400px;
            height: 60%;
            position: relative;
            top: 20%;
            left: 10%;
            form{
                h3{
                    color: white;
                    font-size: 1.4rem;
                }
                p{
                    font-size: .8rem;
                    font-weight: 400;
                    color: white;
                    span{
                        a{
                            font-size: 1rem;
                            font-weight: 600;
                            color: var(--second-color);
                            cursor: pointer;
                            text-decoration: none;
                        }
                    }
                }
                .errors{
                    margin: .5rem 0;
                    list-style: none;
                    li{
                        color: #f96363;
                        font-size: .8rem;
                        font-weight: 600;
                    }
                }
            }
        }
    }
    .auth-banner{
        height: 100vh;
        width: 60%;
        img{
            object-fit: contain;
            height: 100%;
            position: absolute;
            right: 0;
        }
    }
`;