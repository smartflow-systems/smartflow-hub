export default function TopStats() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-beige">
      <div className="p-4 bg-white rounded shadow">
        <p className="text-sm text-gray-600">Revenue</p>
        <p className="text-2xl font-bold">$0</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <p className="text-sm text-gray-600">Active Users</p>
        <p className="text-2xl font-bold">0</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <p className="text-sm text-gray-600">Tasks</p>
        <p className="text-2xl font-bold">12</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <p className="text-sm text-gray-600">Alerts</p>
        <p className="text-2xl font-bold text-red-600">3</p>
      </div>
    </div>
  );
}
