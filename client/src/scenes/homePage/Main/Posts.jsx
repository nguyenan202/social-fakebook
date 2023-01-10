import { lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";


const ComponentLazy = lazy(() => import('./CallPosts'))

const Posts = () => {

    const Loading = () => (
        <div
            style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <CircularProgress />
        </div>
    )

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <ComponentLazy />
            </Suspense>
        </div>
    )
}

export default Posts