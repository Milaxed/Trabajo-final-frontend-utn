import { useContext } from 'react'
import { Link } from 'react-router'
import ContactOption from '../ContactOption/ContactOption'
import { ContactContext } from '../../Context/ContactContext'
import useContactSearch from '../../hooks/useContactSearch'
import useUnreadFilter from '../../hooks/useUnreadFilter'

export default function ContactsList() {

    const { contacts, countUnreadMessages, getLastMessage, markContactAsRead } = useContext(ContactContext)
    const { contactSearchTerm, setContactSearchTerm, filteredContacts } = useContactSearch(contacts)
    const { onlyUnread, filteredContacts: visibleContacts, setFilter } = useUnreadFilter(filteredContacts)

    if (contacts.length === 0) {
        return <span>You don't have any contacts yet</span>
    }

    const unreadContacts = contacts.filter(
        (contact) => countUnreadMessages(contact.messages) !== null
    ).length

    const contactsJsx = []
    for (const contact of visibleContacts) {
        const lastMessage = getLastMessage(contact.messages)
        const rawDate = lastMessage ? lastMessage.created_at : contact.last_connection
        contactsJsx.push(
            <Link
                to={`/contact/${contact.id}`}
                key={contact.id}
                onClick={() => markContactAsRead(contact.id)}
            >
                <ContactOption
                    id={contact.id}
                    image={contact.image}
                    imagePosition={contact.imagePosition}
                    lastMessage={lastMessage ? lastMessage.content : ''}
                    name={contact.name}
                    unreadMessages={countUnreadMessages(contact.messages)}
                    lastMessageDate={rawDate}
                />
            </Link>
        )
    }

    return (
        <>
            <div className="sidebar-header">
                <div className="sidebar-search">
                    <input
                        type="text"
                        placeholder="Search or start a new chat"
                        value={contactSearchTerm}
                        onChange={(e) => setContactSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="sidebar-filters">
                <button
                    type="button"
                    className={onlyUnread ? 'filter-btn' : 'filter-btn active'}
                    onClick={() => setFilter('all')}
                >
                    Todos
                </button>
                <button
                    type="button"
                    className={onlyUnread ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setFilter('unread')}
                >
                    Sin leer{unreadContacts > 0 ? ` (${unreadContacts})` : ''}
                </button>
            </div>
            <div className="sidebar-contacts">
                {visibleContacts.length === 0
                    ? (
                        <span className="sidebar-empty">
                            {onlyUnread ? 'No tenés mensajes sin leer' : 'No contacts found'}
                        </span>
                    )
                    : contactsJsx
                }
            </div>
        </>
    )
}
