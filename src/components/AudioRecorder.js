import React, { useState, useEffect, useCallback } from "react"
import { ReactMic } from "react-mic"
import Sessions from "./Sessions"
import { useNavigate } from "react-router-dom"

const AudioRecorder = () => {
  const [audioStream, setAudioStream] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [volume, setVolume] = useState(0)
  const [analyser, setAnalyser] = useState(null)
  const [selectedOption, setSelectedOption] = useState("low")
  const [threshold, setThreshold] = useState(125)
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  if (!localStorage.getItem("token")) {
    navigate("/signup")
  }

  const [audio, setAudio] = useState("")
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value
    setSelectedOption(selectedValue)

    switch (selectedValue) {
      case "high":
        setThreshold(75)
        break
      case "mid":
        setThreshold(125)
        break
      case "low":
        setThreshold(150)
        break
      default:
        setThreshold(125)
    }
    console.log(threshold)
  }
  useEffect(() => {
    // Function to handle audio stream from getUserMedia
    const handleStream = (stream) => {
      if (isRecording) {
        setAudioStream(stream)
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)()
        const source = audioContext.createMediaStreamSource(stream)

        // Create an AnalyserNode to analyze audio data
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 256
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        source.connect(analyser)
        setAnalyser(analyser)

        const updateVolume = () => {
          analyser.getByteFrequencyData(dataArray)
          // Calculate the average volume from dataArray and update state
          let sum = 0
          dataArray.forEach((value) => (sum += value))
          const averageVolume = sum / bufferLength

          setVolume(averageVolume)
          // Request next animation frame for real-time update
          if (isRecording) {
            requestAnimationFrame(updateVolume)
          }
        }

        audioContext.resume().then(() => {
          updateVolume()
        })
      } else {
        setVolume(0)
        if (analyser) {
          analyser.disconnect() // Disconnect the analyser node when not recording
        }
      }
    }

    // Get user's microphone stream
    if (isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(handleStream)
        .catch((error) => console.error("Error accessing microphone:", error))
    }

    // Clean up the audio stream when unmounting the component
    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isRecording])

  const handleStartRecording = () => {
    setIsRecording(true)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
  }

  const onData = (recordedBlob) => {}

  const onStop = useCallback((recordedBlob) => {
    console.log("Recording stopped:", recordedBlob)

    const formData = new FormData()
    formData.append(
      "audio",
      recordedBlob.blob,
      `recorded-audio${Date.now()}.mp3`
    )

    const sendAudioToServer = async () => {
      try {
        const response = await fetch(
          "https://noise-detect-backend.onrender.com/api/sessions",
          {
            method: "POST",
            body: formData,
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        )

        if (response && response.ok) {
          console.log("Audio file uploaded successfully")
          // Handle any further actions after successful upload
        } else {
          console.error("Error uploading audio file", response)
          // Handle error cases if needed
        }
      } catch (error) {
        console.error("Error uploading audio file:", error)
        // Handle error cases if needed
      }
    }

    sendAudioToServer()
  }, [])

  return (
    <div className="p-4 border rounded-xl flex items-center justify-center flex-col bg-white">
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop} // Include onStop as a dependency
        onData={onData}
        mimeType="audio/mp3"
      />
      <button
        className={`px-4 py-2 rounded-xl m-5 ${
          isRecording ? "bg-red-500" : "bg-pink-500"
        } text-white`}
        onClick={isRecording ? handleStopRecording : handleStartRecording}
      >
        {isRecording ? "Stop Session" : "Start Session"}
      </button>
      {isRecording ? <p>Volume: {volume}</p> : null}
      {volume > threshold && isRecording && (
        <h1 className="text-4xl font-bold text-pink-900">
          {" "}
          Alert there is too much disturbance!
        </h1>
      )}
      <p className="font-bold text-xl text-pink-700 m-5">
        Noise Threshold Sensitivity :
      </p>
      <br />
      <p className="text-pink font-semibold">
        low : average volume = 75
        <br />
        mid : average volume = 125
        <br />
        high : average volume = 150
      </p>
      <br />
      <select
        id="thresholdDropdown"
        className="px-4 py-2 rounded-xl bg-blue-500 text-white"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="low">Low</option>
        <option value="mid">Mid</option>
        <option value="high">High</option>
      </select>
      <Sessions audio={audio} setAudio={setAudio} />
    </div>
  )
}

export default AudioRecorder
