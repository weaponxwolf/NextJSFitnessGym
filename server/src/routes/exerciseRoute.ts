import { Router, Request, Response } from "express";
import fs from 'fs';

const router : Router =Router()

router.get('/',(request: Request,response: Response)=>{
    const data=fs.readFileSync(__dirname+"/../db/exercises.json", 'utf-8');
    const exercises=JSON.parse(data);
    response.send(exercises);
})

export default router;