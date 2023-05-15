import React, {useState} from 'react';
import Layout from "@/components/Layout";
import RevenueDate from "@/components/dashboard/RevenueDate";
import RevenueYear from "@/components/dashboard/RevenueYear";
import RevenueMonth from "@/components/dashboard/RevenueMonth";

function DashBoard() {
    const listDate = ['YEAR', 'MONTH', 'DAY'];
    const [activeRevenue, setActiveRevenue] = useState(0);

    return (
        <Layout>

            <div className="revenue container">
                <div className="text-3xl font-bold">Doanh thu:</div>
                <div className="revenue-tabs">
                    {listDate.map((data, index) => (
                        <div key={index} className={(activeRevenue === index) ? "revenue-active" : "revenue-item"} onClick={() => setActiveRevenue(index)}>{data}</div>
                    ))}
                </div>

                {/*<Revenue />*/}
                {/*{(activeRevenue === 0) && <RevenueYear />}*/}
                {/*{(activeRevenue === 1) && <RevenueMonth />}*/}
                {/*{(activeRevenue === 2) && <RevenueDate />}*/}

                <RevenueYear />
                <RevenueMonth />
                <RevenueDate/>

            </div>
            {/*<div>Revenue:</div>*/}
        </Layout>

    );
}

export default DashBoard;