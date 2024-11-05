import { AppUtils } from "../utils/app.utils";
import Card from "./CardComponents/Card";
import CardHeader from "./CardComponents/CardHeader";

/* eslint-disable react/prop-types */
export const MetricCard = ({ title, value }) => (
  <Card className="h-full bg-gray-800 border-gray-700">
    <CardHeader className="p-2">
      <div className=" text-gray-300">{title}</div>
    </CardHeader>
    <div className="p-2">
      <p className={`text-4xl font-bold ${AppUtils.getScoreTextColor(value)}`}>
        {value ==-1?"N/A":value || 0}
      </p>
    </div>
  </Card>
);
