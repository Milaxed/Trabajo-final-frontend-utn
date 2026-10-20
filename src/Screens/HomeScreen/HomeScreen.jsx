import { useContext } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { ContactContext } from '../../Context/ContactContext'

export default function HomeScreen() {
    const { contacts } = useContext(ContactContext)

    return (
        <div className='home-screen home-screen--list'>
            <Sidebar />
            <main className='contenido-principal'>
                <p className='home-empty'>
                    {contacts.length > 0
                        ? 'Seleccioná un contacto para ver la conversación.'
                        : 'Todavía no tenés contactos.'}
                </p>
            </main>
        </div>
    )
}
