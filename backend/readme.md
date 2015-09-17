# Backend Laravel-MySQL

Backend con Laravel 5.1 junto con MySQL.


## Requerimientos

* PHP   5.5.9 (o mayor)
* [Composer](https://getcomposer.org/)


## Instalación

* Descargar el proyecto
* Ejecutar `composer install` para descargarse las dependencias


## Configuración

* Vamos a encontrar un archivo llamado `.env.example` que se ve así:

```
APP_ENV=local
APP_DEBUG=true
APP_KEY=

DB_HOST=localhost
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

* Renombrar el archivo a `.env` y agregar los datos faltantes con respecto a la base de datos local MySQL.
* Una vez que tengamos nuestra configuración de MySQL, ejecutamos el comando `php artisan migrate` para generar las tablas automáticamente.
* Ejecutar el comando `php artisan key:generate`. Esto genera una `APP_KEY` y la coloca automáticamente en el archivo `.env`, sin tener que tocar nada.


## Ejecución

* Ejecutar `PHP -S Localhost:8888 -t public` para levantar la aplicación con PHP
* Ya podemos acceder al Backend y utilizar todos sus servicios REST

---

# About Laravel PHP Framework

[![Build Status](https://travis-ci.org/laravel/framework.svg)](https://travis-ci.org/laravel/framework)
[![Total Downloads](https://poser.pugx.org/laravel/framework/d/total.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Stable Version](https://poser.pugx.org/laravel/framework/v/stable.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Unstable Version](https://poser.pugx.org/laravel/framework/v/unstable.svg)](https://packagist.org/packages/laravel/framework)
[![License](https://poser.pugx.org/laravel/framework/license.svg)](https://packagist.org/packages/laravel/framework)

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Laravel attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as authentication, routing, sessions, queueing, and caching.

Laravel is accessible, yet powerful, providing powerful tools needed for large, robust applications. A superb inversion of control container, expressive migration system, and tightly integrated unit testing support give you the tools you need to build any application with which you are tasked.

## Official Documentation

Documentation for the framework can be found on the [Laravel website](http://laravel.com/docs).

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](http://laravel.com/docs/contributions).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell at taylor@laravel.com. All security vulnerabilities will be promptly addressed.

### License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
