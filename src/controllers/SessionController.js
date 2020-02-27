import Collector from '../models/Collector';
import Bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

class SessionController{
    async session(req,res){
        const {email} = req.body;
        const user = await Collector.findOne({email});
        if(!user){
            return res.status(400).json({error: 'Usuário não encontrado. Favor conferir o nome.'});
        }
//console.log(user.password)
        if (!(await Bcrypt.compareSync(req.body.password, user.password))){
            return res.status(400).json({error: "Essa senha não é válida. Favor tentar novamente."});
        }
        const {_id, name} = user;

        return res.json({
            user:{
                _id, name, email,
            },

            token: 
                jwt.sign({_id}, authConfig.secret, {
                    expiresIn: authConfig.expiresIn,

                })

            ,

        })
    }
}
export default new SessionController(); 