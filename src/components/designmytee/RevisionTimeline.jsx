'use client';

import { useState } from 'react';
import { CheckCircle2, Clock, Eye, Sparkles, MessageSquare, ArrowRight, FileCheck } from 'lucide-react';

const WORKFLOW_NODES = [
  { id: 'submitted', label: 'Submitted', key: 'Submitted' },
  { id: 'admin_review', label: 'Admin Review', key: 'In Review' },
  { id: 'assigned', label: 'Assigned to Designer', key: 'Assigned' },
  { id: 'concept', label: 'Concept Uploaded', key: 'In Progress' },
  { id: 'user_feedback', label: 'User Feedback', key: 'Awaiting Feedback' },
  { id: 'revision_1', label: 'Revision 1', key: 'Revision Requested' },
  { id: 'final_design', label: 'Final Design', key: 'Approved' },
  { id: 'converted', label: 'Converted to Order', key: 'Completed' }
];

export default function RevisionTimeline({ request, onSelectRevision }) {
  const [selectedZoomImg, setSelectedZoomImg] = useState(null);

  const getStepStatus = (stepKey) => {
    const statusOrder = ['Submitted', 'In Review', 'Assigned', 'In Progress', 'Awaiting Feedback', 'Revision Requested', 'Approved', 'Completed'];
    const currentIdx = statusOrder.indexOf(request.status);
    const stepIdx = statusOrder.indexOf(stepKey);

    if (stepIdx < currentIdx) return 'completed';
    if (stepIdx === currentIdx) return 'current';
    return 'pending';
  };

  return (
    <div className="space-y-6">
      {/* Visual Workflow Timeline Node Diagram */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <h4 className="text-xs font-mono font-bold uppercase text-gray-900 tracking-wider mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-600" /> Design Progress Lifecycle Timeline
          </span>
          <span className="text-[11px] text-gray-500 font-mono">Current Status: <strong className="text-red-600">{request.status}</strong></span>
        </h4>

        {/* Desktop Horizontal Stepper */}
        <div className="hidden lg:flex items-center justify-between relative py-2">
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
          {WORKFLOW_NODES.map((node, i) => {
            const state = getStepStatus(node.key);
            return (
              <div key={node.id} className="relative z-10 flex flex-col items-center group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all shadow-sm ${
                  state === 'completed'
                    ? 'bg-emerald-500 text-white'
                    : state === 'current'
                    ? 'bg-red-600 text-white ring-4 ring-red-100 scale-110'
                    : 'bg-gray-100 text-gray-400 border border-gray-300'
                }`}>
                  {state === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`mt-2 text-[11px] font-medium text-center max-w-[80px] leading-tight ${
                  state === 'current' ? 'text-red-600 font-bold' : state === 'completed' ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Stepper */}
        <div className="flex lg:hidden flex-col space-y-3 pt-2">
          {WORKFLOW_NODES.map((node, i) => {
            const state = getStepStatus(node.key);
            return (
              <div key={node.id} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                  state === 'completed' ? 'bg-emerald-500 text-white' : state === 'current' ? 'bg-red-600 text-white ring-2 ring-red-200' : 'bg-gray-200 text-gray-500'
                }`}>
                  {state === 'completed' ? '✓' : i + 1}
                </div>
                <span className={`text-xs ${state === 'current' ? 'font-bold text-red-600' : state === 'completed' ? 'text-gray-800' : 'text-gray-400'}`}>
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Revision History Cards */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-mono font-bold uppercase text-gray-900 tracking-wider">
            Uploaded Revisions ({request.revisions ? request.revisions.length : 0})
          </h4>
          <span className="text-xs text-gray-500 font-mono">Click thumbnail to expand</span>
        </div>

        {request.revisions && request.revisions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {request.revisions.map((rev, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50 hover:shadow-md transition group">
                <div className="relative h-48 bg-neutral-900 overflow-hidden cursor-pointer" onClick={() => setSelectedZoomImg(rev.previewUrl)}>
                  <img
                    src={rev.previewUrl}
                    alt={rev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-neutral-900/80 backdrop-blur text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded border border-white/10">
                    Version {rev.version}
                  </div>
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow">
                    {rev.status}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <span className="text-white text-xs font-semibold flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                      <Eye className="w-4 h-4" /> Expand Preview
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-sm font-bold text-gray-900">{rev.title}</h5>
                    <span className="text-[10px] text-gray-400 font-mono">{rev.uploadDate}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    "{rev.designerComment}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                    <span className="font-mono text-gray-600">By {request.assignedDesigner ? request.assignedDesigner.name : 'Designer'}</span>
                    <button
                      onClick={() => onSelectRevision && onSelectRevision(rev)}
                      className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
                    >
                      <span>Inspect Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <Clock className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <h5 className="text-xs font-mono font-bold text-gray-700 uppercase">No Revisions Uploaded Yet</h5>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              Your assigned designer is currently working on initial concept drafts. Revisions will appear here once uploaded!
            </p>
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      {selectedZoomImg && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedZoomImg(null)}>
          <div className="relative max-w-4xl w-full bg-neutral-900 rounded-2xl overflow-hidden p-2 shadow-2xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedZoomImg(null)}
              className="absolute top-4 right-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full p-2 text-xs font-mono z-10"
            >
              ✕ Close
            </button>
            <img src={selectedZoomImg} alt="High resolution design revision" className="max-h-[80vh] w-full object-contain rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
