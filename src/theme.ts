// $background0: #1d2021;
// $background1: #282828;
// $background2: #3c3836;
// $background3: #504945;
// $background4: #665c54;
// $background5: #7c6f64;
// $background6: #32302f;
// $background-alt1: #222120;
// $foreground: #ebdbb2;
// $foreground0: #fbf1c7;
// $foreground1: $foreground;
// $foreground2: #d5c4a1;
// $foreground3: #bdae93;
// $foreground4: #a89984;
// $gray-light0: #928374;
// $gray-light1: #a89984;
// $gray-dark: #60574e;
// $red-dark: #9d0006;
// $red-light0: #cc241d;
// $red-light1: #fb4934;
// $green-light0: #98971a;
// $green-light1: #b8bb26;
// $green-dark: #79740e;
// $yellow-light0: #d79921;
// $yellow-light1: #fabd2f;
// $yellow-dark: #b57614;
// $blue-light0: #458588;
// $blue-light1: #83a598;
// $blue-dark: #076678;
// $orange-light0: #d65d0e;
// $orange-light1: #fe8019;
// $orange-dark: #af3a03;
// $purple-light0: #b16286;
// $purple-light1: #d3869b;
// $purple-dark: #8f3f71;
// $aqua-light0: #689d6a;
// $aqua-light1: #8ec07c;
// $aqua-dark: #427b58;
// // Extras
// $aqua: #689d6a;
// $magenta: #bb9af7;
// $cyan: #7dcfff;
// $white: $foreground;
// $background: $background1;
// $black: $background0;


import { createTheme, ThemeOptions } from '@mui/material/styles';


const lightColorScheme: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#458588', // $blue-light0
        },
        secondary: {
            main: '#d65d0e', // $orange-light0
        },
        background: {
            default: '#fbf1c7', // $foreground0
            paper: '#f2e5bc', // $background-alt1
        },
        text: {
            primary: '#3c3836', // $background2
            secondary: '#504945', // $background3
        },
        error: {
            main: '#cc241d', // $red-light0
        },
        warning: {
            main: '#d79921', // $yellow-light0
        },
        info: {
            main: '#458588', // $blue-light0
        },
        success: {
            main: '#98971a', // $green-light0
        },
    },
};

const darkColorScheme: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#458588', // $blue-light0
        },
        secondary: {
            main: '#d65d0e', // $orange-light0
        },
        background: {
            default: '#1d2021', // $background0
            paper: '#282828', // $background1
        },
        text: {
            primary: '#ebdbb2', // $foreground
            secondary: '#d5c4a1', // $foreground2
        },
        error: {
            main: '#cc241d', // $red-light0
        },
        warning: {
            main: '#d79921', // $yellow-light0
        },
        info: {
            main: '#458588', // $blue-light0
        },
        success: {
            main: '#98971a', // $green-light0
        },
    },
};

const lightTheme = createTheme(lightColorScheme);
const darkTheme = createTheme(darkColorScheme);

export { lightTheme, darkTheme };

