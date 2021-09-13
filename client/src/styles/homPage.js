import { createGlobalStyle } from "styled-components";

export const Home = createGlobalStyle`
body{
    height: 100vh;
    margin: 0;
    background-color: gray;
}
.container{
    position: relative;
    box-sizing: border-box;
    padding-right: 60px;
    margin: 0;
    padding: 0;
    margin-right: 500px;
}
ul{
    position: relative;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    width: 100vw;
    /* height: 100px; */
}
h1{
    font-size: 55px;
}
.more{
    position: relative;
    font-size: 75px;
    float: right;
    margin-right: 250px;
    height: 20px;
    width: 20px;
    margin-top: 20px;
}
.login{
    display: block;
    float: right;
    padding: 15px 15px;
    cursor: pointer;
    /* color: white; */
    text-align: center;
    text-decoration: none;
}
.player-wrapper{
    display: flex;
    margin-bottom: 20px;
    padding: 50px;
}
`