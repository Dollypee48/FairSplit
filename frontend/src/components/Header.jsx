import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-green-700 text-white py-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold">FairSplit</Link>

        <nav className="space-x-4">

          <Link to="/split" className="hover:underline">Split</Link>
          <Link to="/history" className="hover:underline">History</Link>
          <Link to="/about" className="hover:underline">About</Link>

        </nav>
      </div>
    </header>
  )
}
