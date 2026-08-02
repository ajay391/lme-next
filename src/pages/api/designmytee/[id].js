import dbConnect from '../../../lib/mongo';
import DesignRequest from '../../../models/DesignRequest';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await dbConnect();
  } catch (dbErr) {
    return res.status(500).json({ success: false, error: 'Database connection failed' });
  }

  if (req.method === 'GET') {
    try {
      const doc = await DesignRequest.findOne({ $or: [{ requestId: id }, { _id: id }] });
      if (!doc) {
        return res.status(404).json({ success: false, error: 'Design request not found' });
      }
      const obj = doc.toObject();
      obj.id = obj.requestId;
      return res.status(200).json({ success: true, data: obj });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const updates = req.body;
      updates.lastUpdated = 'Just now';

      const updatedDoc = await DesignRequest.findOneAndUpdate(
        { $or: [{ requestId: id }, { _id: id }] },
        { $set: updates },
        { new: true }
      );

      if (!updatedDoc) {
        return res.status(404).json({ success: false, error: 'Design request not found' });
      }

      const obj = updatedDoc.toObject();
      obj.id = obj.requestId;
      return res.status(200).json({ success: true, data: obj });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
