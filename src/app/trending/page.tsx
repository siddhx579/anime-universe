import { AnimeCard } from "@/components/custom/anime-card"
import { MangaCard } from "@/components/custom/manga-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

async function getTrendingAnime() {
    try {
        const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=airing&limit=24", {
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

async function getTrendingManga() {
    try {
        const response = await fetch("https://api.jikan.moe/v4/top/manga?filter=publishing&limit=24", {
            next: { revalidate: 3600 },
        })
        if (!response.ok) throw new Error("Failed to fetch trending manga")
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error("Error fetching trending manga:", error)
        return []
    }
}

export default async function TrendingPage() {
    const trendingAnime = await getTrendingAnime()
    const trendingManga = await getTrendingManga()

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-6 text-3xl font-bold">Trending Now</h1>

                <Tabs defaultValue="anime" className="glass-effect p-6">
                    <TabsList className="grid w-full grid-cols-2 md:w-auto">
                        <TabsTrigger value="anime">Anime</TabsTrigger>
                        <TabsTrigger value="manga">Manga</TabsTrigger>
                    </TabsList>

                    <TabsContent value="anime" className="mt-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {trendingAnime.length > 0 ? (
                                trendingAnime.map((anime: any) => (
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
                                    <p>Loading trending anime...</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="manga" className="mt-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {trendingManga.length > 0 ? (
                                trendingManga.map((manga: any) => (
                                    <MangaCard
                                        key={manga.mal_id}
                                        id={manga.mal_id}
                                        title={manga.title}
                                        image={manga.images.jpg.large_image_url}
                                        score={manga.score || 0}
                                        volumes={manga.volumes || 0}
                                        chapters={manga.chapters || 0}
                                        year={manga.published?.prop?.from?.year}
                                        genres={manga.genres.map((g: any) => g.name)}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full flex items-center justify-center p-12 text-center">
                                    <p>Loading trending manga...</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    )
}