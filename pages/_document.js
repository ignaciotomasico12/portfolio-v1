import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#00FFC3" />
        <meta name="title" content="Ignacio Tomás | Portfolio" />
        <meta name="description" 
          content="Soy un desarrollador de Frontend. Mi especialidad es React, 
          aunque sigo formándome en diversos frameworks web como Next.js y Node.js." 
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.3.1/css/flag-icon.min.css" rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}