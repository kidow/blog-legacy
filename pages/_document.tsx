import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'
import { Children } from 'react'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: Children.toArray(initialProps.styles)
    }
  }
  render() {
    return (
      <Html lang="ko" dir="ltr">
        <Head>
          <meta name="theme-color" content="#19191C" />
          <meta name="robots" content="index, follow" />
          <meta
            name="keywords"
            content="blog, developer, javascript, typescript, react, tailwindcss, github, nextjs"
          />
          <meta name="author" content="김동욱" />
          <meta
            name="google-site-verification"
            content="sbzpJiDpgeXijDrNF1qHG4W4P1DpMlpEuS-ztOQm0EU"
          />
          <meta
            name="naver-site-verification"
            content="b13059f284b5b3364c6329f2865cfc317cf5fd6c"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="600" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Web Developer Kidow's Blog" />
          <meta property="twitter:card" content="summary_large_image" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
          />
          <meta name="msapplication-TileColor" content="#19191C" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
