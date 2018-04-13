import React from 'react';

const VideoTag = (props)=>{
  return(
    <div>
      <iframe 
        width="75%" 
        height="200" 
        src="https://www.youtube.com/embed/wsoN2C0JzWk?rel=0&controls=0&showinfo=0" 
        frameBorder="0" 
        allowFullScreen></iframe>
    </div>
  )
}

export default VideoTag