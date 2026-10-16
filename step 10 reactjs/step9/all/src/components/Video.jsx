import { useRef } from "react";

function Video(){

    const videoRef = useRef(null)

    function handleStart(){
        videoRef.current.play(); 
    }

    function hanldeStop(){
        videoRef.current.pause()
    }

    function handleRestart(){
        videoRef.current.currentTime = 0;
    }

   return (
    <>
     <video ref={videoRef} src="" width="600" height="400"></video>
     <div>
        <button onClick={handleStart}>start</button>
        <button onClick={hanldeStop}>pause</button>
        <button onClick={handleRestart}>restart</button>
     </div>
    </>
   )

}

export default Video;