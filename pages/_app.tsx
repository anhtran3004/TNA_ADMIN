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
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
