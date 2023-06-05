import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  createdAt: { //新增時的時間
      type: Date,
      default: Date.now, //設定預設值
      required: true
  },
})

//匯出該資料表
export default mongoose.model('user' , userSchema);
