import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState(0);
  useEffect(() => {
    const getIncome = async () => {
      const response = await userRequest.get("orders/income");
      const { income } = response.data;
      setPerc((income[1].total * 100) / income[0].total - 100);
      setIncome(income);
      setSales(income[0].total + income[1].total);
      setLoading(false);
    };
    getIncome();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1].total}</span>
          {perc > 0 ? (
            <span className="featuredMoneyRate">
               +{Math.floor(perc)}{" "}
              <ArrowUpward className="featuredIcon positive" />
            </span>
          ) : (
            <span className="featuredMoneyRate">
              _{Math.floor(perc)}
              <ArrowDownward className="featuredIcon negative" />
            </span>
          )}
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${sales}</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
