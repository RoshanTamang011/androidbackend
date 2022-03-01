const mongoose= require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
      },
      hash_password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
      contactNumber: { type: String },
      pofilePicture: { type: String },
},

);

// userSchema.methods.getSignedJwtToken = function(){
//     return jwt.sign({id:this._id,role:this.role},process.env.JWT_SECRET,{
//         expiresIn:process.env.JWT_EXPIRE,
//     });
// };


userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

module.exports= mongoose.model("User",userSchema);