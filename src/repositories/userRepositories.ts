import User from "../models/UserModel";
import { FindOptions } from "sequelize";
import bcrypt from 'bcryptjs';

class UserRepository {
    public async findByEmail(email: string) {
        try {
            const options: FindOptions<User> = {
                where: {
                    email: email,
                },
            };

            return await User.findOne(options);
        } catch (error) {
            throw new Error('Error finding user by email');
        }
    }

    public async createUser({ firstname, lastname, email, password }: { firstname: string, lastname: string, email: string, password: string }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            return await User.create({ firstname, lastname, email, password: hashedPassword });
        } catch (error) {
            throw new Error('Error creating user');
        }
    }
}

export const userRepository = new UserRepository();
