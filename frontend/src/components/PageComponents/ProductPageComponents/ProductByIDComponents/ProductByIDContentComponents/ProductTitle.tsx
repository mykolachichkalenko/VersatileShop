interface ProductTitleProps {
    title?: string | null
}

export default function ProductTitle({title}: ProductTitleProps) {

    return (
        <div className={"w-[96%] mt-[30px]"}>
            <p className={"text-3xl font-bold break-all"}>{title}</p>
        </div>
    )
}