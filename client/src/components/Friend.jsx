import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";

const Friend = ({ friendId, name, subtitle, loggedInUserId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const isFriend = friends.find((friend) => friend._id === friendId);
    const patchFriend = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    return (
        <FlexBetween>
            < Box
                onClick={() => {
                    navigate(`/profile/${friendId}`);
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight="500"
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                >
                    {name}
                </Typography>
                <Typography fontSize="0.75rem">
                    {subtitle}
                </Typography>
            </Box>
            {loggedInUserId !== friendId && (
                <IconButton
                    onClick={() => patchFriend()}
                >
                    {isFriend ? (
                        <PersonRemoveOutlined />
                    ) : (
                        <PersonAddOutlined />
                    )}
                </IconButton>
            )}
        </FlexBetween>
    );
};

export default Friend;
