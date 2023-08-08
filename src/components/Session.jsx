import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const Session = () => {
  const { id } = useParams()
  const [session, setSession] = useState(null)
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(
          `https://noise-detect-backend.onrender.com/api/sessions/${id}`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        )

        if (!response.ok) {
          console.log(response)
        }

        const data = await response.json()
        setSession(data)
        console.log(data)
        setAudio(`https://noise-detect-backend.onrender.com/${data.audio}`)
        console.log(data)
      } catch (error) {
        console.error("Error fetching session:", error)
      }
    }

    fetchSession()
  }, [])

  const handleDownloadAudio = async () => {
    try {
      const response = await fetch(audio)
      if (!response.ok) {
        throw new Error("Failed to download audio")
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = `recorded-audio-${Date.now()}.mp3`
      anchor.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading audio:", error)
    }
  }

  return (
    <div
      className="p-4 border rounded-lg shadow-md h-screen text-center bg-pink-100"
      style={{ height: "100vw", textAlign: "center" }}
    >
      <h1 className="font-bold text-xl text-pink-900">Recorded Session</h1>
      {session && (
        <div
          className="bg-gray-200 rounded-xl "
          style={{ marginLeft: "700px", marginTop: "20px" }}
        >
          <audio controls className="mb-5 ">
            <source src={audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <button
            className="px-4 py-2 rounded-xl m-3 bg-pink-500 text-white"
            onClick={handleDownloadAudio}
            style={{
              marginRight: "700px",
              marginTop: "20px",
            }}
          >
            Download
          </button>
        </div>
      )}
    </div>
  )
}

export default Session
