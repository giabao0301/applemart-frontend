import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";

const ImageCarousel = ({ images }: { images: string[] }) => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="ml-0">
        {images.map((image, index) => (
          <CarouselItem key={index} className="pl-0">
            <Image
              className="w-auto h-auto"
              src={image}
              alt=""
              width={514}
              height={477}
              quality={100}
              unoptimized={true}
              priority
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ImageCarousel;
