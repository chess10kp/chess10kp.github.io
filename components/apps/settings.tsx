import { Monitor, Palette, Keyboard, Bell } from "lucide-react"

export function Settings() {
  const sections = [
    { name: "Display", icon: Monitor },
    { name: "Appearance", icon: Palette },
    { name: "Keyboard", icon: Keyboard },
    { name: "Notifications", icon: Bell },
  ]

  return (
    <div className="h-full bg-[#1c1f20] p-4">
      <div className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.name}
              className="w-full flex items-center gap-3 px-4 py-3 rounded border border-[#555753] hover:border-[#3465a4] hover:bg-white/5 transition-colors"
            >
              <Icon className="w-5 h-5 text-[#555753]" />
              <span className="text-sm text-white">{section.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
