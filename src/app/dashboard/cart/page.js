import DashboardLayout from "@/components/DashboardLayout";
import CartList from "@/components/Cart";

const Cart = () => {
  return (
    <main>
      <DashboardLayout>
      <h1 className="text-2xl font-bold text-center mb-4 text-[#F65D4E]">This is the Cart List </h1>
      {/* Add more specific content here */}
      <CartList/>
    </DashboardLayout>
    </main>
  );
};
export default Cart;