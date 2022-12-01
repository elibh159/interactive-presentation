import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import RenderLineChart from "./chart";

const endPoint = "localhost:5000";
let socket = io(endPoint);

// const socket = io("ws://example.com/my-namespace", {
//   reconnectionDelayMax: 10000,
//   auth: {
//     token: "123"
//   },
//   query: {
//     "my-key": "my-value"
//   }
// });



const Trading = () => {
    const [lastPrice, setLastPrice] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
            socket.emit("startTrading");
        });
        socket.on("initialPrice", (data) => {
            console.log(data);
            setLastPrice([...data]);
        });

        socket.on("lastingPrice", (data) => {
            console.log(data);
            setLastPrice(lastPrice => [...lastPrice.slice(-15), data]);
        });

        return () => {
            socket.on("disConnect", () => {
                console.log("disconetct")
                setIsConnected(false);
            });
            socket.off("lastingPrice");
            socket.off("initialPrice");
            
        }
    }, []);

    const PricesBox = lastPrice.map(({ id, pound, euro, dollor, dateinfo }, index) =>
        <tr key={index}>
            <td> {id}</td>
            <td> {dollor}</td>
            <td> {euro}</td>
            <td> {pound}</td>
            <td> {(new Date(dateinfo)).toLocaleTimeString()}</td>
        </tr>
    );


    return (
        <div>
            {isConnected && <h2>connected!</h2 >}

            {lastPrice && <RenderLineChart chartInfo={lastPrice} />}
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Dollor</td>
                        <td>Euro</td>
                        <td>Pound</td>
                        <td>Date Time</td>
                    </tr>
                </thead>
                <tbody>
                    {PricesBox}
                </tbody>
            </table>

        </div>
    );
}
export default Trading;