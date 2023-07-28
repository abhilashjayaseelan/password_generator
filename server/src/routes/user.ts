import express from 'express';
import userController from '../controller/userController';

const userRouter = ()=> {
    const route = express.Router();
    const controller = userController();

    route.post('/register', controller.registerUser);
    route.post('/login', controller.userLogin);
    route.post('/save-password/:name', controller.savePassword);
    route.get('/get-passwords/:name', controller.getAllPasswords);

    return route;
}

export default userRouter;