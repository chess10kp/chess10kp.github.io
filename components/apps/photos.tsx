export function Photos() {
  const photos = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <div className="h-full bg-[#1c1f20] p-4 overflow-auto">
      <div className="grid grid-cols-3 gap-3">
        {photos.map((num) => (
          <div
            key={num}
            className="aspect-square rounded bg-gradient-to-br from-[#75507b]/20 to-[#75507b]/5 border border-[#75507b]/30 flex items-center justify-center text-white/30 text-sm"
          >
            Photo {num}
          </div>
        ))}
      </div>
    </div>
  )
}
