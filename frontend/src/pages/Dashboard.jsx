import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import axiosInstance from '../api/axiosConfig';
import toast from 'react-hot-toast';
import { Plus, Search, Filter, ClipboardList } from 'lucide-react';

const PRIORITIES = ['ALL', 'URGENT', 'HIGH', 'MEDIUM', 'LOW'];
const STATUSES = ['ALL', 'TODO', 'IN_PROGRESS', 'DONE'];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filterPriority !== 'ALL') params.priority = filterPriority;
      if (filterStatus !== 'ALL') params.status = filterStatus;
      const { data } = await axiosInstance.get('/tasks', { params });
      setTasks(data);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filterPriority, filterStatus]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      toast.success('Task deleted');
      fetchTasks();
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  const handleModalSuccess = () => {
    setModalOpen(false);
    setEditTask(null);
    fetchTasks();
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    (t.description || '').toLowerCase().includes(search.toLowerCase())
  );

  // Stats
  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'TODO').length,
    inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    done: tasks.filter(t => t.status === 'DONE').length,
    urgent: tasks.filter(t => t.priority === 'URGENT').length,
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Hero header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">My Tasks</h1>
            <p className="mt-0.5 text-sm text-slate-400">{stats.total} task{stats.total !== 1 ? 's' : ''} total</p>
          </div>
          <button
            onClick={() => { setEditTask(null); setModalOpen(true); }}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/50"
          >
            <Plus className="h-5 w-5" />
            <span>New Task</span>
          </button>
        </div>

        {/* Stats cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'To Do', value: stats.todo, color: 'text-slate-300', bg: 'bg-slate-700/50' },
            { label: 'In Progress', value: stats.inProgress, color: 'text-blue-300', bg: 'bg-blue-500/10' },
            { label: 'Done', value: stats.done, color: 'text-emerald-300', bg: 'bg-emerald-500/10' },
            { label: 'Urgent', value: stats.urgent, color: 'text-red-300', bg: 'bg-red-500/10' },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`rounded-xl border border-slate-700/50 ${bg} px-4 py-3`}>
              <p className="text-xs text-slate-500 mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Search + filter bar */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-600 bg-slate-800 py-2.5 pl-10 pr-4 text-slate-100 placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          {/* Priority filter */}
          <div className="relative flex items-center">
            <Filter className="pointer-events-none absolute left-3 h-4 w-4 text-slate-500" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="appearance-none rounded-xl border border-slate-600 bg-slate-800 py-2.5 pl-9 pr-8 text-slate-300 outline-none transition focus:border-violet-500 cursor-pointer"
            >
              {PRIORITIES.map(p => <option key={p} value={p}>{p === 'ALL' ? 'All Priorities' : p}</option>)}
            </select>
          </div>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-slate-300 outline-none transition focus:border-violet-500 cursor-pointer"
          >
            {STATUSES.map(s => <option key={s} value={s}>{s === 'ALL' ? 'All Statuses' : s.replace('_', ' ')}</option>)}
          </select>
        </div>

        {/* Task grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700">
              <ClipboardList className="h-8 w-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-400">No tasks found</h3>
            <p className="mt-1 text-sm text-slate-600">
              {tasks.length === 0 ? 'Click "New Task" to create your first task!' : 'Try adjusting your filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRefresh={fetchTasks}
              />
            ))}
          </div>
        )}
      </main>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditTask(null); }}
        onSuccess={handleModalSuccess}
        editTask={editTask}
      />
    </div>
  );
};

export default Dashboard;
