import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#1E2D40" />
        <meta name="msapplication-navbutton-color" content="#1E2D40" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#1E2D40"></meta>
        <meta name="title" content="Ignacio Tomás | Portfolio" />
        <meta name="description" 
          content="Soy un desarrollador de Frontend. Mi especialidad es React, 
          aunque sigo formándome en diversos frameworks web como Next.js y Node.js." 
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}