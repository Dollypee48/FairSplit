import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-black px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">
          About FairSplit
        </h1>
        <p className="text-lg text-center mb-12">
          Smart, simple, and transparent expense splitting for groups.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Why FairSplit?</h2>
            <p className="mb-4 leading-relaxed">
              FairSplit is designed to eliminate awkward money conversations. Whether you're traveling with friends, organizing a group event, or simply sharing bills at home, our app helps you divide expenses fairly either equally or based on custom contributions.
            </p>
            <p className="mb-4 leading-relaxed">
              With real-time calculations, result downloads, and local history storage, you can manage group finances with clarity and ease.
            </p>
            <p className="mb-4 leading-relaxed">
              Say goodbye to confusion and hello to transparency.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc pl-5 space-y-3 ">
              <li>✨ Smart and fair expense splitting</li>
              <li>📊 Supports both even and custom shares</li>
              <li>💾 Saves split history locally for future reference</li>
              <li>📥 Export result as a PDF document</li>
              <li>🔒 No signup required – quick and secure</li>
              <li>📱 Clean, responsive interface (mobile + desktop)</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-xl font-medium mb-4">Get Started</h2>
          <p className="mb-6">
            Ready to make splitting expenses a breeze? Try FairSplit now.
          </p>
          <Link
            to="/split"
            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition duration-200"
          >
            Go to Split Page
          </Link>
        </div>
      </div>
    </div>
  );
}
