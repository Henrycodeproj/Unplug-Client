import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useRef, useContext } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import "./SearchBarModal.css";
import { accountContext } from "../Contexts/appContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { Truncating } from "../ReusablesComponents/Truncating";

export const SearchBarModal = ({
  anchorEl,
  setAnchorEl,
  searchResults,
  setSearchResults,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const ref = useRef();
  const navigateTo = useNavigate();
  const { user, setPosts, lastPostIndex } = useContext(accountContext);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.offsetWidth >= ref.current.offsetWidth + 50
      ) {
        setAnchorEl(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const searchLikeHandler = async (postID) => {
    const url = `https://unplug-server.herokuapp.com/posts/search/like/${postID}`;
    const data = {
      userID: user.id,
      currentSearch: searchResults,
    };
    const response = await axios.patch(url, data, {
      headers: {
        authorization: localStorage.getItem("Token"),
      },
    });
    if (response.status === 200) {
      const URL = `https://unplug-server.herokuapp.com/posts/amount/${lastPostIndex}/`;
      axios
        .get(URL, {
          headers: {
            authorization: localStorage.getItem("Token"),
          },
        })
        .then((res) => setPosts(res.data))
        .catch((err) => console.log(err));
      setSearchResults(response.data);
    }
  };

  return (
    <div>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box
          sx={{
            border: 1,
            bgcolor: "var(--white-background)",
            width: "325px",
            borderRadius: "5px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            overflowY: "scroll",
            boxSizing: "border-box",
          }}
        >
          <ul ref={ref}>
            {searchResults &&
              searchResults.map((postInfo) => (
                <div>
                  <ListItem
                    sx={{
                      alignItems: "flex-start",
                      marginTop: "0",
                      padding: "16px",
                    }}
                    className="search_boxes"
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={`https://ucarecdn.com/${postInfo.posterId.profilePicture}/`}
                        onClick={() =>
                          navigateTo(`/profile/${postInfo.posterId._id}`)
                        }
                        sx={{ cursor: "pointer" }}
                      />
                    </ListItemAvatar>
                    <div
                      style={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: ".5rem",
                      }}
                    >
                      <ListItemText
                        primary={postInfo.posterId.username}
                        secondary={
                          <Truncating
                            postDescription={postInfo.Description}
                            truncateNumber={50}
                          />
                        }
                        sx={{ marginTop: "0" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {postInfo.attending.some(
                          (attending) => attending._id === user.id
                        ) ? (
                          <motion.div
                            whileHover={{scale: 1.1}}
                          >
                          <FavoriteIcon
                            sx={{ color: "red", cursor: "pointer" }}
                            onClick={() => searchLikeHandler(postInfo._id)}
                          />
                          </motion.div>
                        ) : (
                          <motion.div
                            whileHover={{scale: 1.1}}
                          >
                          <FavoriteBorderIcon
                            onClick={() => searchLikeHandler(postInfo._id)}
                            sx={{ color: "red", cursor: "pointer" }}
                          />
                          </motion.div>
                        )}
                        <div style={{ display: "flex" }}>
                          <AnimatePresence>
                            {postInfo.attending.map((attending, index) =>
                              index <= 2 ? (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  whileHover={{ y: -3, scale: 1.05 }}
                                  exit={{ opacity: 0 }}
                                >
                                  <Tooltip
                                    title={
                                      attending._id !== user.id && postInfo
                                        ? `${
                                            attending.username
                                              .charAt(0)
                                              .toUpperCase() +
                                            attending.username.slice(1)
                                          } is attending`
                                        : "You are attending this event"
                                    }
                                  >
                                    <Avatar
                                      onClick={() =>
                                        navigateTo(`/profile/${attending._id}`)
                                      }
                                      sx={{ width: "25px", height: "25px" }}
                                      className="search_attending_avatars"
                                      src={
                                        attending._id !== user.id
                                          ? attending.profilePicture
                                            ? `https://ucarecdn.com/${attending.profilePicture}/`
                                            : null
                                          : user.profilePicture
                                          ? `https://ucarecdn.com/${user.profilePicture}/`
                                          : null
                                      }
                                    />
                                  </Tooltip>
                                </motion.div>
                              ) : (
                                <div>
                                  {postInfo.attending.length - index === 1 && (
                                    <motion.div whileHover={{ scale: 1.15 }}>
                                      <Tooltip
                                        title={
                                          postInfo.attending.length -
                                          2 +
                                          " more"
                                        }
                                      >
                                        <Avatar className="search_attending_avatars">
                                          +{postInfo.attending.length - 2}
                                        </Avatar>
                                      </Tooltip>
                                    </motion.div>
                                  )}
                                </div>
                              )
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </ListItem>
                </div>
              ))}
          </ul>
        </Box>
      </Popper>
    </div>
  );
};
