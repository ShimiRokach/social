import {
    AttachFileOutlined,
    GifBoxOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";
import {
    Divider,
    Typography,
    InputBase,
    Button,
    useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";

const MyPostWidget = () => {
    const dispatch = useDispatch();
    const [post, setPost] = useState("");
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const handlePost = async () => {
        const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ userId: _id, description: post })
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setPost("");
    };

    return (
        <>
            <FlexBetween gap="1.5rem">
                <InputBase
                    placeholder="What's on your mind..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
                {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined />
                            <Typography>Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined />
                            <Typography >Attachment</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined />
                            <Typography >Audio</Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined />
                    </FlexBetween>
                )}

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween >
        </>
    );
};

export default MyPostWidget;
