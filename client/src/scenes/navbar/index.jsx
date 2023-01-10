import { useEffect, useMemo, useState } from "react"
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    Fade,
    Avatar,
    Grid,
    CircularProgress,
    Modal,
    Backdrop
} from '@mui/material'
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux"
import { debounce } from 'lodash'
import { setMode, setLogout } from "../../redux/store"
import { useNavigate } from "react-router-dom"
import FlexBetween from "../../components/FlexBetween"
import FriendRequest from "./FriendRequest"

const DebounceSelect = ({ userId, token, backgroundColor, isNonMobileScreens, debounceTimeout = 300 }) => {

    const [input, setInput] = useState('');
    const [isFocusInput, setIsFocusInput] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const htmlElement = document.querySelector('html')

        const listenHtml = () => {
            setIsFocusInput(false);
        };

        htmlElement.addEventListener('click', listenHtml)

        return () => htmlElement.removeEventListener('click', listenHtml)
    }, [])

    const DivUser = ({ userPicturePath, userFullName, user }) => {
        return (
            <Grid item xs={12}
                sx={{
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                        backgroundColor: '#454343',
                        cursor: 'pointer'
                    }
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsFocusInput(false);
                    navigate(`/profile/${user._id}`)
                }}
            >
                <Avatar src={`http://localhost:8080/images/${userPicturePath}`} />
                <Typography
                    sx={{
                        fontSize: '1rem',
                        marginLeft: '1rem'
                    }}
                >
                    {userFullName}
                </Typography>
            </Grid>
        )
    }

    const Loading = () => {
        return (
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                }}
            >
                <CircularProgress />
            </Grid>
        )
    }

    const NoData = () => {
        return (
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1rem'
                    }}
                >
                    No Data
                </Typography>
            </Grid>
        )
    }

    const listUser = users.filter((user) => user._id !== userId).map(user => {
        return (
            <DivUser
                key={user._id}
                user={user}
                userPicturePath={user.picturePath}
                userFullName={`${user.lastName} ${user.firstName}`}
            />
        )
    })

    const debounceFetcher = useMemo(() => {
        const loadUsers = async (e) => {

            setInput(e.target.value);
            setUsers([]);
            if (e.target.value === '') {
                setisLoading(false);
                return;
            }
            setisLoading(true);

            const response = await fetch(`http://localhost:8080/users/search/${e.target.value}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            })

            const users = await response.json();

            setUsers(users);
            setisLoading(false);
        }

        return debounce(loadUsers, debounceTimeout)
    }, [debounceTimeout, token])

    return (
        <div
            style={{
                position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <FlexBetween
                backgroundColor={backgroundColor}
                borderRadius={isFocusInput && input !== '' ? '9px 9px 0 0' : '9px'}
                gap="3rem"
                padding='0.25rem 1.5rem'
                width={'100%'}
            >
                <InputBase
                    placeholder="Search..."
                    onChange={debounceFetcher}
                    onFocus={() => setIsFocusInput(true)}
                    sx={{
                        width: '100%'
                    }}
                />
                {!isNonMobileScreens && <IconButton>
                    <Search />
                </IconButton>}
            </FlexBetween>

            {isFocusInput && input !== '' && <Grid container
                style={{
                    backgroundColor: backgroundColor,
                    width: '100%',
                    height: 'fit-content',
                    position: 'absolute',
                    boxShadow: '0 4px 4px 1px #4D4D4D',
                    borderBottomRightRadius: '9px',
                    borderBottomLeftRadius: '9px'
                }}
            >
                {isLoading ? <Loading /> : listUser.length !== 0 ? listUser : <NoData />}
            </Grid>}
        </div>
    )
}

const Navbar = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const token = useSelector(state => state.token);
    const [openSearch, setOpenSearch] = useState(false);
    const [openFriendsRequest, setOpenFriendsReques] = useState(false);

    const handleOpenSearch = () => setOpenSearch(true);
    const handleCloseSearch = () => setOpenSearch(false);
    const handleOpenFriendsRequest = () => setOpenFriendsReques(true);
    const handleCloseFriendsRequest = () => setOpenFriendsReques(false);

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isNonTabletScreens = useMediaQuery("(min-width: 724px)");

    const theme = useTheme();
    const neutralMedium = theme.palette.neutral.medium;
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const alt = theme.palette.background.alt;

    const fullName = user ? `${user.lastName} ${user.firstName}` : 'fake user';

    const logout = () => {
        dispatch(setLogout())
        navigate('/login')
    }


    const listFriendsRequest = user.friendsRequest.map(req => {

        return (
            <FriendRequest
                key={req.userId}
                userId={req.userId}
                fullName={`${req.lastName} ${req.firstName}`}
                picturePath={req.picturePath}
            />
        )
    })

    return (
        <>
            <FlexBetween
                padding="1rem 6%"
                backgroundColor={alt}
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000
                }}
                borderBottom='1px solid #3E4042'
            >

                {/* Mobile Search */}
                {!isNonMobileScreens && (
                    <FlexBetween
                        onClick={handleOpenSearch}
                    >
                        <IconButton
                            padding="0.1rem 1.5rem"
                        >
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )

                }
                <FlexBetween gap='1.75rem'>

                    <Typography
                        fontWeight='bold'
                        fontSize='clamp(1rem, 2rem, 2.25rem)'
                        color='primary'
                        onClick={() => navigate('/')}
                        sx={{
                            '&:hover': {
                                opacity: 0.8,
                                cursor: 'pointer'
                            }
                        }}
                    >
                        Fakebook
                    </Typography>

                    {isNonMobileScreens && (
                        <DebounceSelect
                            userId={user._id}
                            token={token}
                            backgroundColor={neutralLight}
                        />
                    )}
                </FlexBetween>

                {/* None Mobile */}
                {isNonMobileScreens ? (
                    <FlexBetween gap="2rem">
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            )}

                        </IconButton>
                        <Message sx={{ fontSize: "25px" }} />
                        <Notifications
                            sx={{
                                fontSize: "25px",
                                '&:hover': {
                                    cursor: 'pointer',
                                    opacity: 0.8
                                }
                            }}
                            onClick={handleOpenFriendsRequest}
                        />
                        <Help sx={{ fontSize: "25px" }} />
                        <FormControl variant="standard" value={fullName}>
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "100%",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight,
                                    },
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem
                                    value={fullName}
                                    sx={{ zIndex: 9999 }}
                                    onClick={() => navigate(`/profile/${user._id}`)}
                                >
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem sx={{ zIndex: 9999 }} onClick={logout}>Log Out</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                ) : (
                    <IconButton
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Menu />
                    </IconButton>
                )}

                {!isNonMobileScreens && isMobileMenuToggled && (
                    <Box
                        position="fixed"
                        right="0"
                        bottom="0"
                        height="100%"
                        zIndex='9999'
                        maxWidth="500px"
                        minWidth="300px"
                        backgroundColor={background}
                    >

                        {/* MENU ITEMS */}
                        <Box
                            sx={{ boxShadow: 3 }}
                            minHeight='100%'
                        >
                            <Box display="flex" justifyContent="flex-end" p="1rem" >
                                <IconButton
                                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                                >
                                    <Close />
                                </IconButton>
                            </Box>
                            <Fade orientation="horizontal" in={isMobileMenuToggled}>
                                <FlexBetween
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    gap="3rem"
                                >
                                    <Avatar
                                        src={`http://localhost:8080/images/${user.picturePath}`}
                                        alt={fullName}
                                        sx={{ width: 84, height: 84 }}
                                    />
                                    <FormControl variant="standard" value={fullName}>
                                        <Select
                                            value={fullName}
                                            sx={{
                                                backgroundColor: neutralLight,
                                                width: "100%",
                                                borderRadius: "0.25rem",
                                                boxShadow: 3,
                                                p: "0.25rem 1rem",
                                                "& .MuiSvgIcon-root": {
                                                    pr: "0.25rem",
                                                    width: "3rem",
                                                },
                                                "& .MuiSelect-select:focus": {
                                                    backgroundColor: neutralMedium,
                                                },
                                            }}
                                            input={<InputBase />}
                                        >
                                            <MenuItem
                                                value={fullName}
                                                onClick={() => navigate(`/profile/${user._id}`)}
                                            >
                                                <Typography>{fullName}</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={logout}>
                                                Log Out
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <IconButton
                                        onClick={() => dispatch(setMode())}
                                        sx={{ fontSize: "25px" }}
                                    >
                                        {theme.palette.mode === "dark" ? (
                                            <DarkMode sx={{ fontSize: "25px" }} />
                                        ) : (
                                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                                        )}
                                    </IconButton>
                                    <Message sx={{ fontSize: "25px" }} />
                                    <Notifications sx={{ fontSize: "25px" }} />
                                    <Help sx={{ fontSize: "25px" }} />
                                </FlexBetween>
                            </Fade>
                        </Box>
                    </Box>
                )}
            </FlexBetween>

            {/* Modal Search Friends */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openSearch}
                onClose={handleCloseSearch}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openSearch}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '25%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: isNonTabletScreens ? '70vw' : '90vw',
                            bgcolor: 'background.paper',
                            boxShadow: '0 0 4px 1px #fff',
                            p: 4,
                        }}
                    >
                        <Close
                            sx={{
                                position: 'absolute',
                                top: '5%',
                                right: '2%',
                                '&:hover': {
                                    opacity: 0.5,
                                    cursor: 'pointer'
                                }
                            }}
                            onClick={handleCloseSearch}
                        />
                        <Typography
                            sx={{
                                textAlign: 'center',
                                margin: '0.5rem 0 1rem 0',
                                fontSize: '2rem',
                                fontWeight: 500
                            }}
                            color='primary'
                        >
                            More Friends
                        </Typography>
                        <DebounceSelect
                            userId={user._id}
                            token={token}
                            backgroundColor={neutralLight}
                            isNonTabletScreens={isNonTabletScreens}
                            isNonMobileScreens={isNonMobileScreens}
                        />
                    </Box>
                </Fade>
            </Modal>

            {/* Modal List Friend Request */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openFriendsRequest}
                onClose={handleCloseFriendsRequest}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openFriendsRequest}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: isNonTabletScreens ? '50vw' : '90vw',
                            bgcolor: 'background.paper',
                            boxShadow: '0 0 4px 1px #fff',
                            p: 4,
                        }}
                    >
                        <Close
                            sx={{
                                position: 'absolute',
                                top: '5%',
                                right: '2%',
                                '&:hover': {
                                    opacity: 0.5,
                                    cursor: 'pointer'
                                }
                            }}
                            onClick={handleCloseFriendsRequest}
                        />
                        <Typography
                            sx={{
                                textAlign: 'center',
                                margin: '0.5rem 0 1rem 0',
                                fontSize: '2rem',
                                fontWeight: 500
                            }}
                            color='primary'
                        >
                            Friends Request
                        </Typography>
                        <Box
                            sx={{
                                maxHeight: '60vh',
                                overflowY: 'scroll',
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
                            }}
                        >
                            {listFriendsRequest}
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default Navbar