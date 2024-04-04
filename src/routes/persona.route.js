import { Router } from 'express';
import pool from '../database.js';
import bcrypt from 'bcrypt';

const router = Router();

router.get('/addusuario', (req, res) => {
    res.render('personas/addusuario')
});


router.get('/prueba', (req, res) => {
    res.render('personas/prueba')
});

router.get('/add', (req, res) => {
    res.render('personas/add')
});
router.get('/addherramienta', (req, res) => {
    res.render('personas/addherramienta')
});

router.get('/addusadas', (req, res) => {
    res.render('personas/addusadas')
});

router.get('/login', (req, res) => {
    res.render('personas/login');
});


router.post('/add', async(req, res) => {
    try {
        const { cedula, nombre, apellido, edad, email, telefono, fechaIngreso } = req.body;
        const newPersona = {
            cedula,
            nombre,
            apellido,
            edad,
            email,
            telefono,
            fechaIngreso
        }
        await pool.query('INSERT INTO usuarios SET ?', [newPersona])
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/list', async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM usuarios');
        res.render('personas/list', { usuarios: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/edit/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const [persona] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        const personaEdit = persona[0];
        res.render('personas/edit', { usuarios: personaEdit });
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
});

router.post('/edit/:id', async(req, res) => {
    try {
        const { cedula, nombre, apellido, edad, email, telefono, fechaIngreso } = req.body;
        const { id } = req.params;
        const editPersona = {
            cedula,
            nombre,
            apellido,
            edad,
            email,
            telefono,
            fechaIngreso
        }
        await pool.query('UPDATE usuarios  SET ? WHERE id = ?', [editPersona, id]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/delete/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE  FROM usuarios WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
});

router.post('/addherramienta', async(req, res) => {
    try {
        const { tipoHerramienta, nombre, marca, descripcion, fechaIngreso } = req.body;
        const newHerramienta = {
            tipoHerramienta,
            nombre,
            marca,
            descripcion,
            fechaIngreso
        }
        await pool.query('INSERT INTO herramientas SET ?', [newHerramienta])
        res.redirect('/listherramientas');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/listherramientas', async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM herramientas');
        res.render('personas/listherramientas', { herramientas: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/editherramienta/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const [herramienta] = await pool.query('SELECT * FROM herramientas WHERE id = ?', [id]);
        const herramientaEdit = herramienta[0];
        res.render('personas/editherramienta', { herramientas: herramientaEdit });
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
});

router.post('/editherramienta/:id', async(req, res) => {
    try {
        const { tipoHerramienta, nombre, marca, descripcion, fechaIngreso } = req.body;
        const { id } = req.params;
        const editherramienta = {
            tipoHerramienta,
            marca,
            descripcion,
            fechaIngreso
        }
        await pool.query('UPDATE herramientas SET ? WHERE id = ?', [editherramienta, id]);
        res.redirect('/listherramientas');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/listherramientas/delete/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE  FROM herramientas WHERE id = ?', [id]);
        res.redirect('/listherramientas');
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
});

router.post('/addusadas', async(req, res) => {
    try {
        const { operador_id, herramienta_id, obra, fecha, cantidad } = req.body;
        const newUsada = {
            operador_id,
            herramienta_id,
            obra,
            fecha,
            cantidad
        }
        await pool.query('INSERT INTO herramientas_uso SET ?', [newUsada])
        res.redirect('/listusadas');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/listusadas', async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM herramientas_uso');
        res.render('personas/listusadas', { herramientas_uso: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/editusadas/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const [herramientaUso] = await pool.query('SELECT * FROM herramientas_uso WHERE id = ?', [id]);
        const usadasEdit = herramientaUso[0];
        res.render('personas/editusadas', { herramientas_uso: usadasEdit });
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
});

router.post('/editusadas/:id', async(req, res) => {
    try {
        const { operador_id, herramienta_id, obra, fecha, cantidad } = req.body;
        const { id } = req.params;
        const editUsadas = {
            operador_id,
            herramienta_id,
            obra,
            fecha,
            cantidad
        }
        await pool.query('UPDATE herramientas_uso SET ? WHERE id = ?', [editUsadas, id]);
        res.redirect('/listusadas');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/listusadas/delete/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE  FROM herramientas_uso WHERE id = ?', [id]);
        res.redirect('/listusadas');
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
});
//inicio de session
/*router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            res.status(401).send('Usuario no encontrado');
            return;
        }
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(401).send('Contraseña incorrecta');
            return;
        }
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
});*/
router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            res.status(401).send('Usuario no encontrado');
            return;
        }
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(401).send('Contraseña incorrecta');
            return;
        }
        res.redirect('/prueba'); // Redirigir a la página de inicio después de iniciar sesión
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
});


//regisro de usuarios administrativos

router.post('/addusuario', async(req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const [result] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.send('<script>alert("Usuario registrado correctamente"); window.location.href = "/";</script>');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
});

export default router;