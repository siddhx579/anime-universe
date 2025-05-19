"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X, Film, BookOpen, Home, TrendingUp, Search } from "lucide-react"

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                    <Film className="h-6 w-6" />
                    <span>AnimeUniverse</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                        <Home className="h-4 w-4" />
                        Home
                    </Link>
                    <Link
                        href="/anime"
                        className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
                    >
                        <Film className="h-4 w-4" />
                        Anime
                    </Link>
                    <Link
                        href="/manga"
                        className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
                    >
                        <BookOpen className="h-4 w-4" />
                        Manga
                    </Link>
                    <Link
                        href="/trending"
                        className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
                    >
                        <TrendingUp className="h-4 w-4" />
                        Trending
                    </Link>
                    <Link
                        href="/search"
                        className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
                    >
                        <Search className="h-4 w-4" />
                        Search
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Button variant="outline" size="sm" className="hidden md:flex">
                        Sign In
                    </Button>
                    <Button size="sm" className="hidden md:flex">
                        Sign Up
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="container mx-auto px-4 py-4 md:hidden">
                    <div className="flex flex-col space-y-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Home className="h-5 w-5" />
                            Home
                        </Link>
                        <Link
                            href="/anime"
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Film className="h-5 w-5" />
                            Anime
                        </Link>
                        <Link
                            href="/manga"
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <BookOpen className="h-5 w-5" />
                            Manga
                        </Link>
                        <Link
                            href="/trending"
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <TrendingUp className="h-5 w-5" />
                            Trending
                        </Link>
                        <Link
                            href="/search"
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Search className="h-5 w-5" />
                            Search
                        </Link>
                        <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm" className="flex-1">
                                Sign In
                            </Button>
                            <Button size="sm" className="flex-1">
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}