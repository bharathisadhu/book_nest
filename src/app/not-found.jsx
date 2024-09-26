import Link from "next/link";

 
export default function NotFound() {
  return (
    <div className="error-container">
      <h2 className="error-title">Page Not found</h2>
      <p className="error-message" >Could not find requested resource</p>
      <Link href="/" className="home-link">Return Home</Link>
    </div>
  )
}