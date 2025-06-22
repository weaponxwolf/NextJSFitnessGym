import { Router, Request, Response } from "express";
import fs from 'fs';

import Exercise from "../classes/Exercise";

const router : Router =Router()

router.get('/',(request: Request,response: Response)=>{
    let responseData:Exercise[]=[];
    const data=fs.readFileSync(__dirname+"/../db/exercises.json", 'utf-8');
    const exercises:Exercise[]=JSON.parse(data);

    if(request.query.limit!=undefined&&request.query.limit!=""){
        console.log(request.query.limit);
        responseData=exercises.slice(0,parseInt(request.query.limit.toString()));
    }
        
    response.send(responseData);
})


router.get('/bodyPart/:bodyPart',(request: Request,response: Response)=>{
    let responseData:Exercise[]=[];
    const data=fs.readFileSync(__dirname+"/../db/exercises.json", 'utf-8');
    const exercises:Exercise[]=JSON.parse(data);

    let bodyPart=request.params.bodyPart;
    
    responseData=exercises.filter(exercise=>exercise.bodyPart.startsWith(bodyPart));
    
    if(request.query.limit!=undefined&&request.query.limit!=""){
        responseData=responseData.slice(0,parseInt(request.query.limit.toString()));
    }
        
    response.send(responseData);
})

router.get('/target/:target',(request: Request,response: Response)=>{
    let responseData:Exercise[]=[];
    const data=fs.readFileSync(__dirname+"/../db/exercises.json", 'utf-8');
    const exercises:Exercise[]=JSON.parse(data);

    let target=request.params.target;
    
    responseData=exercises.filter(exercise=>exercise.target.toLowerCase().includes(target.toLowerCase()));
    
    if(request.query.limit!=undefined&&request.query.limit!=""){
        responseData=responseData.slice(0,parseInt(request.query.limit.toString()));
    }
        
    response.send(responseData);
})


router.get('/name/:name',(request: Request,response: Response)=>{
    let responseData:Exercise[]=[];
    const data=fs.readFileSync(__dirname+"/../db/exercises.json", 'utf-8');
    const exercises:Exercise[]=JSON.parse(data);

    let name=request.params.name;
    
    responseData=exercises.filter(exercise=>exercise.name.toLowerCase().includes(name.toLowerCase()));
  
    

    if(request.query.limit!=undefined&&request.query.limit!=""){
        responseData=responseData.slice(0,parseInt(request.query.limit.toString()));
    }
        
    response.send(responseData);
})

export default router;