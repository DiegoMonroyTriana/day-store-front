import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function BarChartCustom (props){

  return ( 
    <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
        width={400}
        height={266}
        data={props.data}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 20,
        }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ciudad"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="meta" fill="#8884d8" />
          <Bar dataKey="servicios" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
  )
}

export default BarChartCustom;