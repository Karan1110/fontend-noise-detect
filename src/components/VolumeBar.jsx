import React, { useState } from "react"

const VolumeBar = () => {
  const volumeLevels = {
    mild: 75,
    mid: 100,
    high: 150,
  }

  const [selectedOption, setSelectedOption] = useState("mild")
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleDrag = (event) => {
    const volumeBar = event.target
    const rect = volumeBar.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const barWidth = rect.width
    const newVolume = (offsetX / barWidth) * volumeLevels[selectedOption]
    setVolume(newVolume)
  }

  return (
    <div className="volume-bar w-48 flex items-center justify-center h-4 bg-gray-300 cursor-pointer relative">
      <div
        className="volume-bar-fill h-full bg-blue-500 absolute top-0 left-0"
        style={{ width: `${volumeLevels[selectedOption]}%` }}
      ></div>
      <div
        className="volume-bar-handle w-6 h-6 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-grab"
        style={{ left: `${volumeLevels[selectedOption]}%` }}
      >
        <div className="volume-indicator text-blue-500 text-xs font-bold absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          {volumeLevels[selectedOption]}
        </div>
      </div>
      <select
        className="mt-2 block w-96 p-2 rounded-md bg-gray-300 text-black "
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="mild">Mild</option>
        <option value="mid">Mid</option>
        <option value="high">High</option>
      </select>
    </div>
  )
}

export default VolumeBar
