import React from "react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Avatar from "@mui/material/Avatar";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import "./ChatSearchModal.css";
import { SendMessage } from "../../../ReusablesComponents/SendMessage";

export const ChatSearchModal = ({ totalUsers }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");

  const navigateTo = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const variants = {
    alert: {
      width: ["0%", "100%"],
      borderStyle: "solid",
      transition: { duration: 0.75 },
    },

    noAlert: {
      x: "0%",
    },
  };

  function handleChatSearch(event) {
    const checkResults = totalUsers.filter((user) =>
      user.username.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setSearchText(event.target.value);
    if (event.target.value.length > 0 && checkResults.length > 0)
      setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
  }

  function filterSearchResults() {
    const filteredResults = totalUsers.filter((user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    
    return filteredResults;
  }

  return (
    <>
      <motion.div
        initial={{ width: "100%" }}
        //animate={searchClicked ? "alert": "noAlert"}
        animate={{
          width: ["0%", "100%"],
          borderStyle: "solid",
          transition: { duration: 0.75 },
        }}
        variants={variants}
        style={{
          borderRadius: "50px",
          margin: ".5rem 0",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "3px 10px",
          }}
        >
          <PersonSearchIcon />
          <input
            placeholder="Search Users..."
            onChange={(e) => handleChatSearch(e)}
            className="chat_searchbox"
          />
        </div>
      </motion.div>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box
          sx={{
            border: 1,
            p: 1,
            bgcolor: "background.paper",
            minWidth: "260px",
            borderRadius: "10px",
          }}
        >
          {filterSearchResults().map((results) => (
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                padding: "5px",
                cursor: "pointer",
              }}
              className="users_search_container"
            >
              <Avatar src={`https://ucarecdn.com/${results.profilePicture}/`} />
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onClick={() => navigateTo(`/profile/${results._id}`)}
              >
                <h4
                  style={{ marginLeft: "10px" }}
                  onClick={() => navigateTo(`/profile/${results._id}`)}
                >
                  {results.username}
                </h4>
              </div>
              <SendMessage userInfo = {results} />
            </div>
          ))}
        </Box>
      </Popper>
    </>
  );
};
