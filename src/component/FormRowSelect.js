const FormRowSelect = (
    { className,
        handleChange,
        name,
        labelText,
        list,
        value = "",

    }) => {
    return (
        <div className={className || ''}>
            <p className="m-b-10 f-w-600">{labelText || name}</p>
            <select className="form-select"
                name={name}
                onChange={handleChange}
                value={value}
            >
                {list.map((item, index) => {
                    return (
                        <option key={index} value={item}>{item}</option>
                    )
                })}
            </select>
        </div>
    )
}
export default FormRowSelect;