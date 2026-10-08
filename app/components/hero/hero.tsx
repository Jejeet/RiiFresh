import { Button } from "@/components/ui/button"
import Link from "next/link"
import hero from "../../../assets/hero zobo.jpeg"
import Image from "next/image"

const Hero = () => {
  return (
    <div>
        <section className="relative overflow-hidden surface-dark bg-orange-800">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:pb-28 lg:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-foreground bg-yellow-300">
              New season press
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
              Drink
              <span className="block  text-yellow-300">something</span>
              alive.
            </h1>
            <p className="mt-6 max-w-md text-lg opacity-85">
              Fresh brewed Zobo juice. 
              Bottled and delivered chilled.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button  size="lg" variant="secondary" className="rounded-full px-8 text-base">
                <Link href="/shop">Shop the fridge</Link>
              </Button>
              <Button
            
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground/40 bg-transparent px-8 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="/rewards">Join rewards</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-[3rem] bg-accent/10 blur-3xl" aria-hidden />
            <Image
              src={hero}
              alt="Three bottles of cold-pressed juice surrounded by flying fruit and splashes"
              width={1600}
              height={1104}
              className="relative w-full rounded-[2.5rem] object-cover"
            />
          </div>
        </div>
      </section>


    </div>
  )
}

export default Hero