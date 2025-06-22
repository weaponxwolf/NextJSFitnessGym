import express from 'express'
import exerciseRoute from './routes/exerciseRoute'


const cors=require('cors');

const app=express()

app.use(cors())

app.use('/api/exercises',exerciseRoute);

app.listen(4000,()=>{
    console.log("Listening at http://localhost:4000");
})