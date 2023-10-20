import { Avatar } from '@mui/material'
import ErrorBoundary from '../../../../common/Components/errorBoundary/ErrorBoundary'
import { useEffect,useState } from 'react'
import { ISubscriptionDetail } from '../../../../interface/ISubscription/ISubscriptionDetail'
import { axiosInstance } from '../../../../common/interceptor/axiosInstance'
import { useSelector } from 'react-redux'
import { RootStateType } from '../../../../redux/store'
import PublicMethods from '../../../../Methods/PublicMethods'
function ReceiverDetail(props: { avatar: string,StudentId:string, name: string, email: string|null|undefined,joinedOn:string|Date }) {
  
  const publicmethod = new PublicMethods()
  const { avatar, name, email,StudentId,joinedOn } = props
  const [plan, setPlan] = useState("None")
  const data = useSelector((state: RootStateType) => state.user);
  const { _id } = data;

  useEffect(() => {
    (async function getSubscriptionDetails() {

      if (localStorage.getItem('jwt-lead')) {
        
        const subscriptionresponse: { data: ISubscriptionDetail } = await axiosInstance.get('/getSubscriptionDetails', {
          params: {
            TutorId: _id,
            StudentId: StudentId
          }
        })

       subscriptionresponse.data.success?setPlan(subscriptionresponse.data.plan):setPlan("None")
      }
      })(); 
},[StudentId])
  return (
    <>
      <ErrorBoundary>

          <div className="flex flex-col items-center mt-4 mb-6">
                    <Avatar
                      style={{
                        width: "200px",
                        height: "200px",
                        fontSize: "40px",
                      }}
                      >
          <img src={avatar}/>
          
                      
                    </Avatar>
                  </div>
        <h1 className='text-center text-lg font-medium uppercase'>{name}</h1>
          

          <div className='ml-10 mt-5'>
            
            <h5 className=' text-gray-400 font-thin text-md'>EMAIL</h5>

          <p className='mb-2'>{email} </p>

            <h5 className=' text-gray-400 font-thin text-md'>PLAN</h5>

          <p className='mb-2'>{plan} </p>

            <h5 className=' text-gray-400 font-thin text-md'>JOINED</h5>

          <p className='mb-2'>{publicmethod.formateTimeStamp(joinedOn)} </p>
            
                    </div>
          </ErrorBoundary>
      </>
  )
}

export default ReceiverDetail
