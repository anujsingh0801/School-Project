import { Router } from 'express';
import { loginAuth, registerAuth, logoutAuth} from '../controllers/authController'

const router = Router();

router.get('/login', loginAuth)
router.get('/register', registerAuth)
router.get('/logout', logoutAuth)

export default router