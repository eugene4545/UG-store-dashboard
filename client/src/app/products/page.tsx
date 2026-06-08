"use client";

import { useCreateProductsMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import UseAnimations from "react-useanimations";
import alertOctagon from "react-useanimations/lib/alertOctagon";
import loading from "react-useanimations/lib/loading";
import CreateProductModal from "./CreateProductModal";

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

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductsMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-4">
        <UseAnimations
          animation={loading}
          strokeColor="black"
          size={36}
          wrapperStyle={{ marginBottom: "8px" }}
        />
        <span>Loading</span>
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div className="flex items-center justify-center text-red-500 py-4">
         <div className="flex flex-col items-center justify-center">
          <UseAnimations
            animation={alertOctagon}
            strokeColor="red"
            size={36}
            wrapperStyle={{ marginBottom: "8px" }}
          />
          <span className="text-red-500 text-lg">
            Failed to fetch products
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 dark:border-0 dark:bg-white/5 dark:ring-1 dark:ring-inset dark:ring-white/10 focus-within:dark:ring-2 focus-within:dark:ring-brand-indigo rounded dark:rounded-custom transition-all">
          <SearchIcon className="w-5 h-5 text-gray-500 dark:text-slate-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded dark:rounded-custom bg-white dark:bg-transparent dark:text-slate-200 dark:placeholder-slate-500 focus:outline-none"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 dark:bg-brand-indigo dark:hover:opacity-90 dark:shadow-lg dark:shadow-indigo-500/20 text-gray-200 dark:text-white font-bold py-2 px-4 rounded dark:rounded-custom transition-all"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200 dark:!text-white" /> Create
          Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto
              dark:border-0 dark:glass-surface dark:bg-obsidian-charcoal/60 dark:shadow-none dark:rounded-custom dark:hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={imageForProductId(product.productId)}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="rounded-md w-24 h-24 object-cover mb-3 dark:border dark:border-white/10"
                />
                <h3 className="text-lg text-gray-900 dark:text-slate-100 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800 dark:text-mint dark:font-semibold">${product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600 dark:text-slate-500 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  ); 
};

export default Products;
