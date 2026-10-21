'use client';

import Image, { type ImageProps } from 'next/image';
import { mediaImageLoaderFor } from '@bengo-hub/shared-ui-lib/media';

/**
 * next/image for stored estate photos. Photos on the codevertexafrica.com zone are resized by
 * Cloudflare Image Transformations (shared-ui-lib/media); local assets keep Next's optimizer.
 * A client component because a loader is a function, which a server component cannot pass to
 * next/image.
 */
export function MediaPhoto(props: ImageProps & { src: string }) {
  return <Image {...props} loader={mediaImageLoaderFor(props.src)} />;
}
