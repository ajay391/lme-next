export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 text-lg">You do not have permission to view this page.</p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
