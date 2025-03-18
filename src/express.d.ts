declare global {
    namespace Express {
        interface Request {
            user?: { userId: number };  // Тип для user
        }
    }
}
