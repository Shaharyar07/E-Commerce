import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userRequest } from "../../requestMethods";
export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);
  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            {
              name: MONTHS[item._id - 1],
              "Active User": item.total,
            },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getUserStats();
  }, [MONTHS]);
  
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
