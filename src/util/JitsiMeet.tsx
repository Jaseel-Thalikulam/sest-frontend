import { JaaSMeeting } from "@jitsi/react-sdk";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootStateType } from "../redux/store";
import PublicMethods from "../Methods/PublicMethods";

const JitsiMeet = () => {
  const navigate = useNavigate()
  const publicmethod = new PublicMethods()
  const APP_ID = import.meta.env.VITE_JITSI_APPID as string;
  const data = useSelector((state: RootStateType) => state.user);
  const { name, email } = data;
  type Data = {
  readonly  MeetId: string,
   readonly Token :string
  } 
  const { MeetId = '', Token = ''} = useParams<Data>();
  function handleClose() { 
    if (localStorage.getItem('jwt-lead')) {
      navigate('/lead/')
      
    } else if (localStorage.getItem('jwt-learn')) {
      navigate('/learn/')
      
    }
  }

 

  return (
    <>
      
      <JaaSMeeting
        onReadyToClose={() =>void handleClose()}
        jwt={Token}
        appId={APP_ID}
        roomName={MeetId}
        configOverwrite={{
          disableThirdPartyRequests: true,
          disableLocalVideoFlip: true,
          startWithAudioMuted: true,
          disableModeratorIndicator: false,
          startScreenSharing: true,
          enableEmailInStats: false,
        }}  interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          MOBILE_APP_PROMO: false,
        }} userInfo={{
          displayName: publicmethod.properCase(name),
          email: email,
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "88vh";
        }}/>
      

     
    </>
  );
};

export default JitsiMeet;
