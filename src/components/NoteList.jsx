import { useMemo } from 'react';

function formatDate(ts) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return '';
  }
}

export default function NoteList({ notes, selectedId, onSelect, onCreate, query, setQuery }) {
  const list = useMemo(() => {
    return notes;
  }, [notes]);

  return (
    <div className="flex h-[60vh] md:h-[70vh] lg:h-[75vh] flex-col">
      <div className="flex items-center gap-2 p-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes..."
          className="w-full rounded-lg border border-neutral-300/80 bg-white/70 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-100"
        />
        <button onClick={onCreate} className="rounded-lg border border-neutral-300/80 bg-white/70 px-3 py-2 text-sm text-neutral-900 transition hover:bg-white active:scale-95 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-100">
          New
        </button>
      </div>
      <div className="h-px w-full bg-neutral-200/70 dark:bg-neutral-800" />
      <div className="custom-scrollbar grow overflow-y-auto p-2">
        {list.length === 0 && (
          <div className="p-6 text-center text-sm text-neutral-500 dark:text-neutral-400">No notes found.</div>
        )}
        <ul className="space-y-2">
          {list.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => onSelect(n.id)}
                className={`w-full rounded-xl border p-3 text-left transition hover:bg-neutral-50 dark:hover:bg-neutral-900 ${n.id === selectedId ? 'border-neutral-900/20 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900' : 'border-neutral-200/70 bg-white/70 dark:border-neutral-800 dark:bg-neutral-900/60'}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="truncate text-sm font-semibold">{n.title || 'Untitled'}</h3>
                  <span className="shrink-0 text-[10px] text-neutral-500 dark:text-neutral-400">{formatDate(n.updatedAt)}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-neutral-600 dark:text-neutral-300">
                  {n.content || 'No content'}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
