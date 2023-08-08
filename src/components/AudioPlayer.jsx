import React, { useState, useEffect } from "react"
import AudioPlayer from "./AudioPlayer"

const Sessions = () => {
  const [sessions, setSessions] = useState([])
  const [currentAudio, setCurrentAudio] = useState(null)

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(
          "https://noise-detect-backend.onrender.com/api/sessions",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        )

        if (!response.ok) {
          throw new Error("Failed to fetch sessions")
        }

        const data = await response.json()
        setSessions(data)
        console.log(data)
      } catch (error) {
        console.error("Error fetching sessions:", error)
      }
    }

    fetchSessions()
  }, [])

  const handlePlayAudio = (audioURL) => {
    setCurrentAudio(audioURL)
  }

  const handleStopAudio = () => {
    setCurrentAudio(null)
  }

  return (
    <div>
      {currentAudio && (
        <AudioPlayer audioURL={currentAudio} onStop={handleStopAudio} />
      )}
    </div>
  )
}

export default Sessions
