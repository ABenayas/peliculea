-- Habilitamos la extensión pgcrypto para usar hashing de contraseñas.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Creamos la tabla de usuarios con una contraseña hashable.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del registro.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de actualización del registro.
    CONSTRAINT email_check CHECK (email ~* '^.+@.+\..+$'), -- Validación de email (expresión regular básica).
    CONSTRAINT password_check CHECK (length(password) >= 6) -- Validación de longitud de la contraseña.
);

-- Insertar un nuevo usuario con su email y contraseña segura (hash).
-- INSERT INTO users (email, name, password)
-- VALUES (
    -- 'usuario@example.com', 'ABenayas',
    -- crypt('contraseña_segura', gen_salt('bf'))  -- El 'bf' indica que usaremos bcrypt como algoritmo.
-- );
