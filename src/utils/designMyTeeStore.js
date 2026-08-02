// DesignMyTee Store and Mock Data Layer

const STORAGE_KEY = 'lme_designmytee_requests_v1';
const NOTIFICATIONS_KEY = 'lme_designmytee_notifications_v1';

export const DESIGNERS_LIST = [
  { id: 'des-01', name: 'Alex Rivera', role: 'Designer', title: 'Lead Apparel & Typography Specialist', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', email: 'alex.rivera@lme.com', activeRequests: 3 },
  { id: 'des-02', name: 'Maya Lin', role: 'Designer', title: 'Illustrator & Graphic Artist', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', email: 'maya.lin@lme.com', activeRequests: 2 },
  { id: 'des-03', name: 'Sam Vance', role: 'Designer', title: 'Streetwear & Brand Specialist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', email: 'sam.vance@lme.com', activeRequests: 4 },
];

export const INITIAL_REQUESTS = [
  {
    id: 'DMT-1021',
    user: {
      id: 'usr-881',
      name: 'Marcus Sterling',
      email: 'marcus.sterling@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      phone: '+1 (555) 392-0192',
      address: '742 Evergreen Terrace, Springfield, OR 97477'
    },
    title: 'Cyberpunk Neon Tiger Graphic Tee',
    description: 'Looking for a futuristic neon cyber-tiger graphic on the back of an oversized black acid-wash tee. Front should feature minimalist Japanese katakana logo typography on the left chest.',
    tshirtType: 'Oversized Heavyweight Tee',
    preferredColors: ['#000000', '#FF0055', '#00F0FF', '#7928CA'],
    placement: 'Back Graphic & Front Left Chest',
    quantity: 50,
    budgetRange: '$500 - $1,000',
    deadline: '2026-08-25',
    consentChecked: true,
    status: 'Approved',
    priority: 'High',
    assignedDesigner: DESIGNERS_LIST[0], // Alex Rivera
    submissionDate: '2026-07-20',
    lastUpdated: '2026-07-30',
    internalNotes: 'Customer prefers heavy 240GSM cotton. Double screen print technique recommended for neon vibrancy.',
    referenceImages: [
      { id: 'ref-1', url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80', title: 'Cyberpunk Aesthetic Inspiration' },
      { id: 'ref-2', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80', title: 'Color Palette Style' }
    ],
    revisions: [
      {
        version: 'v1',
        title: 'Initial Cyber Tiger Sketch',
        previewUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
        uploadDate: '2026-07-22',
        designerComment: 'Created first line-art sketch focusing on aggressive cybernetics and tiger contours. Let me know how line weight feels.',
        status: 'Revision Requested'
      },
      {
        version: 'v2',
        title: 'Full Neon Colorized Concept',
        previewUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
        uploadDate: '2026-07-26',
        designerComment: 'Added multi-layer cyan & hot pink neon highlights with Japanese chest branding typography.',
        status: 'Approved'
      }
    ],
    conversation: [
      {
        id: 'msg-1',
        senderId: 'usr-881',
        senderName: 'Marcus Sterling',
        senderRole: 'User',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-07-20 10:14 AM',
        text: 'Hi team! Really excited about this design request. Want something bold for our urban launch event.'
      },
      {
        id: 'msg-2',
        senderId: 'admin-01',
        senderName: 'Admin Team',
        senderRole: 'Admin',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-07-21 09:30 AM',
        text: 'Welcome Marcus! Request assigned to Lead Apparel Designer Alex Rivera.'
      },
      {
        id: 'msg-3',
        senderId: 'des-01',
        senderName: 'Alex Rivera',
        senderRole: 'Designer',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-07-26 02:45 PM',
        text: 'Hey Marcus! Just uploaded v2 of the concept with full neon glow effects and chest placement mockup. Check out the preview tab!',
        attachments: [
          { type: 'image', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80', name: 'Cyber_Tiger_v2_Mockup.jpg' }
        ]
      },
      {
        id: 'msg-4',
        senderId: 'usr-881',
        senderName: 'Marcus Sterling',
        senderRole: 'User',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-07-27 11:20 AM',
        text: 'Love v2 so much! The cyan contrast is incredible. Approving this design now!'
      }
    ],
    activityLog: [
      { id: 'act-1', timestamp: '2026-07-20 10:14 AM', actor: 'Marcus Sterling', action: 'Submitted Design Request' },
      { id: 'act-2', timestamp: '2026-07-21 09:30 AM', actor: 'Super Admin', action: 'Assigned request to Alex Rivera' },
      { id: 'act-3', timestamp: '2026-07-22 04:00 PM', actor: 'Alex Rivera', action: 'Uploaded Revision v1' },
      { id: 'act-4', timestamp: '2026-07-26 02:45 PM', actor: 'Alex Rivera', action: 'Uploaded Revision v2' },
      { id: 'act-5', timestamp: '2026-07-27 11:20 AM', actor: 'Marcus Sterling', action: 'Approved final design v2' }
    ]
  },
  {
    id: 'DMT-1022',
    user: {
      id: 'usr-902',
      name: 'Sophia Chen',
      email: 'sophia.design@studio.io',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      phone: '+1 (555) 819-2044',
      address: '101 Tech Way, Suite 400, San Francisco, CA 94107'
    },
    title: 'Vintage Botanical Skull Embroidery Hoodie',
    description: 'Intricate vintage botanical illustration blending floral peonies with a anatomical skull on a washed vintage cream hoodie. High density embroidery style on chest and back screenprint.',
    tshirtType: 'Heavyweight Hoodie',
    preferredColors: ['#F5E6D3', '#2D5A27', '#8B0000', '#1C1C1C'],
    placement: 'Chest Embroidery & Full Back Print',
    quantity: 100,
    budgetRange: '$1,000 - $2,500',
    deadline: '2026-09-01',
    consentChecked: true,
    status: 'In Progress',
    priority: 'High',
    assignedDesigner: DESIGNERS_LIST[1], // Maya Lin
    submissionDate: '2026-07-25',
    lastUpdated: '2026-07-29',
    internalNotes: 'Client requests embroidery sample photo preview before batch printing.',
    referenceImages: [
      { id: 'ref-10', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80', title: 'Botanical Illustration Reference' }
    ],
    revisions: [
      {
        version: 'v1',
        title: 'Peony & Skull Composition Draft',
        previewUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
        uploadDate: '2026-07-28',
        designerComment: 'Created botanical line composition with deep forest green leaves and burgundy peony petals.',
        status: 'Under Review'
      }
    ],
    conversation: [
      {
        id: 'msg-10',
        senderId: 'usr-902',
        senderName: 'Sophia Chen',
        senderRole: 'User',
        senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-07-25 03:20 PM',
        text: 'Hi Maya! Excited to work together. Hoping for fine line details that translate well into embroidery stitch density.'
      },
      {
        id: 'msg-11',
        senderId: 'des-02',
        senderName: 'Maya Lin',
        senderRole: 'Designer',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-07-28 05:10 PM',
        text: 'Hi Sophia! I just uploaded Revision v1 draft. Take a look at the peony foliage framing!'
      }
    ],
    activityLog: [
      { id: 'act-10', timestamp: '2026-07-25 03:20 PM', actor: 'Sophia Chen', action: 'Submitted Design Request' },
      { id: 'act-11', timestamp: '2026-07-26 11:00 AM', actor: 'Admin Team', action: 'Assigned request to Maya Lin' },
      { id: 'act-12', timestamp: '2026-07-28 05:10 PM', actor: 'Maya Lin', action: 'Uploaded Revision v1' }
    ]
  },
  {
    id: 'DMT-1023',
    user: {
      id: 'usr-743',
      name: 'David Miller',
      email: 'd.miller@skatecraft.com',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      phone: '+1 (555) 441-9988',
      address: '42 Skate Plaza, Venice, CA 90291'
    },
    title: 'Retro 90s Distressed Skate Typography Tee',
    description: 'Bold 90s nostalgia skate graphic with distressed halftone gradient texture, puff-print typography reading LAST MAN ON EARTH skate division.',
    tshirtType: 'Acid Wash Tee',
    preferredColors: ['#121212', '#FFA500', '#E63946'],
    placement: 'Full Front Graphic',
    quantity: 75,
    budgetRange: '$500 - $1,000',
    deadline: '2026-08-15',
    consentChecked: true,
    status: 'Submitted',
    priority: 'Medium',
    assignedDesigner: null,
    submissionDate: '2026-08-01',
    lastUpdated: '2026-08-01',
    internalNotes: 'New request awaiting admin review and designer assignment.',
    referenceImages: [
      { id: 'ref-20', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80', title: 'Skate Style Reference' }
    ],
    revisions: [],
    conversation: [
      {
        id: 'msg-20',
        senderId: 'usr-743',
        senderName: 'David Miller',
        senderRole: 'User',
        senderAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-08-01 09:00 AM',
        text: 'Submitted our skate team request! Looking forward to seeing concept drafts.'
      }
    ],
    activityLog: [
      { id: 'act-20', timestamp: '2026-08-01 09:00 AM', actor: 'David Miller', action: 'Submitted Design Request' }
    ]
  },
  {
    id: 'DMT-1024',
    user: {
      id: 'usr-610',
      name: 'Elena Rostova',
      email: 'elena@atelier-lux.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      phone: '+1 (555) 700-1122',
      address: '500 Madison Ave, New York, NY 10022'
    },
    title: 'Minimalist Monogram Luxury Polo Shirt',
    description: 'Clean tonal crest embroidery on left chest of heavyweight piqué cotton polo. Tone-on-tone embroidery thread with understated luxury vibe.',
    tshirtType: 'Polo Shirt',
    preferredColors: ['#0A192F', '#D4AF37'],
    placement: 'Left Chest Only',
    quantity: 30,
    budgetRange: '$200 - $500',
    deadline: '2026-08-18',
    consentChecked: true,
    status: 'Assigned',
    priority: 'Low',
    assignedDesigner: DESIGNERS_LIST[2], // Sam Vance
    submissionDate: '2026-07-29',
    lastUpdated: '2026-07-31',
    internalNotes: 'Sam Vance assigned. Waiting for vector logo assets from client.',
    referenceImages: [
      { id: 'ref-30', url: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80', title: 'Luxury Crest Reference' }
    ],
    revisions: [],
    conversation: [
      {
        id: 'msg-30',
        senderId: 'usr-610',
        senderName: 'Elena Rostova',
        senderRole: 'User',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-07-29 04:15 PM',
        text: 'Hi team! We need 30 custom polos for our boutique staff.'
      },
      {
        id: 'msg-31',
        senderId: 'des-03',
        senderName: 'Sam Vance',
        senderRole: 'Designer',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-07-31 10:00 AM',
        text: 'Hello Elena! I have received your brief. Currently preparing initial digitized embroidery vector layouts.'
      }
    ],
    activityLog: [
      { id: 'act-30', timestamp: '2026-07-29 04:15 PM', actor: 'Elena Rostova', action: 'Submitted Design Request' },
      { id: 'act-31', timestamp: '2026-07-30 02:00 PM', actor: 'Super Admin', action: 'Assigned request to Sam Vance' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  { id: 'notif-1', recipientRole: 'User', title: 'Design Concept Approved!', body: 'Your request DMT-1021 has been approved and is ready for production order conversion.', timestamp: '2026-07-27 11:20 AM', read: false, requestId: 'DMT-1021' },
  { id: 'notif-2', recipientRole: 'Designer', title: 'New Design Assignment', body: 'Super Admin assigned request DMT-1022 (Vintage Botanical Skull) to you.', timestamp: '2026-07-26 11:00 AM', read: false, requestId: 'DMT-1022' },
  { id: 'notif-3', recipientRole: 'Admin', title: 'New Custom Design Request Submitted', body: 'User David Miller submitted request DMT-1023 (Retro 90s Skate Tee).', timestamp: '2026-08-01 09:00 AM', read: false, requestId: 'DMT-1023' }
];

// Helper to sync local data with MongoDB API
export async function syncFromMongoDB() {
  if (typeof window === 'undefined') return;
  try {
    const res = await fetch('/api/designmytee');
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
      window.dispatchEvent(new Event('designmytee_update'));
      return json.data;
    }
  } catch (err) {
    console.warn('MongoDB sync check:', err.message);
  }
}

// Helper to get initial or stored state
export function getStoredRequests() {
  if (typeof window === 'undefined') return INITIAL_REQUESTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
      syncFromMongoDB();
      return INITIAL_REQUESTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading designmytee store:', e);
    return INITIAL_REQUESTS;
  }
}

export function saveStoredRequests(requests, syncId = null, syncPayload = null) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    window.dispatchEvent(new Event('designmytee_update'));

    // Asynchronously push to MongoDB API
    if (syncId && syncPayload) {
      fetch(`/api/designmytee/${syncId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(syncPayload)
      }).catch(err => console.warn('MongoDB patch failed:', err));
    }
  } catch (e) {
    console.error('Error saving designmytee store:', e);
  }
}

export function getStoredNotifications() {
  if (typeof window === 'undefined') return INITIAL_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    if (!raw) {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_NOTIFICATIONS;
  }
}

export function saveNotifications(notifications) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
    window.dispatchEvent(new Event('designmytee_notif_update'));
  } catch (e) {
    console.error(e);
  }
}

// Action helpers
export function createNewDesignRequest(formData) {
  const requests = getStoredRequests();
  const nextNum = 1020 + requests.length + 1;
  const newId = `DMT-${nextNum}`;

  const newReq = {
    id: newId,
    user: {
      id: 'usr-current',
      name: formData.name || 'Current User',
      email: formData.email || 'user@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      phone: formData.phone || '+1 (555) 123-4567',
      address: formData.address || '123 Main Street, City, State 10001'
    },
    title: formData.title,
    description: formData.description,
    tshirtType: formData.tshirtType || 'Oversized Heavyweight Tee',
    preferredColors: formData.preferredColors || ['#000000', '#FFFFFF'],
    placement: formData.placement || 'Front & Back',
    quantity: parseInt(formData.quantity) || 50,
    budgetRange: formData.budgetRange || '$500 - $1,000',
    deadline: formData.deadline || '2026-09-15',
    consentChecked: formData.consentChecked || true,
    status: 'Submitted',
    priority: 'Medium',
    assignedDesigner: null,
    submissionDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
    internalNotes: 'New request submitted via website form.',
    referenceImages: formData.referenceImages && formData.referenceImages.length > 0
      ? formData.referenceImages
      : [
          { id: 'ref-new-1', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80', title: 'Submitted Reference Image' }
        ],
    revisions: [],
    conversation: [
      {
        id: `msg-${Date.now()}`,
        senderId: 'usr-current',
        senderName: formData.name || 'Current User',
        senderRole: 'User',
        senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        timestamp: new Date().toLocaleString(),
        text: `Submitted design request: ${formData.title}`
      }
    ],
    activityLog: [
      { id: `act-${Date.now()}`, timestamp: new Date().toLocaleString(), actor: formData.name || 'Current User', action: 'Submitted Design Request' }
    ]
  };

  const updated = [newReq, ...requests];
  saveStoredRequests(updated);

  // Asynchronously post to MongoDB API
  if (typeof window !== 'undefined') {
    fetch('/api/designmytee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReq)
    }).catch(err => console.warn('MongoDB POST failed:', err));
  }

  // Trigger admin notification
  addNotification({
    recipientRole: 'Admin',
    title: 'New Design Request Submitted',
    body: `New request ${newId} (${formData.title}) was submitted.`,
    requestId: newId
  });

  return newReq;
}

export function updateRequestStatus(requestId, newStatus, actorName = 'Admin') {
  const requests = getStoredRequests();
  const updated = requests.map(req => {
    if (req.id === requestId) {
      const nowStr = new Date().toLocaleString();
      return {
        ...req,
        status: newStatus,
        lastUpdated: new Date().toISOString().split('T')[0],
        activityLog: [
          ...req.activityLog,
          { id: `act-${Date.now()}`, timestamp: nowStr, actor: actorName, action: `Status changed to ${newStatus}` }
        ]
      };
    }
    return req;
  });
  saveStoredRequests(updated);
}

export function assignDesignerToRequest(requestId, designerId, actorName = 'Admin') {
  const designer = DESIGNERS_LIST.find(d => d.id === designerId) || null;
  const requests = getStoredRequests();
  const updated = requests.map(req => {
    if (req.id === requestId) {
      const nowStr = new Date().toLocaleString();
      return {
        ...req,
        assignedDesigner: designer,
        status: req.status === 'Submitted' ? 'Assigned' : req.status,
        lastUpdated: new Date().toISOString().split('T')[0],
        activityLog: [
          ...req.activityLog,
          { id: `act-${Date.now()}`, timestamp: nowStr, actor: actorName, action: `Assigned designer to ${designer ? designer.name : 'Unassigned'}` }
        ]
      };
    }
    return req;
  });
  saveStoredRequests(updated);

  if (designer) {
    addNotification({
      recipientRole: 'Designer',
      title: 'New Design Assignment',
      body: `You were assigned to request ${requestId}`,
      requestId
    });
  }
}

export function addMessageToRequest(requestId, messageData) {
  const requests = getStoredRequests();
  const updated = requests.map(req => {
    if (req.id === requestId) {
      const newMsg = {
        id: `msg-${Date.now()}`,
        senderId: messageData.senderId || 'usr-current',
        senderName: messageData.senderName || 'User',
        senderRole: messageData.senderRole || 'User',
        senderAvatar: messageData.senderAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        timestamp: new Date().toLocaleString(),
        text: messageData.text,
        attachments: messageData.attachments || []
      };
      return {
        ...req,
        conversation: [...req.conversation, newMsg],
        lastUpdated: new Date().toISOString().split('T')[0]
      };
    }
    return req;
  });
  saveStoredRequests(updated);
}

export function uploadRevisionToRequest(requestId, revisionData, actorName = 'Designer') {
  const requests = getStoredRequests();
  const updated = requests.map(req => {
    if (req.id === requestId) {
      const nextVersion = `v${req.revisions.length + 1}`;
      const nowStr = new Date().toLocaleString();
      const newRev = {
        version: revisionData.version || nextVersion,
        title: revisionData.title || `Revision ${nextVersion}`,
        previewUrl: revisionData.previewUrl || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
        uploadDate: new Date().toISOString().split('T')[0],
        designerComment: revisionData.designerComment || 'New design revision concept uploaded.',
        status: 'Under Review'
      };

      return {
        ...req,
        status: 'Awaiting Feedback',
        revisions: [...req.revisions, newRev],
        lastUpdated: new Date().toISOString().split('T')[0],
        activityLog: [
          ...req.activityLog,
          { id: `act-${Date.now()}`, timestamp: nowStr, actor: actorName, action: `Uploaded Revision ${newRev.version}` }
        ]
      };
    }
    return req;
  });
  saveStoredRequests(updated);

  addNotification({
    recipientRole: 'User',
    title: 'New Design Revision Uploaded',
    body: `Designer uploaded a new revision for request ${requestId}. Check preview and leave feedback!`,
    requestId
  });
}

export function updateInternalNotes(requestId, notesText) {
  const requests = getStoredRequests();
  const updated = requests.map(req => {
    if (req.id === requestId) {
      return { ...req, internalNotes: notesText };
    }
    return req;
  });
  saveStoredRequests(updated);
}

export function convertRequestToOrder(requestId, orderDetails = {}) {
  const requests = getStoredRequests();
  const updated = requests.map(req => {
    if (req.id === requestId) {
      const nowStr = new Date().toLocaleString();
      return {
        ...req,
        status: 'Completed',
        orderConverted: true,
        orderId: `ORD-PROD-${Math.floor(10000 + Math.random() * 90000)}`,
        activityLog: [
          ...req.activityLog,
          { id: `act-${Date.now()}`, timestamp: nowStr, actor: orderDetails.actor || 'Admin', action: 'Converted approved design into Production Order' }
        ]
      };
    }
    return req;
  });
  saveStoredRequests(updated);

  addNotification({
    recipientRole: 'User',
    title: 'Production Order Created!',
    body: `Your design ${requestId} has been converted into a production order. Delivery tracking will update soon!`,
    requestId
  });
}

export function addNotification(notif) {
  const notifs = getStoredNotifications();
  const newNotif = {
    id: `notif-${Date.now()}`,
    recipientRole: notif.recipientRole || 'User',
    title: notif.title,
    body: notif.body,
    timestamp: new Date().toLocaleString(),
    read: false,
    requestId: notif.requestId
  };
  saveNotifications([newNotif, ...notifs]);
}
