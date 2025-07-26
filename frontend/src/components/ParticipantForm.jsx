import { useState } from 'react'

export default function ParticipantForm({ participants, setParticipants }) {
  const [name, setName] = useState('')

  const handleAdd = () => {
    if (name.trim() && !participants.includes(name)) {
      setParticipants([...participants, name])
      setName('')
    }
  }

  const handleRemove = (nameToRemove) => {
    setParticipants(participants.filter(p => p !== nameToRemove))
  }

  return (
    <div className="mb-8">
      <label className="block text-lg font-medium text-gray-700 mb-3">
        Add Participants
      </label>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter participant name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg transition duration-200"
        >
          Add
        </button>
      </div>

      {participants.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {participants.map((p, i) => (
            <li
              key={i}
              className="flex items-center bg-green-100 text-green-800 px-4 py-1.5 rounded-full shadow-sm"
            >
              <span className="mr-2">{p}</span>
              <button
                onClick={() => handleRemove(p)}
                className="text-red-500 hover:text-red-700 font-bold text-lg leading-none"
                title="Remove"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
