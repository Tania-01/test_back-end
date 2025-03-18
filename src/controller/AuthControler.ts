import { Request, Response } from 'express';
import {authService} from "../service/authService";
import User from "../models/UserModel";

class AuthController {

    public async register(req: Request, res: Response): Promise<void> {
        const { firstname, lastname, email, password } = req.body;

        try {
            const { newUser, token } = await authService.register({ firstname, lastname, email, password });
            res.status(201).json({
                message: 'User registered successfully',
                user: newUser,
                token,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user'});
        }
    }


    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {

            const { existingUser, token } = await authService.login({ email, password });

            console.log('Existing User:', existingUser);
            console.log('Token:', token);


            res.status(200).json({
                message: 'Login successful',
                user: existingUser,
                token,
            });
        } catch (error) {

            console.error('Login error:', error);

            res.status(400).json({ message: 'Invalid email or password' });
        }
    }

}

export const authController = new AuthController();