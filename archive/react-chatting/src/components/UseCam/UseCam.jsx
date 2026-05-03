import { useEffect, useRef, useState } from "react";

const UseCam = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [camera, setCamera] = useState(false);
  const [mic, setMic] = useState(false);

  const toggle = (e) => {
    const type = e.target.value;

    if (type === "cam") {
      setCamera((prev) => !prev);
    } else if (type === "mic") {
      setMic((prev) => !prev);
    }
  };

  useEffect(() => {
    const getMedia = async (content) => {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia(content);
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        stream.getVideoTracks().forEach((track) => {
          track.enabled = false;
        });

        stream.getAudioTracks().forEach((track) => {
          track.enabled = false;
        });
      } catch (err) {
        console.log("Media 권한 오류:", err);
      }
    };
    getMedia({ video: true, audio: true });

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!streamRef.current) return;

    streamRef.current.getVideoTracks().forEach((track) => {
      track.enabled = camera;
    });
    streamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = mic;
    });
  });
  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <button value="cam" onClick={toggle}>
        {camera ? "카메라 끄기" : "카메라 켜기"}
      </button>
      <button value="mic" onClick={toggle}>
        {mic ? "마이크 끄기" : "마이크 켜기"}
      </button>
    </div>
  );
};

export default UseCam;
