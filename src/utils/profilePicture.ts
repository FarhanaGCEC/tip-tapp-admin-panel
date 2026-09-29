const DEFAULT_AVATAR = '/default-avatar.png'

/** Bundled TipApp avatars under src/assets/images/avatars/** */
const avatarModules = import.meta.glob<{ default: string }>(
  '/src/assets/images/avatars/**/*.{png,jpg,jpeg,webp,svg}',
  { eager: true }
)

const localAvatarByPath: Record<string, string> = {}

Object.entries(avatarModules).forEach(([modulePath, mod]) => {
  const marker = '/avatars/'
  const idx = modulePath.indexOf(marker)
  if (idx === -1) return
  // e.g. girl-avatar/girl-2.png
  const relative = modulePath.slice(idx + marker.length)
  localAvatarByPath[relative] = mod.default
  localAvatarByPath[`avatars/${relative}`] = mod.default
  localAvatarByPath[`/avatars/${relative}`] = mod.default
})

/**
 * Extract avatar relative path from full URL or path.
 * e.g. https://app.../avatars/girl-avatar/girl-2.png → girl-avatar/girl-2.png
 */
function extractAvatarRelativePath(url: string): string | null {
  const match = url.match(/\/avatars\/(.+)$/i)
  if (!match?.[1]) return null
  // strip query/hash
  return match[1].split('?')[0].split('#')[0]
}

/**
 * Resolve user photo URL.
 * - TipApp /avatars/... paths (full or relative) → local bundled asset when present
 * - Other full/relative URLs → pass through as-is
 * - Empty/null → default avatar
 */
export function getProfilePictureUrl(url?: string | null): string {
  const trimmed = typeof url === 'string' ? url.trim() : ''
  if (!trimmed) return DEFAULT_AVATAR

  const relative = extractAvatarRelativePath(trimmed)
  if (relative) {
    const local =
      localAvatarByPath[relative] ||
      localAvatarByPath[`/avatars/${relative}`] ||
      localAvatarByPath[`avatars/${relative}`]
    if (local) return local
  }

  // Exact relative path match (e.g. /avatars/girl-avatar/girl-2.png already handled above)
  if (localAvatarByPath[trimmed]) return localAvatarByPath[trimmed]

  return trimmed
}

export { DEFAULT_AVATAR }
