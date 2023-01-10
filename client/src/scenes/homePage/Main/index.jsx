import { Grid } from "@mui/material"
import MyPost from "./MyPost"
import Posts from "./Posts"


const Main = ({ breakPoint }) => {



    return (
        breakPoint !== 0 ?
            (<Grid
                item xs={breakPoint}
                padding='0 1rem 0 1rem'
                sx={{
                    height: 'calc(100vh - 80px)',
                    '::-webkit-scrollbar': {
                        width: '8px',
                        display: 'none'
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
                    maxHeight: 'calc(100vh-80px)',
                    overflowY: 'scroll'
                }}
            >

                <MyPost />

                <Posts />
            </Grid>) : <></>
    )
}

export default Main