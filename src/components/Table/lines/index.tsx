type PropType = {
    values: string[],
    isHead?: boolean,
}

export default function Lines({ values, isHead }: PropType) {
    return (
        <div className={isHead ? "t-head flex" : "t-line flex"}>
            {values.map((value, index) => <div className="t-element flex" key={value+index}>{value}</div>)}
        </div>
    )
}