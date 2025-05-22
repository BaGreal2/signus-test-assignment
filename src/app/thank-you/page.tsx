import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-page)] px-4">
      <div className="max-w-md w-full bg-[var(--bg-card)] rounded-lg shadow-md p-8 text-center space-y-6">
        <h1 className="text-3xl font-semibold text-[var(--fg-default)]">
          Thank you!
        </h1>
        <p className="text-gray-600">
          Your assignment has been successfully submitted. We’ll review it and get back to you soon.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
