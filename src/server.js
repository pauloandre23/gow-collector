import express from 'express';
import mongoose from 'mongoose';
import routes from './routes'; 

const app = express();

mongoose.connect('mongodb+srv://gowtester:paulo123@cluster0-sjod9.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,
useUnifiedTopology: true,});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(express.json());
app.use(routes);
app.listen(3333);