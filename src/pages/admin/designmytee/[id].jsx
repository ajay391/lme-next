'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import {
  getStoredRequests,
  updateRequestStatus,
  assignDesignerToRequest,
  updateInternalNotes,
  DESIGNERS_LIST
} from '../../../utils/designMyTeeStore';
import MessagingThread from '../../../components/designmytee/MessagingThread';
import RevisionTimeline from '../../../components/designmytee/RevisionTimeline';
import OrderConversionModal from '../../../components/designmytee/OrderConversionModal';
import {
  ArrowLeft,
  UserCheck,
  ShieldCheck,
  Palette,
  PackageCheck,
  Clock,
  CheckCircle2,
  FileText,
  Save,
  MessageSquare,
  AlertCircle,
  Eye,
  Shirt
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminRequestDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [request, setRequest] = useState(null);
  const [internalNotesText, setInternalNotesText] = useState('');
  const [selectedRevisionIdx, setSelectedRevisionIdx] = useState(0);
  const [activeCenterTab, setActiveCenterTab] = useState('canvas'); // 'canvas' | 'timeline' | 'chat'
  const [showOrderModal, setShowOrderModal] = useState(false);

  const loadRequest = () => {
    if (!id) return;
    const all = getStoredRequests();
    const found = all.find(r => r.id === id);
    if (found) {
      setRequest(found);
      setInternalNotesText(found.internalNotes || '');
    }
  };

  useEffect(() => {
    loadRequest();
    window.addEventListener('designmytee_update', loadRequest);
    return () => window.removeEventListener('designmytee_update', loadRequest);
  }, [id]);

  if (!request) {
    return (
      <AdminLayout title="Request Detail">
        <div className="p-12 text-center text-neutral-400 font-mono">
          Loading request details for #{id}...
        </div>
      </AdminLayout>
    );
  }

  const activeRevision = request.revisions && request.revisions.length > 0
    ? request.revisions[selectedRevisionIdx] || request.revisions[request.revisions.length - 1]
    : null;

  const handleStatusChange = (newStatus) => {
    updateRequestStatus(request.id, newStatus, 'Admin');
    toast.success(`Status updated to ${newStatus}`);
    loadRequest();
  };

  const handleDesignerAssign = (designerId) => {
    assignDesignerToRequest(request.id, designerId, 'Admin');
    toast.success('Designer assigned!');
    loadRequest();
  };

  const handleSaveNotes = () => {
    updateInternalNotes(request.id, internalNotesText);
    toast.success('Internal notes saved!');
    loadRequest();
  };

  return (
    <AdminLayout title={`Request Detail #${request.id}`}>
      <div className="space-y-6">
        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/designmytee"
              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-red-600 font-bold text-xs">#{request.id}</span>
                <span className="bg-neutral-900 text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                  {request.status}
                </span>
              </div>
              <h1 className="text-xl font-black text-neutral-900 uppercase tracking-tight">{request.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {request.status === 'Approved' && (
              <button
                onClick={() => setShowOrderModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition"
              >
                <PackageCheck className="w-4 h-4" />
                <span>Convert to Order</span>
              </button>
            )}
            <button
              onClick={() => handleStatusChange('Awaiting Feedback')}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-mono text-xs font-bold px-3 py-2 rounded-xl border border-amber-300"
            >
              Request More Info
            </button>
          </div>
        </div>

        {/* 3-COLUMN MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: User Details & Brief (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* User Profile Card */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Customer Details</span>
              <div className="flex items-center gap-3">
                <img
                  src={request.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">{request.user?.name}</h4>
                  <p className="text-xs text-neutral-500 font-mono">{request.user?.email}</p>
                  <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{request.user?.phone}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 text-xs font-mono text-neutral-600 space-y-1">
                <span className="text-neutral-400 text-[10px] block uppercase font-bold">Shipping Address</span>
                <p className="leading-relaxed">{request.user?.address}</p>
              </div>
            </div>

            {/* Design Brief Specifications */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Design Brief & Specs</span>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <span className="text-neutral-400 text-[10px] block uppercase">Garment Type</span>
                  <p className="font-bold text-neutral-900">{request.tshirtType}</p>
                </div>

                <div>
                  <span className="text-neutral-400 text-[10px] block uppercase">Print Placement</span>
                  <p className="font-bold text-neutral-900">{request.placement}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-neutral-400 text-[10px] block uppercase">Quantity</span>
                    <p className="font-bold text-neutral-900">{request.quantity} pcs</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-[10px] block uppercase">Budget</span>
                    <p className="font-bold text-neutral-900">{request.budgetRange}</p>
                  </div>
                </div>

                <div>
                  <span className="text-neutral-400 text-[10px] block uppercase">Preferred Color Swatches</span>
                  <div className="flex gap-2 mt-1.5">
                    {request.preferredColors && request.preferredColors.map((clr, idx) => (
                      <span key={idx} className="w-5 h-5 rounded-full border border-neutral-300 shadow-sm" style={{ backgroundColor: clr }} title={clr} />
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-neutral-400 text-[10px] block uppercase">Target Deadline</span>
                  <p className="font-bold text-red-600">{request.deadline}</p>
                </div>

                <div className="pt-2 border-t border-neutral-100">
                  <span className="text-neutral-400 text-[10px] block uppercase mb-1">Description Brief</span>
                  <p className="text-neutral-700 leading-relaxed font-sans text-xs bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                    "{request.description}"
                  </p>
                </div>
              </div>
            </div>

            {/* Reference Images */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Reference Images</span>
              <div className="grid grid-cols-2 gap-2">
                {request.referenceImages && request.referenceImages.map((img) => (
                  <div key={img.id} className="relative h-24 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-900">
                    <img src={img.url} alt="Ref" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Large Preview Canvas & Revisions / Conversation (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Nav Switcher */}
            <div className="flex border-b border-neutral-200 bg-white rounded-2xl p-1.5 gap-2 border shadow-sm">
              {[
                { id: 'canvas', label: 'Design Canvas & Revision Preview' },
                { id: 'timeline', label: 'Revision Progress Nodes' },
                { id: 'chat', label: 'Ticket Chat Thread' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveCenterTab(t.id)}
                  className={`flex-1 py-2 text-xs font-mono font-bold rounded-xl transition ${
                    activeCenterTab === t.id ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {activeCenterTab === 'canvas' && (
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold uppercase text-neutral-900">
                    Active Revision Preview — {activeRevision ? activeRevision.version : 'No Uploads Yet'}
                  </h4>

                  {request.revisions && request.revisions.length > 0 && (
                    <div className="flex gap-1.5">
                      {request.revisions.map((rev, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedRevisionIdx(idx)}
                          className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded ${
                            selectedRevisionIdx === idx ? 'bg-red-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {rev.version}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative h-[420px] bg-neutral-950 rounded-xl overflow-hidden flex items-center justify-center border border-neutral-800">
                  {activeRevision ? (
                    <img
                      src={activeRevision.previewUrl}
                      alt="Revision Canvas"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-neutral-500 font-mono text-xs p-8">
                      <Shirt className="w-12 h-12 text-neutral-700 mx-auto mb-2" />
                      No concept uploaded yet. Assign a designer to initiate concept rendering!
                    </div>
                  )}
                </div>

                {activeRevision && (
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1">
                    <div className="flex justify-between font-mono font-bold text-neutral-900">
                      <span>{activeRevision.title}</span>
                      <span className="text-neutral-400 text-[10px]">{activeRevision.uploadDate}</span>
                    </div>
                    <p className="text-neutral-600 font-sans leading-relaxed">
                      "{activeRevision.designerComment}"
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeCenterTab === 'timeline' && (
              <RevisionTimeline request={request} />
            )}

            {activeCenterTab === 'chat' && (
              <MessagingThread request={request} currentUserRole="Admin" currentUserName="Super Admin" />
            )}
          </div>

          {/* RIGHT SIDEBAR: Status, Designer Assignment, Notes, Audit Log (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Workflow Control Box */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Workflow Control & Triage</span>

              {/* Status Selector */}
              <div>
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase block mb-1">Status Lifecycle</label>
                <select
                  value={request.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full text-xs font-mono font-bold bg-neutral-100 border border-neutral-300 rounded-xl p-2.5 text-neutral-900 focus:outline-none focus:border-red-500"
                >
                  <option value="Submitted">Submitted</option>
                  <option value="In Review">In Review</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Awaiting Feedback">Awaiting Feedback</option>
                  <option value="Revision Requested">Revision Requested</option>
                  <option value="Approved">Approved</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Assign Designer Dropdown */}
              <div>
                <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase block mb-1">Assigned Designer</label>
                <select
                  value={request.assignedDesigner ? request.assignedDesigner.id : ''}
                  onChange={(e) => handleDesignerAssign(e.target.value)}
                  className="w-full text-xs font-mono font-bold bg-neutral-100 border border-neutral-300 rounded-xl p-2.5 text-neutral-900 focus:outline-none focus:border-red-500"
                >
                  <option value="">-- Select Designer --</option>
                  {DESIGNERS_LIST.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.title})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Internal Notes Editor */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Internal Staff Notes</span>
                <button
                  onClick={handleSaveNotes}
                  className="text-xs text-red-600 hover:text-red-800 font-mono font-bold flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" /> Save Note
                </button>
              </div>

              <textarea
                rows="4"
                value={internalNotesText}
                onChange={(e) => setInternalNotesText(e.target.value)}
                placeholder="Internal notes visible only to Admin & Designer staff..."
                className="w-full text-xs font-mono bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-neutral-800 leading-relaxed focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Audit Activity Log */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Activity Log</span>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-neutral-100">
                {request.activityLog && request.activityLog.map((act) => (
                  <div key={act.id} className="pt-2 text-xs">
                    <div className="flex justify-between font-mono text-[10px] text-neutral-400">
                      <span>{act.actor}</span>
                      <span>{act.timestamp}</span>
                    </div>
                    <p className="text-neutral-800 font-medium mt-0.5">{act.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Convert Order Modal */}
      {showOrderModal && (
        <OrderConversionModal
          request={request}
          onClose={() => setShowOrderModal(false)}
          onSuccess={loadRequest}
        />
      )}
    </AdminLayout>
  );
}
