'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import {
  getStoredRequests,
  uploadRevisionToRequest,
  updateRequestStatus,
  addMessageToRequest,
  DESIGNERS_LIST
} from '../../../utils/designMyTeeStore';
import MessagingThread from '../../../components/designmytee/MessagingThread';
import RevisionTimeline from '../../../components/designmytee/RevisionTimeline';
import NotificationCenter from '../../../components/designmytee/NotificationCenter';
import {
  Shirt,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Send,
  Palette,
  FileCheck,
  Sparkles,
  ArrowRight,
  X,
  Layers
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function DesignerDashboard() {
  const [requests, setRequests] = useState([]);
  const [activeDesigner, setActiveDesigner] = useState(DESIGNERS_LIST[0]); // Alex Rivera
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState('workspace'); // 'workspace' | 'revisions' | 'chat'

  // Upload Revision State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [revisionTitle, setRevisionTitle] = useState('');
  const [revisionImage, setRevisionImage] = useState('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80');
  const [designerComment, setDesignerComment] = useState('');

  const load = () => {
    const all = getStoredRequests();
    setRequests(all);
    if (selectedRequest) {
      const refreshed = all.find(r => r.id === selectedRequest.id);
      if (refreshed) setSelectedRequest(refreshed);
    }
  };

  useEffect(() => {
    load();
    window.addEventListener('designmytee_update', load);
    return () => window.removeEventListener('designmytee_update', load);
  }, []);

  // Filter requests assigned to this designer
  const assignedRequests = requests.filter(r => r.assignedDesigner && r.assignedDesigner.id === activeDesigner.id);

  // Statistics
  const assignedCount = assignedRequests.length;
  const inProgressCount = assignedRequests.filter(r => r.status === 'In Progress' || r.status === 'Assigned').length;
  const awaitingFeedbackCount = assignedRequests.filter(r => r.status === 'Awaiting Feedback').length;
  const completedCount = assignedRequests.filter(r => r.status === 'Approved' || r.status === 'Completed').length;

  const handleUploadRevisionSubmit = (e) => {
    e.preventDefault();
    if (!selectedRequest) return;
    if (!designerComment.trim()) {
      toast.error('Please include designer commentary explaining your concept modifications.');
      return;
    }

    const nextVerNum = selectedRequest.revisions ? selectedRequest.revisions.length + 1 : 1;
    const versionStr = `v${nextVerNum}`;

    uploadRevisionToRequest(selectedRequest.id, {
      version: versionStr,
      title: revisionTitle || `Concept Revision ${versionStr}`,
      previewUrl: revisionImage,
      designerComment
    }, activeDesigner.name);

    setShowUploadModal(false);
    setRevisionTitle('');
    setDesignerComment('');
    toast.success(`Uploaded Revision ${versionStr} successfully! Customer notified.`);
    load();
  };

  const handleMarkStatus = (newStatus) => {
    if (!selectedRequest) return;
    updateRequestStatus(selectedRequest.id, newStatus, activeDesigner.name);
    toast.success(`Updated status to ${newStatus}`);
    load();
  };

  return (
    <AdminLayout title="Designer Workspace (Inside Admin)">
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-purple-900 via-neutral-900 to-neutral-900 text-white p-6 rounded-2xl border border-purple-800 shadow-xl">
          <div className="flex items-center gap-4">
            <img
              src={activeDesigner.avatar}
              alt={activeDesigner.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-400 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="bg-purple-600 text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                  DESIGNER ROLE
                </span>
                <span className="text-xs font-mono text-purple-300">{activeDesigner.title}</span>
              </div>
              <h1 className="text-2xl font-black uppercase text-white">{activeDesigner.name}'s Studio</h1>
              <p className="text-xs text-neutral-400 font-mono">
                Assigned Queue & Bespoke Concept Development Suite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Switch Active Designer Demo Selector */}
            <div className="flex items-center gap-2 bg-neutral-800/80 border border-neutral-700 rounded-xl px-3 py-1.5 text-xs font-mono">
              <span className="text-neutral-400">Switch Designer:</span>
              <select
                value={activeDesigner.id}
                onChange={(e) => {
                  const d = DESIGNERS_LIST.find(des => des.id === e.target.value);
                  if (d) {
                    setActiveDesigner(d);
                    setSelectedRequest(null);
                  }
                }}
                className="bg-transparent font-bold text-white focus:outline-none cursor-pointer"
              >
                {DESIGNERS_LIST.map(d => (
                  <option key={d.id} value={d.id} className="bg-neutral-900 text-white">{d.name}</option>
                ))}
              </select>
            </div>

            <NotificationCenter activeRole="Designer" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Assigned Requests', value: assignedCount, color: 'text-purple-600', border: 'border-purple-200', bg: 'bg-purple-50/50', icon: Shirt },
            { label: 'In Progress', value: inProgressCount, color: 'text-amber-600', border: 'border-amber-200', bg: 'bg-amber-50/50', icon: Clock },
            { label: 'Awaiting User Feedback', value: awaitingFeedbackCount, color: 'text-orange-600', border: 'border-orange-200', bg: 'bg-orange-50/50', icon: AlertCircle },
            { label: 'Approved & Completed', value: completedCount, color: 'text-emerald-600', border: 'border-emerald-200', bg: 'bg-emerald-50/50', icon: CheckCircle2 }
          ].map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className={`p-5 rounded-2xl border ${st.border} ${st.bg} bg-white shadow-sm flex items-center justify-between`}>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 block mb-1">{st.label}</span>
                  <span className={`text-3xl font-black font-mono ${st.color}`}>{st.value}</span>
                </div>
                <div className={`p-3 rounded-xl ${st.bg} border ${st.border}`}>
                  <Icon className={`w-6 h-6 ${st.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ASSIGNED REQUEST CARDS GRID */}
        <div className="space-y-4">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-neutral-900">
            Assigned Queue ({assignedRequests.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignedRequests.length > 0 ? (
              assignedRequests.map((req) => (
                <div
                  key={req.id}
                  className={`bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between ${
                    selectedRequest && selectedRequest.id === req.id ? 'border-purple-600 ring-2 ring-purple-100' : 'border-neutral-200'
                  }`}
                  onClick={() => setSelectedRequest(req)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-purple-600 font-bold text-xs">#{req.id}</span>
                      <span className="bg-purple-100 text-purple-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                        {req.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-neutral-900 line-clamp-1">{req.title}</h4>

                    <div className="flex items-center gap-3 p-2 bg-neutral-50 rounded-xl border border-neutral-100">
                      <img
                        src={req.referenceImages && req.referenceImages[0] ? req.referenceImages[0].url : 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'}
                        alt="Ref Thumbnail"
                        className="w-12 h-12 rounded-lg object-cover border border-neutral-200 flex-shrink-0"
                      />
                      <div className="text-[11px] font-mono text-neutral-600">
                        <p className="font-bold text-neutral-900">{req.user?.name}</p>
                        <p>{req.tshirtType}</p>
                        <p className="text-[10px] text-neutral-400">Due: {req.deadline}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400 font-mono">Revisions: {req.revisions ? req.revisions.length : 0}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedRequest(req); }}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-mono text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm"
                    >
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full p-12 text-center text-neutral-400 font-mono bg-white rounded-2xl border border-neutral-200">
                No requests currently assigned to {activeDesigner.name}. Select another designer above or assign via Admin!
              </div>
            )}
          </div>
        </div>

        {/* WORKSPACE DETAILED WORK BENCH MODAL / SECTION */}
        {selectedRequest && (
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden p-6 space-y-6">
            {/* Workspace Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-purple-600 font-bold text-xs">#{selectedRequest.id}</span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-mono font-bold px-2 py-0.5 rounded">
                    {selectedRequest.status}
                  </span>
                </div>
                <h2 className="text-xl font-black text-neutral-900 uppercase mt-0.5">{selectedRequest.title}</h2>
                <p className="text-xs text-neutral-500 font-mono">Customer: {selectedRequest.user?.name} ({selectedRequest.user?.email})</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Concept / Revision</span>
                </button>

                <button
                  onClick={() => handleMarkStatus('Awaiting Feedback')}
                  className="bg-orange-100 hover:bg-orange-200 text-orange-800 font-mono text-xs font-bold px-3 py-2 rounded-xl border border-orange-300"
                >
                  Mark Awaiting Feedback
                </button>

                <button
                  onClick={() => handleMarkStatus('Approved')}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-mono text-xs font-bold px-3 py-2 rounded-xl border border-emerald-300"
                >
                  Mark Final Ready
                </button>
              </div>
            </div>

            {/* Nav Tabs */}
            <div className="flex border-b border-neutral-200 gap-2">
              {[
                { id: 'workspace', label: 'Brief & Color Palette' },
                { id: 'revisions', label: 'Uploaded Revisions History' },
                { id: 'chat', label: 'Customer Ticket Messaging' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition ${
                    activeTab === t.id ? 'border-purple-600 text-purple-600 bg-purple-50/40' : 'border-transparent text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Panel 1: Brief & Palette */}
            {activeTab === 'workspace' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Brief details */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block">Client Brief Description</span>
                    <p className="text-xs text-neutral-800 leading-relaxed font-sans font-medium">
                      "{selectedRequest.description}"
                    </p>
                  </div>

                  {/* Specs & Swatches */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-purple-50/50 rounded-xl border border-purple-100 text-xs font-mono">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase block">Garment Type</span>
                      <p className="font-bold text-neutral-900">{selectedRequest.tshirtType}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase block">Print Placement</span>
                      <p className="font-bold text-neutral-900">{selectedRequest.placement}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase block">Quantity</span>
                      <p className="font-bold text-neutral-900">{selectedRequest.quantity} pcs</p>
                    </div>
                  </div>

                  {/* Color Palette Extractor */}
                  <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block">Client Preferred Color Palette</span>
                    <div className="flex gap-3">
                      {selectedRequest.preferredColors && selectedRequest.preferredColors.map((clr, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1">
                          <span className="w-8 h-8 rounded-lg border border-neutral-300 shadow-sm" style={{ backgroundColor: clr }} />
                          <span className="text-[10px] font-mono text-neutral-500">{clr}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reference Gallery */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block">Client Reference Gallery</span>
                  <div className="space-y-2">
                    {selectedRequest.referenceImages && selectedRequest.referenceImages.map((img) => (
                      <div key={img.id} className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-900">
                        <img src={img.url} alt="Ref" className="w-full h-40 object-cover" />
                        <div className="p-2 text-[10px] font-mono text-white bg-neutral-900">{img.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Panel 2: Revisions */}
            {activeTab === 'revisions' && (
              <RevisionTimeline request={selectedRequest} />
            )}

            {/* Panel 3: Messaging */}
            {activeTab === 'chat' && (
              <MessagingThread
                request={selectedRequest}
                currentUserRole="Designer"
                currentUserName={activeDesigner.name}
              />
            )}
          </div>
        )}

        {/* UPLOAD REVISION MODAL */}
        {showUploadModal && selectedRequest && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-lg w-full rounded-2xl p-6 border border-neutral-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-600" />
                  <h3 className="text-base font-bold text-neutral-900">Upload Concept / Revision Artwork</h3>
                </div>
                <button onClick={() => setShowUploadModal(false)} className="text-neutral-400 hover:text-neutral-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUploadRevisionSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase block mb-1">Revision Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Concept v1 - Cyber Neon Tiger Draft"
                    value={revisionTitle}
                    onChange={(e) => setRevisionTitle(e.target.value)}
                    className="w-full text-xs border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase block mb-1">Concept Preview URL / Image</label>
                  <input
                    type="text"
                    value={revisionImage}
                    onChange={(e) => setRevisionImage(e.target.value)}
                    className="w-full text-xs font-mono border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase block mb-1">Designer Commentary *</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Explain color choices, vector line work, printing technique recommendations..."
                    value={designerComment}
                    onChange={(e) => setDesignerComment(e.target.value)}
                    className="w-full text-xs border border-neutral-300 rounded-xl p-3 focus:outline-none focus:border-purple-600 leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
                  <button type="button" onClick={() => setShowUploadModal(false)} className="px-4 py-2 text-xs text-neutral-600">Cancel</button>
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Upload & Notify Customer</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
