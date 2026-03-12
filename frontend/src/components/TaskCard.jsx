import { useState } from 'react';
import { Pencil, Trash2, Calendar, ChevronDown } from 'lucide-react';
import PriorityBadge from './PriorityBadge';
import axiosInstance from '../api/axiosConfig';
import toast from 'react-hot-toast';

const STATUS_STYLES = {
  TODO: 'bg-slate-600/40 text-slate-300',
  IN_PROGRESS: 'bg-blue-500/20 text-blue-300',
  DONE: 'bg-emerald-500/20 text-emerald-300',
};

const STATUS_CYCLE = { TODO: 'IN_PROGRESS', IN_PROGRESS: 'DONE', DONE: 'TODO' };

const TaskCard = ({ task, onEdit, onDelete, onRefresh }) => {
  const [updating, setUpdating] = useState(false);

  const handleStatusToggle = async () => {
    const nextStatus = STATUS_CYCLE[task.status];
    setUpdating(true);
    try {
      await axiosInstance.patch(`/tasks/${task.id}/status`, { status: nextStatus });
      toast.success(`Status → ${nextStatus.replace('_', ' ')}`);
      onRefresh();
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handlePriorityChange = async (e) => {
    const priority = e.target.value;
    try {
      await axiosInstance.patch(`/tasks/${task.id}/priority`, { priority });
      toast.success(`Priority → ${priority}`);
      onRefresh();
    } catch {
      toast.error('Failed to update priority');
    }
  };

  const isDone = task.status === 'DONE';

  return (
    <div className={`group relative flex flex-col gap-3 rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${isDone ? 'border-slate-700/40 bg-slate-800/30 opacity-70' : 'border-slate-700/60 bg-slate-800/60 hover:border-violet-500/40 hover:shadow-violet-500/10'}`}>

      {/* Top row: title + actions */}
      <div className="flex items-start justify-between gap-2">
        <h3 className={`font-semibold leading-snug ${isDone ? 'line-through text-slate-500' : 'text-slate-100'}`}>
          {task.title}
        </h3>
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-700 hover:text-violet-400"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-700 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{task.description}</p>
      )}

      {/* Badges row */}
      <div className="flex flex-wrap items-center gap-2 mt-auto">
        <PriorityBadge priority={task.priority} />

        {/* Priority quick-change dropdown */}
        <div className="relative flex items-center">
          <select
            value={task.priority}
            onChange={handlePriorityChange}
            className="appearance-none rounded-lg bg-slate-700/50 pl-2 pr-6 py-1 text-xs text-slate-400 border border-slate-600 cursor-pointer focus:outline-none focus:border-violet-500"
          >
            {['LOW', 'MEDIUM', 'HIGH', 'URGENT'].map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-1 h-3 w-3 text-slate-400" />
        </div>

        {/* Status toggle button */}
        <button
          onClick={handleStatusToggle}
          disabled={updating}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition hover:opacity-80 disabled:opacity-50 ${STATUS_STYLES[task.status]}`}
        >
          {updating ? '...' : task.status.replace('_', ' ')}
        </button>

        {/* Due date */}
        {task.dueDate && (
          <span className="ml-auto flex items-center gap-1 text-xs text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
