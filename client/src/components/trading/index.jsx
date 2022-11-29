import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import RenderLineChart from "./chart";

const endPoint = "localhost:5000";
let socket = io(endPoint);

const Trading = () => {
    const [lastPrice, setLastPrice] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    
    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
            socket.emit("startTrading");
        });

        socket.on("lastingPrice", (data) => {
            setLastPrice(lastPrice=>[...lastPrice.slice(-20), ...data]);
        });

        return () => {
            socket.on("disConnect", () => {
            console.log("disconetct")
                setIsConnected(false);
            });
        }
    }, []);

    const PricesBox = lastPrice.map(({ name, price, dateinfo }, index) =>
        <tr key={index}>
            <th>{name} {index}</th>
            <td> {price}</td>
            <td> {(new Date(dateinfo)).toLocaleTimeString()}</td>
        </tr>
        );


    return (
        <div>
            {isConnected && <h2>connected!</h2 >}
            
            
            {lastPrice && <RenderLineChart chartInfo={lastPrice} />}
            <table>
                <tbody>
                    {PricesBox}
                </tbody>
            </table>
            
        </div>
    );
}
export default Trading;