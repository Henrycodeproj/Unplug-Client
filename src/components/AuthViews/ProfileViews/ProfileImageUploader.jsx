import { Widget } from "@uploadcare/react-widget";
import "./ProfileImageUploader.css"
import axios from "axios"

export const ProfileImageUploader = ({widgetApi, viewedUser, user, setViewedUser}) => {
    const changeProfileImageHandler = (response) => {
        const userInfo = JSON.parse(localStorage.getItem("User"))
        userInfo.profilePicture = response.profilePicture
        console.log(userInfo, userInfo.profilePicture, 'tteesster')
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
                Authorization: 'Uploadcare.Simple 82efe8e1794afced30ba:afa55846bad933aa30ff'
              }
            })
          }
        }
      }
    
      return (
        <div className="profile_upload_button">
          <Widget ref={widgetApi}
          imagesOnly = "true"
          publicKey="82efe8e1794afced30ba" 
          preloader={null}
          onChange = {e => uploadHandler(e)}
          imageShrink = "640x480"
          />
        </div>
      );
}