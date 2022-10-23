
import { Outlet } from "react-router-dom";
import { Navigate} from "react-router-dom";
import { useState, useEffect, useContext} from "react";
import { accountContext } from "../Contexts/appContext";
import { authCheck } from "../../UserAuth/checkAuth";
import { LoadingCircle } from "../ReusablesComponents/LoadingCircle";


export const UserAuthentication = () =>{

    const {userStatus, setUserStatus} = useContext(accountContext)

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
       authCheck().then(res=>{
            setUserStatus(res.data)
            setLoading(false)
        })
    },[])
    
    if (loading) return (
        <LoadingCircle
        loadingState={loading}
        />
    )

    return (
        userStatus ? <Outlet/> : <Navigate to="/" replace={true} />
    )
}
