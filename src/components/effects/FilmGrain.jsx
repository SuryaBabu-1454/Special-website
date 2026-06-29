export default function FilmGrain({ opacity = 0.025 }) {
  return (
    <div
      className="film-grain pointer-events-none fixed inset-0"
      style={{ opacity, zIndex: 1 }}
      aria-hidden="true"
    />
  )
}
