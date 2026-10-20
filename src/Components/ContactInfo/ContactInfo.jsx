import { useContext, useState } from 'react'
import { ContactContext } from '../../Context/ContactContext'
import './ContactInfo.css'

// Permite solo números y los separadores del formato (+54 9 11 1234-5678)
function sanitizePhone(value) {
    const cleaned = value.replace(/[^\d+\s-]/g, '')
    const hasPlus = cleaned.replace(/\s/g, '').startsWith('+')
    const rest = cleaned.replace(/\+/g, '').trimStart()
    return (hasPlus ? '+' : '') + rest
}

function buildFullName(nombre, apellido) {
    return [nombre, apellido]
        .map((part) => part.trim())
        .filter(Boolean)
        .join(' ')
}

function CloseIcon() {
    return (
        <svg
            viewBox='0 0 24 24'
            width='20'
            height='20'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
        >
            <path d='M18 6 6 18' />
            <path d='m6 6 12 12' />
        </svg>
    )
}

function ArrowLeftIcon() {
    return (
        <svg
            viewBox='0 0 24 24'
            width='20'
            height='20'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
        >
            <path d='M19 12H5' />
            <path d='m12 19-7-7 7-7' />
        </svg>
    )
}

function EditIcon() {
    return (
        <svg
            viewBox='0 0 24 24'
            width='19'
            height='19'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
        >
            <path d='M12 20h9' />
            <path d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' />
        </svg>
    )
}

function UserIcon() {
    return (
        <svg
            viewBox='0 0 24 24'
            width='20'
            height='20'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
        >
            <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
            <circle cx='12' cy='7' r='4' />
        </svg>
    )
}

function PhoneIcon() {
    return (
        <svg
            viewBox='0 0 24 24'
            width='20'
            height='20'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
        >
            <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
        </svg>
    )
}

function VideoIcon() {
    return (
        <svg
            viewBox='0 0 24 24'
            width='20'
            height='20'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
        >
            <polygon points='23 7 16 12 23 17 23 7' />
            <rect x='1' y='5' width='15' height='14' rx='2' ry='2' />
        </svg>
    )
}

function SearchIcon() {
    return (
        <svg
            viewBox='0 0 24 24'
            width='20'
            height='20'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
        >
            <circle cx='11' cy='11' r='7' />
            <path d='m20 20-3.5-3.5' />
        </svg>
    )
}

export default function ContactInfo({ contact, onClose, onOpenSearch }) {
    const { updateContact } = useContext(ContactContext)
    const [editing, setEditing] = useState(false)
    const [nombre, setNombre] = useState(contact.name)
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState(contact.phone)

    function handleNombreChange(event) {
        const value = event.target.value
        setNombre(value)
        updateContact(contact.id, { name: buildFullName(value, apellido) })
    }

    function handleApellidoChange(event) {
        const value = event.target.value
        setApellido(value)
        updateContact(contact.id, { name: buildFullName(nombre, value) })
    }

    function handleTelefonoChange(event) {
        const value = sanitizePhone(event.target.value)
        setTelefono(value)
        updateContact(contact.id, { phone: value })
    }

    const initial = contact.name.trim().charAt(0).toUpperCase()

    return (
        <aside className='contact-info-panel' aria-label='Información del contacto'>
            <div className='contact-info-header'>
                <div className='contact-info-header-left'>
                    <button
                        type='button'
                        className='contact-info-icon-btn'
                        aria-label={editing ? 'Volver a la información del contacto' : 'Cerrar información del contacto'}
                        title={editing ? 'Volver' : 'Cerrar'}
                        onClick={editing ? () => setEditing(false) : onClose}
                    >
                        {editing ? <ArrowLeftIcon /> : <CloseIcon />}
                    </button>
                    <h2 className='contact-info-title'>
                        {editing ? 'Edita el contacto' : 'Info. del contacto'}
                    </h2>
                </div>
                {!editing && (
                    <button
                        type='button'
                        className='contact-info-icon-btn'
                        aria-label='Editar contacto'
                        title='Editar contacto'
                        onClick={() => setEditing(true)}
                    >
                        <EditIcon />
                    </button>
                )}
            </div>

            {editing
                ? (
                    <div className='contact-info-form'>
                        <label className='contact-info-field'>
                            <span className='contact-info-field-label'>Nombre</span>
                            <span className='contact-info-field-control'>
                                <span className='contact-info-field-icon' aria-hidden='true'>
                                    <UserIcon />
                                </span>
                                <input
                                    type='text'
                                    value={nombre}
                                    onChange={handleNombreChange}
                                    placeholder='Nombre'
                                />
                            </span>
                        </label>

                        <label className='contact-info-field'>
                            <span className='contact-info-field-label'>apellido</span>
                            <span className='contact-info-field-control'>
                                <input
                                    type='text'
                                    value={apellido}
                                    onChange={handleApellidoChange}
                                    placeholder='apellido'
                                />
                            </span>
                        </label>

                        <label className='contact-info-field'>
                            <span className='contact-info-field-label'>Teléfono</span>
                            <span className='contact-info-field-control'>
                                <span className='contact-info-field-icon' aria-hidden='true'>
                                    <PhoneIcon />
                                </span>
                                <input
                                    type='tel'
                                    inputMode='tel'
                                    value={telefono}
                                    onChange={handleTelefonoChange}
                                    placeholder='+54 9 11 0245-4520'
                                />
                            </span>
                        </label>
                    </div>
                )
                : (
                    <div className='contact-info-main'>
                        <div className='contact-info-avatar'>
                            {contact.image
                                ? <img
                                    src={contact.image}
                                    alt={contact.name}
                                    className='contact-image'
                                    style={contact.imagePosition ? { objectPosition: contact.imagePosition } : undefined}
                                />
                                : <span className='contact-info-avatar-placeholder'>{initial || '?'}</span>
                            }
                        </div>
                        <p className='contact-info-phone'>{contact.phone}</p>

                        <div className='contact-info-actions'>
                            <button type='button' className='contact-info-action' title='Llamada'>
                                <span className='contact-info-action-box'><PhoneIcon /></span>
                                <span className='contact-info-action-label'>Llamada</span>
                            </button>
                            <button type='button' className='contact-info-action' title='Video'>
                                <span className='contact-info-action-box'><VideoIcon /></span>
                                <span className='contact-info-action-label'>Video</span>
                            </button>
                            <button
                                type='button'
                                className='contact-info-action'
                                title='Buscar mensajes'
                                onClick={onOpenSearch}
                            >
                                <span className='contact-info-action-box'><SearchIcon /></span>
                                <span className='contact-info-action-label'>Buscar</span>
                            </button>
                        </div>
                    </div>
                )
            }
        </aside>
    )
}
