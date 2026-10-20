import { useSearchParams } from 'react-router'
import { countUnreadMessages } from '../Context/ContactContext'

export const UNREAD_FILTER = 'unread'

// Filtra la lista de contactos según el parámetro de búsqueda ?filter=unread
function useUnreadFilter(contacts) {
    const [searchParams, setSearchParams] = useSearchParams()

    const filter = searchParams.get('filter') || 'all'
    const onlyUnread = filter === UNREAD_FILTER

    const filteredContacts = onlyUnread
        ? contacts.filter((contact) => countUnreadMessages(contact.messages) !== null)
        : contacts

    function setFilter(nextFilter) {
        const nextParams = new URLSearchParams(searchParams)

        if (nextFilter === UNREAD_FILTER) {
            nextParams.set('filter', UNREAD_FILTER)
        } else {
            nextParams.delete('filter')
        }

        setSearchParams(nextParams, { replace: true })
    }

    return {
        filter: filter,
        onlyUnread: onlyUnread,
        filteredContacts: filteredContacts,
        setFilter: setFilter,
    }
}

export default useUnreadFilter
