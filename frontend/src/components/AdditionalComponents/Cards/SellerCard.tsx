import type Seller from "@/Utils/Interfaces/Seller.ts";
import "./SellerCard.css";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";

interface SellerCardProps {
    seller:Seller
}

export default function SellerCard({seller}:SellerCardProps){


    return(
        <div className={"sellerContainer"}>
            <div>
                <img src={seller.avatarUrl} className={"w-20 h-20 rounded-full p-1"} alt={"A"}/>
            </div>

            <div className={"sellerNameAndEmailContainer"}>
                <p className={"font-semibold"}>{seller.name}</p>
                <p className={"text-gray-500"}>{seller.email}</p>
            </div>

            <div className={"relative ml-auto right-3"}>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-gray-300 bg-white hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => window.location.href=`/user/${seller.email}`}
                >
                    <MoreHorizontal className="h-5 w-5 text-gray-500" />
                </Button>
            </div>
        </div>
    )
}