'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getStoredRequests, assignDesignerToRequest, updateRequestStatus, DESIGNERS_LIST } from '../../../utils/designMyTeeStore';
import NotificationCenter from '../../../components/designmytee/NotificationCenter';
import WorkflowDiagramModal from '../../../components/designmytee/WorkflowDiagramModal';
import OrderConversionModal from '../../../components/designmytee/OrderConversionModal';
import {
  Shirt,
  Sparkles,
  Search,
  Filter,
  Eye,
  UserCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  PackageCheck,
  Network,
  ArrowUpRight
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDesignMyTeeIndex() {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('All Requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [isDiagramOpen, setIsDiagramOpen] = useState(false);
  const [convertOrderModalReq, setConvertOrderModalReq] = useState(null);

  const load = () => {
    const all = getStoredRequests();
    setRequests(all);
  };

  useEffect(() => {
    load();
    window.addEventListener('designmytee_update', load);
    return () => window.removeEventListener('designmytee_update', load);
  }, []);

  // Filter requests
  const filtered = requests.filter(req => {
    const matchesSearch =
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.user && req.user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPriority = priorityFilter === 'All' || req.priority === priorityFilter;

    if (!matchesSearch || !matchesPriority) return false;

    switch (activeTab) {
      case 'Submitted': return req.status === 'Submitted';
      case 'Assigned': return req.status === 'Assigned';
      case 'In Progress': return req.status === 'In Progress';
      case 'Awaiting User': return req.status === 'Awaiting Feedback';
      case 'Approved': return req.status === 'Approved';
      case 'Completed': return req.status === 'Completed';
      default: return true;
    }
  });

  // Calculate top metrics
  const newRequestsCount = requests.filter(r => r.status === 'Submitted').length;
  const inProgressCount = requests.filter(r => r.status === 'In Progress' || r.status === 'Assigned').length;
  const awaitingApprovalCount = requests.filter(r => r.status === 'Awaiting Feedback').length;
  const completedMonthCount = requests.filter(r => r.status === 'Completed' || r.status === 'Approved').length;

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
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${badges[status] || 'bg-gray-100 text-gray-800'}`}>
        ● {status}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return <span className="bg-red-100 text-red-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded">HIGH</span>;
      case 'Medium':
        return <span className="bg-amber-100 text-amber-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded">MED</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded">LOW</span>;
    }
  };

  const handleQuickAssign = (reqId, designerId) => {
    assignDesignerToRequest(reqId, designerId, 'Admin');
    toast.success('Designer assigned successfully!');
    load();
  };

  return (
    <AdminLayout title="DesignMyTee Custom Request Hub">
      <div className="space-y-6">
        {/* Header & Control Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-red-600 text-white font-mono text-[10px] uppercase font-black px-2 py-0.5 rounded-sm">
                LAB PORTAL
              </span>
              <span className="text-xs font-mono text-neutral-500">Shopify-Class Custom Apparel Pipeline</span>
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900">
              DesignMyTee Requests Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <NotificationCenter activeRole="Admin" />
            <button
              onClick={() => setIsDiagramOpen(true)}
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-xs font-bold px-4 py-2 rounded-xl border border-neutral-300 flex items-center gap-1.5 transition"
            >
              <Network className="w-4 h-4 text-blue-600" />
              <span>Workflow Diagram</span>
            </button>
            <Link
              href="/admin/designmytee/designer"
              className="bg-purple-600 hover:bg-purple-700 text-white font-mono text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition shadow-sm"
            >
              <Shirt className="w-4 h-4" />
              <span>Designer Workspace →</span>
            </Link>
          </div>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'New Submitted Requests', value: newRequestsCount, color: 'text-blue-600', border: 'border-blue-200', bg: 'bg-blue-50/50', icon: Shirt },
            { label: 'In Progress / Assigned', value: inProgressCount, color: 'text-amber-600', border: 'border-amber-200', bg: 'bg-amber-50/50', icon: Clock },
            { label: 'Awaiting User Approval', value: awaitingApprovalCount, color: 'text-orange-600', border: 'border-orange-200', bg: 'bg-orange-50/50', icon: AlertCircle },
            { label: 'Approved & Completed', value: completedMonthCount, color: 'text-emerald-600', border: 'border-emerald-200', bg: 'bg-emerald-50/50', icon: CheckCircle2 }
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className={`p-5 rounded-2xl border ${card.border} ${card.bg} bg-white shadow-sm flex items-center justify-between`}>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 block mb-1">{card.label}</span>
                  <span className={`text-3xl font-black font-mono ${card.color}`}>{card.value}</span>
                </div>
                <div className={`p-3 rounded-xl ${card.bg} border ${card.border}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Submenu Filter Tabs & Search */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-3">
            <div className="flex items-center gap-1 overflow-x-auto">
              {['All Requests', 'Submitted', 'Assigned', 'In Progress', 'Awaiting User', 'Approved', 'Completed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Priority filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">Priority:</span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="text-xs bg-neutral-100 border border-neutral-300 rounded-lg px-2.5 py-1 font-mono font-bold"
              >
                <option value="All">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search request ID (e.g. DMT-1021), design title, or user name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl pl-9 pr-4 py-2.5 font-mono focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Requests List Table */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase font-mono text-[10px] tracking-wider">
                  <th className="p-4">Request ID</th>
                  <th className="p-4">User Details</th>
                  <th className="p-4">Design Title & Type</th>
                  <th className="p-4">Submission Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Assigned Designer</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.length > 0 ? (
                  filtered.map((req) => (
                    <tr key={req.id} className="hover:bg-neutral-50/80 transition group">
                      <td className="p-4 font-mono font-bold text-red-600">{req.id}</td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={req.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                            alt="User"
                            className="w-7 h-7 rounded-full object-cover border border-neutral-200"
                          />
                          <div>
                            <p className="font-bold text-neutral-900 leading-tight">{req.user?.name}</p>
                            <p className="text-[10px] text-neutral-400 font-mono">{req.user?.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <p className="font-bold text-neutral-900 max-w-xs truncate">{req.title}</p>
                        <p className="text-[10px] font-mono text-neutral-500">{req.tshirtType} • {req.quantity} qty</p>
                      </td>

                      <td className="p-4 font-mono text-neutral-500">{req.submissionDate}</td>

                      <td className="p-4">{getStatusBadge(req.status)}</td>

                      <td className="p-4 font-mono">
                        <select
                          value={req.assignedDesigner ? req.assignedDesigner.id : ''}
                          onChange={(e) => handleQuickAssign(req.id, e.target.value)}
                          className="text-xs bg-neutral-100 border border-neutral-300 rounded px-2 py-1 font-mono focus:outline-none focus:border-red-500"
                        >
                          <option value="">Unassigned</option>
                          {DESIGNERS_LIST.map(d => (
                            <option key={d.id} value={d.id}>{d.name} ({d.title.split(' ')[0]})</option>
                          ))}
                        </select>
                      </td>

                      <td className="p-4">{getPriorityBadge(req.priority)}</td>

                      <td className="p-4 text-right space-x-2">
                        <Link
                          href={`/admin/designmytee/${req.id}`}
                          className="bg-neutral-900 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold inline-flex items-center gap-1 transition shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </Link>

                        {req.status === 'Approved' && (
                          <button
                            onClick={() => setConvertOrderModalReq(req)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold inline-flex items-center gap-1 transition shadow-sm"
                          >
                            <PackageCheck className="w-3.5 h-3.5" />
                            <span>Convert</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-12 text-center text-neutral-400 font-mono">
                      No design requests match current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Convert Order Modal */}
      {convertOrderModalReq && (
        <OrderConversionModal
          request={convertOrderModalReq}
          onClose={() => setConvertOrderModalReq(null)}
          onSuccess={load}
        />
      )}

      {/* Workflow Diagram Modal */}
      <WorkflowDiagramModal isOpen={isDiagramOpen} onClose={() => setIsDiagramOpen(false)} />
    </AdminLayout>
  );
}
