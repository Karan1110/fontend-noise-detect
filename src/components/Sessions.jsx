import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Sessions = ({ audio, setAudio }) => {
  const [sessions, setSessions] = useState([])
  const [play, setPlay] = useState(false)
  const navigate = useNavigate()

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

  // const handlePlayAudio = (audioURL, sessionId) => {
  //   // Pause or stop audio of the previously playing session if applicable
  //   if (currentPlayingSession) {
  //     const audioElement = document.getElementById(currentPlayingSession)
  //     if (audioElement) {
  //       audioElement.pause() // or .stop() if it's a Howler.js instance
  //     }
  //   }

  //   // Set the audio URL and current playing session
  //   setAudio(audioURL)
  //   setCurrentPlayingSession(sessionId)
  // }

  const handleCopyToClipboard = (audio) => {
    const textToCopy = `https://noise-detect-backend.onrender.com/${audio}`

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("THE SESSION'S AUDIO HAS BEEN COPIED TO CLIPBOARD!")
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error)
      })
  }
  const handleDownloadAudio = async (audioURL) => {
    try {
      const response = await fetch(
        `https://noise-detect-backend.onrender.com/${audioURL}`
      )
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
    <div className="p-4" style={{ width: "99vw" }}>
      <div className="flex flex-wrap justify-center gap-4">
        <h2 className="text-pink-900 text-xl font-bold text-center">
          Recorded Sessions : {"   "}
        </h2>
        <br />
        {"  "}
        <div className="flex flex-wrap justify-center gap-4">
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <div key={session._id} className="w-1/3 p-2">
                <div
                  className="bg-white rounded-lg p-4 border-pink shadow-md"
                  style={{ margin: "10px" }}
                >
                  <audio
                    id={session._id}
                    controls
                    autoPlay={session.audio === audio && play}
                    className={`text-center absolute top-5 right-5 bottom-5 left-5 `}
                    ref={(audioRef) => {
                      if (
                        audioRef &&
                        session.audio === audio &&
                        play === true
                      ) {
                        audioRef
                          .play()
                          .then(() => {
                            // Playback started successfully
                          })
                          .catch((error) => {
                            console.error("Play error:", error)
                          })
                      }
                    }}
                    onPlay={() => {
                      // Pause other audio when a new session is played
                      sessions.forEach((otherSession) => {
                        if (otherSession._id !== session._id) {
                          const audioElement = document.getElementById(
                            otherSession._id
                          )
                          if (audioElement) {
                            try {
                              audioElement.pause()
                              audioElement.currentTime = 0 // Reset audio to the beginning
                            } catch (error) {
                              // Handle any errors
                            }
                          }
                        }
                      })
                    }}
                  >
                    <source
                      src={`https://noise-detect-backend.onrender.com/${session.audio}`}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                  ;
                  <div className="text-center">
                    <h2 className="text-lg font-semibold mb-2">
                      Session {index + 1}
                    </h2>
                    <div className="flex justify-center space-x-2">
                      {/* <button
                        className="px-4 py-2 rounded-xl bg-pink-500 text-white"
                        onClick={() => {
                          setAudio(session.audio)
                        }}
                        style={{ margin: "3px" }}
                      >
                        Play
                      </button> */}
                      <button
                        className="px-4 py-2 rounded-xl bg-pink-500 text-white"
                        onClick={() => {
                          handleDownloadAudio(session.audio)
                          setPlay(true)
                        }}
                        style={{ margin: "3px" }}
                      >
                        Download
                      </button>
                      <button
                        className="px-4 py-2 rounded-xl bg-blue-500 text-white"
                        onClick={() => handleCopyToClipboard(session.audio)}
                        style={{ margin: "3px" }}
                      >
                        Share
                      </button>
                      <button
                        className="px-4 py-2 rounded-xl bg-blue-500 text-white"
                        onClick={() => navigate(`/session/${session._id}`)}
                        style={{ margin: "3px" }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <br />
              <p
                className="text-pink-500 text-lg m-3 font-semibold"
                style={{
                  marginLeft: "10px",
                  marginBottom: "0px",
                  marginTop: "0px",
                }}
              >
                No recorded sessions. click start button.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sessions

/*
Audio Storage and Retrieval:

Store recorded audio sessions on the server securely.
Retrieve audio files when requested for playback and download.
Noise Analysis Algorithm:

Implement advanced noise analysis algorithms to detect disturbances.
Analyze audio data for intensity, patterns, and anomalies.
API Endpoints:

Define API endpoints for frontend communication.
APIs handle recording, playback, and data retrieval operations.
User Authentication:

Implement user authentication for secure access to the app.
Ensure that only authorized users can record and manage sessions.
Error Handling and Logging:

Implement error handling mechanisms to gracefully handle exceptions.
Log application activities and errors for debugging and monitoring.
Scalability and Performance:

Design backend to handle high volumes of audio data and user requests.
Optimize server performance for smooth user experience.
Cloud Hosting:

Host backend on cloud platforms for scalability and availability.
Ensure reliable server performance and uptime.
Security Measures:

Implement encryption and data protection mechanisms to safeguard user data.
Follow security best practices to prevent unauthorized access.
*/
