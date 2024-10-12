import DashboardLayout from "@/components/DashboardLayout";
import SalesList from "@/components/SalesList";
export default function Sales() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold text-center mb-4 text-[#F65D4E]">
          All Sales
        </h1>

        <SalesList />
      </div>
    </DashboardLayout>
  );
}
