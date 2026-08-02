'use client';

import { useState } from 'react';
import { Send, Paperclip, Image as ImageIcon, FileText, UserCheck, Shield, Palette } from 'lucide-react';
import { addMessageToRequest } from '../../utils/designMyTeeStore';

export default function MessagingThread({ request, currentUserRole = 'User', currentUserName = 'Marcus Sterling' }) {
  const [inputText, setInputText] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [attachmentType, setAttachmentType] = useState('image');
  const [showAttachInput, setShowAttachInput] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() && !attachmentUrl) return;

    const attachments = attachmentUrl ? [{
      type: attachmentType,
      url: attachmentUrl,
      name: attachmentType === 'image' ? 'Attached_Design_Concept.jpg' : 'Technical_Spec_Sheet.pdf'
    }] : [];

    let senderAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
    if (currentUserRole === 'Designer') {
      senderAvatar = request.assignedDesigner ? request.assignedDesigner.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
    } else if (currentUserRole === 'Admin' || currentUserRole === 'Super Admin') {
      senderAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80';
    } else if (request.user && request.user.avatar) {
      senderAvatar = request.user.avatar;
    }

    addMessageToRequest(request.id, {
      senderId: currentUserRole.toLowerCase(),
      senderName: currentUserName,
      senderRole: currentUserRole,
      senderAvatar,
      text: inputText,
      attachments
    });

    setInputText('');
    setAttachmentUrl('');
    setShowAttachInput(false);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Designer':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 text-purple-700 border border-purple-200">
            <Palette className="w-3 h-3" /> Designer
          </span>
        );
      case 'Admin':
      case 'Super Admin':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-100 text-red-700 border border-red-200">
            <Shield className="w-3 h-3" /> Admin
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-50 text-red-700 border border-red-200">
            <UserCheck className="w-3 h-3" /> Customer
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-[520px] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-mono font-bold uppercase text-gray-900 tracking-wider">
            Ticket Conversation Thread — #{request.id}
          </h4>
          <p className="text-[11px] text-gray-500 font-mono">
            Participants: {request.user?.name} (Customer), {request.assignedDesigner ? request.assignedDesigner.name : 'Unassigned'} (Designer), Admin Team
          </p>
        </div>
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Live Ticket Thread"></span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
        {request.conversation && request.conversation.length > 0 ? (
          request.conversation.map((msg) => {
            const isMe = msg.senderRole === currentUserRole;
            return (
              <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                <img
                  src={msg.senderAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full object-cover border border-gray-300 flex-shrink-0 mt-0.5"
                />
                <div className={`max-w-[78%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-900">{msg.senderName}</span>
                    {getRoleBadge(msg.senderRole)}
                    <span className="text-[10px] text-gray-400 font-mono">{msg.timestamp}</span>
                  </div>

                  <div className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-red-600 text-white rounded-tr-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                  }`}>
                    {msg.text}

                    {/* Attachments */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-2.5 space-y-2 pt-2 border-t border-white/20">
                        {msg.attachments.map((att, idx) => (
                          <div key={idx} className="rounded-lg overflow-hidden bg-black/10 p-2 flex flex-col gap-1.5">
                            {att.type === 'image' ? (
                              <div>
                                <img src={att.url} alt="Attachment" className="max-h-48 rounded-md object-cover w-full" />
                                <span className="text-[10px] opacity-80 flex items-center gap-1 mt-1">
                                  <ImageIcon className="w-3 h-3" /> {att.name}
                                </span>
                              </div>
                            ) : (
                              <a href={att.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono underline hover:opacity-80">
                                <FileText className="w-4 h-4" /> {att.name}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-xs text-gray-400 py-10">No messages yet. Send a message to start conversation!</div>
        )}
      </div>

      {/* Attachment Drawer toggle */}
      {showAttachInput && (
        <div className="p-3 bg-gray-100 border-t border-gray-200 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
            <span>Add Mockup Attachment URL</span>
            <button onClick={() => setShowAttachInput(false)} className="text-gray-400 hover:text-gray-600 text-xs">✕ Close</button>
          </div>
          <div className="flex gap-2">
            <select
              value={attachmentType}
              onChange={(e) => setAttachmentType(e.target.value)}
              className="text-xs bg-white border border-gray-300 rounded px-2 py-1"
            >
              <option value="image">Image Mockup</option>
              <option value="pdf">PDF Specification</option>
            </select>
            <input
              type="text"
              placeholder="Paste Image URL (e.g. https://images.unsplash.com/...)"
              value={attachmentUrl}
              onChange={(e) => setAttachmentUrl(e.target.value)}
              className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 font-mono focus:outline-none focus:border-red-500"
            />
          </div>
        </div>
      )}

      {/* Input Box */}
      <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowAttachInput(!showAttachInput)}
          className={`p-2 rounded-lg transition ${showAttachInput ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
          title="Attach Image/PDF"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Type a message as ${currentUserName} (${currentUserRole})...`}
          className="flex-1 text-xs sm:text-sm bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          disabled={!inputText.trim() && !attachmentUrl}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white p-2 sm:px-4 sm:py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
