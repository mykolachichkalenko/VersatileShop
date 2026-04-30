import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import "./ProductImagesCarousel.css"

interface ProductImagesCarouselProps {
    arrayPhotos : string[]
}
export default function ProductImagesCarousel({arrayPhotos}: ProductImagesCarouselProps){
    return(
        <div className={"productImagesCarouselContainer"}>
            <Carousel>
                <CarouselContent>
                    {arrayPhotos.map((photo, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="relative flex aspect-square items-center justify-center p-0">
                                        <img
                                            src={photo}
                                            alt=""
                                            className="w-full h-auto rounded-xl"
                                        />

                                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white" />
                                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white" />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}