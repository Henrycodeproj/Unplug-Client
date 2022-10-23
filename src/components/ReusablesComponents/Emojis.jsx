import Picker from 'emoji-picker-react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Popover from '@mui/material/Popover';

export const Emojis = ({input, setInput, anchor, setAnchor, title}) => {

    const onEmojiClick = (event, emojiObject) => {
        setInput(input + emojiObject.emoji)
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
        <div style = {{display:"flex", alignItems:"center"}}>
            <SentimentSatisfiedAltIcon 
            className= "emoji_select"
            variant="contained" 
            onClick = {handleClick}
            />
            <span style={{marginLeft:5}}>
                {title && <h3 style = {{color:"black"}} className="emoji_title">Emojis</h3>}
            </span>
        </div>
        <Popover
          open={open}
          anchorEl={anchor}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
        <Picker 
        onEmojiClick={onEmojiClick}
        />
        </Popover>
    </>
  )
}
