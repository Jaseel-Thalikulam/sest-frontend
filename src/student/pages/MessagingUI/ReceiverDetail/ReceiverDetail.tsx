import { Avatar } from '@mui/material'
import React from 'react'

function ReceiverDetail(props:{avatar:string,name:string}) {
  const {avatar,name} =props
  return (
      <>
          <div className="flex flex-col items-center mt-4 mb-6">
                    <Avatar
                      style={{
                        width: "100px",
                        height: "100px",
                        fontSize: "40px",
                      }}
        >
          <img src={avatar}/>
          
                      
                    </Avatar>
                    <div className="mt-2 text-lg font-semibold">
                      {name}
                    </div>
                    <div className="text-gray-500">
                      {/* {receiverDetails.username} */}
                    </div>
                  </div>
      </>
  )
}

export default ReceiverDetail
