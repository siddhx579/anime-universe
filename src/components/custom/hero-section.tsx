import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/placeholder.svg?height=800&width=1920"
                    alt="Anime hero background"
                    width={1920}
                    height={800}
                    className="h-full w-full object-cover opacity-30"
                    priority
                />
                <div className="absolute inset-0 hero-gradient"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 py-16 md:py-24 lg:py-32">
                <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white">
                            Discover Your Next Anime Adventure
                        </h1>
                        <p className="max-w-[600px] text-lg text-gray-200 md:text-xl">
                            Explore thousands of anime and manga titles with detailed information about episodes, characters, voice
                            actors, and more.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                            >
                                <Link href="/trending">Explore Trending</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-purple-500 text-white hover:bg-purple-950/30">
                                <Link href="/search">Search Anime</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="relative h-[400px] w-full">
                            <div className="absolute -right-20 top-0 h-[350px] w-[280px] rotate-6 overflow-hidden rounded-xl shadow-2xl">
                                <Image
                                    src="/zoro.png"
                                    alt="Featured anime"
                                    width={280}
                                    height={350}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="absolute left-10 top-20 h-[350px] w-[280px] -rotate-6 overflow-hidden rounded-xl shadow-2xl">
                                <Image
                                    src="/jinwoo.png"
                                    alt="Featured anime"
                                    width={280}
                                    height={350}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}