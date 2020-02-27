
import express from 'express';
import authMiddleware from './middlewares/auth';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router();
const upload = multer(multerConfig);

import CreateController from './controllers/CreateController';
import SessionController from './controllers/SessionController';
import DeleteController from './controllers/DeleteController';
import UpdateController from './controllers/UpdateController';

routes.post('/users', CreateController.store);
routes.post('/sessions', SessionController.session);

routes.use(authMiddleware);
routes.put('/users', UpdateController.update);
routes.delete('/remove', DeleteController.delete);

routes.post('/files', upload.single('file'), (req,res)=>{
    return res.json({ok: true});
})

export default routes;