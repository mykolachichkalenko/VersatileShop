import {Check, Filter, X} from "lucide-react";
import {Dialog, DialogClose, DialogContent, DialogTrigger} from "@radix-ui/react-dialog";
import "./SearchPageFilters.css";
import {motion} from "framer-motion";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import ConditionComponent
    from "@/components/PageComponents/ProductPageComponents/SearchPageComponents/FiltersComponents/ConditionComponent.tsx";
import PriceComponent
    from "@/components/PageComponents/ProductPageComponents/SearchPageComponents/FiltersComponents/PriceComponent.tsx";
import {DialogFooter, DialogTitle} from "@/components/ui/dialog.tsx";
import React, {useEffect, useState} from "react";
import type SearchFilters from "@/Utils/Interfaces/SearchFilters.ts";
import VectorDistanceComponent
    from "@/components/PageComponents/ProductPageComponents/SearchPageComponents/FiltersComponents/VectorDistanceComponent.tsx";
import ShowNewProductsComponent
    from "@/components/PageComponents/ProductPageComponents/SearchPageComponents/FiltersComponents/ShowNewProductsComponent.tsx";

interface SearchPageFiltersProps {
    params: SearchFilters;
    setParams: React.Dispatch<React.SetStateAction<SearchFilters>>
}

export default function SearchPageFilters({params, setParams}: SearchPageFiltersProps) {
    const [open, setOpen] = useState(false);

    const [searchParamsTemporary, setSearchParamsTemporary] = useState<SearchFilters>({
        condition: "all",
        fromPrice: 1,
        toPrice: 10000000,
        showNewProducts: false,
        vectorDistance: 0.8
    });

    useEffect(() => {
        setSearchParamsTemporary(params);
    }, [params]);

    const setCondition = (condition: string) => {
        setSearchParamsTemporary((prevState) => ({
            ...prevState,
            condition: condition
        }));
    }

    const setFromPrice = (price: number) => {
        setSearchParamsTemporary((prevState) => ({
            ...prevState,
            fromPrice: price
        }));
    }

    const setToPrice = (price: number) => {
        setSearchParamsTemporary((prevState) => ({
            ...prevState,
            toPrice: price
        }));
    }

    const setVectorDistance = (distance: number) => {
        setSearchParamsTemporary((prevState) => ({
            ...prevState,
            vectorDistance: distance
        }));
    }

    const setShowNewProducts = (value: boolean) => {
        setSearchParamsTemporary((prevState) => ({
            ...prevState,
            showNewProducts: value
        }));
    }

    const applyFilters = () => {
        setParams(searchParamsTemporary);
    }

    return (
        <motion.div
            className={"w-[100%] mt-[30px] flex justify-center items-center"}>
            <Dialog
                open={open}
                onOpenChange={(nextOpen) => {
                    if (open && !nextOpen) {
                        setSearchParamsTemporary(params);
                    }
                    setOpen(nextOpen);
                }}>
                <DialogTrigger asChild>
                    <div
                        className={"w-[40px] h-[40px] bg-[#dbdee3] mr-[20px] rounded-4xl flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-all decoration-1"}>
                        <Filter className={"text-gray-500"}/>
                    </div>
                </DialogTrigger>
                <DialogContent className={"searchPageFiltersContent"}>
                    <DialogTitle></DialogTitle>
                    <PWithPlaypenSans
                        className={"searchPageFiltersTitle"}>{getLanguage("searchPage.filters")}</PWithPlaypenSans>

                    <ConditionComponent condition={searchParamsTemporary.condition} setCondition={setCondition}/>

                    <PriceComponent fromPrice={searchParamsTemporary.fromPrice} toPrice={searchParamsTemporary.toPrice}
                                    setFromPrice={setFromPrice} setToPrice={setToPrice}/>

                    <VectorDistanceComponent vectorDistance={(1 - searchParamsTemporary.vectorDistance)}
                                             setVectorDistance={setVectorDistance}/>

                    <ShowNewProductsComponent showNewProducts={searchParamsTemporary.showNewProducts}
                                              setShowNewProducts={setShowNewProducts}/>
                    <DialogFooter className={"searchPageFiltersContentButtons"}>
                        <DialogClose asChild>
                            <X className={"bg-transparent text-red-600 text-2xl font-bold mr-[10px] cursor-pointer"}/>
                        </DialogClose>
                        <Check className={"bg-transparent text-green-600 text-2xl font-bold mr-[10px] cursor-pointer"}
                               onClick={applyFilters}/>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}