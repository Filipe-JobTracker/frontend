import { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {lightTheme, darkTheme} from "./theme.ts";

interface ThemeContextType {
    toggleTheme: () => void;
    theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const CustomThemeProvider = ({ children }: ThemeProviderProps) => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');

    const theme = mode === 'light' ? lightTheme : darkTheme;

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};