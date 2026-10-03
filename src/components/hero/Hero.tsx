import HeroView from "./HeroView";

const VIDEO_SRC = "/assets/videos/hero.mp4";

export default function Hero() {
  return <HeroView videoSrc={VIDEO_SRC} />;
}
