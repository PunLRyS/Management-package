import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen w-full">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        src="/video_background.mp4"
        autoPlay
        loop
        muted
      />
      <div className="flex flex-col items-center justify-center h-full backdrop-blur-sm">
        <h1 className="text-white text-4xl font-bold mb-4">Welcome to My Website</h1>
        <p className="text-white text-lg mb-6">This is a sample website with a video background.</p>
        <div className="flex space-x-4">
          <Link href="/ex_package" className="style-button">
          Go to export pakage page 
          </Link>
          <Link href="/im_package" className="style-button">
          Go to import pakage page
          </Link> 
        </div>
      </div>
    </div>
  );
}
