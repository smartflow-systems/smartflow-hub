'use client';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Could not connect to Claude' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded ${m.role === 'user' ? 'bg-gray-100 ml-auto' : 'bg-brown text-white'} max-w-md`}>
            <p className="text-sm whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
        {loading && <div className="p-3 rounded bg-brown text-white max-w-md"><p className="text-sm">Claude is thinking...</p></div>}
      </div>
      <div className="border-t p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ask Claude anything..."
          disabled={loading}
        />
        <button onClick={send} disabled={loading} className="bg-gold hover:bg-gold-hover px-4 py-2 rounded text-black font-medium disabled:opacity-50">
          Send
        </button>
      </div>
    </div>
  );
}
