import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// user register
export const register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user)
      return res.json({ Message: "User Already registered", success: false });
    let hasPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, phone, password: hasPassword });
    res.json({ Message: "User Register Successfully", user, success: true });
  } catch (error) {
    res.json({ Message: "Internal server error", success: false });
  }
};


//userLogin
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user)
      return res.json({ Message: "User not exist...", success: false });
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.json({ Message: "Invalid Credrential", success: false });

    const token = jwt.sign({ userID: user._id }, "!321g()");

    res.json({ Message: `Welcome ${user.name}`, token, success: false });
  } catch (error) {
    res.json({ Message: "Internal server error", success: false });
  }
};

// Profile

export const profile = async (req, res) => {
  const token = req.header("auth");
  if (!token) return res.json({ message: "Login First", success: false });
  var decoded = jwt.verify(token, process.env.JWT_Screte);
  // console.log(decoded);

  const id = decoded.userID;

  const user = await User.findById(id);
  if(user){
    const {name, email} = user;
    res.json({ message: `Welcome  ${name}`, name, email, success:true });

  }


};
