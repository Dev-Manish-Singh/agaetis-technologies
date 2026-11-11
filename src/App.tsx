import { FormEvent, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Edit3, Plus, Search, Trash2, X } from 'lucide-react';

type Employee = { id: number; name: string; email: string; role: string; created_at: string };
type EmployeeForm = { name: string; email: string; role: string };

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });
const emptyForm: EmployeeForm = { name: '', email: '', role: '' };
const roleOptions = ['Product Designer', 'Frontend Developer', 'Backend Developer', 'Product Manager', 'Marketing Manager', 'UX Researcher', 'QA Engineer'];

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<EmployeeForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadEmployees = async () => {
    try { setLoading(true); const { data } = await api.get<Employee[]>('/employees'); setEmployees(data); setError(''); }
    catch { setError('Employees load नहीं हो सके। पहले Laravel API और MySQL start करें।'); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadEmployees(); }, []);
  useEffect(() => { if (!message) return; const timer = setTimeout(() => setMessage(''), 2500); return () => clearTimeout(timer); }, [message]);

  const filteredEmployees = useMemo(() => {
    const term = search.toLowerCase();
    return employees.filter(employee => `${employee.name} ${employee.email} ${employee.role}`.toLowerCase().includes(term));
  }, [employees, search]);

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError('');
    if (!form.name.trim() || !form.email.trim() || !form.role) { setError('कृपया सभी fields भरें।'); return; }
    try {
      setSaving(true);
      if (editingId) { const { data } = await api.put<Employee>(`/employees/${editingId}`, form); setEmployees(rows => rows.map(row => row.id === editingId ? data : row)); setMessage('Employee updated.'); }
      else { const { data } = await api.post<Employee>('/employees', form); setEmployees(rows => [data, ...rows]); setMessage('Employee added.'); }
      setForm(emptyForm); setEditingId(null);
    } catch (requestError: any) { setError(requestError?.response?.data?.message || 'कुछ गलत हो गया।'); }
    finally { setSaving(false); }
  };
  const editEmployee = (employee: Employee) => { setEditingId(employee.id); setForm({ name: employee.name, email: employee.email, role: employee.role }); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const deleteEmployee = async (id: number) => {
    if (!window.confirm('क्या आप इस employee को delete करना चाहते हैं?')) return;
    try { await api.delete(`/employees/${id}`); setEmployees(rows => rows.filter(row => row.id !== id)); setMessage('Employee deleted.'); }
    catch { setError('Employee delete नहीं हो सका।'); }
  };
  const cancelEdit = () => { setForm(emptyForm); setEditingId(null); setError(''); };

  return <div className="app">
    <header className="header"><div className="container header-inner"><h1>Employee Directory</h1><span>{employees.length} employees</span></div></header>
    <main className="container main-content">
      <section className="intro"><h2>{editingId ? 'Edit employee' : 'Add employee'}</h2></section>
      {error && <div className="alert error"><span>{error}</span><button onClick={() => setError('')}><X size={16} /></button></div>}
      <form className="form-card" onSubmit={submit}>
        <label>Full name<input value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} placeholder="Manish Singh" /></label>
        <label>Email<input type="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} placeholder="manish@company.com" /></label>
        <label>Role<select value={form.role} onChange={event => setForm({ ...form, role: event.target.value })}><option value="">Select role</option>{roleOptions.map(role => <option key={role}>{role}</option>)}</select></label>
        <div className="form-actions">{editingId && <button type="button" className="secondary-button" onClick={cancelEdit}>Cancel</button>}<button className="button" disabled={saving}><Plus size={16} />{saving ? 'Saving...' : editingId ? 'Save changes' : 'Add employee'}</button></div>
      </form>
      <section className="list-section">
        <div className="list-header"><div><h2>All employees</h2><p>{filteredEmployees.length} employee(s) found</p></div><div className="search"><Search size={16} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search..." /></div></div>
        <div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead><tbody>
          {loading ? <tr><td colSpan={5} className="empty">Loading...</td></tr> : filteredEmployees.length === 0 ? <tr><td colSpan={5} className="empty">No employees found.</td></tr> : filteredEmployees.map(employee => <tr key={employee.id}><td className="name-cell">{employee.name}</td><td>{employee.email}</td><td>{employee.role}</td><td>{new Date(employee.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td><td><div className="actions"><button title="Edit" onClick={() => editEmployee(employee)}><Edit3 size={15} /></button><button title="Delete" onClick={() => deleteEmployee(employee.id)}><Trash2 size={15} /></button></div></td></tr>)}
        </tbody></table></div>
      </section>
    </main>
    {message && <div className="toast">{message}</div>}
  </div>;
}
