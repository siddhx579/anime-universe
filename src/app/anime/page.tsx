import { AnimeCard } from "@/components/custom/anime-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

async function getTopAnime(filter = "bypopularity", page = 1) {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/top/anime?filter=${filter}&page=${page}&limit=24`, {
            next: { revalidate: 3600 },
        })
        if (!response.ok) throw new Error("Failed to fetch top anime")
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error("Error fetching top anime:", error)
        return []
    }
}

export default async function AnimePage({ searchParams }: { searchParams: { filter?: string; page?: string } }) {
    const filter = searchParams.filter || "bypopularity"
    const page = Number.parseInt(searchParams.page || "1")

    const topAnime = await getTopAnime(filter, page)
    const nextPage = page + 1
    const prevPage = page > 1 ? page - 1 : 1

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-6 text-3xl font-bold">Anime</h1>

                <div className="glass-effect mb-8 p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-xl font-semibold">Browse Anime</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Sort by:</span>
                            <Select defaultValue={filter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bypopularity">Popularity</SelectItem>
                                    <SelectItem value="favorite">Favorites</SelectItem>
                                    <SelectItem value="score">Score</SelectItem>
                                    <SelectItem value="airing">Currently Airing</SelectItem>
                                    <SelectItem value="upcoming">Upcoming</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {topAnime.length > 0 ? (
                        topAnime.map((anime: any) => (
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
                        <div className="col-span-full flex items-center justify-center p-12 text-center">
                            <p>Loading anime...</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 flex justify-center gap-2">
                    <Button variant="outline" disabled={page <= 1} asChild>
                        <Link href={`/anime?filter=${filter}&page=${prevPage}`}>Previous</Link>
                    </Button>
                    <Button variant="outline">Page {page}</Button>
                    <Button variant="outline" asChild>
                        <Link href={`/anime?filter=${filter}&page=${nextPage}`}>Next</Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}