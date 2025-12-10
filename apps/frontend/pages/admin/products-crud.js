import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductsAdminCRUD(){
  const [products,setProducts]=useState([]);
  const [form,setForm]=useState({ name:'', slug:'', description:'', priceCents:0, image:'' });
  const [editing,setEditing]=useState(null);

  useEffect(()=>{ fetchData(); },[]);
  const fetchData = async ()=>{
    const res = await axios.get((process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:4000') + '/api/products');
    setProducts(res.data);
  };

  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await axios.post((process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:4000') + '/api/upload/image', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res.data.url;
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put((process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:4000') + `/api/products/${editing.id}`, form, { withCredentials: true });
      } else {
        await axios.post((process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:4000') + '/api/products', form, { withCredentials: true });
      }
      setForm({ name:'', slug:'', description:'', priceCents:0, image:'' });
      setEditing(null);
      fetchData();
    } catch (err) { alert(err?.response?.data?.error || 'Error'); }
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl">商品管理（CRUD）</h1>

        <form className="mt-4 space-y-3" onSubmit={submit}>
          <input className="w-full p-2 border rounded" placeholder="名称" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          <input className="w-full p-2 border rounded" placeholder="slug" value={form.slug} onChange={e=>setForm({...form, slug: e.target.value})} />
          <textarea className="w-full p-2 border rounded" placeholder="描述" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
          <input type="number" className="w-full p-2 border rounded" placeholder="价格（分）" value={form.priceCents} onChange={e=>setForm({...form, priceCents: Number(e.target.value)})} />
          <div>
            <input type="file" onChange={async e=>{ const url = await uploadFile(e.target.files[0]); setForm({...form, image: url}); }} />
            {form.image && <div className="mt-2">已上传：<img src={form.image} style={{width:120}} alt="upload" /></div>}
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-emerald-800 text-white rounded">保存</button>
            <button type="button" className="px-4 py-2 border rounded" onClick={()=>{ setForm({ name:'', slug:'', description:'', priceCents:0, image:'' }); setEditing(null); }}>重置</button>
          </div>
        </form>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {products.map(p=>(
            <div key={p.id} className="p-4 border rounded">
              <h3 className="font-semibold">{p.name}</h3>
              <div className="mt-2">¥{(p.priceCents/100).toFixed(2)}</div>
              <div className="mt-2 flex space-x-2">
                <button className="px-2 py-1 border rounded" onClick={()=>{ setEditing(p); setForm({ name:p.name, slug:p.slug, description:p.description, priceCents:p.priceCents, image:p.image || '' }); }}>编辑</button>
                <button className="px-2 py-1 border rounded" onClick={async ()=>{ if(confirm('删除?')){ await axios.delete((process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:4000') + `/api/products/${p.id}`, { withCredentials: true }); fetchData(); } }}>删除</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
