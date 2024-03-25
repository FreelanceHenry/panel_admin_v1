import {
  Bar,
  ResponsiveContainer,
  BarChart,
  XAxis,
  Rectangle,
  Tooltip,
  Legend,
} from "recharts";

type Props = {};

const BarCharts = (props: Props) => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Page G",
      uv: 2390,
      pv: 3800,
      amt: 2100,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Page G",
      uv: 2390,
      pv: 3800,
      amt: 2100,
    },
    {
      name: "Page G",
      uv: 2390,
      pv: 3800,
      amt: 2100,
    },{
      name: "Page G",
      uv: 2390,
      pv: 3800,
      amt: 2100,
    },{
      name: "Page G",
      uv: 2390,
      pv: 3800,
      amt: 2100,
    },{
      name: "Page G",
      uv: 2390,
      pv: 3800,
      amt: 2100,
    },{
      name: "Page G",
      uv: 2390,
      pv: 3800,
      amt: 2100,
    },
  ];

  return (
    <ResponsiveContainer width={1000} height={200}>
      <BarChart width={950} height={40} data={data}>
        <XAxis />
        <Bar
          dataKey="uv"
          fill="#F2EFFF"
          activeBar={<Rectangle fill="#5d60ef" />}
          radius={10}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
