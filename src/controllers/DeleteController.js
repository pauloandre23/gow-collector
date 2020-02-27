import Collector from '../models/Collector';
import Bcrypt from 'bcryptjs';

class DeleteController{
    async delete(req,res){
        const {cpf, password} = req.body;
        const user = await Collector.findOne({cpf});
        if (user){
            if(!(await Bcrypt.compareSync(password, user.password))){
                return res.status(400).json({error: "Essa senha não é válida. Favor tentar novamente."});
        }
        await Collector.deleteOne({cpf});
    }
        return res.json({message:'Usuário excluído com sucesso'});
    }
}

export default new DeleteController();