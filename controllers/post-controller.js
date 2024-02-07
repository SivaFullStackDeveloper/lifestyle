const { where } = require('sequelize');
const models = require('../models')

const save = async(req,res)=>{
    console.log(req.body);
    let post = {
        title:req.body.title,
        content:req.body.content,
        imageUrl:req.body.imageUrl,
        categoryId:req.body.categoryId,
        userId:1,
    }
await models.Post.create(post).then((result)=>{
res.status(201).json({post:result,message:"Post saved Sucessfully"});
}).catch((e)=>{
    res.status(404).json({
        message:"comething went wrong",
        error:e.toString(),
    }); 
})

} 


const getPost = async(req,res)=>{
    const id = req.params.id
    const result = await models.Post.findByPk(id);
    if(!result) return res.status(404).json({
        message:"comething went wrong",
    })
    else{
        return res.status(200).json({post:result,message:"Post found Sucessfully"});
    }
}


const getPostsFindALL = async(req,res)=>{
    const result = await models.Post.findAll();
    if(!result) return res.status(404).json({
        message:"something went wrong",
    })
    else{
        return res.status(200).json({posts:result,message:"Post found Sucessfully"});
    }
}

const udatePost= async(req,res)=>{
    const id = req.params.id
    console.log(id)
    console.log(req.body)
    let post = {
        title:req.body.title,
        content:req.body.content,
        imageUrl:req.body.imageUrl,
        categoryId:req.body.categoryId,
        userId:3,
    }

    const result = await models.Post.update(post,{where:{id:id,userId:3}})
    console.log()
    if(!result) return res.status(404).json({
        message:"something went wrong",
    })
    else{
        return res.status(200).json({posts:post,message:"Post updated Sucessfully"});
    }

}


const destroyPost= async(req,res)=>{
    const id = req.params.id
    const result = await models.Post.destroy({where:{id:id,}})
    if(!result) return res.status(404).json({
        message:"something went wrong",
    })
    else{
        return res.status(200).json({message:"Post deleted Sucessfully"});
    }

}
module.exports = {
    save:save,
    getPost:getPost,
    getPostsFindALL:getPostsFindALL,
    udatePost:udatePost,
    destroyPost:destroyPost
}