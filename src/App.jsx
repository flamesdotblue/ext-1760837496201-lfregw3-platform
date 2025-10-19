import { useEffect, useMemo, useState, useCallback } from 'react';
import HeroCover from './components/HeroCover';
import Toolbar from './components/Toolbar';
import NoteList from './components/NoteList';
import Editor from './components/Editor';

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

const LS_NOTES_KEY = 'notepad.notes.v1';
const LS_SELECTED_KEY = 'notepad.selectedId.v1';
const LS_THEME_KEY = 'notepad.theme.v1';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_NOTES_KEY) || '[]');
      setNotes(saved);
      const sel = localStorage.getItem(LS_SELECTED_KEY);
      if (sel) setSelectedId(sel);
      const theme = localStorage.getItem(LS_THEME_KEY) || 'system';
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const dark = theme === 'dark' || (theme === 'system' && prefersDark);
      setIsDark(dark);
      document.documentElement.classList.toggle('dark', dark);
    } catch {}
  }, []);

  // Persist notes and selectedId
  useEffect(() => {
    try { localStorage.setItem(LS_NOTES_KEY, JSON.stringify(notes)); } catch {}
  }, [notes]);
  useEffect(() => {
    try { if (selectedId) localStorage.setItem(LS_SELECTED_KEY, selectedId); } catch {}
  }, [selectedId]);

  const selectedNote = useMemo(() => notes.find(n => n.id === selectedId) || null, [notes, selectedId]);

  const createNote = useCallback(() => {
    const id = generateId();
    const now = Date.now();
    const newNote = { id, title: 'Untitled', content: '', updatedAt: now };
    setNotes(prev => [newNote, ...prev]);
    setSelectedId(id);
    setSidebarOpen(false);
  }, []);

  const updateNote = useCallback((id, updates) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n));
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (id === selectedId) {
      setSelectedId(prev => {
        const remaining = notes.filter(n => n.id !== id);
        return remaining[0]?.id || null;
      });
    }
  }, [notes, selectedId]);

  const saveNote = useCallback(() => {
    // Notes are auto-saved on change; this is a no-op to satisfy UX (can show a toast in future)
    return true;
  }, []);

  // First-run: create a welcome note if none
  useEffect(() => {
    if (notes.length === 0) {
      const id = generateId();
      const now = Date.now();
      const intro = `Welcome to Notepad\n\n- Create a new note with Ctrl/Cmd + N\n- Save with Ctrl/Cmd + S (auto-saves as you type)\n- Search your notes from the sidebar\n\nEnjoy the minimalist, focused writing experience.`;
      const newNote = { id, title: 'Welcome', content: intro, updatedAt: now };
      setNotes([newNote]);
      setSelectedId(id);
    }
  }, []); // run once

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveNote();
      }
      if (mod && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        createNote();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [saveNote, createNote]);

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
    );
  }, [notes, query]);

  const handleToggleTheme = useCallback(() => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem(LS_THEME_KEY, next ? 'dark' : 'light'); } catch {}
  }, [isDark]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <HeroCover onGetStarted={() => {
        const el = document.getElementById('app');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      <section id="app" className="relative -mt-20 md:-mt-28 pb-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-neutral-200/70 bg-white/70 backdrop-blur-xl shadow-xl dark:border-neutral-800 dark:bg-neutral-900/60">
            <Toolbar
              onNew={createNote}
              onDelete={() => selectedNote && deleteNote(selectedNote.id)}
              onSave={saveNote}
              isDark={isDark}
              onToggleTheme={handleToggleTheme}
              onToggleSidebar={() => setSidebarOpen(s => !s)}
              query={query}
              setQuery={setQuery}
            />

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Sidebar */}
              <aside className={`md:col-span-4 lg:col-span-3 border-t md:border-t-0 md:border-r border-neutral-200/70 dark:border-neutral-800 ${sidebarOpen ? 'block' : 'hidden'} md:block`}> 
                <NoteList
                  notes={filteredNotes}
                  selectedId={selectedId}
                  onSelect={(id) => { setSelectedId(id); setSidebarOpen(false); }}
                  onCreate={createNote}
                  query={query}
                  setQuery={setQuery}
                />
              </aside>

              {/* Editor */}
              <main className="md:col-span-8 lg:col-span-9 min-h-[50vh]">
                <Editor
                  note={selectedNote}
                  onChange={(updates) => selectedNote && updateNote(selectedNote.id, updates)}
                />
              </main>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
