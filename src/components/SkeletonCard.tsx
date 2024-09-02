import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col h-[29.4117647059rem] rounded-[18px] shadow-product-card mr-5 mb-12 overflow-hidden">
      <div className="my-0 mx-auto min-h-[13.5294117647rem] pb-0">
        <Skeleton className="h-[308px] w-[288px]" />
      </div>
      <div className="flex pl-8 pb-8 flex-col h-[9.7647058824rem] pt-[1.176rem] relative">
        <Skeleton className="w-[224px] h-[12px] " />
        <div className="mt-0 pt-2">
          <Skeleton className="w-[224px] h-[28px]" />
        </div>
        <div className="pt-0 mt-auto">
          <Skeleton className="w-[135px] h-[19px]" />
        </div>
      </div>
    </div>
  );
}
