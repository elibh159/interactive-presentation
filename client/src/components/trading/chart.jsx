import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
// import { Data } from '../../Interfaces/tradingInterface';
// const data = [
//     {
//         name: "dolor",
//         price: 3400
//     },
//     {
//         name: "euro",
//         price: 3600
//     },
//     {
//         name: "pound",
//         price: 4000
//     }];

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