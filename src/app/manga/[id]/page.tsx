import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, BookOpen, ExternalLink } from "lucide-react"

async function getMangaDetails(id: string) {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/manga/${id}/full`, { next: { revalidate: 3600 } })
        if (!response.ok) throw new Error("Failed to fetch manga details")
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error("Error fetching manga details:", error)
        return null
    }
}

async function getMangaCharacters(id: string) {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/manga/${id}/characters`, { next: { revalidate: 3600 } })
        if (!response.ok) throw new Error("Failed to fetch manga characters")
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error("Error fetching manga characters:", error)
        return []
    }
}

export default async function MangaPage({ params }: { params: { id: string } }) {
    const manga = await getMangaDetails(params.id)
    const characters = await getMangaCharacters(params.id)

    if (!manga) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="glass-effect flex flex-col items-center justify-center p-12 text-center">
                    <h1 className="mb-4 text-2xl font-bold">Manga Not Found</h1>
                    <p className="mb-6">The manga you're looking for doesn't exist or couldn't be loaded.</p>
                    <Button asChild>
                        <Link href="/">Return Home</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="relative mb-8 overflow-hidden rounded-xl">
                    <div className="absolute inset-0">
                        <Image
                            src={manga.images.jpg.large_image_url || "/placeholder.svg?height=500&width=1200"}
                            alt={manga.title}
                            width={1200}
                            height={500}
                            className="h-full w-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                    </div>

                    <div className="relative z-10 grid gap-6 p-6 md:grid-cols-[300px_1fr] md:gap-8 md:p-8">
                        <div className="mx-auto w-full max-w-[300px]">
                            <div className="overflow-hidden rounded-lg shadow-lg">
                                <Image
                                    src={manga.images.jpg.large_image_url || "/placeholder.svg?height=450&width=300"}
                                    alt={manga.title}
                                    width={300}
                                    height={450}
                                    className="h-auto w-full"
                                />
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {manga.genres.map((genre: any) => (
                                    <Badge key={genre.mal_id} className="bg-primary">
                                        {genre.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <h1 className="mb-2 text-3xl font-bold md:text-4xl">{manga.title}</h1>
                            {manga.title_english && manga.title_english !== manga.title && (
                                <h2 className="mb-4 text-xl text-muted-foreground">{manga.title_english}</h2>
                            )}

                            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Rating</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                                        <span className="text-lg font-semibold">{manga.score || "N/A"}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Volumes</span>
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="h-5 w-5" />
                                        <span className="text-lg font-semibold">{manga.volumes || "?"}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Chapters</span>
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="h-5 w-5" />
                                        <span className="text-lg font-semibold">{manga.chapters || "?"}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Status</span>
                                    <span className="text-lg font-semibold">{manga.status}</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="mb-2 text-lg font-semibold">Synopsis</h3>
                                <p className="line-clamp-4 text-muted-foreground md:line-clamp-none">{manga.synopsis}</p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button className="gap-2">
                                    <Heart className="h-4 w-4" />
                                    Add to Favorites
                                </Button>
                                {manga.url && (
                                    <Button variant="outline" asChild>
                                        <a href={manga.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                                            <ExternalLink className="h-4 w-4" />
                                            View on MyAnimeList
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Tabs */}
                <Tabs defaultValue="details" className="glass-effect p-6">
                    <TabsList className="grid w-full grid-cols-3 md:w-auto">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="characters">Characters</TabsTrigger>
                        <TabsTrigger value="related">Related</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="mt-6">
                        <div className="grid gap-8 md:grid-cols-2">
                            <div>
                                <h3 className="mb-4 text-xl font-semibold">Information</h3>
                                <dl className="grid gap-2">
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Type:</dt>
                                        <dd>{manga.type}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Volumes:</dt>
                                        <dd>{manga.volumes || "Unknown"}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Chapters:</dt>
                                        <dd>{manga.chapters || "Unknown"}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Status:</dt>
                                        <dd>{manga.status}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Published:</dt>
                                        <dd>{manga.published?.string || "Unknown"}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Authors:</dt>
                                        <dd>
                                            {manga.authors.length > 0
                                                ? manga.authors.map((author: any) => author.name).join(", ")
                                                : "Unknown"}
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Serialization:</dt>
                                        <dd>
                                            {manga.serializations.length > 0
                                                ? manga.serializations.map((s: any) => s.name).join(", ")
                                                : "Unknown"}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div>
                                <h3 className="mb-4 text-xl font-semibold">Statistics</h3>
                                <dl className="grid gap-2">
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Score:</dt>
                                        <dd className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                            {manga.score || "N/A"} (
                                            {manga.scored_by ? `${(manga.scored_by / 1000).toFixed(1)}K users` : "N/A"})
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Ranked:</dt>
                                        <dd>#{manga.rank || "N/A"}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Popularity:</dt>
                                        <dd>#{manga.popularity || "N/A"}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Members:</dt>
                                        <dd>{manga.members ? `${(manga.members / 1000000).toFixed(2)}M` : "N/A"}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Favorites:</dt>
                                        <dd>{manga.favorites ? `${(manga.favorites / 1000).toFixed(1)}K` : "N/A"}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="characters" className="mt-6">
                        <h3 className="mb-6 text-xl font-semibold">Characters</h3>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {characters.length > 0 ? (
                                characters.slice(0, 9).map((character: any) => (
                                    <div key={character.character.mal_id} className="glass-effect overflow-hidden rounded-lg p-4">
                                        <div className="flex gap-4">
                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                                                <Image
                                                    src={character.character.images.jpg.image_url || "/placeholder.svg?height=96&width=96"}
                                                    alt={character.character.name}
                                                    width={96}
                                                    height={96}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold">{character.character.name}</h4>
                                                <p className="text-sm text-muted-foreground">{character.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center">
                                    <p>No character information available.</p>
                                </div>
                            )}
                        </div>
                        {characters.length > 9 && (
                            <div className="mt-6 text-center">
                                <Button variant="outline">View All Characters</Button>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="related" className="mt-6">
                        <h3 className="mb-6 text-xl font-semibold">Related Anime & Manga</h3>
                        {manga.relations && manga.relations.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2">
                                {manga.relations.map((relation: any, index: number) => (
                                    <div key={index} className="glass-effect rounded-lg p-4">
                                        <h4 className="mb-2 font-semibold">{relation.relation}</h4>
                                        <ul className="space-y-2">
                                            {relation.entry.map((entry: any) => (
                                                <li key={entry.mal_id} className="flex items-center gap-2">
                                                    {entry.type === "anime" ? (
                                                        <BookOpen className="h-4 w-4 text-primary" />
                                                    ) : (
                                                        <BookOpen className="h-4 w-4 text-primary" />
                                                    )}
                                                    <Link href={`/${entry.type}/${entry.mal_id}`} className="hover:text-primary hover:underline">
                                                        {entry.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center">
                                <p>No related anime or manga information available.</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    )
}