import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#FAFAFA] text-[#1A1A2E]">
      <section className="px-4 py-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
              Engagement that adapts to your dog.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              PulsePuzzle is a modular, scent-driven puzzle feeder that adapts
              difficulty in real time. Olfactory stimulation, mechanical
              problem-solving, and variable rewards keep dogs engaged for
              2&ndash;4+ hours per session &mdash; even while you&rsquo;re away.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/product/pulsepuzzle"
                className="px-8 py-4 bg-[#D4A843] text-[#1A1A2E] font-bold rounded-xl text-lg shadow-lg hover:bg-amber-400 transition-colors"
              >
                Shop now &mdash; $89.00
              </Link>
              <Link
                href="#how-it-works"
                className="px-8 py-4 border border-gray-200 text-gray-700 font-bold rounded-xl text-lg hover:bg-gray-50 transition-colors"
              >
                How it works
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "Adaptive difficulty",
                body: "Embedded telemetry tracks solve time and reconfigures each chamber so the challenge scales with your dog&rsquo;s skill.",
              },
              {
                title: "Scent-driven",
                body: "Four swappable scent cartridges (chicken, beef, peanut butter, cheese, bacon, liver) guide your dog chamber to chamber.",
              },
              {
                title: "Safe unsupervised",
                body: "No parts under 80mm, IP67 electronics, sealed 18650 battery, FDA-compliant ABS and TPU. Built for 4-hour solo use.",
              },
            ].map((prop, i) => (
              <div
                key={prop.title}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm"
              >
                <div className="h-12 w-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold mb-6">
                  {i + 1}
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">{prop.title}</h3>
                <p className="text-gray-600">{prop.body}</p>
              </div>
            ))}
          </div>

          <section id="how-it-works" className="mb-20">
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">How it works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Scent trail", body: "A distinct scent gradient guides your dog into chamber one." },
                { step: "2", title: "Mechanical puzzle", body: "Sliding panels, rotating discs, and lift flaps unlock each gate." },
                { step: "3", title: "Micro-reward", body: "Each solved chamber releases kibble and unlocks the next scent." },
                { step: "4", title: "Jackpot", body: "The final chamber pays out a jackpot and adapts for next session." },
              ].map((s) => (
                <div key={s.title} className="text-center">
                  <div className="h-10 w-10 rounded-full bg-[#D4A843] text-[#1A1A2E] flex items-center justify-center text-sm font-bold mx-auto mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-serif font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-y border-gray-200 py-16 mb-16 bg-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold mb-4">Veterinarian-endorsed enrichment</h2>
              <p className="text-gray-600 mb-8">Designed for dogs home alone. 30-day money-back guarantee.</p>
              <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-60 grayscale">
                <span className="text-sm font-semibold">ASTM F963</span>
                <span className="text-sm font-semibold">EN 71</span>
                <span className="text-sm font-semibold">IP67</span>
                <span className="text-sm font-semibold">FDA-compliant</span>
                <span className="text-sm font-semibold">30-day guarantee</span>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
