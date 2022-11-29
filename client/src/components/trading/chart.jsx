import { PureComponent } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';



const RenderLineChart = ({ chartInfo }) => {
    return (
        <LineChart width={600} height={300} data={chartInfo}>
            <Line type="monotone" dataKey="dollor" stroke="#8884d8" isAnimationActive={false} />
            <Line type="monotone" dataKey="euro" stroke="#356e58" isAnimationActive={false} />
            <Line type="monotone" dataKey="pound" stroke="#ff0000" isAnimationActive={false} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="dateinfo" tick={<CustomizedAxisTick />} />
            <YAxis />
            <Tooltip />
            {/* <Tooltip content={<CustomTooltip />} /> */}
        </LineChart>
    );
}
export default RenderLineChart;

// function CustomTooltip(data) {

//     if (data.active) {
//         return (
//             <div className="recharts-tooltip-wrapper">
//                 <p className="label">{(new Date(data.label)).toLocaleTimeString()}</p>
                
//                 <p>{data.payload[0].dataKey}: {data.payload[0].value}</p>
//                 <p>{data.payload[1].dataKey}: {data.payload[1].value}</p>
//                 <p>{data.payload[2].dataKey}: {data.payload[2].value}</p>
                
//             </div>
//         );
//     }

//     return null;
// }

class CustomizedAxisTick extends PureComponent {
    render() {
        const { x, y, payload } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(0)">
                    {(new Date(payload.value)).toLocaleTimeString()}
                </text>
            </g>
        );
    }
};
