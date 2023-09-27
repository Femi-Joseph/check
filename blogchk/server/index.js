const express=require('express')
const dotenv=require('dotenv')
const Router=require('./routes/route')

const Connection=require('./database/db.js')
dotenv.config();
const app = express();
const cors = require("cors");
const bodyParser=require('body-parser');


app.use(cors());

const PORT = 8000;
app.get("/",(req,res)=>{
    res.send("welcome")
})
/*app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));*/
app.use(bodyParser.json({limit: '50mb',extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());


app.use('/', Router);
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username,password);
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));