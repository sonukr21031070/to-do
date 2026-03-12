const PRIORITY_STYLES = {
  LOW: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  MEDIUM: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  HIGH: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  URGENT: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const PRIORITY_DOTS = {
  LOW: 'bg-emerald-400',
  MEDIUM: 'bg-amber-400',
  HIGH: 'bg-orange-400',
  URGENT: 'bg-red-400',
};

const PriorityBadge = ({ priority }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${PRIORITY_STYLES[priority] || PRIORITY_STYLES.LOW}`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_DOTS[priority] || PRIORITY_DOTS.LOW}`}></span>
    {priority}
  </span>
);

export default PriorityBadge;
