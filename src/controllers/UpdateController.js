import Collector from '../models/Collector';
class UpdateController{
async update(req,res){

    const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string().min(6)
        .when('oldPassword', (oldPassword, field)=>{
            oldPassword ? field.required() : field //lembrando que é em relação ao password
        }),
        confirmPassword: Yup.string().when('password', (password, field)=>
            password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
     });

     if (!(await schema.isValid(req.body))){
         
         return res.status(400).json({error: 'A validação falhou'});
     }
    
    const {email, oldPassword} = req.body;
    const user = await Collector.findById(req.userId);
    
    if(email!=user.email){
        const userExists = await Collector.findOne({email});
        
        if (userExists){
            return res.status(400).json({error: 'Usuário já existe.'});
        }
    }
    
    if(oldPassword && !(await Bcrypt.compareSync(await Bcrypt.hashSync(oldPassword), user.password ))){
        return res.status(401).json({error: "As senhas não batem. Favor verificar."});
    }
   
    const {_id, name, cpf} = await user.updateOne(req.body);
   
    return res.json( {
        _id, 
        name,
        cpf,        
    });
}
}
export default new UpdateController();