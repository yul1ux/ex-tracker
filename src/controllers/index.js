const User = require("../models/userModel");
const Exercise = require('../models/exerciseModel');
const { default: mongoose } = require("mongoose");
const createUser = async (req, res, err) => {
  const name = req.body.username;
  const save_user = new User({
    username: name,
  });
  const hasUser =await User.find({ username: name });
  if (hasUser[0] != undefined) {
    res.send("This username has already taken");
  } else {
    const userData = await save_user.save();

    res.status(200).send(userData.toJSON({ versionKey: false }));
  }
};
const addExercise = async(req,res,next)=>{
  const id = req.params._id
  const description = req.body.description
  const duration = req.body.duration
  const date = req.body.date
  let dateNow = new Date(Date.now())
  if(date){
    dateNow = new Date(date)
  }
    const save_exercise = new Exercise({
    user_id : new mongoose.Types.ObjectId(id),
    description : description,
    duration : duration,
    date: dateNow.toDateString()
    
  })
  const hasUser =await User.find({_id:new mongoose.Types.ObjectId(id)})
  if(hasUser[0] == undefined){
    res.send("User couldn't find with that id")
  }else{
    await save_exercise.save()
    res.send({
      _id:id,
      username:hasUser[0].username,
      description:description,
      duration:duration,
      date:dateNow.toDateString()})
  }
  

}

const log = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params._id)
  const from = new Date(req.query.from)
  const to = new Date(req.query.to)
  const limit = req.query.limit
  const logData = await User.aggregate([
    { $match: { _id: id } },
    {
      $lookup: {
        from: "exercise",
        let: { id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$user_id", "$$id"] },
              date: { $gte: from.toDateString(), $lt: to.toDateString() },
            },
          },
          { $unset: ["_id", "user_id", "__v"] },
          { $limit: limit*1 },
        ],
        as: "log",
      },
    },
    {
      $project: {
        _id: "$_id",
        username: "$username",
        log: [{ date: "$log" }],
        count: { $size: "$log" },
      },
    },
  ]);
  
  res.send(logData)
}

  
module.exports = { createUser, addExercise,log };
