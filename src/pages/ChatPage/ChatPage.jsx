import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useRequests } from '../../context/RequestsContext.jsx';
import { useChat } from '../../context/ChatContext.jsx';
import { useUserRole } from '../../context/UserRoleContext.jsx';

const ChatPage = () => {
  const { requestId } = useParams();
  const { requests } = useRequests();
  const { role, userId } = useUserRole();
  const { messagesByRequest, sendMessage } = useChat();

  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const messagesEndRef = useRef(null);

  const request = requests.find(r => r.id === parseInt(requestId));
  const messages = messagesByRequest[requestId] || [];

  const handleSend = () => {
    if (!input.trim() && !file) return;
    const newMsg = {
      role,
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      file: file ? URL.createObjectURL(file) : null,
    };
    sendMessage(requestId, newMsg);
    setInput('');
    setFile(null);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!request) return <div className="text-white p-4">Request not found.</div>;

  if (role === 'taker' && userId !== request.takerId) {
    return (
      <div className="text-white p-6 bg-red-900 rounded-lg max-w-md mx-auto mt-10 text-center">
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p>You are not authorized to view this chat.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0e0e0e] text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-[#1a1a1a] shadow-sm">
        <h2 className="text-teal-400 text-lg font-semibold">{request.title}</h2>
        <p className="text-sm text-gray-300">{request.desc.slice(0, 80)}...</p>
        <span className="text-xs text-gray-500 italic">📍 {request.city}</span>
      </div>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#121212]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] px-4 py-2 rounded-lg shadow-md text-sm whitespace-pre-line ${
              msg.role === 'donor'
                ? 'bg-gradient-to-br from-green-200 to-green-100 text-gray-900 self-start'
                : 'bg-gradient-to-br from-blue-200 to-blue-100 text-gray-900 self-end ml-auto'
            }`}
          >
            <div className="text-[11px] font-semibold text-gray-600 mb-1">{msg.role}</div>
            <div>{msg.text}</div>
            {msg.file && (
              <a
                href={msg.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mt-1 text-sm"
              >
                📎 View Attachment
              </a>
            )}
            <div className="text-right text-[10px] text-gray-500 mt-1">{msg.timestamp}</div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-[#1a1a1a] border-t border-gray-700 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-md bg-[#2a2a2a] text-white text-sm border border-gray-600 focus:outline-none"
        />
        <label className="text-lg cursor-pointer text-gray-400 hover:text-gray-200">
          📎
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
