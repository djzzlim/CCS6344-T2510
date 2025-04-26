import type { NextApiRequest, NextApiResponse } from 'next';
import sql from 'mssql';

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER || '',
  port: parseInt(process.env.DB_PORT || '1433', 10),
  options: {
    trustServerCertificate: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT GETDATE() as now');
    res.status(200).json({ success: true, data: result.recordset });
  } catch (err: any) {
    console.error('DB ERROR:', err);
    res.status(500).json({ success: false, message: err.message });
  } finally {
    sql.close();
  }
}
