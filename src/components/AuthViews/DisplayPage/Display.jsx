import axios from "axios";
import "./Display.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Attending from "../Posts/Attending";
import ScheduleIcon from '@mui/icons-material/Schedule';
import { RightSideCol } from "./RightColumn/RightSideCol";
import { MoreOptions } from "../Posts/MoreOptions";
import { Truncating } from "../../ReusablesComponents/Truncating.jsx";
import { SendMessage } from "../../ReusablesComponents/SendMessage";
import { LoadingCircle } from "../../ReusablesComponents/LoadingCircle";
import { motion } from "framer-motion";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Posts } from "../Posts/Posting.jsx";
import { accountContext } from "../../Contexts/appContext";
import { LeftColumn } from "./LeftColumn/LeftSideCol";
import { handleEventTimeandDate } from "../../../Reusable Functions/TimeFunctions"

export const Display = () => {
  const {
    posts,
    setPosts,
    user,
    setUser,
    activeUsers,
    setActiveUsers,
    socket,
    dark,
    setDark,
    lastPostIndex,
    setLastPostIndex,
    setUnreadNotifications,
    setTime,
    setUserNotification
  } = useContext(accountContext);

  const [loadingState, setLoadingState] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date())
  const [likeLoading, setLikeLoading] = useState(false)

  const navigateTo = useNavigate();

  const ref = useRef()
  ref.current = posts

  useEffect(() => {
    const getUserInformation = async () => {
      const url = `https://unplug-server.herokuapp.com/user/profileInfo/${user.id}/`;
      const response = await axios.get(url, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      });
      setUser(prevInfo => (
        {
          ...prevInfo,
          profilePicture: response.data.profilePicture,
          collegeAffiliation: response.data.collegeAffiliation
        }))
    }
    getUserInformation()
  },[])

  useEffect(() => {
    const getUserNotifications = async () => {
      const url = `https://unplug-server.herokuapp.com/user/${user.id}/notifications`;
      const response = await axios.get(url, {
        headers: {
          authorization: localStorage.getItem("Token"),
        }
      });
      setUserNotification(response.data.notifications)
    }
    getUserNotifications()
  },[])

  useEffect(() => {
    const getNewNotifications = async () => {
      const url = `https://unplug-server.herokuapp.com/user/${user.id}/newnotifications`;
      const response = await axios.get(url, {
        headers: {
          authorization: localStorage.getItem("Token")
        }
      })
      if (response.data.new > 0) {
        setUnreadNotifications(response.data.new)
        setTime(response.data.lastActive)
      }
    }
    getNewNotifications()
  }, [])

  useEffect(() => {
    socket.emit("status", { userId: user.id, username: user.username });
    socket.on("activeUsers", (activeUsers) => {
      setActiveUsers(activeUsers);
    });
    return () => { 
      socket.removeListener("activeUsers");
    }
  }, []);

  useEffect(() => {
    socket.on("inactiveUsers", (remainingUsers) => {
      setActiveUsers(remainingUsers);
    });
    return () => { 
      socket.removeListener("inactiveUsers");
    }
  }, []);

  useEffect(() => {
    const URL = `https://unplug-server.herokuapp.com/posts/amount/${lastPostIndex}/`;
    axios
      .get(URL, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  //info contains user info and post id
  useEffect(() => {
    socket.on("likedpost", (info) => {
      liveLikeHandler(info)
    });
    return () => {
      socket.removeListener("likedpost");
    };
  }, []);

  useEffect(() => {
    socket.on("removeLike", (info) => {
      removeAttendHandler(info)
    });
    return () => {
      socket.removeListener("removeUser");
    };
  }, []);

  const handleScroll = async (e) => {
    if (
      e.target.clientHeight + e.target.scrollTop + 1 >=
      e.target.scrollHeight
    ) {
      const URL = `https://unplug-server.herokuapp.com/posts/getamount/${lastPostIndex}`;
      const newResults = await axios.get(URL, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      });
      const filteredPosts = newResults.data.filter(
        (newPosts) => !posts.includes(newPosts.posterId._id)
      );
      setPosts(posts.concat(filteredPosts));
      setLastPostIndex(lastPostIndex + 5);
    }
  };

  const likeHandler = async (post) => {
    setLikeLoading(true)
    const data = { 
      user: user.id, 
      posterId: post.posterId._id, 
      postID:post._id 
    };
    const URL = `https://unplug-server.herokuapp.com/posts/like/${post._id}`;
    const response = await axios
      .patch(URL, data, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      })
    if (response) {
      socket.emit("notification", {
        postID: post._id,
        posterID: post.posterId._id,
        currentUser: user.id,
        user: {
          _id:user.id, 
          username:user.username, 
          profilePicture:user.profilePicture 
        }
      });
    }
  };

  const unlikeHandler = async (post) => {
    const data = { user: user.id };
    const URL = `https://unplug-server.herokuapp.com/posts/unlike/${post._id}`;
    const response = await axios
      .patch(URL, data, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      })
      if (response) {
        socket.emit("removeUser", {
          user: {_id:user.id, username:user.username, profilePicture:user.profilePicture },
          post : post._id
        })
      }
  };

  function liveLikeHandler(info){
    const index = ref.current.map(element => element._id).indexOf(info.post)
    ref.current[index].attending.push(info.user)
    setPosts([...ref.current])
    setLikeLoading(false)
  }
  
  function removeAttendHandler(info){
    const index = ref.current.map(element => element._id).indexOf(info.post)
    ref.current[index].attending = ref.current[index].attending.filter(element => element._id !== info.user._id)
    setPosts([...ref.current])
    setUnreadNotifications(
    notifications => 
      notifications > 0 
      ? notifications - 1 
      : 0
    )
  }

  const handlePastHours = (time) => {
    const postDate = new Date(time)
    const difference = 
    Math.abs((
      parseInt(postDate.getTime()) 
      - parseInt(currentDate.getTime())) 
      / 3600000
    )
    const minutes = 
    Math.abs((
      parseInt(postDate.getTime()) 
      - parseInt(currentDate.getTime())) 
      / 60000
    )
    return difference > 1 
    ? Math.round(difference)+ " hours ago" 
    : Math.trunc(minutes) + " minutes ago"
  }

  if (posts === null) return <LoadingCircle loadingState={loadingState} />;

  return (
    <div className="display_container">
      <div className="display_newsfeed_wrapper">
        <div className="left_sidebar">
          <LeftColumn />
        </div>

        <div className="newsfeed_container">
          <div className="outer_posts_container">
            <Posts
              lastPostIndex={lastPostIndex}
              setLastPostIndex={setLastPostIndex}
            />
          </div>
          <div className = "post_container_section" onScroll={(e) => handleScroll(e)}>
            <ul>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <li key={post._id} className="posts_articles">
                    <>
                      <Tooltip
                        title={`${
                          post.posterId.username.charAt(0).toUpperCase() +
                          post.posterId.username.slice(1)
                        }'s  Profile`}
                      >
                        <Avatar
                          onClick={() =>
                            navigateTo(`/profile/${post.posterId._id}`)
                          }
                          src={`https://ucarecdn.com/${post.posterId.profilePicture}/`}
                          className="posts_image"
                        ></Avatar>
                      </Tooltip>
                      {post.posterId._id in activeUsers && (
                        <Tooltip title="Online">
                          <span className="online" />
                        </Tooltip>
                      )}
                    </>

                    <div className="inner_post_container">
                      <div className="title_wrapper">
                        <div 
                        style={{
                          display:"flex", 
                          gap:"3%", 
                          width:"100%", 
                          alignItems:"center"
                        }}
                        >
                        <h4
                          style={{
                            textTransform: "capitalize",
                            cursor:"pointer"
                          }}
                          onClick={() =>
                            navigateTo(`/profile/${post.posterId._id}`)
                          }
                        >
                          {post.posterId.username}
                        </h4>
                        <h6 style = {{fontSize:".75rem", color:"rgb(96, 96, 96)"}}>{handlePastHours(post.createdAt)}</h6>
                        </div>
                        <div style={{ display: "flex" }}>
                          {post.posterId._id !== user.id ? (
                            <SendMessage userInfo={post.posterId}/>
                          ) : null}
                          <MoreOptions post={post} />
                        </div>
                      </div>

                      <Truncating
                        postDescription={post.Description}
                        truncateNumber={150}
                      />
                      { post.timeAndDate &&
                      <Tooltip title = "Scheduled time and date">
                      <div className="meeting_bar">   
                        <ScheduleIcon/>
                        <h6>
                          {handleEventTimeandDate(post.timeAndDate)}
                        </h6>
                      </div>
                      </Tooltip>
                      }

                      <div className="posts_icon_wrapper">
                        <div className="posts_icon_bar">
                          {post.attending.some(
                            (attendUsers) => attendUsers._id === user.id
                          ) ? (
                            <motion.button
                              whileHover={{ scale: 1.3 }}
                              whileTap={{ scale: 0.9 }}
                              style={{
                                borderStyle: "none",
                                background: "transparent",
                                width: 23,
                                height: 23,
                                padding: 0,
                              }}
                            >
                              <Tooltip
                                title="Unattend"
                                TransitionComponent={Zoom}
                              >
                                <FavoriteIcon
                                  sx={{ color: "red" }}
                                  onClick={() => unlikeHandler(post)}
                                  style={{ cursor: "pointer" }}
                                />
                              </Tooltip>
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: -10 }}
                              whileTap={{
                                scale: .7,
                              }}
                              style={{
                                borderStyle: "none",
                                background: "transparent",
                                width: 23,
                                height: 23,
                                padding: 0,
                              }}
                            >
                              <Tooltip
                                title="Attend"
                                TransitionComponent={Zoom}
                              >
                                <VolunteerActivismIcon
                                  className="heart_button_outline"
                                  onClick={() => likeLoading ? null : likeHandler(post)}
                                  style={{ cursor: "pointer" }}
                                />
                              </Tooltip>
                            </motion.button>
                          )}
                        </div>

                        <motion.div
                          style={{
                            display: "flex",
                            alignItems: "center !important",
                          }}
                          initial={{ opacity: 0.1, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.75 }}
                        >
                          <Attending posting={post} />
                        </motion.div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <h2 style={{ marginTop: "5%", fontSize: "2rem" }}>
                  There are no current listed events on campus.
                </h2>
              )}
            </ul>
          </div>
        </div>

        <div className="right_sidebar">
          <RightSideCol />
        </div>
      </div>
    </div>
  );
};
