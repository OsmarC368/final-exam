const Footer = () => {
    return (
        <div style={{
            background: "linear-gradient(270deg,rgba(163, 0, 0, 1) 0%, rgba(102, 0, 0, 1) 58%, rgba(87, 23, 0, 1) 100%)",
            color: "#e2e8f0",
            padding: "1rem 1.5rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)"
        }}>
            <div style={{
                maxWidth: "100vw",
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap"
            }}>
                <p style={{ margin: 0, fontSize: "0.95rem" }}>
                    © 2026 Final Exam. Todos los derechos reservados.
                </p>
            </div>
        </div>
    )
}

export default Footer