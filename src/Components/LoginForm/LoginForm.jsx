import useLogin from '../../hooks/useLogin'

export default function LoginForm() {

    const { formState, error, handleSubmit, handleChangeInput } = useLogin()

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h1>Iniciar sesión</h1>
            <div>
                <label htmlFor='email'>Email:</label>
                <br />
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={formState.email}
                    onChange={handleChangeInput}
                />
            </div>
            <div>
                <label htmlFor='password'>Contraseña:</label>
                <br />
                <input
                    type='password'
                    name='password'
                    id='password'
                    value={formState.password}
                    onChange={handleChangeInput}
                />
            </div>
            {error && <p className="error-text">{error}</p>}
            <button type='submit'>Iniciar sesión</button>
        </form>
    )
}
