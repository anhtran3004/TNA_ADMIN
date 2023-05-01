import React, {FC, useEffect, useState} from "react";
import ApexCharts from "react-apexcharts";
import {getListYear, getRevenueFollowYear} from "@/lib/API/Dashboard";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// interface ChartData {
//     label: string;
//     data: number[];
// }

// interface Props {
//     data: ChartData[];
// }

const RevenueYear = () => {
    const [listYear,setListYear] = useState<number[]>([]);
    const [listRevenue, setListRevenue] = useState<number[]>([]);
    const [chartOptions, setChartOptions] = useState({});
    async function GetListYear(){
        try{
            const res = await getListYear();
            if(res.code === 200){
                for(let i = 0; i < res.data.length; i++){
                    setListYear((prev) => [...prev, res.data[i].year]);
                    console.log(res.data[i].year);
                    CalculateRevenue(res.data[i].year).then();

                }
            }
        }catch (e) {
            console.log('Error get list year')
        }
    }
    async function CalculateRevenue(year: number){
        try{
            const res = await getRevenueFollowYear(year);
            if(res.code === 200) {
                console.log('Calculate success!', );
                for(let i = 0; i < res.data.length; i++){
                    setListRevenue((prev) => [...prev, res.data[i].total])
                }
            }

        }catch (e) {
            console.log('Error get revenue: ', e);
        }
        // const res = await getRevenueFollowYear(year);

    }

    useEffect(() => {
        GetListYear().then();
    }, []);
    // const chartOptions = {
    useEffect(() =>{
        setChartOptions({
            // this.state = {
                series:
                    [{
                        name: 'Doanh thu theo năm',
                        type: 'column',
                        data: listRevenue.map((d) => d),
                    },],
            // }

            chart: {
                type: "bar",
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
            // markers: {
            //     size: 0,
            // },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: listYear.map((year, index) => year),
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

    }, [listRevenue, listYear])
    return <>
        {(listRevenue.length > 0 && listYear.length > 0) && (
            <Chart
            options={chartOptions}
            series={chartOptions.series}
            type="bar"
            height={350}
        />
        )}
    </>
};

export default RevenueYear;
