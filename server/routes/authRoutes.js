import express from "express"
const router = express.Router();
import { login} from '../controllers/authController.js'; // Import auth controller


router.post('/login', login);

// router.post('/logout', logout);

export default router;      