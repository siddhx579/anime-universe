import { AnimeCard } from "@/components/custom/anime-card"
import { MangaCard } from "@/components/custom/manga-card"
import { SearchBar } from "@/components/custom/search-bar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

async function searchAnime(query: string) {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=12`, {
            cache: "no-store",
        })
        if (!response.ok) throw new Error("Failed to fetch anime search results")
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error("Error searching anime:", error)
        return []
    }
}

async function searchManga(query: string) {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query)}&limit=12`, {
            cache: "no-store",
        })
        if (!response.ok) throw new Error("Failed to fetch manga search results")
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error("Error searching manga:", error)
        return []
    }
}

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
    const query = searchParams.q || ""

    let animeResults: any[] = []
    let mangaResults: any[] = []

    if (query) {
        animeResults = await searchAnime(query)
        mangaResults = await searchManga(query)
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-6 text-3xl font-bold">Search Results</h1>

                <SearchBar />

                {query ? (
                    <>
                        <div className="mb-6 mt-8">
                            <h2 className="text-xl font-semibold">
                                {animeResults.length + mangaResults.length > 0
                                    ? `Results for "${query}"`
                                    : `No results found for "${query}"`}
                            </h2>
                        </div>

                        <Tabs defaultValue="anime" className="glass-effect p-6">
                            <TabsList className="grid w-full grid-cols-2 md:w-auto">
                                <TabsTrigger value="anime">Anime ({animeResults.length})</TabsTrigger>
                                <TabsTrigger value="manga">Manga ({mangaResults.length})</TabsTrigger>
                            </TabsList>

                            <TabsContent value="anime" className="mt-6">
                                {animeResults.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                        {animeResults.map((anime) => (
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
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p>No anime found matching your search.</p>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="manga" className="mt-6">
                                {mangaResults.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                        {mangaResults.map((manga) => (
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
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p>No manga found matching your search.</p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </>
                ) : (
                    <div className="glass-effect flex flex-col items-center justify-center p-12 text-center">
                        <h2 className="mb-4 text-2xl font-bold">Search for Anime & Manga</h2>
                        <p className="mb-6 max-w-2xl text-muted-foreground">
                            Enter a search term above to find your favorite anime and manga titles, characters, or voice actors.
                        </p>
                    </div>
                )}
            </div>
        </main>
    )
}