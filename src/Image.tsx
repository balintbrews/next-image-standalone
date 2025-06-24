'use client';

import { useMemo } from 'react';
import { imageConfigDefault as nextImageConfigDefault } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext as NextImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';
import NextImage from 'next/image';

import type {
  ImageLoaderParams,
  ImageProps,
  NextImageLoaderProps,
} from './types';

function Image(props: ImageProps) {
  const { config, loader, ...imageProps } = props;

  // Disable the following rule, because even though TypeScript knows that
  // `loader` is required, it cannot prove that it is not `undefined` at runtime.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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

  const imageConfig = useMemo(
    () => ({
      ...nextImageConfigDefault,
      ...config,
      // Ensure the following config options are not set — they are specific to
      // the server-side logic in next/image.
      // @see https://nextjs.org/docs/app/api-reference/components/image#configuration-options
      localPatterns: [],
      remotePatterns: [],
      domains: [],
      loaderFile: '',
    }),
    [config],
  );

  return (
    <NextImageConfigContext value={imageConfig}>
      <NextImage {...imageProps} loader={wrappedLoader} />
    </NextImageConfigContext>
  );
}

export default Image;
export type {
  ImageProps,
  ImageLoaderParams,
  NextImageLoaderProps,
} from './types';
