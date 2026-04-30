interface ProductPriceProps {
    price: number
}
export default function ProductPrice({price}: ProductPriceProps) {

    return(
      <div className={"w-[96%] mt-[10px]"}>
          <p className={"text-4xl font-bold text-blue-700"}>{price.toLocaleString("uk-UA")}₴</p>
      </div>
    );
}