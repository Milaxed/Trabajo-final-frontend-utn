export function formatMessageDate(date) {
    if (!date) return ''

    const messageDate = date instanceof Date ? date : new Date(date)

    if (isNaN(messageDate.getTime())) {
        return typeof date === 'string' ? date : ''
    }

    const now = new Date()

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const target = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate())

    const diffTime = today.getTime() - target.getTime()
    const oneDayMs = 24 * 60 * 60 * 1000
    const diffDays = Math.round(diffTime / oneDayMs)

    if (diffDays === 0) {
        const hours = String(messageDate.getHours()).padStart(2, '0')
        const minutes = String(messageDate.getMinutes()).padStart(2, '0')
        return `${hours}:${minutes}`
    }

    if (diffDays === 1) {
        return 'ayer'
    }

    const day = String(messageDate.getDate()).padStart(2, '0')
    const month = String(messageDate.getMonth() + 1).padStart(2, '0')
    const year = messageDate.getFullYear()
    return `${day}/${month}/${year}`
}