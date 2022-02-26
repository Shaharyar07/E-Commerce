import "./widgetLg.css";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const res = userRequest.get("/orders/find/").then((res) => {
        const { orders } = res.data;
        setOrders(orders);
        setLoading(false);
      });
    } catch (error) {}
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <img
                src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">{order.userId}</span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">$ {order.amount}</td>
            <td className="widgetLgStatus">
              <Button type={`${order.status}`} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
