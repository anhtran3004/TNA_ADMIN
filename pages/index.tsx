
import { Inter } from 'next/font/google'
import Layout from "@/components/Layout";
import StatsChart from "@/components/StatsChart";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return <>
    <Layout>
      <h2>Statistics</h2>
      <p>Dashboard</p>
    </Layout>
  </>
}
