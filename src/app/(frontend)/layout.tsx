/**
 * (frontend) route group layout.
 * Inherits the root layout (Navbar, globals.css).
 * Exists so we can scope front-end pages separately from /admin.
 */
export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
