import dbConnect from '../../../lib/mongo';
import DesignRequest from '../../../models/DesignRequest';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  try {
    const conn = await dbConnect();
    const dbName = mongoose.connection.name;
    const readyState = mongoose.connection.readyState; // 1 = connected
    const count = await DesignRequest.countDocuments();

    return res.status(200).json({
      success: true,
      connected: readyState === 1,
      databaseName: dbName,
      collection: 'designrequests',
      documentCount: count,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      connected: false,
      error: err.message
    });
  }
}
