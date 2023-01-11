import { Avatar, Button, Grid, TextareaAutosize, Typography, useTheme } from "@mui/material"
import Moment from 'react-moment'
import { Favorite, ChatBubbleOutline, Share } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { setPost, setUser } from "../../../redux/store";
import { useState } from "react";
import Comment from "./Comment";

const Post = ({ fullName, userPicturePath, createdAt, description, imagePath, likes, postId }) => {

    const [isComment, setIsComment] = useState(false);
    const [comment, setCommet] = useState('');

    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const mode = useSelector(state => state.mode);
    const posts = useSelector(state => state.posts);

    const isLike = likes.includes(user._id);

    const theme = useTheme();
    const dispatch = useDispatch();
    const background = theme.palette.background.alt;
    const dateColor = theme.palette.neutral.mediumMain;
    const inputBackgroundColor = theme.palette.neutral.light;
    const inputColor = mode === 'dark' ? '#fff' : '#000';

    const postComments = posts.find(post => post._id === postId).comments;

    const usersLikePost = likes.length;
    const totalComments = postComments.length;

    const handleLike = async () => {

        const response = await fetch(`${process.env.REACT_APP_HOST_NAME}/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: user._id
            })
        });

        const responePost = await response.json();

        if (!responePost.message) {
            dispatch(setPost({ post: responePost.post }))
            
            //Checkk if loged in user post then update store
            if (responePost.user) {
                dispatch(setUser({ user: responePost.user }))
            }
        }
    }

    const handlePostComment = async () => {
        if (comment === '') return;

        let date = new Date(Date.now());

        const response = await fetch(`${process.env.REACT_APP_HOST_NAME}/posts/${postId}/comment`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: user._id,
                userFullName: `${user.lastName} ${user.firstName}`,
                userPicturePath: user.picturePath,
                comment,
                createdAt: date.toISOString()
            })
        });

        const post = await response.json();

        if (!post.message) {
            dispatch(setPost({ post }));
            setCommet('');
        }
    }


    const newPostComments = [...postComments].reverse();

    const listComment = newPostComments.map(comment => {
        return (
            <Comment
                key={comment.createdAt}
                userId={comment.userId}
                fullName={comment.userFullName}
                userPicturePath={comment.userPicturePath}
                createdAt={comment.createdAt}
                comment={comment.comment}
            />
        )
    })

    return (
        <Grid container padding='1rem' marginTop='1.5rem' marginBottom='2rem' style={{ backgroundColor: background }} borderRadius='8px'>

            <Grid item xs={12} display='flex' >
                <Avatar src={`${process.env.REACT_APP_HOST_NAME}/images/${userPicturePath}`} alt={fullName} />
                <Grid container display='block' sx={{ marginLeft: '1rem' }}>
                    <Typography
                        sx={{
                            fontWeight: '500',
                            fontSize: '1rem'
                        }}
                    >
                        {fullName}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '0.7rem',
                            color: dateColor
                        }}
                    >
                        <Moment fromNow>{createdAt}</Moment>
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Typography
                    sx={{
                        margin: '1rem 0'
                    }}
                >
                    {description}
                </Typography>
            </Grid>

            {imagePath && <Grid item xs={12}>
                <img src={`${process.env.REACT_APP_HOST_NAME}/images/${imagePath}`} height='440px' width='100%' alt={fullName} />
            </Grid>}

            {(usersLikePost > 0 || totalComments > 0) && <Grid item xs={12} display='flex' justifyContent='space-between' borderBottom='1px solid #3E4042' padding='0.5rem 0'>
                {usersLikePost > 0 && <Typography display='flex' alignItems='center' sx={{ fontSize: '1rem' }}>
                    <Favorite sx={{
                        marginRight: '0.3rem',
                        color: 'red'
                    }} />
                    {usersLikePost}
                </Typography>}
                {totalComments > 0 && <Typography display='flex' alignItems='center' sx={{ fontSize: '1rem' }}>
                    {totalComments}
                    <ChatBubbleOutline sx={{
                        marginLeft: '0.3rem',
                    }} />
                </Typography>}
            </Grid>}

            <Grid item xs={12} margin='0.5rem 0' padding='0 1rem' display='flex' justifyContent='space-between'>
                <Typography
                    display='flex'
                    alignItems='center'
                    sx={{
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                    onClick={handleLike}
                >
                    <Favorite sx={!isLike ? {
                        marginRight: '0.3rem',
                    } : {
                        marginRight: '0.3rem',
                        color: 'red'
                    }} />
                    Like
                </Typography>
                <Typography
                    display='flex'
                    alignItems='center'
                    sx={{
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                    onClick={() => setIsComment(!isComment)}
                >
                    <ChatBubbleOutline sx={{
                        marginRight: '0.3rem'
                    }} />
                    Comment
                </Typography>
                <Typography display='flex' alignItems='center' sx={{ fontSize: '1rem' }}>
                    <Share sx={{
                        marginRight: '0.3rem'
                    }} />
                    Share
                </Typography>
            </Grid>

            {isComment &&
                <>
                    <Grid item xs={12} padding='1rem 0 0.5rem 0' borderTop='1px solid #3E4042' display='flex' justifyContent='space-between'>
                        <Avatar src={`${process.env.REACT_APP_HOST_NAME}/images/${user.picturePath}`} alt={user.firstName} sx={{ width: '36px', height: '36px' }} />
                        <TextareaAutosize
                            placeholder="Write comment..."
                            style={{
                                width: "100%",
                                height: '100%',
                                backgroundColor: inputBackgroundColor,
                                borderRadius: "2rem 0 0 2rem",
                                padding: "0.5rem 1.5rem",
                                resize: 'none',
                                marginLeft: '1rem',
                                outline: 'none',
                                border: 'none',
                                color: inputColor,
                                fontSize: '0.9rem',
                            }}
                            minRows={1}
                            maxRows={999}
                            value={comment}
                            onChange={(e) => setCommet(e.target.value)}
                        />
                        <Button
                            sx={{
                                color: theme.palette.background.alt,
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: "0 2rem 2rem 0",
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.main,
                                    opacity: 0.8
                                }
                            }}
                            onClick={handlePostComment}
                        >
                            Post
                        </Button>
                    </Grid>

                    {postComments.length > 0 &&

                        (
                            <Grid item xs={12}
                                sx={{
                                    '::-webkit-scrollbar': {
                                        width: '8px'
                                    },
                                    '::-webkit-scrollbar-track': {
                                        background: '#ccc',
                                        WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)'
                                    },

                                    /* Handle */
                                    '::-webkit-scrollbar-thumb': {
                                        background: '#888'
                                    },

                                    /* Handle on hover */
                                    '::-webkit-scrollbar-thumb:hover': {
                                        background: '#555'
                                    },
                                    maxHeight: '500px',
                                    overflowY: 'scroll'
                                    // '&:no'
                                    // '::-webkit-scrollbar': {
                                    //     display: 'none'
                                    // }
                                }}
                            >
                                {listComment}
                            </Grid>
                        )
                    }
                </>

            }
        </Grid >
    )
}

export default Post