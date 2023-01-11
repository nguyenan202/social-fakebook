import { fileURLToPath } from "url";
import Post from "../models/Post";
import User from "../models/User";
import path from "path";

/* CREATE */
export const createPost = async (req, res) => {

    try {
        const { userId, description, picturePath } = req.body;

        let picPath = null;

        if (picturePath) {
            const __filename = fileURLToPath(import.meta.url);
            let __dirname = path.dirname(__filename)
            __dirname = __dirname.replace('/controllers', '');

            const sampleFile = req.files.picture;
            picPath = `${new Date().valueOf()}.jpg`;
            const uploadPath = path.join(__dirname, `/public/images/${picPath}`);

            sampleFile.mv(uploadPath, (err) => {
                if (err) return res.status(409).json({ message: err });

            })
        }

        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath: picPath,
            likes: [],
            comments: [],
        });

        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
export const likePost = async (req, res) => {

    /**
     *  id: postId
     *  userId: id of user like the post
     * 
     *  if post creater like his post => return post creater
     *  if another user like post => return null
     */

    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const user = await User.findById(post.userId);
        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            post.likes = post.likes.filter(like => like !== userId);
            user.impressions = user.impressions - 1;
        } else {
            post.likes.push(userId);
            user.impressions = user.impressions + 1;
        }

        const updatedUser = await user.save();

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        console.log(post.userId, userId);

        // post creater like his post
        const dataResponse = post.userId === userId ? {
            post: updatedPost,
            user: updatedUser
        } : {
            post: updatedPost,
        }

        res.status(200).json(dataResponse);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// PUT Comment
export const putComment = async (req, res) => {

    try {
        const { id } = req.params;
        const { userId, comment, createdAt, userPicturePath, userFullName } = req.body;

        const post = await Post.findById(id);

        post.comments.push({
            userId,
            comment,
            createdAt,
            userPicturePath,
            userFullName
        });

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { comments: post.comments },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
