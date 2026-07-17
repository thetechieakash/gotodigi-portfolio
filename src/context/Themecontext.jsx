import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem('theme')
        return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: light)').matches
    })

    useEffect(() => {
        document.body.classList.toggle('dark', dark)
        localStorage.setItem('theme', dark ? 'dark' : 'light')
        const themeColor = dark ? "#0a0a0a" : "#ffffff";

        let meta = document.querySelector('meta[name="theme-color"]');

        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "theme-color";
            document.head.appendChild(meta);
        }

        meta.content = themeColor;
    }, [dark])

    return (
        <ThemeContext.Provider value={{ dark, toggle: () => setDark(p => !p) }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)