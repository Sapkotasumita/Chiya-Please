import { Coffee, Heart, Users } from "lucide-react"

const features = [
  {
    icon: Coffee,
    title: "Authentic Chiya",
    description: "Traditional Nepali tea brewed with love and authentic spices",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every cup is prepared with care and passion",
  },
  {
    icon: Users,
    title: "Community Space",
    description: "A place where friends gather and memories are made",
  },
]

export function About() {
  return (
    <section id="about" className="py-20 texture-warm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--chiya-brown)] mb-4">
              Our Chiya Story
            </h2>
            <div className="w-24 h-1 bg-[var(--chiya-bamboo)] mx-auto rounded-full" />
          </div>

          {/* Story Text */}
          <div className="bg-[var(--chiya-warm)] rounded-2xl p-8 md:p-12 shadow-lg bamboo-border mb-12">
            <p className="text-lg md:text-xl text-[var(--chiya-brown)]/80 leading-relaxed text-center">
              <span className="font-serif text-2xl text-[var(--chiya-brown)]">
                चिया Please!
              </span>{" "}
              is a cozy chiya ghar where people come together to enjoy freshly
              brewed Nepali tea, tasty snacks, and warm conversations. Our goal
              is to create a relaxing space where time slows down and every sip
              feels special.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-[var(--chiya-bamboo)]/20 rounded-full flex items-center justify-center group-hover:bg-[var(--chiya-bamboo)]/40 transition-colors">
                  <feature.icon
                    className="w-10 h-10 text-[var(--chiya-brown)]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-serif text-xl text-[var(--chiya-brown)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--chiya-brown)]/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
