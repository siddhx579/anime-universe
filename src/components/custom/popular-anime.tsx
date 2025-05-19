import { Film } from "lucide-react"
import Link from "next/link"
import { AnimeCard } from "./anime-card"

async function getPopularAnime() {
    try {
        const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=8", {
            next: { revalidate: 3600 },
        })
        if (!response.ok) throw new Error("Failed to fetch popular anime")
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error("Error fetching popular anime:", error)
        return []
    }
}

export async function PopularAnime() {
    const popularAnime = await getPopularAnime()

    return (
        <section className="mb-12">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Film className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Popular Anime</h2>
                </div>
                <Link href="/anime" className="text-sm font-medium text-primary hover:underline">
                    View All
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {popularAnime.length > 0 ? (
                    popularAnime.map((anime: any) => (
                        <AnimeCard
                            key={anime.mal_id}
                            id={anime.mal_id}
                            title={anime.title}
                            image={anime.images.jpg.large_image_url}
                            score={anime.score || 0}
                            episodes={anime.episodes || 0}
                            year={anime.year}
                            season={anime.season}
                            genres={anime.genres.map((g: any) => g.name)}
                        />
                    ))
                ) : (
                    <div className="glass-effect col-span-full flex items-center justify-center p-12 text-center">
                        <p>Loading popular anime...</p>
                    </div>
                )}
            </div>
        </section>
    )
}