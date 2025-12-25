"use client"

import { useState } from "react"

export function Editor() {
  const [content, setContent] = useState(
    `;; This buffer is for text that is not saved.
;; Type C-x C-s to save the buffer.

* Welcome to the Editor

This is an Emacs-inspired text editor within the desktop environment.`,
  )

  return (
    <div className="h-full flex flex-col bg-[#1c1f20]">
      <div className="flex-1 overflow-auto">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full bg-transparent text-white p-4 font-mono text-sm resize-none outline-none"
          spellCheck={false}
        />
      </div>
      <div className="h-5 bg-[#3465a4] text-white text-xs px-3 flex items-center gap-4 font-mono">
        <span>-UUU:----</span>
        <span>*scratch*</span>
        <span className="ml-auto">Org</span>
      </div>
    </div>
  )
}
