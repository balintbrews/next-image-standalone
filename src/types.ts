import type { ImageConfig } from 'next/dist/shared/lib/image-config';
import type {
  ImageLoaderProps as NextImageLoaderProps,
  ImageProps as NextImageProps,
} from 'next/image';

export type { NextImageLoaderProps };

export type ImageProps = Omit<NextImageProps, 'loader'> & {
  // Change the loader function's signature to make it more flexible.
  // See below for more details.
  loader: ImageLoader;
  // Also accept a `config` prop for what would normally be configured in
  // next.config.js.
  config?: Omit<
    ImageConfig,
    // The following config options are specific to the server-side logic in
    // next/image, so we omit them from the config's type.
    // @see https://nextjs.org/docs/app/api-reference/components/image#configuration-options
    'localPatterns' | 'remotePatterns' | 'domains' | 'loaderFile'
  >;
};

export type ImageLoaderParams = NextImageLoaderProps & {
  imageProps: Omit<NextImageProps, 'loader'>;
};
export type ImageLoader = (params: ImageLoaderParams) => string;
