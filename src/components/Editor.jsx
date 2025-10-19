import { useEffect, useRef } from 'react';

export default function Editor({ note, onChange }) {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    // Auto-focus title on first create
    if (note && titleRef.current && note.title === 'Untitled') {
      titleRef.current.focus();
      titleRef.current.select();
    }
  }, [note?.id]);

  if (!note) {
    return (
      <div className="flex h-[50vh] items-center justify-center p-6 text-neutral-500 dark:text-neutral-400">
        Select or create a note to begin.
      </div>
    );
  }

  return (
    <div className="flex h-[60vh] md:h-[70vh] lg:h-[75vh] flex-col">
      <div className="border-t border-neutral-200/70 p-4 dark:border-neutral-800">
        <input
          ref={titleRef}
          value={note.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Title"
          className="w-full bg-transparent text-2xl font-semibold tracking-tight outline-none placeholder:text-neutral-400"
        />
      </div>
      <div className="h-px w-full bg-neutral-200/70 dark:bg-neutral-800" />
      <div className="custom-scrollbar grow overflow-y-auto p-4">
        <textarea
          ref={bodyRef}
          value={note.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="Start typing..."
          className="min-h-full w-full resize-none bg-transparent text-base leading-7 outline-none placeholder:text-neutral-400"
        />
      </div>
    </div>
  );
}
