const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


var userSchema = new mongoose.Schema({

    name : {
        type : String ,
        required : [true , "Please enter a name "]
    },
    avatar : {
        public_id : String ,
        url : String ,
    },
    email : {
        type : String,
        required : [true , "Pleasse enter an email"],
        unique : [true , "Email already exists "]

    },
    password : {
    type : String ,
    required : [true , "Please enter a password"],
    minlength : [ 6, "Please enter at least 6 characters" ],
    select : false,
    
    },
    posts : [

        {
            type : mongoose.Schema.Types.ObjectId,
             ref:"Posts",
        }
    ],
    followers :
    [
       {
        type : mongoose.Schema.Types.ObjectId,
             ref:"User"
       } 
    ],


following : [
    {
        type : mongoose.Schema.Types.ObjectId,
             ref:"User" 
    }
]
},{
    collection : 'User'
});

userSchema.pre("save", async function(next) {
   if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10);
   }
   next();
})
userSchema.methods.matchPassword = async function(password){
    return await bycrypt.compare(password , this.password);
}
userSchema.methods.generateToken = function (){
    return jwt.sign({_id : this._id} , process.env.JWT_SECRET)
}
module.exports = mongoose.model("User",userSchema);