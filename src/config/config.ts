import { config } from "dotenv";
config();

export const configs = {



        SECRET_SALT: process.env.SECRET_SALT || "default_salt",
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "default_access_secret",
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
    };

