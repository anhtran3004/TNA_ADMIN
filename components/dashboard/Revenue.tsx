import React, {useEffect, useState} from 'react';
import {getListYear, getRevenueFollowYear} from "@/lib/API/Dashboard";
import dynamic from "next/dynamic";

const ChartGPT = dynamic(() => import("react-apexcharts"), {ssr: false});


const Charts = () => {
    const [listYear, setListYear] = useState<number[]>([]);
    const [listRevenue, setListRevenue] = useState<number[]>([]);
    const [chartOptions, setChartOptions] = useState({});

    async function GetListYear() {
        try {
            const res = await getListYear();
            if (res.code === 200) {
                for (let i = 0; i < res.data.length; i++) {
                    setListYear((prev) => [...prev, res.data[i].year]);
                    console.log(res.data[i].year);
                    CalculateRevenue(res.data[i].year).then();

                }
            }
        } catch (e) {
            console.log('Error get list year')
        }
    }

    async function CalculateRevenue(year: number) {
        try {
            const res = await getRevenueFollowYear(year);
            if (res.code === 200) {
                console.log('Calculate success!');
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
        GetListYear().then();
    }, []);
    useEffect(() => {

        console.log("list year", listYear)
        console.log("list revenue", listRevenue)
        setChartOptions({
            series: [
                {
                    name: 'TEAM A',
                    type: 'column',
                    data: [listRevenue.map((d) => d)],
                },
                // {
                //     name: 'TEAM B',
                //     type: 'area',
                //     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
                // {
                //     name: 'TEAM C',
                //     type: 'line',
                //     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
            ],
            // chart: {
            //     height: 350,
            //     type: 'line',
            //     stacked: false,
            // },
            stroke: {
                width: [0, 2, 5],
                curve: 'smooth',
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%',
                },
            },
            fill: {
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
            labels: listYear.map((d) => d),
            markers: {
                size: 0,
            },
            xaxis: {
                type: 'number',
                categories: listYear.map((year, index) => year),

            },
            yaxis: {
                title: {
                    text: '(VNĐ) Nghìn',
                },
                min: 0,
            },
            tooltip: {
                shared: true,
                intersect: false,
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


    }, [listYear, listRevenue]);

    return <>
        <ChartGPT options={chartOptions}
                  type="bar"
                  height={350}
                  series={chartOptions.series}
        />
    </>
};

export default Charts;