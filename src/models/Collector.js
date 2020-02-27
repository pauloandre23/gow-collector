import mongoose from 'mongoose';
const CollectorSchema=new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    cpf: Number,    
});
export default mongoose.model('Collector', CollectorSchema);




