"use client";

export const dynamic = 'force-dynamic';

import { CheckCircle, Package, Tag, TrendingDown, TrendingUp } from "lucide-react";
import CardExpenseSummary from "./CardExpenseSummary";
import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
import StatCard from "./StatCard";
import UseAnimations from "@/app/(components)/DynamicAnimation";
import alertOctagon from "react-useanimations/lib/alertOctagon";
import loading from "react-useanimations/lib/loading";
import { useGetProductsQuery } from "@/state/api";


const Dashboard = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-4">
        <UseAnimations
          animation={loading}
          strokeColor="blue"
          size={50}
          wrapperStyle={{ marginBottom: "8px" }}
        />
        <span>Loading</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardSalesSummary />
      <CardPopularProducts />
      <CardPurchaseSummary />
      <CardExpenseSummary />
      <StatCard
        title="Customers & Returns"
        primaryIcon={<Package className="text-emerald-600 w-6 h-6" />}
        dateRange="2–8 Jun 2025"
        details={[
          {
            title: "New Customers",
            amount: "348",
            changePercentage: 22,
            IconComponent: TrendingUp,
          },
          {
            title: "Return Rate",
            amount: "4.2%",
            changePercentage: -8,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Fulfilment & Backorders"
        primaryIcon={<CheckCircle className="text-emerald-600 w-6 h-6" />}
        dateRange="2–8 Jun 2025"
        details={[
          {
            title: "Shipped Today",
            amount: "214",
            changePercentage: 18,
            IconComponent: TrendingUp,
          },
          {
            title: "Backorders",
            amount: "37",
            changePercentage: -31,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Revenue & Discounts"
        primaryIcon={<Tag className="text-emerald-600 w-6 h-6" />}
        dateRange="2–8 Jun 2025"
        details={[
          {
            title: "Weekly Revenue",
            amount: "$28,450",
            changePercentage: 14,
            IconComponent: TrendingUp,
          },
          {
            title: "Promo Spend",
            amount: "$3,200",
            changePercentage: -5,
            IconComponent: TrendingDown,
          },
        ]}
      />
    </div>
  );
};

export default Dashboard;

