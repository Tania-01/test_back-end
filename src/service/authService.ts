import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {userRepository} from "../repositories/userRepositories";

class AuthService {
    public async register({ firstname, lastname, email, password }: { firstname: string, lastname: string, email: string, password: string }) {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userRepository.createUser({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ userId: newUser.user_id }, process.env.JWT_SECRET || 'your_jwt_secret', {
            expiresIn: '1h',
        });

        return { newUser, token };
    }

    public async login({ email, password }: { email: string, password: string }) {
        // Знайти користувача по email
        const existingUser = await userRepository.findByEmail(email);

        // Якщо користувача не знайдено, викинути помилку
        if (!existingUser) {
            throw new Error('Invalid email or password');
        }

        // Порівняти введений пароль з тим, що є в базі даних
        const isMatch = await bcrypt.compare(password, existingUser.password);

        // Якщо паролі не співпадають, викидаємо помилку
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        // Якщо все вірно, генеруємо JWT токен
        const token = jwt.sign({ userId: existingUser.user_id }, process.env.JWT_SECRET || 'your_jwt_secret', {
            expiresIn: '1h',
        });

        // Повертаємо користувача та токен
        return { existingUser, token };
    }

}

export const authService = new AuthService();
