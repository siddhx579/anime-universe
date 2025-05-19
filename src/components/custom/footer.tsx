import Link from "next/link"
import { Film, Github, Twitter, Instagram } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                            <Film className="h-6 w-6" />
                            <span>AnimeUniverse</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Your ultimate destination for anime and manga information, featuring detailed data on episodes,
                            characters, voice actors, and more.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Explore</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/anime" className="text-muted-foreground hover:text-primary">
                                    Anime
                                </Link>
                            </li>
                            <li>
                                <Link href="/manga" className="text-muted-foreground hover:text-primary">
                                    Manga
                                </Link>
                            </li>
                            <li>
                                <Link href="/trending" className="text-muted-foreground hover:text-primary">
                                    Trending
                                </Link>
                            </li>
                            <li>
                                <Link href="/search" className="text-muted-foreground hover:text-primary">
                                    Search
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Connect</h3>
                        <div className="flex space-x-4">
                            <Link href="https://github.com" className="text-muted-foreground hover:text-primary">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Subscribe to our newsletter for updates on the latest anime and manga releases.
                        </p>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} AnimeUniverse. All rights reserved.</p>
                    <p className="mt-2">
                        Powered by{" "}
                        <a
                            href="https://jikan.moe/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Jikan API
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}