import Sidebar from '@/components/Sidebar';
import TopStats from '@/components/TopStats';
import Chat from '@/components/Chat';

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopStats />
        <div className="flex-1 p-4">
          <Chat />
        </div>
      </div>
    </div>
  );
}
