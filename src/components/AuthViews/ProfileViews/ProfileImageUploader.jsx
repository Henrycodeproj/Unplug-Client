import { Widget } from "@uploadcare/react-widget";
import "./ProfileImageUploader.css"
import axios from "axios"
import { accountContext } from "../../Contexts/appContext";
import { useContext } from "react";

export const ProfileImageUploader = ({widgetApi, viewedUser, user, setViewedUser}) => {

    const {setUser} = useContext(accountContext)

    const changeProfileImageHandler = (response) => {
        const userInfo = JSON.parse(localStorage.getItem("User"))
        userInfo.profilePicture = response.profilePicture
        localStorage.setItem("User", JSON.stringify(userInfo))
    }

    const uploadHandler = async (file) => {
        const results = await file
    
        if (results.isStored){
          const data = { data: results.uuid}
          const url = `https://unplug-server.herokuapp.com/user/update/profileImage/${viewedUser._id}`
          const response = await axios.patch(url, data, {
            headers:{
              "authorization": localStorage.getItem("Token")
            }
          })
          if (response.status === 200 && response.data.new._id === user.id) {
            setViewedUser(response.data.new)
            changeProfileImageHandler(response.data.new)
            await axios.delete(`https://api.uploadcare.com/files/${response.data.prev.profilePicture}/storage/`, {
              headers: {
                Accept: 'application/vnd.uploadcare-v0.7+json',
                Authorization: `Uploadcare.Simple ${process.env.PUBLIC_API_KEY} : ${process.env.PUBLIC_API_KEY}`
              }
            })
          }
        }
      }
    
      return (
        <div className="profile_upload_button">
          <Widget ref={widgetApi}
          imagesOnly = "true"
          publicKey= {`${process.env.PUBLIC_API_KEY}`}
          preloader={null}
          onChange = {e => uploadHandler(e)}
          imageShrink = "640x480"
          />
        </div>
      );
}