
/*
DROP DATABASE IF EXISTS dbsertec;
DROP USER IF EXISTS stboss;

CREATE USER stboss WITH PASSWORD 'M4nu3lTur1z0'
CREATE DATABASE dbsertec ENCODING 'UTF8' OWNER stboss;
*/

DROP TABLE IF EXISTS solicitud_detalle;
DROP TABLE IF EXISTS solicitud;
DROP TABLE IF EXISTS tipo_servicio;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS rol;


CREATE TABLE IF NOT EXISTS rol (
    rol_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    nombre TEXT NOT NULL,
    codigo TEXT NOT NULL,
    estado CHAR(1) DEFAULT 'A'
);

CREATE TABLE IF NOT EXISTS usuario(
    usuario_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    correo TEXT NOT NULL UNIQUE,
    hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    rol_id INT NOT NULL REFERENCES rol(rol_id),
    fecha_nacimiento DATE,
    src_path TEXT,
    estado CHAR(1) DEFAULT 'A'
);

CREATE TABLE IF NOT EXISTS cliente(
	cliente_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
	nombre VARCHAR(100) NOT NULL,
	direccion VARCHAR(100),
	ciudad VARCHAR(50),
	telefono VARCHAR(50),
	email VARCHAR(50),
	rucci VARCHAR(20),
	estado CHAR(1) DEFAULT 'A'
);

CREATE TABLE IF NOT EXISTS tipo_servicio(
	tipo_servicio_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
	nombre VARCHAR(50) NOT NULL,
	codigo VARCHAR(5) NOT NULL,
	estado CHAR(1) DEFAULT 'A'
);

CREATE TABLE IF NOT EXISTS solicitud(
	solicitud_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
	solicitud_no TEXT NOT NULL UNIQUE,
	tipo_servicio_id INT NOT NULL REFERENCES tipo_servicio(tipo_servicio_id),
	solicitado_por VARCHAR(100),
	cliente_id INT NOT NULL REFERENCES cliente(cliente_id),
	operador VARCHAR(100),
	atendido_por VARCHAR(100),
	reporte TEXT,
	conexion TEXT,
	garantia BOOLEAN DEFAULT FALSE,
	garantia_monto DECIMAL(10,2),
	observacion TEXT,
	usuario_id INT NOT NULL REFERENCES usuario(usuario_id),
	estado CHAR(1) DEFAULT 'A'
);

CREATE TABLE IF NOT EXISTS solicitud_detalle(
	solicitud_detalle_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
	solicitud_detalle_no TEXT NOT NULL UNIQUE,
	solicitud_id INT NOT NULL REFERENCES solicitud(solicitud_id),
	equipo TEXT NOT NULL,
	marca TEXT NOT NULL,
	modelo TEXT NOT NULL,
	serie TEXT NOT NULL,
	desperfecto TEXT NOT NULL,
	garantia_piezas TEXT,
	estado CHAR(1) DEFAULT 'A'
);