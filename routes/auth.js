const { Router } = require('express');
const { register,
        login,
        getUSerByJwt  } = require('../controllers/auth');
const { postRegisterRequestValidations,
        postLoginRequestValidations,
        validJWT, 
        hasRole} = require('../middlewares/users/auth');

const { upload } = require('../config/multer');

const router = Router();

router.post('/register', upload.single('photo'), postRegisterRequestValidations, register);
router.post('/login', postLoginRequestValidations, login);
router.get('/me', getUSerByJwt);

// Ejemplo de como usar la validacion de token y validacion de role

router.get('/testToken', validJWT, (req, res) =>{
    res.json({"Token":"ok"})
} )
router.get("/testRoleAndToken", validJWT, hasRole('Admin'), (req, res) => {
    res.json({"roleAdmin": "ok"})
})
module.exports = router;