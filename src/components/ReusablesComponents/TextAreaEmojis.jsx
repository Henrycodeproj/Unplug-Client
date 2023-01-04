import Picker from "emoji-picker-react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Popover from "@mui/material/Popover";
import { motion } from "framer-motion"

export const TextAreaEmojis = ({
  input,
  anchor,
  setAnchor,
  title,
  setMessage,
}) => {
  const onEmojiClick = (event, emojiObject) => {
    input.value = input.value + emojiObject.emoji;
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const open = Boolean(anchor);

  return (
    <>
      <motion.div
        style={{
          display: "flex",
          alignItems: "center",
        }}
        onClick={handleClick}
        whileHover = {{scale: 1.1}}
      >
        <SentimentSatisfiedAltIcon
          className="emoji_select"
          variant="contained"
        />
        <span style={{ marginLeft: 5 }}>
          {title && (
            <h3
              style={{ color: "black", cursor: "pointer" }}
              className="emoji_title"
            >
              Emojis
            </h3>
          )}
        </span>
      </motion.div>
      <Popover
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Picker onEmojiClick={onEmojiClick} />
      </Popover>
    </>
  );
};
