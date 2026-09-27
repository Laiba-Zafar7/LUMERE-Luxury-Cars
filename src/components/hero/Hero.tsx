import fs from "node:fs";
import path from "node:path";
import { getImageProps } from "next/image";
import HeroView from "./HeroView";

const VIDEO_SRC = "/assets/videos/hero.mp4";

/**
 * Server wrapper: resolves the art-directed poster and only renders the
 * <video> once public/assets/videos/hero.mp4 actually exists.
 */
export default function Hero() {
  const hasVideo = fs.existsSync(
    path.join(process.cwd(), "public", VIDEO_SRC),
  );

  const common = { alt: "", sizes: "100vw", quality: 75 };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: "/assets/images/sections/hero-poster.jpg",
    width: 2560,
    height: 1440,
  });
  const {
    props: { srcSet: mobile, ...img },
  } = getImageProps({
    ...common,
    src: "/assets/images/sections/hero-poster-mobile.jpg",
    width: 1707,
    height: 2560,
  });

  return (
    <HeroView
      poster={{ desktop, mobile, img }}
      videoSrc={hasVideo ? VIDEO_SRC : undefined}
    />
  );
}
