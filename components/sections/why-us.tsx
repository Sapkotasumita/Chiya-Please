import { Coffee, Wallet, Armchair, Users } from "lucide-react"

const reasons = [
  {
    icon: Coffee,
    title: "Freshly Brewed Tea",
    description: "Every cup is made fresh with premium tea leaves and authentic spices",
  },
  {
    icon: Wallet,
    title: "Affordable Snacks",
    description: "Delicious food that won't break the bank - quality at great prices",
  },
  {
    icon: Armchair,
    title: "Cozy Environment",
    description: "A warm, welcoming space designed for comfort and relaxation",
  },
  {
    icon: Users,
    title: "Perfect Hangout Spot",
    description: "The ideal place to catch up with friends or make new ones",
  },
]

export function WhyUs() {
  return (
    <section id="why-us" className="py-20 texture-bg">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--chiya-brown)] mb-4">
            Why Visit Us?
          </h2>
          <p className="text-[var(--chiya-brown)]/70 max-w-xl mx-auto">
            There are many reasons to make चिया Please! your favorite chiya ghar
          </p>
          <div className="w-24 h-1 bg-[var(--chiya-bamboo)] mx-auto rounded-full mt-4" />
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-[var(--chiya-warm)] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-[var(--chiya-bamboo)]/20 text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-[var(--chiya-leaf)]/10 rounded-full flex items-center justify-center group-hover:bg-[var(--chiya-leaf)]/20 transition-colors">
                <reason.icon
                  className="w-8 h-8 text-[var(--chiya-leaf)]"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-serif text-xl text-[var(--chiya-brown)] mb-3">
                {reason.title}
              </h3>
              <p className="text-[var(--chiya-brown)]/70 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
