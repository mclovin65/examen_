// auth.js
export function crearFormularioLogin(cargarContenidoPrincipal) {
    let contenedorLogin = document.createElement("section");
    contenedorLogin.className = "login-container";

    let titulo = document.createElement("h2");
    titulo.textContent = "Iniciar Sesión";
    contenedorLogin.appendChild(titulo);

    let formularioLogin = document.createElement("form");
    formularioLogin.id = "login-form";
    formularioLogin.className = "auth-form";

    // Campos del formulario (usuario y contraseña)
    let grupoUsuario = document.createElement("div");
    grupoUsuario.className = "input-group";

    let labelUsuario = document.createElement("label");
    labelUsuario.htmlFor = "username";
    labelUsuario.textContent = "Usuario";

    let inputUsuario = document.createElement("input");
    inputUsuario.type = "text";
    inputUsuario.id = "username";
    inputUsuario.name = "username";
    inputUsuario.required = true;
    inputUsuario.placeholder = "Ingresa tu usuario";

    grupoUsuario.appendChild(labelUsuario);
    grupoUsuario.appendChild(inputUsuario);

    let grupoContraseña = document.createElement("div");
    grupoContraseña.className = "input-group";

    let labelContraseña = document.createElement("label");
    labelContraseña.htmlFor = "password";
    labelContraseña.textContent = "Contraseña";

    let inputContraseña = document.createElement("input");
    inputContraseña.type = "password";
    inputContraseña.id = "password";
    inputContraseña.name = "password";
    inputContraseña.required = true;
    inputContraseña.placeholder = "Ingresa tu contraseña";

    grupoContraseña.appendChild(labelContraseña);
    grupoContraseña.appendChild(inputContraseña);

    // Botón de enviar
    let botonEnvio = document.createElement("button");
    botonEnvio.type = "submit";
    botonEnvio.className = "btn-primary";
    botonEnvio.textContent = "Ingresar";

    // Mensaje de error
    let mensajeError = document.createElement("p");
    mensajeError.className = "error-message";
    mensajeError.id = "login-error";
    mensajeError.style.display = "none";

    // Enlace de registro
    let textoRegistro = document.createElement("p");
    textoRegistro.className = "registro-text";
    textoRegistro.textContent = "¿No tienes una cuenta? ";

    let enlaceRegistro = document.createElement("a");
    enlaceRegistro.href = "#";
    enlaceRegistro.className = "registro-link";
    enlaceRegistro.textContent = "Regístrate aquí";
    
    enlaceRegistro.addEventListener("click", (e) => {
        e.preventDefault();
        contenedorLogin.replaceWith(crearFormularioRegistro(cargarContenidoPrincipal));
    });

    textoRegistro.appendChild(enlaceRegistro);

    // Ensamblar formulario
    formularioLogin.appendChild(grupoUsuario);
    formularioLogin.appendChild(grupoContraseña);
    formularioLogin.appendChild(mensajeError);
    formularioLogin.appendChild(botonEnvio);
    formularioLogin.appendChild(textoRegistro);

    // Manejar envío del formulario
    formularioLogin.addEventListener("submit", async function (evento) {
        evento.preventDefault();
        mensajeError.style.display = "none";

        const username = inputUsuario.value.trim();
        const password = inputContraseña.value.trim();

        if (!username || !password) {
            mostrarError(mensajeError, "Por favor ingresa un nombre de usuario y una contraseña.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('username', username);
                cargarContenidoPrincipal();
            } else {
                mostrarError(mensajeError, data.error || "Credenciales incorrectas. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error en la solicitud de login:", error);
            mostrarError(mensajeError, "Hubo un problema al intentar iniciar sesión. Inténtalo más tarde.");
        }
    });

    contenedorLogin.appendChild(formularioLogin);
    return contenedorLogin;
}

// ... (resto de las funciones como verificarAutenticacion, cerrarSesion, etc.)