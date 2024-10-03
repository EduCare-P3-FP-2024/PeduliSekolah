import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface DonationPost {
  id: number
  schoolName: string
  needs: string
  fundsNeeded: number
  isRecommendation: boolean
}

const donationPosts: DonationPost[] = [
  {
    id: 1,
    schoolName: "SMAN 69 Curut",
    needs: "Membutuhkan pembelian buku dan pembangunan perpustakaan untuk sarana pembelajaran",
    fundsNeeded: 23000000,
    isRecommendation: true,
  },
  {
    id: 2,
    schoolName: "SMAN 69 Curut",
    needs: "Membutuhkan pembelian buku dan pembangunan perpustakaan untuk sarana pembelajaran",
    fundsNeeded: 23000000,
    isRecommendation: true,
  },
  {
    id: 3,
    schoolName: "SMAN 69 Curut",
    needs: "Membutuhkan pembelian buku dan pembangunan perpustakaan untuk sarana pembelajaran",
    fundsNeeded: 23000000,
    isRecommendation: false,
  },
  {
    id: 4,
    schoolName: "SMAN 69 Curut",
    needs: "Membutuhkan pembelian buku dan pembangunan perpustakaan untuk sarana pembelajaran",
    fundsNeeded: 23000000,
    isRecommendation: false,
  },
]

export default function DonationList() {
  const recommendationPosts = donationPosts.filter(post => post.isRecommendation)
  const regularPosts = donationPosts.filter(post => !post.isRecommendation)

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">List Post</h1>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Sort</span>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-gray-600" />
            </Button>
          </div>
        </header>

        <Input type="search" placeholder="SEARCH" className="mb-6 rounded-full bg-white" />

        <div className="space-y-6">
          {recommendationPosts.length > 0 && (
            <div className="bg-amber-100 p-4 rounded-lg">
              <div className="bg-amber-200 text-amber-800 px-3 py-1 rounded-t-lg inline-block mb-4">
                Rekomendasi
              </div>
              <div className="space-y-4">
                {recommendationPosts.map((post, index) => (
                  <DonationCard key={post.id} post={post} isFirst={index === 0} />
                ))}
              </div>
            </div>
          )}
          <div className="space-y-4">
            {regularPosts.map((post) => (
              <DonationCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DonationCard({ post, isFirst = false }: { post: DonationPost; isFirst?: boolean }) {
  return (
    <div
      className={`bg-white p-4 rounded-lg flex shadow-md ${
        isFirst ? "rounded-t-none" : ""
      }`}
    >
      <div className="bg-red-400 w-40 h-40 flex-shrink-0 mr-6 flex items-center justify-center text-white rounded-lg shadow-sm overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          Picture
        </div>
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-gray-800 text-xl mb-2">{post.schoolName}</h2>
          <p className="text-sm mb-4 text-gray-600">{post.needs}</p>
          <p className="text-sm mb-4 text-gray-700">
            Funds Needed : Rp {post.fundsNeeded.toLocaleString()}
          </p>
        </div>
        <div className="flex justify-between">
          <Button
            variant="secondary"
            className="bg-amber-600 text-white hover:bg-amber-700 rounded-full px-6"
          >
            DONATE
          </Button>
          <Button variant="outline" className="bg-white rounded-full text-amber-600 border-amber-600 hover:bg-amber-50 px-6">
            Details
          </Button>
        </div>
      </div>
    </div>
  )
}