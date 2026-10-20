import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext()

export function ThemeContextProvider ({children}){
    const [theme, setTheme] = useState('light')

    // Aplica el tema a toda la interfaz (html[data-theme])
    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])

    function toggleTheme(){
        setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light')
    }

    const providerValues = {
        theme: theme,
        toggleTheme: toggleTheme,
    }
    return (
        <ThemeContext.Provider value={providerValues}>
            {children}
        </ThemeContext.Provider>
    )
}
