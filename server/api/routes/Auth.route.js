import Express from "express";
import { google, login, logout, signup, facebook, apple } from "../controllers/AuthController.js";

const router = Express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/google', google)
router.post('/facebook', facebook)
router.post('/apple', apple)

export default router;
