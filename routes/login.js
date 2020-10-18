const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('./../models/usuario');
const app = express();


app.post('/login', function(req, res) {
    // here write code
    let body = req.body;
    console.log(body)
    Usuario.findOne({ email: body.email }, (erro, usuarioDB) => {

        if (erro) {

            return res.status(500).json({
                ok: false,
                err: erro
            })
        }
        // Verifica que exista un usuario con el mail escrita por el usuario.
        if (!usuarioDB) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            })
        }
        // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }
        let payload = {
                email: body.email
            }
            //create the access token with the shorter lifespan
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        })

        res.json({
            ok: true,
            usuario: usuarioDB,
            accessToken: accessToken
        });

    })
})
module.exports = app;