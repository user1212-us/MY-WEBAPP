import AnalystSearchComp from "@/components/adminManagement/analystSearch";
import CompanySearchComp from "@/components/adminManagement/companySearch";
import StockSearchComp from "@/components/adminManagement/stockSearch";

export default function StockSearchPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <StockSearchComp />
        <CompanySearchComp />
        <AnalystSearchComp />
      </main>
    </div>
  );
}
