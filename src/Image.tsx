'use client';

import { imageConfigDefault as nextImageConfigDefault } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext as NextImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';
import NextImage from 'next/image';
import type { ImageConfig } from 'next/dist/shared/lib/image-config';
import type {
  ImageLoaderProps as NextImageLoaderProps,
  ImageProps as NextImageProps,
} from 'next/image';

export type ImageProps = Omit<NextImageProps, 'loader'> & {
  // Change the loader function's signature to make it more flexible.
  // See below for more details.
  loader: ImageLoader;
} & {
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

export default function Image(props: ImageProps) {
  const { config, loader, ...imageProps } = props;

  if (!loader) {
    // next/image generates Next.js-specific URLs for statically imported and
    // local images. By requiring a loader, we ensure that there is a way to
    // generate a URL that makes sense in any environment.
    throw new Error('The loader prop is required for the Image component');
  }

  // Custom loader functions in next/image only accept the `src`, `width`, and
  // `quality` parameters.
  // @see https://nextjs.org/docs/app/api-reference/components/image#loader
  // To make the loader function even more flexible in this component, we also
  // pass in the image props.
  const wrappedLoader = ({ src, width, quality }: NextImageLoaderProps) => {
    // It's important to note that the `src`, `width`, and `quality` parameters
    // here are not the same as in the image props. E.g. while generating
    // responsive styles (in case the `sizes` prop is passed to the component),
    // this function will be called with different widths.
    return loader({ src, width, quality, imageProps } as ImageLoaderParams);
  };

  const imageConfig = {
    ...nextImageConfigDefault,
    ...config,
    // Ensure the following config options are not set — they are specific to
    // the server-side logic in next/image.
    // @see https://nextjs.org/docs/app/api-reference/components/image#configuration-options
    localPatterns: [],
    remotePatterns: [],
    domains: [],
    loaderFile: '',
  };

  return (
    <NextImageConfigContext.Provider value={imageConfig}>
      <NextImage {...imageProps} loader={wrappedLoader} />
    </NextImageConfigContext.Provider>
  );
}
