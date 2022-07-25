const sanitizeHtml = require('sanitize-html');
const express = require('express');
const app = express();
//Recomendación de seguridad
app.disable("x-powered-by");

app.use(express.json());

const students = [
    {id:1, name:"Juan Jose", enroll:true},
    {id:2, name:"Peter Aliaga", enroll:false}
];

app.get('/',(_req,res)=>{
    res.send('Node Js api');
});

app.get('/api/students',(_req,res)=>{
    res.send(students);
});

app.get('/api/students/:id',(req,res)=>{

    const student = students.find(s=>s.id === parseInt(req.params.id));

    if(!student) return res.status(404).send('Estudiante no encontrado');
    else res.send(student);
});

app.post('/api/students',(req,res)=>{

    const student = {
        id: students.length + 1,
        name: sanitizeHtml(req.body.name),
        age:  parseInt(sanitizeHtml(req.body.age)),
        enroll: (sanitizeHtml(req.body.enroll)==="true")
    };

    students.push(student);
    res.send(student);
});

app.delete('/api/students/:id',(req,res)=>{
    const student = students.find(s=>s.id === parseInt(req.params.id));

    if(!student) return res.status(404).send('Estudiante no encontrado');
    
    const index = students.indexOf(student);
    students.splice(index,1);
    res.send(student);
});

const port = process.env.port || 9090;
app.listen(port, ()=> console.log(`Escuchando en puerto ${port}`))