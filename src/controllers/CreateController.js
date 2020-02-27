import Collector from '../models/Collector';
import Bcrypt from 'bcryptjs';
import * as Yup from 'yup';




class CreateController{

async store(req,res){
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
     });

     if (!(await schema.isValid(req.body))){
         return res.status(400).json({error: 'A validação falhou'});
     }
   
    const {email} = req.body;
    const collectorExiste = await Collector.findOne({email});
    if(collectorExiste){
        return res.json({error: 'Usuário já existe.'});
    }
    req.body.password= await Bcrypt.hashSync(req.body.password, 10);

    const {_id, name, cpf, password}=await Collector.create(req.body);
    
    return res.json({
        _id, 
        name,
        cpf,
        password
    });

}



}
export default new CreateController();