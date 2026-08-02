import mongoose, { Schema, Document } from 'mongoose';

export interface IDesignRequest extends Document {
  requestId: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    address?: string;
  };
  title: string;
  description: string;
  tshirtType: string;
  preferredColors: string[];
  placement: string;
  quantity: number;
  budgetRange: string;
  deadline: string;
  consentChecked: boolean;
  status: string;
  priority: string;
  assignedDesigner?: {
    id: string;
    name: string;
    role: string;
    title: string;
    avatar: string;
    email: string;
  };
  submissionDate: string;
  lastUpdated: string;
  internalNotes?: string;
  referenceImages: Array<{
    id: string;
    url: string;
    title: string;
  }>;
  revisions: Array<{
    version: string;
    title: string;
    previewUrl: string;
    uploadDate: string;
    designerComment: string;
    status: string;
  }>;
  conversation: Array<{
    id: string;
    senderId: string;
    senderName: string;
    senderRole: string;
    senderAvatar: string;
    timestamp: string;
    text: string;
    attachments?: Array<{
      type: string;
      url: string;
      name: string;
    }>;
  }>;
  activityLog: Array<{
    id: string;
    timestamp: string;
    actor: string;
    action: string;
  }>;
  orderConverted?: boolean;
  orderId?: string;
}

const designRequestSchema = new Schema<IDesignRequest>({
  requestId: { type: String, required: true, unique: true },
  user: {
    id: { type: String, default: 'usr-current' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    phone: { type: String },
    address: { type: String }
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tshirtType: { type: String, default: 'Oversized Heavyweight Tee' },
  preferredColors: [{ type: String }],
  placement: { type: String, default: 'Front & Back' },
  quantity: { type: Number, default: 50 },
  budgetRange: { type: String, default: '$500 - $1,000' },
  deadline: { type: String },
  consentChecked: { type: Boolean, default: true },
  status: { type: String, default: 'Submitted' },
  priority: { type: String, default: 'Medium' },
  assignedDesigner: {
    id: String,
    name: String,
    role: String,
    title: String,
    avatar: String,
    email: String
  },
  submissionDate: { type: String },
  lastUpdated: { type: String },
  internalNotes: { type: String, default: '' },
  referenceImages: [
    {
      id: String,
      url: String,
      title: String
    }
  ],
  revisions: [
    {
      version: String,
      title: String,
      previewUrl: String,
      uploadDate: String,
      designerComment: String,
      status: String
    }
  ],
  conversation: [
    {
      id: String,
      senderId: String,
      senderName: String,
      senderRole: String,
      senderAvatar: String,
      timestamp: String,
      text: String,
      attachments: [
        {
          type: String,
          url: String,
          name: String
        }
      ]
    }
  ],
  activityLog: [
    {
      id: String,
      timestamp: String,
      actor: String,
      action: String
    }
  ],
  orderConverted: { type: Boolean, default: false },
  orderId: { type: String }
}, { timestamps: true });

const DesignRequest = mongoose.models.DesignRequest || mongoose.model<IDesignRequest>('DesignRequest', designRequestSchema);

export default DesignRequest;
