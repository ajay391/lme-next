'use client';

import { useState, useEffect } from 'react';
import { Bell, Mail, CheckCircle2, AlertCircle, X, ExternalLink } from 'lucide-react';
import { getStoredNotifications, saveNotifications } from '../../utils/designMyTeeStore';

export default function NotificationCenter({ activeRole = 'User' }) {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState(null);

  useEffect(() => {
    const load = () => {
      const allNotifs = getStoredNotifications();
      // Filter by role or show all if Admin
      const filtered = activeRole === 'Admin' || activeRole === 'Super Admin'
        ? allNotifs
        : allNotifs.filter(n => n.recipientRole === activeRole || n.recipientRole === 'User');
      setNotifications(filtered);
    };

    load();
    window.addEventListener('designmytee_notif_update', load);
    return () => window.removeEventListener('designmytee_notif_update', load);
  }, [activeRole]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    const allNotifs = getStoredNotifications();
    const updated = allNotifs.map(n => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  const openEmailPreview = (notif) => {
    setSelectedEmailTemplate(notif);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition focus:outline-none"
        title="Notifications & Email Preview"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          <div className="p-3.5 bg-gray-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-red-500" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                Notifications ({activeRole})
              </span>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[10px] text-gray-300 hover:text-white underline font-mono"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3.5 hover:bg-gray-50 transition cursor-pointer flex gap-3 ${!n.read ? 'bg-blue-50/40' : ''}`}
                  onClick={() => openEmailPreview(n)}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h6 className="text-xs font-bold text-gray-900">{n.title}</h6>
                      <span className="text-[9px] text-gray-400 font-mono">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{n.body}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 font-mono font-bold mt-1">
                      <ExternalLink className="w-3 h-3" /> Preview Email Alert
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-gray-400 font-mono">No notifications at this time.</div>
            )}
          </div>
        </div>
      )}

      {/* Email Notification Template Preview Modal */}
      {selectedEmailTemplate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl border border-gray-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Email Header Chrome */}
            <div className="p-4 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-red-500" />
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider">Automated Email Notification</h4>
                  <p className="text-[10px] text-neutral-400 font-mono">Template Preview for {selectedEmailTemplate.recipientRole}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmailTemplate(null)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Email Body */}
            <div className="p-6 bg-gray-50 font-sans">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-mono uppercase block">From: notifications@lastmanonearth.com</span>
                    <span className="text-[10px] text-gray-400 font-mono uppercase block">To: {selectedEmailTemplate.recipientRole}@user.com</span>
                  </div>
                  <span className="bg-red-100 text-red-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    LME Custom Tees
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{selectedEmailTemplate.title}</h3>
                  <p className="text-xs text-gray-600 font-mono">Reference Ticket ID: {selectedEmailTemplate.requestId}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-xs text-gray-800 leading-relaxed border border-gray-100">
                  {selectedEmailTemplate.body}
                </div>

                <div className="pt-2 text-center">
                  <a
                    href={`/designmytee`}
                    className="inline-block bg-black text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition"
                    onClick={() => setSelectedEmailTemplate(null)}
                  >
                    Open DesignMyTee Portal
                  </a>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 text-center mt-4 font-mono">
                © 2026 Last Man On Earth Apparel. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
