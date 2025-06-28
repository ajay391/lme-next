import AdminSidebar from '../components/AdminSidebar';
import { useAdminAuth } from '../../hooks/useAdminAuth';

export default function Dashboard() {
  const { loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">Total Users</h2>
              <p className="text-2xl mt-2 font-bold text-blue-600">124</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">Orders Today</h2>
              <p className="text-2xl mt-2 font-bold text-green-600">38</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">Monthly Revenue</h2>
              <p className="text-2xl mt-2 font-bold text-purple-600">$12,430</p>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Recent User Activity</h2>
            <ul className="divide-y">
              <li className="py-3 flex justify-between">
                <span>📱 +91-9876543210</span>
                <span className="text-sm text-gray-500">Logged in 2 mins ago</span>
              </li>
              <li className="py-3 flex justify-between">
                <span>📱 +91-9845123789</span>
                <span className="text-sm text-gray-500">Placed an order</span>
              </li>
              <li className="py-3 flex justify-between">
                <span>📱 +91-9988776655</span>
                <span className="text-sm text-gray-500">Registered 1 hour ago</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
