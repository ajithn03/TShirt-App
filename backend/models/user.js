const mongoose  = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');


var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
    },
    lastName: {
        type: String,
        maxlength: 32,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    userInfo: {
        type: String,
        trim: true,
    },
    encrypted_password: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: Number,
        default: 0,
    },
    purchases: {
        type: Array,
        default: []
    },
},
    {timestamps: true}
)

userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1();
        this.encrypted_password = this.securePassword(password)
    })
    .get(function(){
        return this._password;
    })

userSchema.methods = {
    authenticate: function(plainPassword){
        return this.securePassword(plainPassword) == this.encrypted_password
    },

    securePassword: function(plainPassword) {
        if(!plainPassword){
            return ""
        }
        try {
            return crypto.createHmac('sha256', this.salt)
               .update(plainPassword)
               .digest('hex');
        } catch (error) {
            return "";
        }
    }
}



module.exports = mongoose.model("User", userSchema);