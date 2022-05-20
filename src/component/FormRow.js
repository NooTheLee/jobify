const FormRow = ({ className, name, labelText, handleChange, value }) => {
    return (
        <div className={className || ''}>
            <p className="m-b-10 f-w-600">{labelText || name} </p>
            {value ? <input type="text" className="text f-w-400" name={name}
                value={value}
                onChange={handleChange}
            /> :
                <input type="text" className="text f-w-400" name={name}
                    onChange={handleChange}
                />}
        </div>
    )
};
export default FormRow;