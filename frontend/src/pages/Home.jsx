import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center">
      <section
        className="text-white py-20 px-4 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/1469297994/photo/business-finance-and-investment-concept-capital-gain-world-money-economic-growth-coin-stack.jpg?s=612x612&w=0&k=20&c=HmEUbSzgPvAUamDU9CN-gxe6QOdph3p2VWgZKlMeRzI=')`,
        }}
      >
        <div className="bg-green-800 bg-opacity-70 p-8 rounded max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Split Bills. Stay Friends.</h1>
          <p className="text-lg mb-6 max-w-xl mx-auto">
            FairSplit makes it effortless to share expenses with roommates, travel buddies, or group members without the awkward conversations.
          </p>
          <Link
            to="/split"
            className="bg-white text-green-700 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-6">Why Choose FairSplit?</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-lg font-bold mb-2">Fast & Simple</h3>
            <p>No calculators needed—add names and amounts, and we’ll handle the rest.</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-lg font-bold mb-2">Flexible Splits</h3>
            <p>Choose equal or custom shares for each person in the group.</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-lg font-bold mb-2">Works Anywhere</h3>
            <p>Use it easily on mobile or desktop, at home or on the go.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <h2 className="text-2xl font-semibold mb-6">Ready to Split?</h2>
        <p className="mb-6">No signup required. It's fast, fair, and totally free.</p>
        <Link
          to="/split"
          className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Split a Bill
        </Link>
      </section>
    </div>
  );
}
