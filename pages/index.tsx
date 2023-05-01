
import { Inter } from 'next/font/google'
import Layout from "@/components/Layout";
import StatsChart from "@/components/StatsChart";
import RevenueYear from "@/components/dashboard/RevenueYear";
import RevenueMonth from "@/components/dashboard/RevenueMonth";
import RevenueDate from "@/components/dashboard/RevenueDate";
import React, {useState} from "react";
import NewUser from "@/components/Statistical/NewUser";
import NewUserFollowYear from "@/components/Statistical/NewUserFollowYear";
import NewUserFollowMonth from "@/components/Statistical/NewUserFollowMonth";
import HotProduct from "@/components/Statistical/HotProduct";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const listDate = ['DAY', 'MONTH', 'YEAR'];
  const [activeRevenue, setActiveRevenue] = useState(0);
  const [activeNewUser, setActiveNewUser] = useState(0);


  return <>
    <Layout>
      <div className="revenue container">
        <div className="text-3xl font-bold">Doanh thu:</div>
        <div className="revenue-tabs">
          {listDate.map((data, index) => (
              <div key={index} className={(activeRevenue === index) ? "revenue-active" : "revenue-item"} onClick={() => setActiveRevenue(index)}>{data}</div>
          ))}
        </div>
        {(activeRevenue === 0) && <RevenueDate />}
        {(activeRevenue === 1) && <RevenueMonth />}
        {(activeRevenue === 2) &&  <RevenueYear />}
      </div>
      <div className="new-users container">
        <div className="text-3xl font-bold">Thống kê thành viên mới:</div>

        <div className="revenue-tabs">
          {listDate.map((data, index) => (
              <div key={index} className={(activeNewUser === index) ? "revenue-active" : "revenue-item"} onClick={() => setActiveNewUser(index)}>{data}</div>
          ))}
        </div>
        {(activeNewUser === 0) && <NewUser />}
        {(activeNewUser === 1) && <NewUserFollowMonth />}
        {(activeNewUser === 2) &&  <NewUserFollowYear />}
      </div>
      <div className="hot-product container">
        <div className="text-3xl font-bold mb-4">Danh sách sản phẩm bán chạy:</div>
        <HotProduct />

      </div>
    </Layout>
  </>
}
