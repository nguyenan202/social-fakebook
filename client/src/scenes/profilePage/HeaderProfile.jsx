import { useTheme } from "@emotion/react"
import { Check, Edit, Message, MoreHoriz, Person, PersonAdd, PersonRemove } from "@mui/icons-material"
import { Avatar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import DefaultBackground from './DefaultBackground'
import { useDispatch, useSelector } from "react-redux"
import { setUser as setUserRedux } from "../../redux/store";
import ProfileButton from "./Buttons"
import { useState } from "react"

const HeaderProfile = ({ user, setUser }) => {

    const theme = useTheme();
    const dispatch = useDispatch();

    const greyButton = theme.palette.neutral.mediump;
    const primaryButtom = theme.palette.primary.main;

    //This user who login to Fakebook
    const currentUser = useSelector(state => state.user)
    const token = useSelector(state => state.token);

    // Check user send Request befor
    const checkSendReq = user && user.friendsRequest.map(req => req.userId).includes(currentUser._id);

    // Check user need to Accept or Refuse Friends
    const needChoose = currentUser.friendsRequest.map(friendReq => friendReq.userId).includes(user._id);

    const [isSendRequest, setIsSendRequest] = useState(checkSendReq);

    const handleAddFriend = async () => {

        const response = fetch(`${process.env.REACT_APP_HOST_NAME}/users/friend-request/${currentUser._id}/${user._id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        const msg = await (await response).json();

        if (msg.message === 'cancel add friend success') {
            setIsSendRequest(false)
        } else {
            setIsSendRequest(true);
        }

        setUser(msg.user);
    }

    const handleAcceptFriend = async () => {

        const response = fetch(`${process.env.REACT_APP_HOST_NAME}/users/friend-request/accept/${currentUser._id}/${user._id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        const msg = await(await response).json();

        if (msg.message === 'success') {
            dispatch(setUserRedux({ user: msg.user }));
        }
    }

    return (user &&
        (<Box>
            {/* Background image */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        width: '1095px',
                        height: '50vw',
                        maxHeight: '25rem',
                        overflow: 'hidden',
                        borderBottomLeftRadius: '0.4rem',
                        borderBottomRightRadius: '0.4rem'
                    }}
                >
                    {user.pictureBackgroundPath === '' ? <DefaultBackground /> :
                        <img src={`${process.env.REACT_APP_HOST_NAME}/images/${user.pictureBackgroundPath}`} alt='bgImage' width='100%' />}
                </Box>
            </Box>

            {/* User subInfo */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '0 1rem',
                        borderBottom: '1px solid #ccc'
                    }}
                >

                    <Box
                        sx={{
                            transform: 'translateY(-28px)'
                        }}
                    >
                        <Avatar
                            src={`${process.env.REACT_APP_HOST_NAME}/images/${user.picturePath}`}
                            alt='avatar'
                            sx={{
                                width: '168px',
                                height: '168px',
                                border: '3px solid #000'
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            margin: '2rem 0 1rem 2rem',
                            width: '30vw'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '2rem',
                                fontWeight: 700
                            }}
                        >
                            {`${user.lastName} ${user.firstName}`}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '1rem',
                                color: '#ccc'
                            }}
                        >
                            {user.friends.length} friends
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex'
                        }}
                    >
                        {
                            needChoose ?
                                <ProfileButton
                                    bgColor={primaryButtom}
                                    icon={<PersonAdd />}
                                    customMargin={'0 0 0 0.5rem'}
                                    name={'Accept Friend'}
                                    onClick={handleAcceptFriend}
                                /> :
                                // Check is current user or user view profile
                                (user._id !== currentUser._id ?
                                    // Check has friend or not
                                    (
                                        currentUser.friends.map(friend => friend.userId).includes(user._id) ?
                                            <ProfileButton
                                                bgColor={greyButton}
                                                icon={<Check />}
                                                customMargin={'0 0 0 0.5rem'}
                                                name={'Friend'}
                                            /> :
                                            (
                                                isSendRequest ?
                                                    <ProfileButton
                                                        bgColor={greyButton}
                                                        icon={<PersonRemove />}
                                                        customMargin={'0 0 0 0.5rem'}
                                                        name={'Cancel'}
                                                        onClick={handleAddFriend}
                                                    /> :
                                                    <ProfileButton
                                                        bgColor={primaryButtom}
                                                        icon={<PersonAdd />}
                                                        customMargin={'0 0 0 0.5rem'}
                                                        name={'Add Friend'}
                                                        onClick={handleAddFriend}
                                                    />
                                            )
                                    ) :
                                    <ProfileButton
                                        bgColor={primaryButtom}
                                        icon={<Person />}
                                        customMargin={'0 0 0 0.5rem'}
                                        name={'You'}
                                        disabled
                                    />)
                        }

                        {
                            user._id !== currentUser._id ?
                                <ProfileButton
                                    bgColor={greyButton}
                                    icon={<Message />}
                                    customMargin={'0 0 0 0.5rem'}
                                    name={'Message'}
                                /> :
                                <ProfileButton
                                    bgColor={greyButton}
                                    icon={<Edit />}
                                    customMargin={'0 0 0 0.5rem'}
                                    name={'Edit Profile'}
                                />
                        }

                        <ProfileButton
                            bgColor={greyButton}
                            icon={<MoreHoriz />}
                            customMargin={'0'}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>)
    )
}

export default HeaderProfile