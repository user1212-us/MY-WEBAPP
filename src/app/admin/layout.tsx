import AdminTopNav from "@/components/adminNav";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    //   <div className="flex h-screen bg-gray-100">

    <div className="flex-1 flex flex-col overflow-hidden">
      <AdminTopNav />
      {/* Page content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
    //   </div>
  );
};

export default AdminLayout;
