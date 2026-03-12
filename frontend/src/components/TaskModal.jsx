import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import axiosInstance from '../api/axiosConfig';
import toast from 'react-hot-toast';

const DEFAULT_FORM = {
  title: '',
  description: '',
  priority: 'MEDIUM',
  status: 'TODO',
  dueDate: '',
};

const TaskModal = ({ isOpen, onClose, onSuccess, editTask }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title || '',
        description: editTask.description || '',
        priority: editTask.priority || 'MEDIUM',
        status: editTask.status || 'TODO',
        dueDate: editTask.dueDate || '',
      });
    } else {
      setFormData(DEFAULT_FORM);
    }
  }, [editTask, isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      dueDate: formData.dueDate || null,
    };

    try {
      if (editTask) {
        await axiosInstance.put(`/tasks/${editTask.id}`, payload);
        toast.success('Task updated!');
      } else {
        await axiosInstance.post('/tasks', payload);
        toast.success('Task created!');
      }
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-2xl shadow-violet-500/10 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {editTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Title *</label>
            <input
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title..."
              className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional notes..."
              className="w-full resize-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          {/* Priority + Status row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Priority *</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              >
                <option value="LOW">🟢 Low</option>
                <option value="MEDIUM">🟡 Medium</option>
                <option value="HIGH">🟠 High</option>
                <option value="URGENT">🔴 Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              >
                <option value="TODO">📋 To Do</option>
                <option value="IN_PROGRESS">⚡ In Progress</option>
                <option value="DONE">✅ Done</option>
              </select>
            </div>
          </div>

          {/* Due date */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Due Date</label>
            <input
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 [color-scheme:dark]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-600 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : editTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
