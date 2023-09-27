import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import ErrorBoundary from '../../../../common/Components/errorBoundary/ErrorBoundary'

function ReceiverDetail(props: { avatar: string, name: string, about: string|null|undefined }) {
  
  const { avatar, name, about } = props
  useEffect(() => {
    console.log(about,name)
  })
  return (
    <>
      <ErrorBoundary>

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
          <p className="text-center">
            
                      {about}
        </p>
                    </div>
                  </div>
          </ErrorBoundary>
      </>
  )
}

export default ReceiverDetail
