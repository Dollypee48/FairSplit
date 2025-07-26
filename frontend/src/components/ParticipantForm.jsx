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
    <div className="mb-6">
      <label className="block font-semibold mb-2">Participants</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>
      <ul className="flex flex-wrap gap-2">
        {participants.map((p, i) => (
          <li key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
            {p}
            <button
              onClick={() => handleRemove(p)}
              className="ml-2 text-red-500"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
