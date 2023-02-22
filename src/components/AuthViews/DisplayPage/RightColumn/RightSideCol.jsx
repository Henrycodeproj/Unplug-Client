import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import "./RightSideCol.css";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ChatIcon from "@mui/icons-material/Chat";
import { accountContext } from "../../../Contexts/appContext";
import { IndividualChats } from "../../ChatViews/IndividualChat";
import { useNavigate } from "react-router-dom";
import { EventCalendar } from "./EventCalendar";
import { motion } from "framer-motion"

export const RightSideCol = () => {
  const newMessageCheck = useRef();
  const navigateTo = useNavigate();

  const { user, activeUsers, recentMessages, setRecentMessages, socket } =
    useContext(accountContext);

  const [popularPosts, setPopularPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const url = "https://unplug-server.herokuapp.com/posts/popular";
    axios
      .get(url, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        setPopularPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const Url = `https://unplug-server.herokuapp.com/message/recent/all/${user.id}`;
    axios
      .get(Url, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) => setRecentMessages(res.data.reverse()))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    socket.on(`${user.id}`, (data) => {
      newMessageCheck.current = data;
      checkNewMessageInRecents();
    });
    return () => {
      socket.off(`${user.id}`);
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkNewMessageInRecents = async () => {
    setRecentMessages((prevMessages) =>
      prevMessages.some((chat) => chat._id === newMessageCheck.current._id)
        ? [...prevMessages]
        : [...prevMessages, newMessageCheck.current]
    );
  };

  const open = Boolean(anchorEl);

  return (
    <div className="right_column_wrapper">
      <EventCalendar />
      <div className="popular_container">
        <h2
          style={{
            marginBottom: "10px",
            textDecoration: "underline",
            fontSize: "1.6rem",
            fontWeight: "900",
          }}
        >
          Biggest Events Today
        </h2>
        {popularPosts.map((post, i) => (
          <motion.div
          initial = {{ x:-40, opacity: 0 }}
          animate = {{ x:0, opacity: 1 }}
          transition={{delay: i * 0.15, duration:.5}}
          >
            <motion.div
            whileHover={{scale:1.05, x:-2}}
            key = {post._id}
            >
            <div className="popular_post_container">
              <div style={{ display: "flex" }}>
                <Avatar
                  sx={{ marginRight: "10px", cursor: "pointer" }}
                  src={
                    post.original_poster[0].profilePicture
                      ? `https://ucarecdn.com/${post.original_poster[0].profilePicture}/`
                      : null
                  }
                  onClick={() =>
                    navigateTo(`/profile/${post.original_poster[0]._id}`)
                  }
                />
                <div style ={{overflowWrap:"anywhere"}}>
                  <h3
                    style={{
                      textTransform: "capitalize",
                      color: "black",
                      margin: 0,
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigateTo(`/profile/${post.original_poster[0]._id}`)
                    }
                  >
                    {post.original_poster[0].username}
                  </h3>
                  {post.Description.length >= 50 ? (
                    <div>
                      {post.Description.substring(0, 50)}
                      <span style={{ cursor: "pointer" }} onClick={handleClick}>
                        ...
                      </span>
                    </div>
                  ) : (
                    post.Description.substring(0, 50)
                  )}
                </div>
              </div>
              <Avatar
                onClick={handleClick}
                sx={{
                  background: "rgba(80, 80, 80, 0.4)",
                  borderStyle: "solid",
                  width: "35px",
                  height: "35px",
                }}
              >
                +{post.attendingLength}
              </Avatar>
            </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="recent_message_container">
        <div className="recent_message_title" style={{ fontSize: "1.6rem" }}>
          <h2
            style={{
              textDecoration: "underline",
              fontSize: "1.6rem",
              fontWeight: "900",
            }}
          >
            Recent Messages
          </h2>
        </div>
        <div className="recent_message_avatars">
          {recentMessages &&
            recentMessages.map((queryInfo, index) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "100%",
                  marginBottom: "10px",
                }}
              >
                <div
                  className="profile_image_name_container"
                  onClick={
                    queryInfo.recieverInfo[0].username === user.username
                      ? () =>
                          navigateTo(`/profile/${queryInfo.senderInfo[0]._id}`)
                      : () =>
                          navigateTo(
                            `/profile/${queryInfo.recieverInfo[0]._id}`
                          )
                  }
                >
                  <div className="recent_chatMessages_container">
                    <Avatar
                      sx={{ marginRight: "10px", cursor: "pointer" }}
                      src={
                        queryInfo.recieverInfo[0]._id === user.id
                          ? queryInfo.senderInfo[0].profilePicture
                            ? `https://ucarecdn.com/${queryInfo.senderInfo[0].profilePicture}/`
                            : null
                          : queryInfo.recieverInfo[0].profilePicture
                          ? `https://ucarecdn.com/${queryInfo.recieverInfo[0].profilePicture}/`
                          : null
                      }
                    />
                    {queryInfo.recieverInfo[0]._id === user.id
                      ? queryInfo.senderInfo[0]._id in activeUsers && (
                          <div className="recent_message_online"></div>
                        )
                      : queryInfo.recieverInfo[0]._id in activeUsers && (
                          <div className="recent_message_online"></div>
                        )}
                  </div>
                  <h3 className="recent_message_names">
                    {queryInfo.recieverInfo[0].username === user.username
                      ? queryInfo.senderInfo[0].username
                      : queryInfo.recieverInfo[0].username}
                  </h3>
                </div>
                <IndividualChats
                  recievingUserInfo={
                    queryInfo.recieverInfo[0].username === user.username
                      ? queryInfo.senderInfo[0]
                      : queryInfo.recieverInfo[0]
                  }
                  convoId={queryInfo._id}
                  isNewMessage={newMessageCheck.current}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
