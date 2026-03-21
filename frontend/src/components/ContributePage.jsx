const ContributePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold">🚀 Contribute to PASO</h1>
        <p className="text-base-content/70 mt-2">
          PASO is an open-source project. Contributions are welcome from everyone!
        </p>
      </div>

      {/* Steps */}
      <div>
        <h2 className="text-xl font-semibold mb-3">🛠️ How to Contribute</h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Fork the repository</li>
          <li>Clone your fork locally</li>
          <li>Create a new branch</li>
          <li>Make your changes</li>
          <li>Commit and push</li>
          <li>Create a Pull Request 🚀</li>
        </ol>
      </div>

      {/* Commands */}
      <div>
        <h2 className="text-xl font-semibold mb-3">💻 Basic Setup</h2>
        <div className="bg-base-200 p-4 rounded-lg text-sm overflow-x-auto">
{`git clone https://github.com/your-username/your-repo
cd your-repo
npm install
npm run dev`}
        </div>
      </div>

      {/* Issues */}
      <div>
        <h2 className="text-xl font-semibold mb-3">🐛 Reporting Issues</h2>
        <p className="text-base-content/70">
          Found a bug? Open an issue and describe it clearly.
        </p>
      </div>

      {/* Feature */}
      <div>
        <h2 className="text-xl font-semibold mb-3">💡 Suggest Features</h2>
        <p className="text-base-content/70">
          Have an idea? Create an issue and let's discuss it!
        </p>
      </div>

      {/* Closing */}
      <div className="text-center pt-4">
        <p className="text-lg font-medium">
          ❤️ Every contribution matters!
        </p>
      </div>
    </div>
  );
};

export default ContributePage;