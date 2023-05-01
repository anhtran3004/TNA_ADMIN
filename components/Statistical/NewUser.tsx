import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import {getListCreatedDate, getNewUserFollowDay} from "@/lib/API/Statistical";
import {CreatedDate} from "@/components/HomeType";

const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
    data: { x: string; y: number }[];
    title: string;
}

const LineChart = () => {
    const [listDate, setListDate] = useState<CreatedDate[]>([]);
    const [listNewUser, setListNewUser] = useState<number[]>([]);
    const [chartOptions, setChartOptions] = useState({});
    const [series, setSeries] = useState([])
    const [isShowPending, setIsShowPending] = useState(true);
    async function GetListDate() {
        try {
            const res = await getListCreatedDate();
            if (res.code === 200) {
                for (let i = 0; i < res.data.length; i++) {
                    setListDate((prev) => [...prev, res.data[i]]);
                    console.log(res.data[i]);
                    GetNewUser(res.data[i].year, res.data[i].month, res.data[i].day).then();
                }
            }
        } catch (e) {
            console.log('Error get list year')
        }
    }
    async function GetNewUser(year: number, month: number, day: number) {
        try {
            const res = await getNewUserFollowDay(year, month, day);
            if (res.code === 200) {
                console.log('Calculate success!',);
                for (let i = 0; i < res.data.length; i++) {
                    setListNewUser((prev) => [...prev, res.data[i].new_users])
                }
            }

        } catch (e) {
            console.log('Error get revenue: ', e);
        }
        // const res = await getRevenueFollowYear(year);

    }
    useEffect(() => {
        GetListDate().then();
    }, [])
    useEffect(() =>{
        setChartOptions({
            chart: {
                id: 'basic-line',
            },
            xaxis: {
                categories: listDate.map((item) => (item.day + "-" + item.month + "-" + item.year)),
            },
            yaxis:{
                min: 0,
                // tickAmount: true,
                // forceNiceScale: true,
                decimalsInFloat: 0,
            },
        })
        setSeries([
            {
                name: 'Thành viên mới',
                data: listNewUser.map((item) => item),
            },
        ])

    }, [listNewUser, listDate])

    return (
        <DynamicChart
            options={chartOptions}
            series={series}
            type="line"
            height={350}
            width={1350}
        />
    );
};

export default LineChart;