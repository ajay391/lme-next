import dbConnect from '../../../lib/mongo';
import DesignRequest from '../../../models/DesignRequest';

const INITIAL_SEED_REQUESTS = [
  {
    requestId: 'DMT-1021',
    user: {
      id: 'usr-101',
      name: 'Marcus Sterling',
      email: 'marcus@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Springfield'
    },
    title: 'Cyberpunk Neon Tiger Oversized Graphic Tee',
    description: 'Looking for a cyberpunk futuristic tiger illustration on the back with glowing neon katakana typography. Front left chest should feature a minimalist LME cyber emblem.',
    tshirtType: 'Oversized Heavyweight Tee',
    preferredColors: ['#000000', '#FF0055', '#00F0FF'],
    placement: 'Back Graphic & Front Left Chest',
    quantity: 50,
    budgetRange: '$500 - $1,000',
    deadline: '2026-08-30',
    consentChecked: true,
    status: 'In Progress',
    priority: 'High',
    assignedDesigner: {
      id: 'des-01',
      name: 'Alex Rivera',
      role: 'Senior Apparel Illustrator',
      title: 'Lead Graphics Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      email: 'alex.rivera@lmeapparel.com'
    },
    submissionDate: '2026-08-01 10:15 AM',
    lastUpdated: '2 hours ago',
    internalNotes: 'Client wants high contrast neon accents. Pre-screened for 240GSM cotton print compatibility.',
    referenceImages: [
      { id: '1', url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80', title: 'Cyberpunk Katakana Reference' },
      { id: '2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80', title: 'Neon Tiger Line Art' }
    ],
    revisions: [
      {
        version: 'v1',
        title: 'Initial Vector Concept & Color Proof',
        previewUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
        uploadDate: '2026-08-01 02:30 PM',
        designerComment: 'Created initial neon vector layout with high-density katakana framing.',
        status: 'Feedback Pending'
      }
    ],
    conversation: [
      {
        id: 'msg-1',
        senderId: 'usr-101',
        senderName: 'Marcus Sterling',
        senderRole: 'User',
        senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-08-01 10:15 AM',
        text: 'Hi LME team! Excited for this custom drop. Let me know if you need vector source assets.'
      },
      {
        id: 'msg-2',
        senderId: 'admin-1',
        senderName: 'Sarah Jenkins',
        senderRole: 'Admin',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-08-01 11:00 AM',
        text: 'Welcome Marcus! Brief assigned to Alex Rivera, lead apparel illustrator.'
      }
    ],
    activityLog: [
      { id: 'act-1', timestamp: '2026-08-01 10:15 AM', actor: 'Marcus Sterling', action: 'Request Submitted' },
      { id: 'act-2', timestamp: '2026-08-01 11:00 AM', actor: 'Sarah Jenkins (Admin)', action: 'Assigned to Designer Alex Rivera' }
    ]
  },
  {
    requestId: 'DMT-1022',
    user: {
      id: 'usr-102',
      name: 'Elena Rostova',
      email: 'elena@brandco.io',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      phone: '+1 (555) 987-6543',
      address: '100 Broadway St, New York'
    },
    title: 'Vintage Botanical Skull & Peony Hoodie',
    description: 'Detailed anatomical skull with blooming peonies woven around the jawline. High-density embroidery on 380GSM black fleece.',
    tshirtType: 'Heavyweight Fleece Hoodie',
    preferredColors: ['#000000', '#E5E7EB', '#EF4444'],
    placement: 'Front Chest Embroidery',
    quantity: 100,
    budgetRange: '$1,000 - $2,500',
    deadline: '2026-09-15',
    consentChecked: true,
    status: 'Awaiting Feedback',
    priority: 'Medium',
    assignedDesigner: {
      id: 'des-02',
      name: 'Elena Vance',
      role: 'Embroidery & Textile Specialist',
      title: 'Senior Stitching Artist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      email: 'elena.vance@lmeapparel.com'
    },
    submissionDate: '2026-07-29 04:20 PM',
    lastUpdated: '1 day ago',
    internalNotes: 'Sample thread swatch approved by lead digitizer.',
    referenceImages: [
      { id: '1', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80', title: 'Embroidery Reference' }
    ],
    revisions: [
      {
        version: 'v1',
        title: 'Initial Stitch Digitize Proof',
        previewUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
        uploadDate: '2026-07-30 06:00 PM',
        designerComment: 'Digitized thread path with 45,000 stitch count preview.',
        status: 'User Reviewing'
      }
    ],
    conversation: [
      {
        id: 'msg-1',
        senderId: 'usr-102',
        senderName: 'Elena Rostova',
        senderRole: 'User',
        senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-07-29 04:20 PM',
        text: 'Can we ensure high thread count so the flower petals don’t fray?'
      }
    ],
    activityLog: [
      { id: 'act-1', timestamp: '2026-07-29 04:20 PM', actor: 'Elena Rostova', action: 'Request Submitted' }
    ]
  }
];

export default async function handler(req, res) {
  try {
    await dbConnect();
  } catch (dbErr) {
    console.error('MongoDB connection error:', dbErr);
    return res.status(500).json({ success: false, error: 'Database connection failed: ' + dbErr.message });
  }

  if (req.method === 'GET') {
    try {
      let requests = await DesignRequest.find({}).sort({ updatedAt: -1 });

      // Seed database if empty
      if (requests.length === 0) {
        requests = await DesignRequest.insertMany(INITIAL_SEED_REQUESTS);
      }

      // Map to frontend-friendly format
      const formatted = requests.map(doc => {
        const obj = doc.toObject();
        obj.id = obj.requestId || obj._id.toString();
        return obj;
      });

      return res.status(200).json({ success: true, count: formatted.length, data: formatted });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = req.body;
      const count = await DesignRequest.countDocuments();
      const requestId = body.id || `DMT-${1021 + count}`;

      const newDoc = new DesignRequest({
        ...body,
        requestId,
        submissionDate: new Date().toLocaleString(),
        lastUpdated: 'Just now',
        status: body.status || 'Submitted',
        revisions: body.revisions || [],
        conversation: body.conversation || [
          {
            id: `msg-${Date.now()}`,
            senderId: 'usr-current',
            senderName: body.name || 'Marcus Sterling',
            senderRole: 'User',
            senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            timestamp: new Date().toLocaleString(),
            text: `Design request submitted: "${body.title}". Looking forward to working with the design team!`
          }
        ],
        activityLog: [
          {
            id: `act-${Date.now()}`,
            timestamp: new Date().toLocaleString(),
            actor: body.name || 'User',
            action: 'Request Submitted to MongoDB'
          }
        ]
      });

      const saved = await newDoc.save();
      const resultObj = saved.toObject();
      resultObj.id = resultObj.requestId;

      return res.status(201).json({ success: true, data: resultObj });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
