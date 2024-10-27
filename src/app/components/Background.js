import Spline from '@splinetool/react-spline/next';

export default function Background() {
  return (
    <main className="absolute inset-0 z-0">
      <Spline
        scene="https://prod.spline.design/wjU8RGCrzKBabnlh/scene.splinecode" 
        className="w-full h-full"
      />
    </main>
  );
}