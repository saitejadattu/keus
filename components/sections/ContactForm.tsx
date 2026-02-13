// components/sections/ContactForm.tsx

export default function ContactForm() {
  return (
    <form className="space-y-6">
      <div>
        <input
          type="text"
          placeholder="Full Name"
          suppressHydrationWarning // Add this line
          className="w-full bg-white/5 border border-white/20 rounded-lg px-6 py-4 text-white ..."
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email Address"
          suppressHydrationWarning // Add this line
          className="w-full bg-white/5 border border-white/20 rounded-lg px-6 py-4 text-white ..."
        />
      </div>
      {/* Repeat for Phone Number and Textarea */}
      <div>
        <textarea
          placeholder="Tell us about your space..."
          suppressHydrationWarning // Add this line
          rows={4}
          className="w-full bg-white/5 border border-white/20 rounded-lg px-6 py-4 text-white ..."
        />
      </div>
    </form>
  );
}