


import DashboardLayout from "@/components/DashboardLayout";
import UserCount from "@/components/mainDashBord/UserCount";
import BookCount from "@/components/mainDashBord/BooKCountPrice";
import OrderCount from "@/components/mainDashBord/OrderCountPrice";
import SaleCount from "@/components/mainDashBord/SaleCount";
const Users = () => {
  return (

<>

<DashboardLayout>
        <div className="card bg-base-100 w-96 shadow-xl text-justify mx-10 my-5 font-sans">


       
        <h3 className="text-center uppercase divide-y divide-gray-200 font-bold text-[red]"> user</h3>
                <UserCount/>
        <h3 className="text-center uppercase font-bold text-[red]"> BooK Summary</h3>
                <BookCount/>
        <h3 className="text-center uppercase font-bold text-[red]"> BooK Order Summary</h3>
                <OrderCount/>
       <h3 className="text-center uppercase font-bold text-[red]"> Sale</h3>
                <SaleCount/>
        </div>
        {/* Add more specific content here */}
      </DashboardLayout>

   
</>


  );
};

export default Users;

