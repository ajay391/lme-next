'use client';

import { useState, useEffect } from 'react';
import { getStoredRequests, updateRequestStatus, addMessageToRequest } from '../../utils/designMyTeeStore';
import MessagingThread from './MessagingThread';
import RevisionTimeline from './RevisionTimeline';
import NotificationCenter from './NotificationCenter';
import WorkflowDiagramModal from './WorkflowDiagramModal';
import { Clock, Eye, CheckCircle2, AlertCircle, Plus, Search, Sparkles, X, Upload, MessageSquare, ArrowLeft, Network } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function UserDesignRequestsTab() {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('timeline'); // 'timeline' | 'chat' | 'references'
  const [isDiagramOpen, setIsDiagramOpen] = useState(false);
  const [revisionNotesInput, setRevisionNotesInput] = useState('');
  const [showRevisionModal, setShowRevisionModal] = useState(false);

  const loadRequests = () => {
    const all = getStoredRequests();
    setRequests(all);
    if (selectedRequest) {
      const refreshed = all.find(r => r.id === selectedRequest.id);
      if (refreshed) setSelectedRequest(refreshed);
    }
  };

  useEffect(() => {
    loadRequests();
    window.addEventListener('designmytee_update', loadRequests);
    return () => window.removeEventListener('designmytee_update', loadRequests);
  }, []);

  useEffect(() => {
    if (selectedRequest || showRevisionModal || isDiagramOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedRequest, showRevisionModal, isDiagramOpen]);

  const getStatusBadge = (status) => {
    const badges = {
      Submitted: 'bg-blue-100 text-blue-800 border-blue-200',
      'In Review': 'bg-purple-100 text-purple-800 border-purple-200',
      Assigned: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'In Progress': 'bg-amber-100 text-amber-800 border-amber-200',
      'Awaiting Feedback': 'bg-orange-100 text-orange-800 border-orange-200',
      'Revision Requested': 'bg-pink-100 text-pink-800 border-pink-200',
      Approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      Completed: 'bg-green-100 text-green-900 border-green-300',
      Cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${badges[status] || 'bg-gray-100 text-gray-800'}`}>
        ● {status}
      </span>
    );
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.id.toLowerCase().includes(searchQuery.toLowerCase()) || req.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApproveDesign = (reqId) => {
    updateRequestStatus(reqId, 'Approved', 'User');
    toast.success('Design approved! Admin will convert this design into a production order.');
    loadRequests();
  };

  const handleCancelRequest = (reqId) => {
    if (confirm('Are you sure you want to cancel this request?')) {
      updateRequestStatus(reqId, 'Cancelled', 'User');
      toast.success('Request cancelled.');
      loadRequests();
    }
  };

  const handleRequestRevisionSubmit = () => {
    if (!revisionNotesInput.trim()) {
      toast.error('Please enter change requests for the designer.');
      return;
    }
    updateRequestStatus(selectedRequest.id, 'Revision Requested', 'User');
    addMessageToRequest(selectedRequest.id, {
      senderRole: 'User',
      senderName: selectedRequest.user?.name || 'User',
      text: `[REVISION REQUESTED]: ${revisionNotesInput}`
    });
    setRevisionNotesInput('');
    setShowRevisionModal(false);
    toast.success('Revision requested! Designer has been notified.');
    loadRequests();
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-gray-900">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-black/30 text-white text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-sm">
              Custom Streetwear Studio
            </span>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">My Design Requests</h2>
          <p className="text-xs text-red-100 font-mono mt-1">
            Track custom T-shirt submissions, review concept revisions, and approve final graphics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <NotificationCenter activeRole="User" />
          <button
            onClick={() => setIsDiagramOpen(true)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition"
          >
            <Network className="w-4 h-4 text-white" />
            <span>Workflow Diagram</span>
          </button>
          <Link
            href="/designmytee"
            className="bg-black hover:bg-neutral-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Request</span>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-gray-800 focus:outline-none focus:border-red-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['All', 'Submitted', 'In Progress', 'Awaiting Feedback', 'Approved', 'Completed'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition ${
                statusFilter === st ? 'bg-red-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-mono text-[10px] tracking-wider">
                <th className="p-4">Request ID</th>
                <th className="p-4">Design Title</th>
                <th className="p-4">Garment & Specs</th>
                <th className="p-4">Status</th>
                <th className="p-4">Assigned Designer</th>
                <th className="p-4">Last Updated</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/80 transition group">
                    <td className="p-4 font-mono font-bold text-red-600">{req.id}</td>
                    <td className="p-4 font-bold text-gray-900 max-w-xs truncate">{req.title}</td>
                    <td className="p-4 font-mono text-gray-600">
                      <div>{req.tshirtType}</div>
                      <div className="text-[10px] text-gray-400">{req.quantity} units • {req.placement}</div>
                    </td>
                    <td className="p-4">{getStatusBadge(req.status)}</td>
                    <td className="p-4 font-mono text-gray-700">
                      {req.assignedDesigner ? (
                        <div className="flex items-center gap-2">
                          <img src={req.assignedDesigner.avatar} alt={req.assignedDesigner.name} className="w-5 h-5 rounded-full object-cover" />
                          <span>{req.assignedDesigner.name}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="p-4 font-mono text-gray-500">{req.lastUpdated}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold inline-flex items-center gap-1 transition shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-gray-400 font-mono">
                    No custom design requests found. <Link href="/designmytee" className="text-red-600 underline font-bold">Create one now</Link>!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto" data-lenis-prevent>
          <div className="bg-white max-w-5xl w-full rounded-2xl border border-gray-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col" data-lenis-prevent>
            {/* Modal Top Bar */}
            <div className="p-4 bg-gray-900 text-white flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-red-500 font-bold text-xs">#{selectedRequest.id}</span>
                    {getStatusBadge(selectedRequest.status)}
                  </div>
                  <h3 className="text-base font-black text-white truncate max-w-md">{selectedRequest.title}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedRequest.status !== 'Approved' && selectedRequest.status !== 'Completed' && (
                  <button
                    onClick={() => handleApproveDesign(selectedRequest.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve Design
                  </button>
                )}
                <button onClick={() => setSelectedRequest(null)} className="text-gray-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body with Scroll */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-gray-50/50">
              {/* Top Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div>
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase block mb-1">Specifications</span>
                  <p className="text-xs font-bold text-gray-900">{selectedRequest.tshirtType}</p>
                  <p className="text-xs text-gray-600 font-mono mt-1">Quantity: {selectedRequest.quantity} units</p>
                  <p className="text-xs text-gray-600 font-mono">Print Placement: {selectedRequest.placement}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase block mb-1">Budget & Deadline</span>
                  <p className="text-xs font-bold text-gray-900 font-mono">Budget: {selectedRequest.budgetRange}</p>
                  <p className="text-xs text-gray-600 font-mono mt-1">Target Deadline: {selectedRequest.deadline}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase block mb-1">Assigned Designer</span>
                  {selectedRequest.assignedDesigner ? (
                    <div className="flex items-center gap-2 mt-1">
                      <img src={selectedRequest.assignedDesigner.avatar} alt="Designer" className="w-8 h-8 rounded-full object-cover border border-purple-300" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">{selectedRequest.assignedDesigner.name}</p>
                        <p className="text-[10px] text-purple-600 font-mono">{selectedRequest.assignedDesigner.title}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">Pending assignment by admin</p>
                  )}
                </div>
              </div>

              {/* Sub-Tab Navigation Bar */}
              <div className="flex border-b border-gray-200 bg-white rounded-t-xl px-2 pt-2 gap-2">
                {[
                  { id: 'timeline', label: 'Progress & Revisions' },
                  { id: 'chat', label: 'Ticket Conversation Chat' },
                  { id: 'references', label: 'Uploaded References' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition ${
                      activeSubTab === tab.id
                        ? 'border-red-600 text-red-600 bg-red-50/50 rounded-t'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Panels */}
              {activeSubTab === 'timeline' && (
                <div className="space-y-6">
                  <RevisionTimeline request={selectedRequest} />

                  {/* Actions footer inside timeline */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-gray-500 font-mono">
                      Need updates or changes to the current revision draft?
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowRevisionModal(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm"
                      >
                        Request Specific Revision
                      </button>
                      {selectedRequest.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleCancelRequest(selectedRequest.id)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 px-3 py-2 rounded-lg text-xs font-semibold"
                        >
                          Cancel Request
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'chat' && (
                <MessagingThread
                  request={selectedRequest}
                  currentUserRole="User"
                  currentUserName={selectedRequest.user?.name || 'Marcus Sterling'}
                />
              )}

              {activeSubTab === 'references' && (
                <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase text-gray-900">Reference Images Provided</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedRequest.referenceImages && selectedRequest.referenceImages.map((img) => (
                      <div key={img.id} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                        <img src={img.url} alt={img.title} className="w-full h-44 object-cover" />
                        <div className="p-3 text-xs font-semibold text-gray-700">{img.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Revision Request Modal */}
      {showRevisionModal && selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 space-y-4 border border-gray-200 shadow-2xl">
            <h3 className="text-base font-bold text-gray-900">Request Revision Changes</h3>
            <p className="text-xs text-gray-600">
              Describe what specific modifications you want designer {selectedRequest.assignedDesigner?.name || 'Alex'} to make.
            </p>
            <textarea
              rows="4"
              value={revisionNotesInput}
              onChange={(e) => setRevisionNotesInput(e.target.value)}
              placeholder="e.g., Make the neon highlights brighter, adjust katakana typography on front left chest..."
              className="w-full text-xs border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-red-600"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowRevisionModal(false)} className="px-4 py-2 text-xs text-gray-600">Cancel</button>
              <button
                onClick={handleRequestRevisionSubmit}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm"
              >
                Send Revision Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workflow Diagram Modal */}
      <WorkflowDiagramModal isOpen={isDiagramOpen} onClose={() => setIsDiagramOpen(false)} />
    </div>
  );
}
