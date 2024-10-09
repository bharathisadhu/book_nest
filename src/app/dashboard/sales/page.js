
import DashboardLayout from "@/components/DashboardLayout"
import SalesList from "@/components/SalesList"
export default function Sales () {

    return(
       <DashboardLayout>
         <div >
            <h1 className="text-4xl font-bold text-center my-5">All Sales</h1>

            <SalesList/>
            
        </div>
       </DashboardLayout>
    )

}