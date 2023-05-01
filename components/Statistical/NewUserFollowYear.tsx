import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {getListCreatedYear, getNewUserFollowYear} from "@/lib/API/Statistical";
import Pending from "@/components/Loading/pending";

const DynamicChart = dynamic(() => import('react-apexcharts'), {ssr: false});

interface Year {
    year: number
}

const LineChart = () => {
    const [listDate, setListDate] = useState<Year[]>([]);
    const [listNewUser, setListNewUser] = useState<number[]>([]);
    const [chartOptions, setChartOptions] = useState({});
    const [series, setSeries] = useState([])
    const [isShowPending, setIsShowPending] = useState(true);

    async function GetListDate() {
        try {
            const res = await getListCreatedYear();
            if (res.code === 200) {
                for (let i = 0; i < res.data.length; i++) {
                    setListDate((prev) => [...prev, res.data[i]]);
                    await GetNewUser(res.data[i].year);
                }
            }
        } catch (e) {
            console.log('Error get list year')
        }
    }

    async function GetNewUser(year: number) {
        try {
            const res = await getNewUserFollowYear(year);
            if (res.code === 200) {
                for (let i = 0; i < res.data.length; i++) {
                    setListNewUser((prev) => [...prev, res.data[i].new_users])
                }
            }

        } catch (e) {
            console.log('Error get revenue: ', e);
        }
    }
    useEffect(() => {
        GetListDate().then(() => setIsShowPending(false));
    }, [])
    useEffect(() => {
        setChartOptions({
            chart: {
                id: 'basic-line',
            },
            xaxis: {
                categories: listDate.map((item) => (item.year)),
            },
            yaxis: {
                min: 0,
                // tickAmount: true,
                forceNiceScale: true,
                decimalsInFloat: 0,
                title: {
                    text: "Sô lượng thành viên mới",
                },
            },
        })
        setSeries([
            {
                name: 'Thành viên mới',
                data: listNewUser.map((item) => item),
            },
        ])

    }, [listNewUser, listDate])

    return <>
        <DynamicChart
            options={chartOptions}
            series={series}
            type="line"
            height={350}
            width={1350}
        />
        <div style={{position: "relative",
            top: "-321px",
            left: "30px"
        }}>
            {isShowPending && <Pending/>}
        </div>
    </>
};

export default LineChart;