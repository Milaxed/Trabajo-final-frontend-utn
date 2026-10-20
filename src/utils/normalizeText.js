// Normaliza texto para comparar búsquedas: minúsculas, sin acentos y sin espacios extra
export function normalizeText(value) {
    return String(value ?? '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
}
