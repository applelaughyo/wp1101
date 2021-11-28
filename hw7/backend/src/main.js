import mongoose from './mongo';
import ScoreCard from "./models/ScoreCard";
import app from "./routes/index";
// define server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})

const saveScoreCard = async(name,subject,score)=>{
  const existing = await ScoreCard.findOne({$and:[{name},{subject}]})
  const newScoreCard = await new ScoreCard({name,subject,score});
  if(existing){
    try{
      await ScoreCard.updateOne({$and:[{name},{subject}]},{$set: {score}});
      console.log("Updated ScoreCard",newScoreCard);
      return 'Updating';
    }
    catch(e){
      throw new Error("Database Updating error " + e);
    }
  }
  else{
    try{
      console.log("Created ScoreCard",newScoreCard);
      newScoreCard.save();
      return 'Adding';
    }
    catch(e){
      throw new Error("Database Adding error " + e);
    }
  }
}
const deleteDB = async()=>{
  try{
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
  }catch(e){
    throw new Error("Database deletion failed");
  }
}
const queryName = async(name)=>{
  let query = await ScoreCard.find({name}).select('name subject score');
  if(query.length === 0){
    throw new Error("query failed");
  }
  else{
    const messages = query.map((m)=>{ return ('('+ m.name + ',' + m.subject + ',' + m.score + ')')});
    return(messages);
  }
}
const querySubject = async(subject)=>{
  let query = await ScoreCard.find({subject}).select('name subject score');
  if(query.length === 0){
    throw new Error("query failed");
  }
  else{
    const messages = query.map((m)=>{ return ('('+ m.name + ',' + m.subject + ',' + m.score + ')')});
    return(messages);
  }
}





export {saveScoreCard , deleteDB , queryName , querySubject};