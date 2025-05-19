import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Clock, Calendar, Heart, BookOpen, ExternalLink, Film } from "lucide-react"

// Import the correct types from Next.js
import type { Metadata } from "next"

// Define the correct types for Next.js 15 with React 18
type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

async function getAnimeDetails(id: string) {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`, { next: { revalidate: 3600 } })
        if (!response.ok) throw new Error("Failed to fetch anime details")
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error("Error fetching anime details:", error)
        return null
    }
}

async function getAnimeCharacters(id: string) {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`, { cache: "no-store" })
        if (!response.ok) throw new Error("Failed to fetch anime characters")
        const data = await response.json()
        return data.data.slice(0, 10)
    } catch (error) {
        console.error("Error fetching anime characters:", error)
        return []
    }
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id)

    return {
        title: anime ? `${anime.title} | Anime Universe` : "Anime Details | Anime Universe",
        description: anime?.synopsis || "View detailed information about this anime",
    }
}

// Use the Props type directly
export default async function AnimePage({ params }: Props) {
    const anime = await getAnimeDetails(params.id)
    const characters = await getAnimeCharacters(params.id)

    if (!anime) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="glass-effect flex flex-col items-center justify-center p-12 text-center">
                    <h1 className="mb-4 text-2xl font-bold">Anime Not Found</h1>
                    <p className="mb-6">The anime you&apos;re looking for doesn&apos;t exist or couldn&apos;t be loaded.</p>
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
                            src={anime.images.jpg.large_image_url || "/placeholder.svg?height=500&width=1200"}
                            alt={anime.title}
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
                                    src={anime.images.jpg.large_image_url || "/placeholder.svg?height=450&width=300"}
                                    alt={anime.title}
                                    width={300}
                                    height={450}
                                    className="h-auto w-full"
                                />
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {/* eslint-disable @typescript-eslint/no-explicit-any */}
                                {anime.genres.map((genre: any) => (
                                    <Badge key={genre.mal_id} className="bg-primary">
                                        {genre.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <h1 className="mb-2 text-3xl font-bold md:text-4xl">{anime.title}</h1>
                            {anime.title_english && anime.title_english !== anime.title && (
                                <h2 className="mb-4 text-xl text-muted-foreground">{anime.title_english}</h2>
                            )}

                            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Rating</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                                        <span className="text-lg font-semibold">{anime.score || "N/A"}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Episodes</span>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-5 w-5" />
                                        <span className="text-lg font-semibold">{anime.episodes || "?"}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Year</span>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-5 w-5" />
                                        <span className="text-lg font-semibold">{anime.year || "?"}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Status</span>
                                    <span className="text-lg font-semibold">{anime.status}</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="mb-2 text-lg font-semibold">Synopsis</h3>
                                <p className="line-clamp-4 text-muted-foreground md:line-clamp-none">{anime.synopsis}</p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button className="gap-2">
                                    <Heart className="h-4 w-4" />
                                    Add to Favorites
                                </Button>
                                {anime.url && (
                                    <Button variant="outline" asChild>
                                        <a href={anime.url} target="_blank" rel="noopener noreferrer" className="gap-2">
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
                                        <dd>{anime.type}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Episodes:</dt>
                                        <dd>{anime.episodes || "Unknown"}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Duration:</dt>
                                        <dd>{anime.duration}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Status:</dt>
                                        <dd>{anime.status}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Aired:</dt>
                                        <dd>{anime.aired?.string || "Unknown"}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Season:</dt>
                                        <dd>
                                            {anime.season
                                                ? `${anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} ${anime.year}`
                                                : "Unknown"}
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Studios:</dt>
                                        <dd>
                                            {anime.studios.length > 0
                                                ? anime.studios.map((studio: any) => studio.name).join(", ")
                                                : "Unknown"}
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Source:</dt>
                                        <dd>{anime.source || "Unknown"}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Rating:</dt>
                                        <dd>{anime.rating || "Unknown"}</dd>
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
                                            {anime.score || "N/A"} (
                                            {anime.scored_by ? `${(anime.scored_by / 1000).toFixed(1)}K users` : "N/A"})
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Ranked:</dt>
                                        <dd>#{anime.rank || "N/A"}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Popularity:</dt>
                                        <dd>#{anime.popularity || "N/A"}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Members:</dt>
                                        <dd>{anime.members ? `${(anime.members / 1000000).toFixed(2)}M` : "N/A"}</dd>
                                    </div>
                                    <div className="grid grid-cols-[120px_1fr] gap-2">
                                        <dt className="font-medium text-muted-foreground">Favorites:</dt>
                                        <dd>{anime.favorites ? `${(anime.favorites / 1000).toFixed(1)}K` : "N/A"}</dd>
                                    </div>
                                </dl>

                                {anime.trailer?.embed_url && (
                                    <div className="mt-6">
                                        <h3 className="mb-4 text-xl font-semibold">Trailer</h3>
                                        <div className="overflow-hidden rounded-lg">
                                            <iframe
                                                width="100%"
                                                height="215"
                                                src={anime.trailer.embed_url}
                                                title={`${anime.title} Trailer`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="characters" className="mt-6">
                        <h3 className="mb-6 text-xl font-semibold">Characters & Voice Actors</h3>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {characters.length > 0 ? (
                                characters.map((character: any) => (
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
                                                {character.voice_actors && character.voice_actors.length > 0 && (
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <div className="h-8 w-8 overflow-hidden rounded-full">
                                                            <Image
                                                                src={
                                                                    character.voice_actors[0].person.images.jpg.image_url ||
                                                                    "/placeholder.svg?height=48&width=48" ||
                                                                    "/placeholder.svg"
                                                                }
                                                                alt={character.voice_actors[0].person.name}
                                                                width={48}
                                                                height={48}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs">{character.voice_actors[0].person.name}</p>
                                                            <p className="text-xs text-muted-foreground">{character.voice_actors[0].language}</p>
                                                        </div>
                                                    </div>
                                                )}
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
                        {anime.relations && anime.relations.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2">
                                {anime.relations.map((relation: any, index: number) => (
                                    <div key={index} className="glass-effect rounded-lg p-4">
                                        <h4 className="mb-2 font-semibold">{relation.relation}</h4>
                                        <ul className="space-y-2">
                                            {relation.entry.map((entry: any) => (
                                                <li key={entry.mal_id} className="flex items-center gap-2">
                                                    {entry.type === "anime" ? (
                                                        <Film className="h-4 w-4 text-primary" />
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