// Devuelve el texto de actividad de un contacto ("en línea" o "última conexión HH:MM")
export function getActivityStatus(activity) {
    if (!activity) return ''

    if (activity.type === 'online') {
        return 'en línea'
    }

    if (activity.type === 'last-seen') {
        return `última conexión ${activity.time}`
    }

    return ''
}
