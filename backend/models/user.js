import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: { type: String, required: true, default: 'user' }
});

userSchema.pre('save', async function(next){

    // if(this.isModified('password') || this.isNew){
    //     const salt = await bcrypt.genSalt(10);
    //     this.password = await bcrypt.hash(this.password, salt);
    // }
    if (this.isModified('password') || this.isNew) {
        console.log('Original password:', this.password);  // 显示原始密码
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log('Hashed password:', this.password);  // 显示加密后的密码
    }
    next();
});

userSchema.methods.comparePassword = async function(password) {
    // console.log("password: " + password + "| dbpassword: " + this.password);
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;