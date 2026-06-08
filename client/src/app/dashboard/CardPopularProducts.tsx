import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Rating from "../(components)/Rating";
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import loading from "react-useanimations/lib/loading"
import Image from "next/image";

const productImages = [
  "/products/imani-bahati-LxVxPA1LOVM-unsplash.jpg",
  "/products/irene-kredenets-dwKiHoqqxk8-unsplash.jpg",
  "/products/luis-felipe-lins-S6Cp3uN39_M-unsplash.jpg",
  "/products/maksim-larin-NOpsC3nWTzY-unsplash.jpg",
  "/products/paul-gaudriault-a-QH9MAAVNI-unsplash.jpg",
  "/products/ryan-waring-164_6wVEHfI-unsplash.jpg",
  "/products/trendest-studio-XZ3EmAIWuz0-unsplash.jpg",
  "/products/usama-akram-kP6knT7tjn4-unsplash.jpg",
  "/products/hipkicks-HcqA34-uWo4-unsplash.jpg",
  "/products/behnam-norouzi-F4rWoM3cYjI-unsplash.jpg",
  "/products/mutzii-kn7cfz5ESIE-unsplash.jpg",
  "/products/zoozanagheh-studio-By5IFqgKgPk-unsplash.jpg",
  "/products/josh-marshall-PcI3V1VbbrU-unsplash.jpg",
  "/products/hitomi-bremmer-pnf_gpH_YtA-unsplash.jpg",
  "/products/philip-smart-Sw-pqjQfsO4-unsplash.jpg",
  "/products/kawah-kaos-dakwah-plTCLtG2p8I-unsplash.jpg",
  "/products/oskar-hagberg-5TZuyH_TRTY-unsplash.jpg",
  "/products/zoozanagheh-studio-Bs4CGxeeUcU-unsplash.jpg",
  "/products/van-asten-maarten-5Z9ZClW3MYI-unsplash.jpg",
  "/products/basil-james-nE_N_fee8q8-unsplash.jpg",
  "/products/beer-vanhoutte-cuJdvIL5xMY-unsplash.jpg",
  "/products/beer-vanhoutte-glaJq4O_3y8-unsplash.jpg",
  "/products/dare-omowale-a0xClsGAgTQ-unsplash.jpg",
];

const imageForProductId = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return productImages[Math.abs(hash) % productImages.length];
};

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading, isError } = useGetDashboardMetricsQuery();
   
  if(isLoading)  {
   return <div className="m-5">
     <UseAnimations
            animation={loading}
            strokeColor="red"
            size={36}
            wrapperStyle={{ marginBottom: '8px' }}
          />
    <span>Loading...</span>
    </div>
  }  

  if (isError || !dashboardMetrics ) {
    return (
      <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
         <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular Products
          </h3>
          <hr />
          <div className="flex items-center justify-center h-full py-4">
        <div className="flex flex-col items-center justify-center">
          <UseAnimations
            animation={activity}
            strokeColor="red"
            size={36}
            wrapperStyle={{ marginBottom: '8px' }}
          />
          <span className="text-red-300 font-semibold text-lg">No Data</span>
        </div>
      </div>
    </div>

    )
  }

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
     
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                <div className="flex items-center gap-3">
                <Image
                  src={imageForProductId(product.productId)}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="rounded-md w-12 h-12 object-cover"
                />
                <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">
                        {product.name}
                    </div>
                    <div className="flex text-sm items-center">
                        <span className="font-bold text-blue-500 text-xs">
                            ${product.price}
                        </span>
                        <span className="mx-2">|</span>
                        <Rating rating={product.rating || 0} />
                    </div>
                </div>
                </div>

                <div className="text-xs flex items-center">
                    <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                        <ShoppingBag className="w-4 h-4" />
                    </button>
                    {Math.round(product.stockQuantity / 1000)}k Sold
                </div>
              </div>
            ))}
          </div>
    </div>
  );
};

export default CardPopularProducts;
