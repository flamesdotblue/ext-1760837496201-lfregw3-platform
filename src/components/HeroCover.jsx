import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function HeroCover({ onGetStarted }) {
  return (
    <header className="relative h-[60vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlays (do not block interaction) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/20 to-white/0 dark:from-neutral-950/90 dark:via-neutral-950/30 dark:to-transparent" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="font-semibold tracking-tight text-4xl sm:text-5xl md:text-6xl">
            Minimal Notepad for Clear Thinking
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300">
            A focused writing space with elegant interactions. Capture ideas, organize notes, and flow.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={onGetStarted}
              className="rounded-full bg-neutral-900 px-6 py-3 text-white shadow-lg transition hover:opacity-90 active:scale-[0.99] dark:bg-white dark:text-neutral-900"
            >
              Start writing
            </button>
            <a
              href="#app"
              className="rounded-full border border-neutral-300/80 bg-white/70 px-6 py-3 text-neutral-900 backdrop-blur-md transition hover:bg-white dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              Explore app
            </a>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
