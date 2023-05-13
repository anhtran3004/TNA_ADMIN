import '@/styles/globals.css'
import '@/styles/header.css'
import '@/styles/variables.css'
import  '@/styles/product.css'
import '@/styles/alert.css'
import '@/styles/order.css'
import '@/styles/login.scss'
import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/dashboard.css'
import '@/styles/pending.css'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import type { AppProps } from 'next/app'
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-NwNS4yItOevK4L8ZsWbyfvj2lLzQAZ11Igm/bUUmW9HChPR1g/f39ZypxpdCf6sM2UhFQWyNNwkPBrSg+zP8cg=="
          crossOrigin="anonymous"
      />
    </Head>
    <Component {...pageProps} />
  </>
}
