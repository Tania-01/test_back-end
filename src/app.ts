import express from 'express';
import dotenv from 'dotenv';
import sequelize from "./config/dbConfig";
import taskRoutes from "./router/taskRoutes";
import authRouter from "./router/authRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(
    cors({
        origin: "http://localhost:3002",
    }),
);
app.use(express.json());


app.use("/task", taskRoutes);
app.use('/auth',authRouter)





const port = process.env.PORT || 3000;


sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log('Database connection failed');
        console.error(err);
    });
