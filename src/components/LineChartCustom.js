import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function LineChartCustom (props) {

    return (
      <>
       <ResponsiveContainer width="100%" aspect={3}>
      <LineChart
        width={400}
        height={266}
        data={props.data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ciudad" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="meta" stroke="#8884d8" strokeDasharray="5 5" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="servicios" stroke="#82ca9d" strokeDasharray="3 4 5 2" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer> 
     </>
    )
  }

export default LineChartCustom;
