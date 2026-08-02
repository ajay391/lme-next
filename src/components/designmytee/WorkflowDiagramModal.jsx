'use client';

import { useState } from 'react';
import { Network, UserCheck, ShieldCheck, Palette, FileSpreadsheet, CheckCircle2, ArrowRight, X } from 'lucide-react';

const LIFECYCLE_STAGES = [
  {
    step: 1,
    title: '1. Request Submission',
    actor: 'User',
    badgeBg: 'bg-red-100 text-red-700',
    icon: UserCheck,
    description: 'User fills custom brief on /designmytee, uploads reference artwork, sets budget & deadline.',
    detail: 'Generates tracking ID (e.g. DMT-1021) and sends automated notification to Admin team.'
  },
  {
    step: 2,
    title: '2. Admin Review & Triage',
    actor: 'Admin',
    badgeBg: 'bg-red-100 text-red-800',
    icon: ShieldCheck,
    description: 'Admin validates specs, sets priority, adds internal notes, and assigns request to a Designer.',
    detail: 'Status updates to "Assigned" and notifies assigned Designer.'
  },
  {
    step: 3,
    title: '3. Designer Workspace & Concepting',
    actor: 'Designer',
    badgeBg: 'bg-purple-100 text-purple-700',
    icon: Palette,
    description: 'Designer accesses request inside Admin portal, reviews brief & color palette, and uploads Revision v1.',
    detail: 'Ticket conversation updates and notifies User that concept is ready for review.'
  },
  {
    step: 4,
    title: '4. Feedback & Iteration',
    actor: 'User & Designer',
    badgeBg: 'bg-amber-100 text-amber-700',
    icon: FileSpreadsheet,
    description: 'User inspects revision, requests changes or leaves feedback in ticket chat thread.',
    detail: 'Designer uploads subsequent revisions (v2, v3) until perfection is achieved.'
  },
  {
    step: 5,
    title: '5. Approval & Order Conversion',
    actor: 'Admin',
    badgeBg: 'bg-emerald-100 text-emerald-700',
    icon: CheckCircle2,
    description: 'User approves final design. Admin triggers "Convert to Order" modal specifying quantity & pricing.',
    detail: 'Generates production order ID (ORD-PROD-#####) and notifies factory fulfillment team.'
  }
];

export default function WorkflowDiagramModal({ isOpen, onClose }) {
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  if (typeof window !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  if (!isOpen) return null;

  const currentStage = LIFECYCLE_STAGES[activeStageIdx];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" data-lenis-prevent>
      <div className="bg-white max-w-4xl w-full rounded-2xl border border-gray-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" data-lenis-prevent>
        {/* Header */}
        <div className="p-5 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider">End-to-End DesignMyTee Workflow Diagram</h3>
              <p className="text-xs text-neutral-400 font-mono">Interactive Lifecycle: User → Admin → Designer → User → Production Order</p>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Diagram Body */}
        <div className="p-6 space-y-6">
          {/* Horizontal Visual Flowchart Nodes */}
          <div className="flex items-center justify-between relative py-4 px-2 overflow-x-auto">
            <div className="absolute top-1/2 left-6 right-6 h-1 bg-gray-200 -translate-y-1/2 z-0" />

            {LIFECYCLE_STAGES.map((stg, i) => {
              const Icon = stg.icon;
              const isActive = activeStageIdx === i;
              return (
                <button
                  key={stg.step}
                  onClick={() => setActiveStageIdx(i)}
                  className={`relative z-10 flex flex-col items-center group transition focus:outline-none ${
                    isActive ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shadow-md transition ${
                    isActive
                      ? 'bg-red-600 text-white ring-4 ring-red-100'
                      : 'bg-white text-gray-700 border-2 border-gray-200 group-hover:border-red-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`mt-2 text-[11px] font-mono font-bold max-w-[90px] text-center ${
                    isActive ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    Stage {stg.step}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Inspector Detail Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 relative">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${currentStage.badgeBg}`}>
                Actor: {currentStage.actor}
              </span>
              <span className="text-xs font-mono text-gray-400">Step {currentStage.step} of 5</span>
            </div>

            <h4 className="text-lg font-black text-gray-900 mb-2">{currentStage.title}</h4>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">{currentStage.description}</p>

            <div className="p-3.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-600 font-mono flex items-start gap-2">
              <span className="text-red-600 font-bold">⚡ Key Output:</span>
              <span>{currentStage.detail}</span>
            </div>

            {/* Stepper Navigation */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <button
                disabled={activeStageIdx === 0}
                onClick={() => setActiveStageIdx(prev => prev - 1)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-30"
              >
                ← Previous Stage
              </button>
              <div className="flex gap-1.5">
                {LIFECYCLE_STAGES.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full ${idx === activeStageIdx ? 'bg-red-600' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <button
                disabled={activeStageIdx === LIFECYCLE_STAGES.length - 1}
                onClick={() => setActiveStageIdx(prev => prev + 1)}
                className="px-4 py-2 text-xs font-semibold text-red-600 hover:text-red-800 disabled:opacity-30 flex items-center gap-1"
              >
                <span>Next Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
