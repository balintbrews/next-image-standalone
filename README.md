# `next-image-standalone`

A standalone version of the
[Next.js Image component](https://nextjs.org/docs/app/api-reference/components/image)
for use in non-Next.js projects. This package bundles the actual Next.js Image
component code and its dependencies, allowing you to use it with your own image
optimization backend.

**Important Note**: This is a purely client-side implementation. Unlike the
standard Next.js Image component, this package does not include any server-side
image optimization logic. All image optimization must be handled by your own
backend service or CDN, which you configure through the `loader` prop.

## Installation

```bash
npm install next-image-standalone
```

## Usage

```jsx
import Image from 'next-image-standalone';

// It's required to define a loader function.
const myImageLoader = ({ src, width, quality }) => {
  return `https://my-cdn.com/${src}?w=${width}&q=${quality}`;
};

function MyComponent() {
  return (
    <Image
      src="/my-image.jpg"
      alt="My image"
      width={500}
      height={300}
      loader={myImageLoader}
    />
  );
}
```

## API

The component accepts all the **same props as the standard Next.js Image
component**, including `src`, `alt`, `width`, `height`, and other common image
properties. You can find the complete list of available props in the
[Next.js Image component documentation](https://nextjs.org/docs/app/api-reference/components/image#props).

One enhancement over the standard Next.js Image component is the **`loader`
prop,** which provides access to the complete set of image properties through
the `imageProps` parameter.

Additionally, you can pass a **`config` prop** to customize the image
optimization behavior. This prop accepts the same configuration options that
would normally be set in `next.config.js` in a Next.js project. However, some
Next.js-specific configuration options are not supported since they require
server-side logic:

- `localPatterns`: For local image optimization patterns
- `remotePatterns`: For remote image optimization patterns
- `domains`: For allowed image domains
- `loaderFile`: For custom loader file configuration

## Sponsorship

This package was created with sponsorship from [Acquia](https://www.acquia.com/)
through work on Drupal's
[Experience Builder](https://www.drupal.org/project/experience_builder).
