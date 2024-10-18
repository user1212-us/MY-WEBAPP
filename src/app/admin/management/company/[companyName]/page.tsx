export default async function AskAboutStockPage({
  params,
}: {
  params: { companyName: string };
}) {
  return (
    <>
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-[#003E77] mb-4 md:mb-0">
          {params.companyName}
        </h1>
      </div>
    </>
  );
}
