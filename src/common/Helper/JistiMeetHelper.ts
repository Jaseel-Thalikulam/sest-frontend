import axiosInstanceStudent from "../../student/interceptor/axiosInstance.Student";
import axiosInstanceTutor from "../../tutor/interceptor/axiosInstanceTutor";
import { UserStateType } from "../../redux/store";

const APP_ID = import.meta.env.VITE_JITSI_APPID as string;
const APP_KEY = import.meta.env.VITE_JITSI_APIKEY as string;

export class Jitsihelper {
  async getToken(MeetId: string, data: UserStateType) {
      const { name, _id, avatarUrl, email } = data;
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    
    if (localStorage.getItem("jwt-learn")) {
      const meetData = {
        alg: "RS256",
        kid: APP_KEY,
        aud: "jitsi",
        context: {
          user: {
            id: _id,
            name: name,
            avatar: avatarUrl,
            email: email,
            moderator: true,
          },
          features: {
            livestreaming: true,
            recording: false,
            transcription: true,
            "sip-inbound-call": false,
            "sip-outbound-call": false,
            "inbound-call": true,
            "outbound-call": true,
          },
          room: {
            regex: false,
          },
        },
        sub: APP_ID,
        iss: "chat",
        room: "*",
        nbf: currentTimeInSeconds, 
        exp: currentTimeInSeconds    + 60 * 60,
      };

      const response = await axiosInstanceStudent.get("/meet/token", {
        params: {
          meetData,
        },
      });

      
      return response.data.token;
    } else if (localStorage.getItem("jwt-lead")) {
      const meetData = {
        alg: "RS256",
        kid: APP_KEY,
        aud: "jitsi",
        context: {
          user: {
            id: _id,
            name: name,
            avatar: avatarUrl,
            email: email,
            moderator: true,
          },
          features: {
            livestreaming: true,
            recording: false,
            transcription: true,
            "sip-inbound-call": false,
            "sip-outbound-call": false,
            "inbound-call": true,
            "outbound-call": true,
          },
          room: {
            regex: false,
          },
        },
        sub: APP_ID,
        iss: "chat",
        room: "*",
        nbf: currentTimeInSeconds, 
        exp: currentTimeInSeconds    + 60 * 60,
      };
      const response = await axiosInstanceTutor.get("/meet/token", {
        params: {
          meetData,
        },

        
      });

      return response.data.token;

    }
  }
}
