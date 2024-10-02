import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import studentBg from "@/assets/studentbg.jpg";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-slate-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-full overflow-hidden bg-[#DE2F69] shadow-2xl">
        <CardContent className="p-0 flex">
          <div className="w-1/2 p-8 space-y-6">
            <h1 className="text-3xl font-bold text-white">SekolahPedia.</h1>
            <p className="text-md text-gray-200 font-semibold">
              to help those in need
            </p>
            <form className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                className="border-[#911F45] bg-white text-black font-semibold placeholder-gray-400 focus:border-pink-700 focus:ring-pink-700 focus:outline-none focus:shadow-xl"
              />
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Password"
                  className="border-[#911F45] bg-white text-black font-semibold placeholder-gray-400 focus:border-pink-700 focus:ring-pink-700 focus:outline-none focus:shadow-xl"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>
              </div>
              <Button className="w-full bg-[#BA2758] hover:bg-[#a02249] text-white hover:shadow-xl">
                Log In
              </Button>
            </form>
            <div className="text-center text-sm text-gray-200 font-semibold">
              Or Continue with
            </div>
            <Button
              variant="outline"
              className="w-full bg-gray-100 text-black hover:text-white hover:border-[#DE2F69] hover:bg-[#521327] hover:shadow-xl"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_13183_10121)">
                  <path
                    d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                    fill="#3F83F8"
                  />
                  <path
                    d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13183_10121">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </Button>
          </div>
          <div className="w-1/2 relative">
            <Image
              src={studentBg}
              alt="Classroom"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
