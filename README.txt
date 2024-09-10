# Aplicación Prueba Konecta

## Descripción
Esta aplicación fullstack muestra competencias en la creación de APIs REST con node.js, el desarrollo de interfaces con React y gestión de bases de datos mediante el ORM sequelize.
La aplicación incluye autenticación JWT, diferenciación de roles (empleado y administrador) y operaciones CRUD.


##Tecnologias

*Nodejs
*express
*JWT
*React
*Sequelize

Se envia copia de la base de datos en dos formatos, la base de datos contiene datos en las entidades empleados, usuarios y roles.
Se realizó de manera que un usuario esta asociado a un empleado y a un rol, por lo tanto se hizo copia con los datos del usuario administrador.

Tiene una autenticación basada en roles. Los usuarios con rol administrador pueden realizar operaciones CRUD completas, mientras que el rol empleado solo puede consultar información.


Una vez restablecida la base de datos se deben cambiar las variables de conexión en el archivo .env

Tanto back como front se ejecutan con el comando npm run dev

##Credenciales de acceso administrador.
usuario: administrador@konecta.com
contraseña: admin12345
