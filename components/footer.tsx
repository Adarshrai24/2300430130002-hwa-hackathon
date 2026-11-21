export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>PulsePuzzle &mdash; Engagement that adapts to your dog.</p>
          <p>Premium, science-backed, veterinarian-endorsed.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-teal-700">Privacy</a>
            <a href="#" className="hover:text-teal-700">Terms</a>
            <a href="#" className="hover:text-teal-700">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
