import { Button } from "@/components/ui/button"

interface DonationPost {
    id: number
    schoolName: string
    needs: string
    fundsNeeded: number
    isRecommendation: boolean
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

  export default DonationCard