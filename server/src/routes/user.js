
import express from "express";

import verifyToken from "../middleware/auth";
import {
    getUser,
    getUserFriends,
    updateFriendRequest,
    getUsersByAPartName,
    choiceFriend
} from '../controllers/user'
import User from "../models/User";

const userRoutes = express.Router()

//get user by Id
userRoutes.get('/:id', verifyToken, getUser);

//get user by name
userRoutes.get('/search/:name', verifyToken, getUsersByAPartName);

//get user friends
userRoutes.get("/:id/friends", verifyToken, getUserFriends);

//update user fridends request
userRoutes.patch("/friend-request/:id/:friendId", verifyToken, updateFriendRequest);

//update return choice friends request
userRoutes.patch('/friend-request/:choice/:id/:friendId', choiceFriend)

export default userRoutes