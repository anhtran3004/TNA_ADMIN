import React, {FC, useEffect, useState} from "react";
import ApexCharts from "react-apexcharts";
import {getListMonth, getListYear, getRevenueFollowMonth, getRevenueFollowYear} from "@/lib/API/Dashboard";
import dynamic from "next/dynamic";
import {Month} from "@/components/HomeType";
import Pending from "@/components/Loading/pending";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
export function dataDefaultMonth() : Month{
    const data = {
        year: 0,
        month: 0
    }
    return data;
}
const RevenueMonth = () => {
    const [listMonth,setListMonth] = useState<Month[]>([]);
    const [listRevenue, setListRevenue] = useState<number[]>([]);
    const [chartOptions, setChartOptions] = useState({});
    const [isShowPending, setIsShowPending] = useState(true);
    async function GetListYear(){
        try{
            const res = await getListMonth();
            if(res.code === 200){
                for(let i = 0; i < res.data.length; i++){
                    setListMonth((prev) => [...prev, res.data[i]]);
                    console.log(res.data[i]);
                    CalculateRevenue(res.data[i].year, res.data[i].month).then();
                }
            }
        }catch (e) {
            console.log('Error get list year')
        }
    }
    async function CalculateRevenue(year: number, month: number){
        try{
            const res = await getRevenueFollowMonth(year, month);
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
        GetListYear().then(() => setIsShowPending(false));
    }, []);
    // const chartOptions = {
    useEffect(() =>{

        console.log("list year",listMonth)
        console.log("list revenue",listRevenue)
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
            // markers: {
            //     size: 0,
            // },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: listMonth.map((data, index) => ("T"+ data.month+ "," + data.year)),
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

    }, [listRevenue, listMonth])
    return <>

        {(listRevenue.length > 0 && listMonth.length > 0) && (
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

export default RevenueMonth;
