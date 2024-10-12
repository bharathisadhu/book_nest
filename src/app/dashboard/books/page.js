// src/app/dashboard/insight/page.js
// import RootLayout from "@/app/layout";
import DashboardLayout from "@/components/DashboardLayout";
import ProductsList from "@/components/ProductList";

const Products = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-center">Book List</h1>
      <ProductsList />
    </DashboardLayout>
  );
};

export default Products;
