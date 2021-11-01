import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0 115px;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
        font-family: 'Inter', sans-serif;
    }
    :root {
        --color-primary: #27AE60;
        --color-secondary: #EB5757;
        --gray-600: #333333;
        --grey-300: #828282;
        --grey-100: #E0E0E0;
        --grey-0: #F5F5F5;
        --Negative: #E60000;
        --Warning: #FFCD07;
        --Sucess: #168821;
        --Information: #155BCB;
        --background-color:#dfe6e9;
    }
    body{
        background-color: var(--background-color);
        margin: 0 115px;
        font-size: 14px;
        width: 100%;
        height: 100%;
        letter-spacing: 0.8px;
    }
    h1{
        font-weight: 700;
        color: var(--gray-600-color);
        font-size: 26px;
        line-height: 34px;
    }
    input, button {
        font-family: 'Inter', sans-serif;
        font-size: 1rem;
    }
    button{
        cursor: pointer;
    }
    a{
        text-decoration: none;
    }
    ul{
        list-style: none;
    }
`;