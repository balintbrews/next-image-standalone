import Image from './Image';

function App() {
  return (
    <div>
      <h1>
        <code>next-image-standalone</code>
      </h1>
      <h2>Remote image</h2>
      <Image
        src="src-not-used-here--see-loader-in-next-line"
        loader={({ width }) => `https://placehold.co/${width.toString()}`}
        alt="Test"
        width={1920}
        height={1920}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <h2>Local image</h2>
      <Image
        src="/sample.jpg"
        width={1920}
        height={1080}
        alt="Test"
        loader={({ src }) => src}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
}

export default App;
