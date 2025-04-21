import Link from "next/link";

export default function NotAuthorized() {
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
      <p>You are not authorized to view this page.</p>
      <Link href="/" className="text-blue-500">Go to Home</Link>
    </div>
  );
}
