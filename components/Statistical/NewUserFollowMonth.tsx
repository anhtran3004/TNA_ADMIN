import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {getListCreatedMonth, getNewUserFollowMonth} from "@/lib/API/Statistical";
import {Month} from "@/components/HomeType";
import Pending from "@/components/Loading/pending";

const DynamicChart = dynamic(() => import('react-apexcharts'), {ssr: false});

interface Props {
    data: { x: string; y: number }[];
    title: string;
}

const LineChart = () => {
    const [listDate, setListMonth] = useState<Month[]>([]);
    const [listNewUser, setListNewUser] = useState<number[]>([]);
    const [chartOptions, setChartOptions] = useState({});
    const [series, setSeries] = useState([])
    const [isShowPending, setIsShowPending] = useState(true);

    async function GetListDate() {
        try {
            const res = await getListCreatedMonth();
            if (res.code === 200) {
                for (let i = 0; i < res.data.length; i++) {
                    setListMonth((prev) => [...prev, res.data[i]]);
                    await GetNewUser(res.data[i].year, res.data[i].month);
                }
            }
        } catch (e) {
            console.log('Error get list year')
        }
    }

    async function GetNewUser(year: number, month: number) {
        try {
            const res = await getNewUserFollowMonth(year, month);
            if (res.code === 200) {
                console.log('Calculate success!',);
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
                categories: listDate.map((item) => ("T" + item.month + "-" + item.year)),
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
        <div style={{
            position: "relative",
            top: "-321px",
            left: "30px"
        }}>
            {isShowPending && <Pending/>}
        </div>
    </>
};

export default LineChart;