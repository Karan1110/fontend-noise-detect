// import React, { useState, useEffect, useRef } from "react"
// import { Document, Page } from "react-pdf-js"

// const App = () => {
//   const [pdfData, setPdfData] = useState(null)
//   const selectedOptionRef = useRef("")
//   const inputRef = useRef("")

//   const loadPdf = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/load-pdf")
//       const pdfBlob = await response.blob()
//       setPdfData(pdfBlob)
//     } catch (error) {
//       console.error("Error loading PDF:", error)
//     }
//   }

//   useEffect(() => {
//     loadPdf()
//   }, [])

//   const handleSavePdf = async () => {
//     try {
//       // Access the form fields from the PDF viewer
//       const formFields = document.querySelectorAll(".form-field")

//       formFields.forEach((field) => {
//         if (field.name === "my-dropdown-field") {
//           selectedOptionRef.current = field.value
//         } else if (field.name === "my-input-field") {
//           inputRef.current = field.value
//         }
//       })

//       console.log("Selected Option:", selectedOptionRef.current)
//       console.log("Input Value:", inputRef.current)
//     } catch (error) {
//       console.error("Error saving PDF:", error)
//     }
//   }

//   return (
//     <div>
//       <h1>PDF Form Filler</h1>
//       {pdfData ? (
//         <div style={{ width: "500px", margin: "20px auto" }}>
//           <Document file={pdfData}>
//             <Page pageNumber={1} width={500} />
//           </Document>
//         </div>
//       ) : (
//         <div>Loading PDF...</div>
//       )}

//       <div>
//         <button onClick={handleSavePdf}>Save PDF</button>
//       </div>
//     </div>
//   )
// }

// export default App

import { LoginPage, SignupPage } from "./components/AuthPages"
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AudioRecorder from "./components/AudioRecorder"
import Session from "./components/Session"

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<AudioRecorder />} />
          <Route path="/session/:id" element={<Session />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
