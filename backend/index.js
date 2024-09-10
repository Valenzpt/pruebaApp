require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.send("hola val")
})
app.use(require('./routes/usuario.route'));
app.use(require('./routes/solicitud.route'));
app.use(require('./routes/empleado.route'));
app.use(require('./routes/rol.route'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})