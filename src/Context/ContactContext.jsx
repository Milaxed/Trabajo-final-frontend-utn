import contact_list_server from "../data/contact-data-mook";
import { createContext, useState } from "react";
import { Outlet, useParams } from "react-router";

export function getLastMessage(messages) {
    if (!messages || messages.length === 0) return null
    return messages[messages.length - 1]
}

export function isOwnMessage(author) {
    return author === 'Yo' || author === 'YO'
}

export function countUnreadMessages(messages) {
    if (!messages) return null
    const unread = messages.filter(
        (m) => m.status === 'unseen' && !isOwnMessage(m.author)
    ).length
    return unread > 0 ? unread : null
}

// Devuelve los mensajes con los recibidos sin leer marcados como vistos
function markMessagesAsRead(messages) {
    if (!messages) return messages
    return messages.map((message) =>
        message.status === 'unseen' && !isOwnMessage(message.author)
            ? { ...message, status: 'seen' }
            : message
    )
}

function markContactAsRead(contacts, contactId) {
    return contacts.map((contact) =>
        String(contact.id) === String(contactId)
            ? { ...contact, messages: markMessagesAsRead(contact.messages) }
            : contact
    )
}

// Marca como leídos los mensajes de todos los contactos
function markAllContactsAsRead(contacts) {
    return contacts.map((contact) => ({
        ...contact,
        messages: markMessagesAsRead(contact.messages),
    }))
}

// Crea un mensaje propio con el horario actual
export function createOwnMessage(content, existingMessages = []) {
    const nextId = existingMessages.reduce(
        (maxId, message) => Math.max(maxId, Number(message.id) || 0),
        0
    ) + 1

    return {
        id: nextId,
        content: content,
        author: 'YO',
        created_at: new Date(),
        status: 'enviado',
    }
}

export const ContactContext = createContext(
    {
        contacts: [],
        selected_contact: null,
        getLastMessage: () => { },
        countUnreadMessages: () => { },
        markContactAsRead: () => { },
        markAllContactsAsRead: () => { },
        updateContact: () => { },
        sendMessage: () => { },
    }
)

export function ContactContextProvider() {
    const { contact_id } = useParams()

    // Si se entra directo a un chat por URL, arranca sin mensajes sin leer
    const [contacts, setContacts] = useState(() =>
        contact_id
            ? markContactAsRead(contact_list_server, contact_id)
            : contact_list_server
    )

    const selected_contact = contact_id
        ? contacts.find((contact) => String(contact.id) === String(contact_id)) || null
        : null

    function handleMarkContactAsRead(contactId) {
        setContacts((prevContacts) => markContactAsRead(prevContacts, contactId))
    }

    function handleMarkAllContactsAsRead() {
        setContacts((prevContacts) => markAllContactsAsRead(prevContacts))
    }

    // Cambios en memoria (nombre y teléfono); se pierden al recargar la página
    function handleUpdateContact(contactId, changes) {
        setContacts((prevContacts) =>
            prevContacts.map((contact) =>
                String(contact.id) === String(contactId)
                    ? { ...contact, ...changes }
                    : contact
            )
        )
    }

    function handleSendMessage(contactId, content) {
        const trimmedContent = content.trim()
        if (!trimmedContent) return

        setContacts((prevContacts) =>
            prevContacts.map((contact) => {
                if (String(contact.id) !== String(contactId)) return contact

                const newMessage = createOwnMessage(trimmedContent, contact.messages)

                return {
                    ...contact,
                    last_connection: newMessage.created_at,
                    messages: [...contact.messages, newMessage],
                }
            })
        )
    }

    const provider_values = {
        contacts: contacts,
        selected_contact: selected_contact,
        getLastMessage: getLastMessage,
        countUnreadMessages: countUnreadMessages,
        markContactAsRead: handleMarkContactAsRead,
        markAllContactsAsRead: handleMarkAllContactsAsRead,
        updateContact: handleUpdateContact,
        sendMessage: handleSendMessage,
    }
    return (
        <ContactContext.Provider
            value={provider_values}
        >
            <Outlet />
        </ContactContext.Provider>
    )
}
