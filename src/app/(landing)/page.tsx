import Categories from "@/components/landing/product/Categories";
import ProductList from "@/components/landing/product/ProductList";

export default function Home() {
  return (
    <div className="my-0">
      <div className="lg:max-w-[780px] max-w-md pt-20 pb-16 px-0 min-h-60">
        <h1 className="block lg:inline text-2xl lg:text-5xl font-semibold lg:leading-tight lg:tracking-tight mr-2">
          Apple Mart.
        </h1>
        <div className="inline text-2xl lg:text-5xl font-semibold lg:leading-tight lg:tracking-tight text-secondaryText">
          Nơi tuyệt vời để mua sản phẩm công nghệ mà bạn thích.
        </div>
      </div>
      <Categories />
      <ProductList />
    </div>
  );
}
