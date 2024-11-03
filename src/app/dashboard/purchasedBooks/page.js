import DashboardLayout from "@/components/DashboardLayout";
import PurchasedBooks from "@/components/PurchasedBooks";

const Cart = () => {
  return (
    <main>
      <DashboardLayout>
        <h1 className="text-2xl font-bold text-center mb-4 text-[#F65D4E]">
          Purchased Books
        </h1>
        {/* Add more specific content here */}
        <PurchasedBooks />
      </DashboardLayout>
    </main>
  );
};
export default Cart;
