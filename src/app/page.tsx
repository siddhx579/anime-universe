import { HeroSection } from "@/components/custom/hero-section";
import { PopularAnime } from "@/components/custom/popular-anime";
import { PopularManga } from "@/components/custom/popular-manga";
import { SearchBar } from "@/components/custom/search-bar";
import { Trending } from "@/components/custom/trending";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <SearchBar />
        <Trending />
        <PopularAnime />
        <PopularManga />
      </div>
    </main>
  )
}