'use client';

import { useState } from 'react';
import { ShoppingBag, CheckCircle, Truck, DollarSign, PackageCheck, X } from 'lucide-react';
import { convertRequestToOrder } from '../../utils/designMyTeeStore';
import toast from 'react-hot-toast';

export default function OrderConversionModal({ request, onClose, onSuccess }) {
  const [unitPrice, setUnitPrice] = useState(25);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalRevision = request.revisions && request.revisions.length > 0
    ? request.revisions[request.revisions.length - 1]
    : { previewUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80', version: 'Final' };

  const quantity = request.quantity || 50;
  const totalPrice = unitPrice * quantity;

  const handleConvert = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      convertRequestToOrder(request.id, {
        unitPrice,
        totalPrice,
        actor: 'Admin'
      });
      setIsSubmitting(false);
      toast.success(`Request ${request.id} successfully converted to Production Order!`);
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    }, 600);
  };

  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4" data-lenis-prevent>
      <div className="bg-white max-w-xl w-full rounded-2xl border border-gray-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" data-lenis-prevent>
        {/* Header */}
        <div className="p-5 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider">Convert Design Request to Order</h3>
              <p className="text-xs text-neutral-400 font-mono">Ticket #{request.id} — Customer: {request.user?.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Approved Design Thumbnail Summary */}
          <div className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 items-center">
            <img
              src={finalRevision.previewUrl}
              alt="Final Design Preview"
              className="w-24 h-24 object-cover rounded-lg border border-gray-300 shadow-sm flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                Approved Design ({finalRevision.version})
              </span>
              <h4 className="text-sm font-bold text-gray-900 truncate mt-1">{request.title}</h4>
              <p className="text-xs text-gray-500 font-mono mt-0.5">Garment: {request.tshirtType}</p>
              <p className="text-xs text-gray-500 font-mono">Placement: {request.placement}</p>
            </div>
          </div>

          {/* Pricing Calculator */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
            <div>
              <label className="text-[10px] font-mono font-bold text-gray-500 uppercase block mb-1">Batch Quantity</label>
              <div className="text-base font-black text-gray-900 font-mono">{quantity} units</div>
            </div>
            <div>
              <label className="text-[10px] font-mono font-bold text-gray-500 uppercase block mb-1">Unit Price ($)</label>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 font-mono">$</span>
                <input
                  type="number"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(Number(e.target.value))}
                  className="w-20 text-sm font-mono font-bold bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-mono font-bold text-gray-500 uppercase block mb-1">Total Calculated</label>
              <div className="text-lg font-black text-emerald-600 font-mono">${totalPrice.toLocaleString()}</div>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="space-y-2 text-xs font-mono text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex justify-between border-b border-gray-200 pb-1.5">
              <span className="text-gray-400">Customer Name:</span>
              <span className="font-bold text-gray-900">{request.user?.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1.5">
              <span className="text-gray-400">Email:</span>
              <span className="font-bold text-gray-900">{request.user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Shipping Address:</span>
              <span className="font-bold text-gray-900 text-right max-w-xs">{request.user?.address || 'Standard Address On File'}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleConvert}
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition"
          >
            <PackageCheck className="w-4 h-4" />
            <span>{isSubmitting ? 'Converting...' : 'Create Production Order'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
