import { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from '../../Context/ThemeContext'
import { ContactContext } from '../../Context/ContactContext'
import './SettingsMenu.css'

export default function SettingsMenu() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { markAllContactsAsRead } = useContext(ContactContext)
    const [open, setOpen] = useState(false)
    const containerRef = useRef(null)

    // Cierro el desplegable al tocar afuera o presionar Escape
    useEffect(() => {
        if (!open) return

        function handlePointerDown(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        function handleKeyDown(event) {
            if (event.key === 'Escape') setOpen(false)
        }

        document.addEventListener('mousedown', handlePointerDown)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('mousedown', handlePointerDown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [open])

    function handleToggleTheme() {
        toggleTheme()
        setOpen(false)
    }

    function handleMarkAllRead() {
        markAllContactsAsRead()
        setOpen(false)
    }

    return (
        <div className='settings-menu' ref={containerRef}>
            <button
                type='button'
                className='settings-menu-btn'
                aria-label='Configuración'
                aria-haspopup='menu'
                aria-expanded={open}
                title='Configuración'
                onClick={() => setOpen((prevOpen) => !prevOpen)}
            >
                <svg viewBox='0 0 24 24' width='22' height='22' fill='currentColor' aria-hidden='true'>
                    <circle cx='12' cy='5' r='2' />
                    <circle cx='12' cy='12' r='2' />
                    <circle cx='12' cy='19' r='2' />
                </svg>
            </button>

            {open && (
                <div className='settings-menu-list' role='menu'>
                    <button
                        type='button'
                        className='settings-menu-item'
                        role='menuitem'
                        onClick={handleToggleTheme}
                    >
                        <span className='settings-menu-label'>Tema</span>
                        <span className='settings-menu-value'>{theme === 'dark' ? 'Oscuro' : 'Claro'}</span>
                    </button>
                    <button
                        type='button'
                        className='settings-menu-item'
                        role='menuitem'
                        onClick={handleMarkAllRead}
                    >
                        <span className='settings-menu-label'>Marcar todos como leídos</span>
                    </button>
                </div>
            )}
        </div>
    )
}
