const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const models = require('../models')

const register = async(req,res)=>{
    const hash = await bcrypt.hash(req.body.password,10)
    console.log(req.body);
    let user = {
        name:req.body.name,
        email:req.body.email,
        password:hash,
    }
    console.log(user);
   const isExist =  await models.User.findOne({where:{email:req.body.email}});
   if(isExist){
    return  res.status(404).json({
        message:"Sorry user already exists with this email please login or create new accont",
    }); 
   }
await models.User.create(user).then((result)=>{
res.status(201).json({post:result,message:"USER REGISTERD Sucessfully"});
}).catch((e)=>{
    res.status(404).json({
        message:"comething went wrong",
        error:e.toString(),
    }); 
})

} 



const login = async(req,res)=>{
    const isExist =  await models.User.findOne({where:{email:req.body.email}});
    if(!isExist){
            return  res.status(401).json({
                message:"Invalid credentials",
            }); 

    }else{
        await bcrypt.compare(req.body.password,isExist.password).then(async(result,error)=>{
            if(result){
               jwt.sign({email:isExist.email,userId:isExist.userId},'secret',(err,token)=>{
                    console.log(token)
                    res.status(200).json({
                        message:"Login sucessfull",
                        token :token
                    }); 
                })
                
            }else{
                return  res.status(401).json({
                    message:"Invalid credentials",
                }); 
            }
        });
        
    }

}

module.exports = {
    register:register,
    login:login,
}