const router = require('express').Router();
const controller = require('../controllers/authController');

router.get('/register', controller.registerGet);
router.post('/register', controller.registerPost);
router.get('/login', controller.loginGet);
router.post('/login', controller.loginPost);
router.get('/logout', controller.logout);

module.exports = router;
