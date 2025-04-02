import { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Page A", uniqueVisits: 4000, pageViews: 2400, amt: 2400 },
  { name: "Page B", uniqueVisits: 3000, pageViews: 1398, amt: 2210 },
  { name: "Page C", uniqueVisits: 2000, pageViews: 9800, amt: 2290 },
  { name: "Page D", uniqueVisits: 2780, pageViews: 3908, amt: 2000 },
  { name: "Page E", uniqueVisits: 1890, pageViews: 4800, amt: 2181 },
  { name: "Page F", uniqueVisits: 2390, pageViews: 3800, amt: 2500 },
  { name: "Page G", uniqueVisits: 3490, pageViews: 4300, amt: 2100 },
];

class App extends Component {
  calculateStatistics = (values: any[]) => {
    const total = values.reduce((acc: number, value: number) => acc + value, 0);
    const average = total / values.length;
    const variance =
      values.reduce((acc: number, value: number) => acc + Math.pow(value - average, 2), 0) /
      (values.length - 1);
    const standardDeviation = Math.sqrt(variance);
    return { average, standardDeviation };
  };

  render() {
    const pageViewsData = data.map((item) => item.pageViews);
    const uniqueVisitsData = data.map((item) => item.uniqueVisits);

    const { average: averagePageViews, standardDeviation: stddevPageViews } = this.calculateStatistics(pageViewsData);
    const { average: averageUniqueVisits, standardDeviation: stddevUniqueVisits } = this.calculateStatistics(uniqueVisitsData);

    const xPageViews = 237 - ((averagePageViews - stddevPageViews) / 10000) * 237;
    const yPageViews = 237 - ((averagePageViews + stddevPageViews) / 10000) * 237;

    const xUniqueVisits = 100 - ((averageUniqueVisits - stddevUniqueVisits) / 4000) * 100;
    const yUniqueVisits = 100 - ((averageUniqueVisits + stddevUniqueVisits) / 4000) * 100;

    return (
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />

        <pattern id="patternPageViews" width="100%" height="100%">
          <rect x="0" y="0" width="100%" height="100%" fill="red" />
          <rect x="00" y={yPageViews} width="100%" height={xPageViews} fill="#8884d8" />
        </pattern>

        <pattern id="patternUniqueVisits" width="100%" height="100%">
          <rect x="0" y="0" width="100%" height="100%" fill="red" />
          <rect x="00" y={yUniqueVisits} width="100%" height={xUniqueVisits} fill="#82ca9d" />
        </pattern>

        <Line
          type="monotone"
          dataKey="pageViews"
          stroke="url(#patternPageViews)"
          activeDot={{ r: 8, fill: "#8884d8", stroke: "#8884d8" }} 
        />
        <Line
          type="monotone"
          dataKey="uniqueVisits"
          stroke="url(#patternUniqueVisits)"
          activeDot={{ r: 8, fill: "#82ca9d", stroke: "#82ca9d" }}
        />
      </LineChart>
    );
  }
}

export default App;
