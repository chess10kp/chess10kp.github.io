import { Folder, FileText, ImageIcon } from "lucide-react"

export function Files() {
  const items = [
    { name: "Documents", type: "folder", icon: Folder },
    { name: "Pictures", type: "folder", icon: Folder },
    { name: "Downloads", type: "folder", icon: Folder },
    { name: "readme.txt", type: "file", icon: FileText },
    { name: "notes.org", type: "file", icon: FileText },
    { name: "photo.jpg", type: "file", icon: ImageIcon },
  ]

  return (
    <div className="h-full bg-[#1c1f20] p-4">
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.name}
              className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 text-left"
            >
              <Icon
                className="w-5 h-5"
                style={{
                  color: item.type === "folder" ? "#f57900" : "#3465a4",
                }}
              />
              <span className="text-sm text-white">{item.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
