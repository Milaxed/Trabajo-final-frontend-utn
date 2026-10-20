import { Link } from 'react-router'

export default function NotFoundScreen() {
    return (
        <div className="not-found-screen">
            <h1>
                Error 404: página no encontrada
            </h1>
            <Link to={'/home'}>Volver a home</Link>
        </div>
    )
}
