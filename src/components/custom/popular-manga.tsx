import { BookOpen } from "lucide-react"
import Link from "next/link"
import { MangaCard } from "./manga-card"

async function getPopularManga() {
    try {
        const response = await fetch("https://api.jikan.moe/v4/top/manga?filter=bypopularity&limit=8", {
            next: { revalidate: 3600 },
        })
        if (!response.ok) throw new Error("Failed to fetch popular manga")
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error("Error fetching popular manga:", error)
        return []
    }
}

export async function PopularManga() {
    const popularManga = await getPopularManga()

    return (
        <section className="mb-12">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Popular Manga</h2>
                </div>
                <Link href="/manga" className="text-sm font-medium text-primary hover:underline">
                    View All
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {popularManga.length > 0 ? (
                    popularManga.map((manga: any) => (
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
                    <div className="glass-effect col-span-full flex items-center justify-center p-12 text-center">
                        <p>Loading popular manga...</p>
                    </div>
                )}
            </div>
        </section>
    )
}