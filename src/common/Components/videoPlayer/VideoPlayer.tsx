import  { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { IVideo } from '../../../interface/IVideo/IVideo';
interface IProp{
    video:IVideo|null
}
function VideoPlayer({ video }:IProp) {
    const [currentvideo,setVideo] = useState<IVideo|null>(null)
    useEffect(() => {
        
        setVideo(video)
    },[video])
  return (
    <div style={{ width: '65%', height: '70vh', position: 'relative', marginRight: '20px' }}>
      {currentvideo && (
        <>
                  <ReactPlayer
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
            url={currentvideo?.URL}
            controls
            width="100%"
            height="100%"
            style={{ position: 'relative', top: 0, left: 0 }}
          />
          <h2 className='text-2xl font-bold mt-3'>{currentvideo.Title}</h2>
        </>
      )}
    </div>
  );
}

export default VideoPlayer;
