const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('./../models/usuario');
const app = express();

app.post('/register', function(req, res) {
    console.log("Registrando")
    let body = req.body;
    let { email, password } = body;
    let usuario = new Usuario({
        email,
        password: bcrypt.hashSync(password, 10),
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            console.log(err)
            return res.status(400).json({

                ok: false,
                err,
            });
        }
        res.write("REGISTRATION DONE");
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
});
module.exports = app;