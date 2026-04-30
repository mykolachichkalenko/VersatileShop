import type Seller from "@/Utils/Interfaces/Seller.ts";
import SellerCard from "@/components/AdditionalComponents/Cards/SellerCard.tsx";
import "./SearchSellersFoundSellers.css";

interface SearchSellersFoundSellersProps {
    sellers: Seller[];
}
export default function SearchSellersFoundSellers({sellers}:SearchSellersFoundSellersProps){

    return(
      <div className={"w-full flex flex-col items-center gap-4"}>
          <div className={"foundSellersContainer"}>
              {sellers.map(seller => (
                  <SellerCard seller={seller} key={seller.id}/>
              ))}
          </div>
      </div>
    );
}