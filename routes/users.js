const express = require("express");
const{ users } = require("../data/users.json");
// const { UserModel, BookModel } = require("../models");

const router= express.Router();

//  Get an user

router.get("/",(req, res)=>{
    res.status(200).json({
        success: true,
        data: users,
    });
    })
// to Get single user
router.get("/:id",(req, res)=>{
        const { id }= req.params;
        const user = users.find((each) => each.id === id);
        if(!user){
            return res.status(404).json({
                sucess: false,
                message:"User  not found",
            });
        }
        return res.status(200).json({
            sucess: true,
            data: user,
        });
     });

// post-create a new user
router.post("/",(req, res)=>{
    const {id, name, surname, email, subscriptionType, subscriptionDate}= req.body
     const user = users.find((each)=>each.id===id);
     if(user){
        return res.status(404).json({
        success: false,
        message: "user already exist",
     });
    }
     users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
     });
     return res.status(201).json({
        success:true,
        data: users,
     });
     
});

// put-updating user data

router.put("/:id",(req,res)=>{
    const { id } = req.params;
    const { data } =req.body;
    const user = users.find((each) => each.id === id);

    if(!user)
    return res.status(404).json({success:false, message: "user not found"});


const UpdatedUser = users.map((each) => {
    if(each.id === id){
        return{
        ...each,
        ...data,
        };
    }
    return each;
  });
return res.status(200).json({
    success:true,
    data:UpdatedUser,
  });
});

// delete-deleting the user by their ID

router.delete("/:id",(req,res)=>{
    const {id} =req.params;
    const user =users.find((each)=> each.id===id);

    if (!user) {
        return res.status(404).json({
            success:false,
            message:"user to be deleted is not found",
        })
    }

    const  index = users.indexOf(user);
    users.splice(index,1);

    return res.status(200).json({
        success: true,
        data: users
    });
    return res.status(200).json({ success: true, data: users });
});

router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((each) => each.id === id);

  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      
      date = new Date();
    } else {
        

              // getting date on basics of variable

      date = new Date(data);
    }
    // floor give the lowest(round fig) value
    // ceil will get highest value
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };
  // subscription
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    subscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 200
          : 100
        : 0,
  };
  return res.status(200).json({ success: true, data });
});


module.exports=router;