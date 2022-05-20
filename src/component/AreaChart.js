import { AreaChart as Areac, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const AreaChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <Areac
                data={data}
                margin={{
                    top: 50,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='date' />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#2cb1bc" fill="#bef8fd" />
            </Areac>
        </ResponsiveContainer>
    )
}

export default AreaChart