import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Split } from "@/types/calender";
const typeTranslate: { [key: string]: string } = {
  Forward: "تقسيم عادي",
  Reverse: "تقسيم عكسي",
};
async function getSplits(): Promise<Split[]> {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/calenders/split`,
    { next: { revalidate: 43200 } } // Revalidate every 12 hours
  );
  if (!response.ok) {
    throw new Error("Failed to fetch split data");
  }
  return response.json();
}

export default async function SplitComp({
  lang = "en",
}: {
  lang?: "en" | "ar";
}) {
  let splits: Split[];
  try {
    splits = await getSplits();
  } catch (error) {
    console.error("Error fetching splits:", error);
    return (
      <TableRow>
        <TableCell colSpan={4} className="text-center">
          {lang === "en"
            ? "Error Loading Split Data"
            : "خطأ في تحميل بيانات تجزئة الأسهم"}
        </TableCell>
      </TableRow>
    );
  }

  const headers = {
    en: ["Date", "Symbol", "Ratio", "Type"],
    ar: ["التاريخ", "الرمز", "النسبة", "النوع"],
  };

  const noSplitsMessage = {
    en: "No stock splits found",
    ar: "لم يتم العثور على تجزئة أسهم",
  };

  return (
    <div className="m-0 p-0" dir={`${lang === "ar" ? "rtl" : ""}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#003E77]">
            {lang === "en" ? "Stock Splits" : "تجزئة الأسهم"}
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {headers[lang].map((header, index) => (
                  <TableHead
                    key={index}
                    className={`bg-[#003E77] text-white ${
                      lang === "ar" ? "text-right" : ""
                    }	`}
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {splits.map((split, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap">
                    {split.date}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {split.symbol}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {split.ratio}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {lang === "ar" ? typeTranslate[split.type] : split.type}
                  </TableCell>
                </TableRow>
              ))}
              {splits.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    {noSplitsMessage[lang]}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
