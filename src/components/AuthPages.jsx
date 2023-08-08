import React, { useState } from "react"
import { Link, useNavigate, Routes, Route } from "react-router-dom"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        "https://noise-detect-backend.onrender.com/api/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      )
      const data = await response.json()
      if (response.ok) {
        console.log("Login successful")
        localStorage.setItem("token", data.token)
        navigate("/")
      } else {
        console.error("Login failed")
      }
    } catch (error) {
      console.error("Error during login:", error)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-pink-50"
      style={{
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="max-w-md w-full p-8 gap-3 bg-white rounded-2xl p-10 shadow-lg"
        style={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px", // Increased width for better spacing
          marginTop: "200px",
          width: "50vw",
          height: "30vw",
          textAlign: "center",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <h2
          className="text-3xl text-center text-pink-800 font-bold mb-6 text-center"
          style={{ color: "#f472b6", margin: "20px" }}
        >
          Sign Up
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-pink-600 font-semibold mb-2"
              style={{ color: "#f472b6", margin: "20px" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring focus:border-pink-500"
              style={{
                borderColor: "#fdae6b",
                outlineColor: "#fdae6b",
                margin: "20px",
              }}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-pink-600 font-semibold mb-2"
              style={{ color: "#f472b6", margin: "20px" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring focus:border-pink-500"
              style={{
                borderColor: "#fdae6b",
                outlineColor: "#fdae6b",
                margin: "20px",
                marginRight: "15px",
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-300"
            onClick={handleLogin}
            style={{ backgroundColor: "#f472b6", margin: "20px" }}
          >
            Sign Up
          </button>
          <Link to="/signup">
            <p
              className="mt-4 text-pink-500 text-center"
              style={{ color: "#f472b6" }}
            >
              New User? Click here to register
            </p>
          </Link>
        </form>
      </div>
    </div>
  )
}

const SignupPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        "https://noise-detect-backend.onrender.com/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      )
      const data = await response.json()

      if (response.ok) {
        console.log("Signup successful")
        localStorage.setItem("token", data.token)
        navigate("/")
      } else {
        console.error("Signup failed")
      }
    } catch (error) {
      console.error("Error during signup:", error)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-pink-50"
      style={{
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="max-w-md w-full p-8 gap-3 bg-white rounded-2xl p-10 shadow-lg"
        style={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px", // Increased width for better spacing
          marginTop: "200px",
          width: "50vw",
          height: "30vw",
          textAlign: "center",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <h2
          className="text-3xl text-center text-pink-800 font-bold mb-6 text-center"
          style={{ color: "#f472b6", margin: "20px" }}
        >
          Sign Up
        </h2>
        <form onSubmit={handleSignup}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-pink-600 font-semibold mb-2"
              style={{ color: "#f472b6", margin: "20px" }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring focus:border-pink-500"
              style={{
                borderColor: "#fdae6b",
                outlineColor: "#fdae6b",
                margin: "20px",
              }}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-pink-600 font-semibold mb-2"
              style={{ color: "#f472b6", margin: "20px" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring focus:border-pink-500"
              style={{
                borderColor: "#fdae6b",
                outlineColor: "#fdae6b",
                margin: "20px",
              }}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-pink-600 font-semibold mb-2"
              style={{ color: "#f472b6", margin: "20px" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring focus:border-pink-500"
              style={{
                borderColor: "#fdae6b",
                outlineColor: "#fdae6b",
                margin: "20px",
                marginRight: "15px",
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-300"
            onClick={handleSignup}
            style={{ backgroundColor: "#f472b6", margin: "20px" }}
          >
            Sign Up
          </button>
          <Link to="/login">
            <p
              className="mt-4 text-pink-500 text-center"
              style={{ color: "#f472b6" }}
            >
              Already have an account? Click here to login
            </p>
          </Link>
        </form>
      </div>
    </div>
  )
}

export { LoginPage, SignupPage }
