interface AvatarProps {
  name: string
  imageUrl?: string
}

export default function Avatar({ name, imageUrl }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return imageUrl ? (
    <img
      src={imageUrl}
      alt={name}
      className="h-16 w-16 rounded-full object-cover"
    />
  ) : (
    <div className="h-16 w-16 rounded-full bg-brand-tint text-brand flex items-center justify-center font-semibold">
      {initials}
    </div>
  )
}
