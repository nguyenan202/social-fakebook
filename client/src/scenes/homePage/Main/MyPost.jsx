import { Avatar, Box, Grid, TextareaAutosize, useTheme, Typography, IconButton, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { useRef, useState } from "react";
import FlexBetween from "../../../components/FlexBetween";
import {
    EditOutlined,
    DeleteOutlined,
    ImageOutlined,
    VideoCall,
    MicNone,
    MoreHoriz
} from '@mui/icons-material';
import { setPosts } from "../../../redux/store";

const MyPost = () => {

    const [isImage, setIsImage] = useState(false)
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");

    const inputPostRef = useRef();

    const theme = useTheme();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const mode = useSelector(state => state.mode)
    const token = useSelector(state => state.token)

    const background = theme.palette.background.alt;
    const inputBackgroundColor = theme.palette.neutral.light;
    const inputColor = mode === 'dark' ? '#fff' : '#000';
    const medium = theme.palette.neutral.medium;
    const mediumMain = theme.palette.neutral.mediumMain;

    const handlePost = async () => {

        if (post === '' && !image) {
            inputPostRef.current.focus();
            return;
        };


        const formData = new FormData();

        formData.append('userId', user._id)
        formData.append('description', post)

        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`http://localhost:8080/posts`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body:formData
        });

        const posts = await response.json();

        dispatch(setPosts({posts}))
        setImage(null);
        setPost('');
        setIsImage(false);
    }


    return (
        <Grid container padding='1rem' marginTop='2rem' style={{ backgroundColor: background }} borderRadius='8px'>

            <Grid item xs={12} display='flex' >
                <Avatar src={`http://localhost:8080/images/${user.picturePath}`} alt={user.firstName} />
                <TextareaAutosize
                    placeholder="What's on your mind..."
                    style={{
                        width: "100%",
                        backgroundColor: inputBackgroundColor,
                        borderRadius: "2rem",
                        padding: "0.75rem 2rem",
                        resize: 'none',
                        marginLeft: '1rem',
                        outline: 'none',
                        border: 'none',
                        color: inputColor,
                        fontSize: '1rem',
                    }}
                    ref={inputPostRef}
                    minRows={1}
                    maxRows={999}
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                />
            </Grid>

            <Grid item xs={12} borderBottom='1px solid #3E4042' paddingBottom='1rem'>
                {isImage && (
                    <Box
                        border={`1px solid ${medium}`}
                        borderRadius="5px"
                        mt="1rem"
                        p="1rem"
                        width='100%'
                    >
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <FlexBetween>
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed ${theme.palette.primary.main}`}
                                        p="1rem"
                                        width="100%"
                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!image ? (
                                            <p>Add Image Here</p>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>{image.name}</Typography>
                                                <EditOutlined />
                                            </FlexBetween>
                                        )}
                                    </Box>
                                    {image && (
                                        <IconButton
                                            onClick={() => setImage(null)}
                                            sx={{ width: "15%" }}
                                        >
                                            <DeleteOutlined />
                                        </IconButton>
                                    )}
                                </FlexBetween>
                            )}
                        </Dropzone>
                    </Box>
                )}
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='space-between' marginTop='1rem'>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Image
                    </Typography>
                </FlexBetween>
                <FlexBetween gap="0.25rem">
                    <VideoCall sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Stream
                    </Typography>
                </FlexBetween>
                <FlexBetween gap="0.25rem">
                    <MicNone sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Voice
                    </Typography>
                </FlexBetween>
                <FlexBetween gap="0.25rem">
                    <MoreHoriz sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        More
                    </Typography>
                </FlexBetween>
            </Grid>

            <Grid item xs={12} marginTop='1rem'>
                <Button
                    sx={{
                        color: theme.palette.background.alt,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: "3rem",
                        width: '100%',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                            opacity: 0.8
                        }
                    }}
                    onClick={handlePost}
                >
                    Post
                </Button>
            </Grid>
        </Grid>
    )
}

export default MyPost