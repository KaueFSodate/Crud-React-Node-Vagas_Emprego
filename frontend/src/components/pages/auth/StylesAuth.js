import styled from "styled-components";

export const FormAuth = styled.form`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    width: 22vw;
    height:45vh;
    background-color:#23182D;
    border-radius:10px;
    box-shadow: 6px 2px 10px #C7FFED;
    div{
        width:20vw;
        display:flex;
        justify-content:space-between;
        align-items:center;
        background-color:#23182D;
    }
    
    label {
        color:white;
        margin:0;
        padding:0;
    }
    input {
        width: 12vw;
        height:3vh;
        margin:10px;
        border-radius:10px;
        margin-right:20px;
        
    }
    button{
        width: 7vw;
        height:3vh;
        border-radius:8px;
    }
    p{
        color:white;
        margin:15px;
    }
    a{
        text-decoration:none;
        color:white;
    }
`;          

export const Container = styled.div`
    display:flex;
    width:100vw;
    height:80vh;
    background-color:#3CA6A6;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    h1{
        margin-bottom:25px;
        color:azure;
    }
`;