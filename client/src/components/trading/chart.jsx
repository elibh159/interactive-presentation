import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const RenderLineChart = ({chartInfo}) => {
    return (
        <LineChart width={600} height={300} data={chartInfo}>
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="dateinfo" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );
}
export default RenderLineChart;