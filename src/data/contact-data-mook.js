import guilleImage from '../assets/guille.png'
import heisenbergImage from '../assets/heisenberg.jpeg'
import negropabloImage from '../assets/negropablo.jpeg'
import solaireImage from '../assets/solaire.jpeg'
import soydaltoImage from '../assets/soydalto.jpg'

const now = new Date()
const createDate = (daysAgo, hours = 0, minutes = 0) => {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysAgo, hours, minutes)
}

// Estado de actividad aleatorio para cada contacto (en línea o última conexión a una hora)
const createActivity = () => {
    if (Math.random() < 0.55) {
        return { type: 'online' }
    }

    const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0')
    const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0')

    return { type: 'last-seen', time: `${hours}:${minutes}` }
}

// Teléfono aleatorio pero fijo por contacto: +54 9 11 XXXX-XXXX (8 números)
// Se deriva del id, así que no cambia entre renders ni al recargar.
const createPhone = (id) => {
    const seed = Number(id) || 0
    const firstPart = String((seed * 3571 + 1237) % 10000).padStart(4, '0')
    const secondPart = String((seed * 7907 + 4951) % 10000).padStart(4, '0')
    return `+54 9 11 ${firstPart}-${secondPart}`
}

const contact_list_server = [
    {
        id: 1,
        name: 'Guillermo Rauch',
        last_connection: createDate(0, 17, 19),
        image: guilleImage,
        messages: [
            {
                id: 1,
                content: 'Hola Guillermo, ¿cómo estás? Quería consultarte algunas cosas sobre Vercel y la visión que tienen para los próximos años, si tenés un momento.',
                author: 'YO',
                created_at: createDate(0, 16, 42),
                status: 'seen'
            },
            {
                id: 2,
                content: 'Hola, ¿cómo va? Sí, claro. Contame, ¿qué te gustaría saber?',
                author: 'Guillermo Rauch',
                created_at: createDate(0, 16, 44),
                status: 'seen'
            },
            {
                id: 3,
                content: 'Principalmente, cómo ves el futuro de Vercel. Hoy tienen una posición muy fuerte en el ecosistema de desarrollo web, sobre todo con Next.js y la plataforma de deploy. ¿La idea es seguir profundizando en ese mercado o tienen pensado expandirse hacia otras áreas?',
                author: 'YO',
                created_at: createDate(0, 16, 46),
                status: 'seen'
            },
            {
                id: 4,
                content: 'Creo que hay muchísimo espacio para seguir creciendo en ambas direcciones. Queremos que desplegar una aplicación siga siendo algo simple, pero también resolver cada vez más problemas del proceso de desarrollo. La infraestructura es una parte importante, aunque no es lo único que nos interesa construir.',
                author: 'Guillermo Rauch',
                created_at: createDate(0, 16, 49),
                status: 'seen'
            },
            {
                id: 5,
                content: 'Claro, tiene sentido. Con el avance de la IA, me imagino que también se les abre un panorama bastante interesante. ¿Pensás que va a cambiar mucho el modelo de negocio de Vercel en los próximos años?',
                author: 'YO',
                created_at: createDate(0, 16, 52),
                status: 'seen'
            },
            {
                id: 6,
                content: 'Sin dudas. La IA está cambiando cómo se construye software y eso genera nuevas necesidades de infraestructura, herramientas y servicios. Queremos estar bien posicionados para esa transición. No se trata solamente de sumar funcionalidades de IA, sino de pensar qué necesitan los desarrolladores para llevar esas aplicaciones a producción de manera confiable.',
                author: 'Guillermo Rauch',
                created_at: createDate(0, 16, 55),
                status: 'seen'
            },
            {
                id: 7,
                content: 'Entiendo. Y en términos de crecimiento, ¿qué tan importante va a ser el mercado empresarial? Porque imagino que trabajar con compañías grandes y aplicaciones de mayor escala cambia bastante la ecuación respecto de los desarrolladores individuales.',
                author: 'YO',
                created_at: createDate(0, 16, 58),
                status: 'seen'
            },
            {
                id: 8,
                content: 'Es un mercado muy importante. Las empresas necesitan rendimiento, seguridad, observabilidad y herramientas que les permitan trabajar en equipo. Tenemos que responder a esas necesidades sin perder la facilidad de uso que siempre buscamos. Creo que ahí hay una oportunidad enorme.',
                author: 'Guillermo Rauch',
                created_at: createDate(0, 17, 1),
                status: 'seen'
            },
            {
                id: 9,
                content: 'Tiene lógica. Te pregunto algo más desde el lado del negocio: ¿ves a Vercel convirtiéndose en una plataforma mucho más amplia, que compita en distintas áreas del desarrollo, o preferís mantener un enfoque más concentrado?',
                author: 'YO',
                created_at: createDate(0, 17, 4),
                status: 'seen'
            },
            {
                id: 10,
                content: 'La idea sería ampliar la plataforma de manera coherente. No nos interesa desarrollar productos por el simple hecho de entrar en nuevos mercados. Cada incorporación tiene que mejorar la experiencia de quienes construyen y mantienen software. Si logramos eso, la expansión tiene sentido.',
                author: 'Guillermo Rauch',
                created_at: createDate(0, 17, 7),
                status: 'seen'
            },
            {
                id: 11,
                content: 'Me parece una buena estrategia. Estoy estudiando desarrollo Full Stack y me interesa entender cómo evolucionan estas empresas, no solamente desde lo técnico, sino también desde el negocio. ¿Creés que en los próximos años va a haber más oportunidades para desarrolladores que recién empiezan, o la IA va a hacer que sea más difícil entrar al mercado?',
                author: 'YO',
                created_at: createDate(0, 17, 10),
                status: 'seen'
            },
            {
                id: 12,
                content: 'Creo que el mercado va a cambiar bastante. La IA permite hacer más en menos tiempo, pero también eleva las expectativas sobre lo que puede construir una persona. Para quienes están empezando, va a ser importante aprender bien los fundamentos, entender cómo funcionan las aplicaciones y acostumbrarse a trabajar con estas herramientas. Saber utilizarlas con criterio puede marcar una diferencia importante.',
                author: 'Guillermo Rauch',
                created_at: createDate(0, 17, 13),
                status: 'seen'
            },
            {
                id: 13,
                content: 'Coincido. Al final, las herramientas pueden cambiar, pero entender lo que estás construyendo sigue siendo fundamental. Gracias por tomarte el tiempo para responder, Guillermo. Me interesaba conocer esa perspectiva de primera mano.',
                author: 'YO',
                created_at: createDate(0, 17, 16),
                status: 'seen'
            },
            {
                id: 14,
                content: 'De nada, un gusto. Está bueno que quienes están aprendiendo también se interesen por hacia dónde va la industria. Mucho éxito con la carrera y con los proyectos que estés desarrollando.',
                author: 'Guillermo Rauch',
                created_at: createDate(0, 17, 18),
                status: 'seen'
            },
            {
                id: 15,
                content: 'Muchas gracias, Guillermo. Éxitos con todo lo que se viene en Vercel. Seguimos en contacto.',
                author: 'YO',
                created_at: createDate(0, 17, 19),
                status: 'seen'
            }
        ]
    },
    {
        id: 2,
        name: 'Soy Dalto',
        last_connection: createDate(0, 15, 42),
        image: soydaltoImage,
        messages: [
            {
                id: 1,
                content: 'Hola, Lucas. Estoy estudiando JavaScript y próximamente voy a meterme más de lleno con React.js. ¿Qué me recomendás para mejorar mi lógica de programación?',
                author: 'YO',
                created_at: createDate(0, 15, 32),
                status: 'seen'
            },
            {
                id: 2,
                content: '¡Buenas! Mirá, lo más importante es que practiques JavaScript constantemente. No alcanza con mirar tutoriales, tenés que sentarte a resolver problemas por tu cuenta.',
                author: 'Soy Dalto',
                created_at: createDate(0, 15, 34),
                status: 'seen'
            },
            {
                id: 3,
                content: 'Sí, me pasa que entiendo los conceptos, pero cuando tengo que resolver un ejercicio desde cero me cuesta bastante.',
                author: 'YO',
                created_at: createDate(0, 15, 35),
                status: 'seen'
            },
            {
                id: 4,
                content: 'Es completamente normal. La lógica se desarrolla practicando. Intentá resolver los ejercicios sin mirar la solución de entrada, aunque tardes un rato más.',
                author: 'Soy Dalto',
                created_at: createDate(0, 15, 36),
                status: 'seen'
            },
            {
                id: 5,
                content: '¿Y para React? ¿Me conviene arrancar ahora o esperar a tener un mejor nivel de JavaScript?',
                author: 'YO',
                created_at: createDate(0, 15, 38),
                status: 'seen'
            },
            {
                id: 6,
                content: 'Si ya entendés variables, funciones, arrays, objetos y métodos básicos, podés empezar con React. Después vas profundizando JavaScript mientras desarrollás proyectos.',
                author: 'Soy Dalto',
                created_at: createDate(0, 15, 39),
                status: 'seen'
            },
            {
                id: 7,
                content: 'Buenísimo. Mi idea es terminar haciendo proyectos propios para armar un portfolio y buscar mi primera oportunidad laboral.',
                author: 'YO',
                created_at: createDate(0, 15, 41),
                status: 'seen'
            },
            {
                id: 8,
                content: '¡Esa es la actitud! 🚀 Hacé proyectos que resuelvan problemas reales, subilos a GitHub y aprendé a explicar las decisiones que tomaste. Eso te va a servir muchísimo.',
                author: 'Soy Dalto',
                created_at: createDate(0, 15, 42),
                status: 'seen'
            }
        ]
    },
    {
        id: 3,
        name: 'Negro pablo',
        last_connection: createDate(0, 14, 15),
        image: negropabloImage,
        imagePosition: '9% 50%',
        messages: [
            {
                id: 1,
                content: 'Che y el pollo cuando viene?',
                author: 'YO',
                created_at: createDate(0, 14, 14),
                status: 'seen'
            },
            {
                id: 2,
                content: 'Siempre con el Pollo, con el Pollo, me tenés podrido ya con ese, loco.',
                author: 'Negro Pablo',
                created_at: createDate(0, 14, 15),
                status: 'unseen'
            }
        ]
    },
    {
        id: 4,
        name: 'Solaire',
        last_connection: createDate(0, 13, 42),
        image: solaireImage,
        messages: [
            {
                id: 1,
                content: '¡Solaire! PRAISE THE SUN☀️!!',
                author: 'YO',
                created_at: createDate(0, 13, 41),
                status: 'seen'
            },
            {
                id: 2,
                content: '¡PRAISE THE SUN☀️! ¡Jolly cooperation, mi buen amigo!',
                author: 'Solaire de Astora',
                created_at: createDate(0, 13, 42),
                status: 'seen'
            }
        ]
    },
    {
        id: 5,
        name: '.',
        last_connection: createDate(0, 12, 47),
        image: heisenbergImage,
        messages: [
            {
                id: 1,
                content: 'El paquete está listo. Todo salió según lo previsto. No hagas preguntas, solo asegurate de que llegue a destino.',
                author: '.',
                created_at: createDate(0, 12, 47),
                status: 'unseen'
            }
        ]
    }
].map((contact) => ({ ...contact, activity: createActivity(), phone: createPhone(contact.id) }))

export default contact_list_server