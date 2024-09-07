import { Router } from 'express';
import { Signup, Login } from '../Contollers/Authcontroller.js';


const router = Router();

router.post('/signup', Signup);
router.post('/login', Login);

export default router;