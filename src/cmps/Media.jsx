import { useEffect, useState, useRef } from "react"
import { MovieIcon, MuteIcon } from "../assets/icons"
import createThumbnail from "react-thumbnail-creator"

export function Media({media, isVideoPreview = false}) {
    const [isUserStoppedVideo, setIsUserStoppedVideo] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [videoThumbnail, setVideoThumbnail] = useState(true)

    const videoRef = useRef(null)
    const MIN_VIDEO_TO_PLAY_DISPLAY_PERCENT = 0.3

    useEffect(() => {
        if (isVideoPreview) {
            console.log(media.url)
            createThumbnail({
                url: media.url,
                timeStamp: 6,
              }).then((thumbnail) => {
                setVideoThumbnail(thumbnail)
              })
        }
        

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            if (!isVideoPreview) {
                if (!isUserStoppedVideo) {
                    if (entry.intersectionRatio < MIN_VIDEO_TO_PLAY_DISPLAY_PERCENT) {
                        pauseVideo()
                    } else {
                        playVideo()
                    }
                } 
            }
                   
        }, { threshold: MIN_VIDEO_TO_PLAY_DISPLAY_PERCENT })

        if (videoRef.current instanceof Element) {
            observer.observe(videoRef.current)
        }

        return () => {
            if (observer) {
                observer.disconnect()
            }
        }
    }, [media])

   

    const playVideo = () => {
        if (videoRef.current) {
            videoRef.current.play()
        }
    }

    const pauseVideo = () => {
        if (videoRef.current) {
            videoRef.current.pause()
        }
    }

    const handlePressVideo = () => {
        if (isUserStoppedVideo) {
            playVideo()
        } else {
            pauseVideo()
        }
        
        setIsUserStoppedVideo(!isUserStoppedVideo)
    }

    const handlePressSound = (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted
            setIsMuted(!isMuted)
        }
    }
    
    const playClass = (!isUserStoppedVideo ? "hide-content " : "") + "play"
    
    if (!media) return <></>

    return (
        <div className="media">
            {media.type === "image" && <img className="image" src={media.url} />}
            {media.type === "video" && !isVideoPreview && <div className="video" onClick={handlePressVideo}>
                    <video autoPlay loop muted ref={videoRef} src={media.url} />
                    <span className={playClass}><span><span></span></span></span>
                    <span className="sound"><span><button onClick={handlePressSound}>
                        {isMuted && <MuteIcon.muted />}
                        {!isMuted && <MuteIcon.sounded />}
                    </button></span></span>
                </div>}
            {media.type === "video" && isVideoPreview && <div className="video-preview">
                    <img src={videoThumbnail} />
                    <MovieIcon.preview />
                </div>}
        </div>
    )
        
}
