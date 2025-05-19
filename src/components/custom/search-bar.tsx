"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <div className="glass-effect mb-8 p-6">
            <h2 className="mb-4 text-2xl font-bold">Find Your Favorite Anime & Manga</h2>
            <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                    type="text"
                    placeholder="Search by title, character, or voice actor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-background/50"
                />
                <Button type="submit">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                </Button>
            </form>
        </div>
    )
}