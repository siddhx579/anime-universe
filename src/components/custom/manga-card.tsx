import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Star, BookOpen, Calendar } from "lucide-react"

interface MangaCardProps {
    id: number
    title: string
    image: string
    score: number
    volumes: number
    chapters: number
    year?: number
    genres: string[]
}

export function MangaCard({ id, title, image, score, volumes, chapters, year, genres }: MangaCardProps) {
    return (
        <Link href={`/manga/${id}`}>
            <div className="anime-card group h-full">
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                    <Image
                        src={image || "/placeholder.svg?height=450&width=300"}
                        alt={title}
                        width={300}
                        height={450}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="absolute bottom-0 left-0 w-full p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex flex-wrap gap-1">
                            {genres.slice(0, 3).map((genre, index) => (
                                <Badge key={index} variant="secondary" className="bg-purple-600/80 text-white">
                                    {genre}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="mb-2 line-clamp-2 font-bold leading-tight">{title}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                        {score > 0 && (
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                <span>{score.toFixed(1)}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>
                                {volumes > 0 ? `${volumes} vols` : "?"} • {chapters > 0 ? `${chapters} ch` : "?"}
                            </span>
                        </div>
                        {year && (
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{year}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}