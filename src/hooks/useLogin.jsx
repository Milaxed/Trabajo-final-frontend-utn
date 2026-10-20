import { useState } from "react"
import { useNavigate } from "react-router"

function useLogin() {
    const [formState, setFormState] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function handleSubmit(evento) {
        evento.preventDefault()

        const email = formState.email.trim()
        const password = formState.password.trim()

        if (!email || !password) {
            setError("Ingresá tu email y contraseña.")
            return
        }

        if (!email.includes("@")) {
            setError("Ingresá un email válido.")
            return
        }

        setError("")
        navigate("/home")
    }

    function handleChangeInput(evento) {
        const campo = evento.target
        const nombre_campo = campo.name
        const valor_campo = campo.value
        setFormState(
            (prevFormState) => {
                const cloned_state = { ...prevFormState }
                cloned_state[nombre_campo] = valor_campo
                return cloned_state
            }
        )
    }

    return {
        formState: formState,
        error: error,
        handleSubmit: handleSubmit,
        handleChangeInput: handleChangeInput
    }
}

export default useLogin
