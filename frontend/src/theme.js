import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark', // Ensures a dark theme
        primary: {
            main: '#CFAF6F', // Rich golden color
        },
        secondary: {
            main: '#cbad7c', // Deep grayish gold
        },
        background: {
            default: '#121212', // Dark slate background
            paper: '#1E1E1E', // Slightly lighter for cards/modals
        },
        text: {
            primary: '#E0E0E0', // Light gray for readability
            secondary: '#B0B0B0', // Softer gray for subtext
        },
    },
    // typography: {
    //     fontFamily: "'Inter', sans-serif", // Clean & modern font
    //     h1: { fontWeight: 700 },
    //     h2: { fontWeight: 600 },
    //     h3: { fontWeight: 500 },
    //     body1: { fontSize: '1rem' },
    //     button: { textTransform: 'none' }, // More natural button text
    // },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', 
                    padding: '8px 16px',
                    // '&:hover': {
                    //     backgroundColor: '#B89554',
                    // },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1E1E1E', // Dark card background
                    borderRadius: '10px',
                },
            },
        },
    },
});

export default theme;
