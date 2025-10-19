import { Menu, Moon, Plus, Save, Sun, Trash2, Search } from 'lucide-react';

export default function Toolbar({ onNew, onDelete, onSave, isDark, onToggleTheme, onToggleSidebar, query, setQuery }) {
  return (
    <div className="sticky top-0 z-20 flex items-center gap-2 border-b border-neutral-200/70 bg-white/70 px-3 py-2 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/60">
      <div className="flex items-center gap-2">
        <button onClick={onToggleSidebar} className="inline-flex md:hidden items-center justify-center rounded-lg border border-neutral-300/80 bg-white/70 p-2 text-neutral-700 shadow-sm transition hover:bg-white active:scale-95 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-200">
          <Menu size={18} />
        </button>
        <button onClick={onNew} className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3 py-2 text-white shadow transition hover:opacity-90 active:scale-95 dark:bg-white dark:text-neutral-900">
          <Plus size={16} />
          <span className="hidden sm:inline">New</span>
        </button>
        <button onClick={onSave} className="inline-flex items-center gap-2 rounded-lg border border-neutral-300/80 bg-white/70 px-3 py-2 text-neutral-800 transition hover:bg-white active:scale-95 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-100">
          <Save size={16} />
          <span className="hidden sm:inline">Save</span>
        </button>
        <button onClick={onDelete} className="inline-flex items-center gap-2 rounded-lg border border-neutral-300/80 bg-white/70 px-3 py-2 text-red-600 transition hover:bg-white active:scale-95 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-red-400">
          <Trash2 size={16} />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-neutral-500 dark:text-neutral-400">
            <Search size={16} />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-56 rounded-lg border border-neutral-300/80 bg-white/70 py-2 pl-8 pr-3 text-sm text-neutral-900 outline-none ring-0 placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-100"
          />
        </div>
        <button onClick={onToggleTheme} className="inline-flex items-center justify-center rounded-lg border border-neutral-300/80 bg-white/70 p-2 text-neutral-700 transition hover:bg-white active:scale-95 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-200">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
}
