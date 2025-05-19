import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { TrendingUp } from "lucide-react"
import Link from "next/link"
import { AnimeCard } from "./anime-card"

async function getTrendingAnime() {
    try {
        const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=airing&limit=10", {
            next: { revalidate: 3600 },
        })
        if (!response.ok) throw new Error("Failed to fetch trending anime")
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error("Error fetching trending anime:", error)
        return []
    }
}

export async function Trending() {
    const trendingAnime = await getTrendingAnime()

    return (
        <section className="mb-12">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Trending Now</h2>
                </div>
                <Link href="/trending" className="text-sm font-medium text-primary hover:underline">
                    View All
                </Link>
            </div>

            <ScrollArea className="pb-4">
                <div className="flex gap-4">
                    {trendingAnime.length > 0 ? (
                        trendingAnime.map((anime: any) => (
                            <div key={anime.mal_id} className="min-w-[240px] max-w-[240px]">
                                <AnimeCard
                                    id={anime.mal_id}
                                    title={anime.title}
                                    image={anime.images.jpg.large_image_url}
                                    score={anime.score || 0}
                                    episodes={anime.episodes || 0}
                                    year={anime.year}
                                    season={anime.season}
                                    genres={anime.genres.map((g: any) => g.name)}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="glass-effect flex w-full items-center justify-center p-12 text-center">
                            <p>Loading trending anime...</p>
                        </div>
                    )}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </section>
    )
}