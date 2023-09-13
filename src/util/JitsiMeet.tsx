import { JitsiMeeting, } from '@jitsi/react-sdk';
import { useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { RootStateType } from "../redux/store";

const JitsiMeet = () => {
    const APP_ID = import.meta.env.VITE_JITSI_APPID as string
    const { MeetId,Token} = useParams();
    const data = useSelector((state: RootStateType) => state.user);
    const { name,email} = data;



    
    return (<>
        
       
        <JitsiMeeting
            jwt={Token} 
  
            
            roomName={`${APP_ID}/${MeetId}`}
          
          configOverwrite={{
              disableThirdPartyRequests: true,
              disableLocalVideoFlip: true,
              startWithAudioMuted: true,
              disableModeratorIndicator: false,
              startScreenSharing: true,
              enableEmailInStats: false
            }}
    interfaceConfigOverwrite = {{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        MOBILE_APP_PROMO: false,
    }}
    userInfo = {{
        displayName: name,
        email: email
    
            }}
       
    getIFrameRef = { (iframeRef) => { iframeRef.style.height = '800px'; } }
        />
   
    </>
  );
};

export default JitsiMeet;