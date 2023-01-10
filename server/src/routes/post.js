import express from "express";
import { getFeedPosts, getUserPosts, likePost, putComment } from "../controllers/post";
import verifyToken from "../middleware/auth.js";

const postRoutes = express.Router();

/* READ */
postRoutes.get("/", verifyToken, getFeedPosts);
postRoutes.get("/:userId/posts", verifyToken, getUserPosts);

/* PUT */
postRoutes.put('/:id/comment', putComment)

/* UPDATE */
postRoutes.patch("/:id/like", verifyToken, likePost);

export default postRoutes;