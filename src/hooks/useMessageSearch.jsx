import { useEffect, useRef, useState } from 'react'
import { normalizeText } from '../utils/normalizeText'

const HIGHLIGHT_DURATION = 2500

// Lógica de búsqueda de mensajes: coincide con al menos una palabra del texto
function useMessageSearch(messages) {
    const [query, setQueryValue] = useState('')
    const [highlightedId, setHighlightedId] = useState(null)
    const timeoutRef = useRef(null)

    const terms = normalizeText(query).split(' ').filter(Boolean)

    const matchingMessages = terms.length === 0
        ? []
        : messages.filter((message) => {
            const content = normalizeText(message.content)
            return terms.some((term) => content.includes(term))
        })

    const matchingIds = matchingMessages.map((message) => message.id)

    // Limpia el temporizador al desmontar
    useEffect(() => () => clearTimeout(timeoutRef.current), [])

    // Al cambiar el texto se quita cualquier resaltado previo
    function setQuery(value) {
        clearTimeout(timeoutRef.current)
        setHighlightedId(null)
        setQueryValue(value)
    }

    // Resalta un mensaje de forma temporal
    function highlightMessage(messageId) {
        clearTimeout(timeoutRef.current)
        setHighlightedId(messageId)
        timeoutRef.current = setTimeout(() => setHighlightedId(null), HIGHLIGHT_DURATION)
    }

    function reset() {
        clearTimeout(timeoutRef.current)
        setHighlightedId(null)
        setQueryValue('')
    }

    return {
        query,
        setQuery,
        matchingMessages,
        matchingIds,
        highlightedId,
        highlightMessage,
        reset,
    }
}

export default useMessageSearch
