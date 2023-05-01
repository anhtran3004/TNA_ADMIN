import React, {useEffect, useState} from "react";
import {getListDate, getRevenueFollowDay,} from "@/lib/API/Dashboard";
import dynamic from "next/dynamic";
import Pending from "@/components/Loading/pending";
import {CreatedDate} from "@/components/HomeType";

const Chart = dynamic(() => import("react-apexcharts"), {ssr: false});
const RevenueDate = () => {
    const [listDate, setListDate] = useState<CreatedDate[]>([]);
    const [listRevenue, setListRevenue] = useState<number[]>([]);
    const [chartOptions, setChartOptions] = useState({});
    const [isShowPending, setIsShowPending] = useState(true);

    async function GetListYear() {
        try {
            const res = await getListDate();
            if (res.code === 200) {
                for (let i = 0; i < res.data.length; i++) {
                    setListDate((prev) => [...prev, res.data[i]]);
                    console.log(res.data[i]);
                    await CalculateRevenue(res.data[i].year, res.data[i].month, res.data[i].day);
                }
            }
        } catch (e) {
            console.log('Error get list year')
        }
    }

    async function CalculateRevenue(year: number, month: number, day: number) {
        try {
            const res = await getRevenueFollowDay(year, month, day);
            if (res.code === 200) {
                console.log('Calculate success!',);
                for (let i = 0; i < res.data.length; i++) {
                    setListRevenue((prev) => [...prev, res.data[i].total])
                }
            }

        } catch (e) {
            console.log('Error get revenue: ', e);
        }
        // const res = await getRevenueFollowYear(year);

    }

    useEffect(() => {
        GetListYear().then(() => setIsShowPending(false));
    }, []);
    useEffect(() => {
        setChartOptions({
            series:
                [{
                    name: 'Doanh thu theo năm',
                    type: 'column',
                    data: listRevenue.map((d) => d),
                },],
            chart: {
                type: "column",
                height: 350,
                stacked: false,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    endingShape: "rounded",
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: listDate.map((data, index) => (data.day + "-" + data.month + "-" + data.year)),
            },
            yaxis: {
                title: {
                    text: "Doanh thu (đơn vị: VNĐ)",
                },
            },
            fill: {
                // opacity: 1,
                opacity: [0.85, 0.25, 1],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: 'vertical',
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100],
                },
            },
            tooltip: {
                y: {
                    formatter: function (val: number) {
                        return val.toLocaleString("en-US", {
                            style: "currency",
                            currency: "VND",
                        });
                    },
                },
            },

        })

    }, [listRevenue])
    return <>

        {(listRevenue.length > 0 && listDate.length > 0) && (
            <Chart
                options={chartOptions}
                series={chartOptions.series}
                type="bar"
                height={350}
            />
        )}
        {isShowPending && <Pending />}
    </>

};

export default RevenueDate;
