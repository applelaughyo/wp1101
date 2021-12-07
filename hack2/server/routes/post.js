import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()




const findAllPost = async()=>{
    try{
        const allPost = await Post.find({}).sort({ 'timestamp': 1 });
        //   console.log("find allpost success");
        const result = {msg: "success" , data: allPost}
        return result;

    }catch(e){
      throw new Error("Database find allpost failed");
    }
  }
// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts',async(_, res) => {
    try{
        const result = await findAllPost();
        res.status(200).send({message: result.msg, data: result.data});
    }
    catch(e){
        res.status(403).send({message: "error", data: null});
    }
})



const queryPostId = async(postId)=>{
    try{
        let post = await Post.find({postId})
        const result = {msg: "success" , data: post[0]}
        return result;
    }catch(e){
      throw new Error("Database find postId failed");
    }
}
// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail',async(req, res) => {
    try{
        let result = await queryPostId(req.query.pid);
        console.log(result.data)
        res.status(200).send({message: result.msg, post: result.data});
    }
    catch(e){
        res.status(403).send({message: "error", post: null});
    }
})









const createNewPost = async(postId,title,content,timestamp)=>{
    try{
        const newPost = await new Post({postId,title,content,timestamp});
        console.log("Created NewPost",newPost);
        newPost.save();
    }
    catch(e){
        throw new Error("Database Adding error " + e);
    }
}

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost',async(req, res) => {
    let newPost = {postId: req.body.postId, title: req.body.title , content: req.body.content , timestamp: req.body.timestamp}
    try{
        await createNewPost(newPost.postId , newPost.title , newPost.content , newPost.timestamp);
        res.status(200).send({message: "success"});
    }
    catch(e){
        res.status(403).send({message: "error"});
    }
})

// TODO 5-(1): create the 4th API (/api/post)

export default router