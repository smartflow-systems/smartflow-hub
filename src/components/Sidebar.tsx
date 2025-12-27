'use client';
export default function Sidebar() {
  const modules = [
    { name: 'Data Query', path: '/dashboard/data-query' },
    { name: 'Social Scale', path: '/dashboard/social-scale' },
    { name: 'AP CRM', path: '/dashboard/ap-crm' },
    { name: 'Analytics', path: '/dashboard/analytics' }
  ];

  return (
    <aside className="w-64 bg-black text-white p-4 space-y-2">
      <h2 className="text-xl font-bold mb-6">SmartFlow Hub</h2>
      {modules.map(m => (
        <a key={m.name} href={m.path} className="block p-2 hover:bg-brown rounded">
          {m.name}
        </a>
      ))}
    </aside>
  );
}
