import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'

// Register User
const register = async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            pictureBackgroundPath,
            friends,
            location,
            occupation,
        } = req.body

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = {
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            pictureBackgroundPath,
            friends,
            location,
            occupation,
            viewedProfile: 0,
            impressions: 0,
        }

        const userCreated = await User.create(user)
        res.status(200).json(userCreated)

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}


// User Login
const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body

        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json(
            {
                msg: "User does not exist."
            }
        )

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json(
            {
                msg: "Invalid password."
            }
        )

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
        delete user.password

        res.status(200).json({
            token,
            user
        })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}


export {
    register,
    login
}