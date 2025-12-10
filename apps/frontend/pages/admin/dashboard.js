import Navbar from '../../components/Navbar';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2025-11-01', sales: 1200 },
  { date: '2025-11-02', sales: 2400 },
  { date: '2025-11-03', sales: 1000 },
  { date: '2025-11-04', sales: 3000 },
  { date: '2025-11-05', sales: 2000 }
];

export default function Dashboard(){
  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-serif">仪表盘</h1>
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
