import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>stepzen-next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Jamstack SF!</h1>

        <p>
          Get started by editing{' '}
          <code>pages/index.js</code>
        </p>
      </main>

      <footer>
        <a
          href="https://stepzen.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by StepZen
        </a>
      </footer>
    </div>
  )
}
