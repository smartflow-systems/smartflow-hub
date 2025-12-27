export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold">SmartFlow Hub</h1>
        <p className="text-xl text-beige">Your unified command center for all SFS products</p>
        <a href="/dashboard" className="inline-block bg-gold hover:bg-gold-hover text-black px-8 py-3 rounded font-bold">
          Enter Dashboard
        </a>
      </div>
    </div>
  );
}
