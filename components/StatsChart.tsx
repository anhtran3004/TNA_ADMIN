import { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

type StatisticChartProps = {
    data: ChartData;
    options: ChartOptions<'bar'>;
};

const StatisticChart: React.FC<StatisticChartProps> = ({ data, options }) => {
    return <Bar data={data} options={options} />;
};

export default StatisticChart;