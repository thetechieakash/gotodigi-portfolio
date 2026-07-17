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
    }, [dark])

    return (
        <ThemeContext.Provider value={{ dark, toggle: () => setDark(p => !p) }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)