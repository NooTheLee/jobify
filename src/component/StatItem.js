

const StatItem = ({ count, title, icon, color, bcg }) => {
    return <div className="col-sm-4">
        <div className="stat-item card" style={{ color, borderBottom: `10px solid ${color}` }}>
            <div className="top">
                <div className="count">{count}</div>
                <div className="icon" style={{ backgroundColor: bcg }}>{icon}</div>

            </div>
            <div className="title">{title}</div>
        </div>
    </div>
}
export default StatItem;