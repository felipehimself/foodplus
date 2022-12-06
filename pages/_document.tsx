import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Script
          src='https://upload-widget.cloudinary.com/global/all.js'
          type='text/javascript'
        ></Script>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
