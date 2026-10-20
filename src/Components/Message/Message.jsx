import "./Message.css"

function Message({ messageId, estatus_envio, autor, contenido, fecha, isMatch = false, isHighlighted = false, onSelect }) {

    // Evalúo si el mensaje fue enviado por "Yo"
    const esMio = autor === "Yo" || autor === "YO";

    const esVisto = estatus_envio === "visto" || estatus_envio === "seen";

    const classNames = ["contenedor-mensaje", esMio ? "mensaje-propio" : "mensaje-recibido"];
    if (isMatch) classNames.push("mensaje-coincide");
    if (isHighlighted) classNames.push("mensaje-resaltado");

    return (
        <div
            id={messageId != null ? `mensaje-${messageId}` : undefined}
            className={classNames.join(" ")}
            onClick={onSelect}
        >
            <div className="burbuja-mensaje">
                {/* Si no es mío, muestro el nombre del remitente arriba */}
                {!esMio && <span className="autor-mensaje">{autor}</span>}

                <p className="contenido-mensaje">{contenido}</p>

                <div className="metadatos-mensaje">
                    <span className="hora-mensaje">{fecha}</span>

                    {/* Solo si es un mensaje propio muestro el estado de envío */}
                    {esMio && (
                        <span className={"doble-check " + (esVisto ? "leido" : "enviado")}>
                            {esVisto ? "✓✓" : "✓"}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Message
