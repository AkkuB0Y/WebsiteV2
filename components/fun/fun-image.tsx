import Image, { type ImageProps } from "next/image";

import { resolveFunImageSrc } from "@/lib/fun-image";

type FunImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

export function FunImage({ src, alt, ...props }: FunImageProps) {
  return <Image src={resolveFunImageSrc(src)} alt={alt} {...props} />;
}
