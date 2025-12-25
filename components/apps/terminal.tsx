"use client"

import { useState, useRef, useEffect } from "react"

export function Terminal() {
  const [history, setHistory] = useState<string[]>([
    "GNU Emacs-inspired Terminal Emulator",
    "Type 'help' for available commands",
    "",
  ])
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    inputRef.current?.focus()
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    setHistory([...history, `$ ${trimmed}`, executeCommand(trimmed), ""])
    setInput("")
  }

  const executeCommand = (cmd: string): string => {
    switch (cmd.toLowerCase()) {
      case "help":
        return "Available commands: help, clear, date, echo, uname"
      case "clear":
        setTimeout(() => setHistory([]), 0)
        return ""
      case "date":
        return new Date().toString()
      case "uname":
        return "Emacs-inspired Desktop Environment"
      case "":
        return ""
      default:
        if (cmd.startsWith("echo ")) {
          return cmd.substring(5)
        }
        return `command not found: ${cmd}`
    }
  }

  return (
    <div className="h-full bg-[#1c1f20] text-[#4e9a06] p-3 font-mono text-sm overflow-auto">
      <div className="space-y-1">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span>$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCommand(input)
              }
            }}
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
