import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Earning } from "@/types/calender";
//--
//bmo
//amc

const whenTranslate: { [key: string]: string } = {
  "pre market": "قبل افتتاح الجلسة",
  "post market": "بعد إغلاق الجلسة",
  "during market": "أثناء الجلسة",
};
async function getEarnings(): Promise<Earning[]> {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/calenders/earning`,
    { next: { revalidate: 43200 } } // Revalidate every 12 hours
  );
  if (!response.ok) {
    throw new Error("Failed to fetch earning data");
  }
  return response.json();
}

export default async function EarningComp({
  lang = "en",
}: {
  lang?: "en" | "ar";
}) {
  let earnings: Earning[];
  try {
    earnings = await getEarnings();
  } catch (error) {
    console.error("Error fetching earnings:", error);
    return (
      <TableRow>
        <TableCell colSpan={4} className="text-center">
          {lang === "en"
            ? "Error Loading Earnings Data"
            : "خطأ في تحميل بيانات الأرباح"}
        </TableCell>
      </TableRow>
    );
  }

  const headers = {
    en: ["Date", "Symbol", "When", "Exchange"],
    ar: ["التاريخ", "الرمز", "الوقت", "البورصة"],
  };

  const noEarningsMessage = {
    en: "No earnings dates found",
    ar: "لم يتم العثور على تواريخ أرباح",
  };

  return (
    <div className="m-0 p-0" dir={`${lang === "ar" ? "rtl" : ""}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#003E77]">
            {lang === "en" ? "Earnings Dates" : "تواريخ الأرباح"}
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
              {earnings.map((earning, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap">
                    {earning.date}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {earning.symbol}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {lang === "ar" ? whenTranslate[earning.when] : earning.when}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {earning.exchange}
                  </TableCell>
                </TableRow>
              ))}
              {earnings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    {noEarningsMessage[lang]}
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

/* const whenEnTranslate: { [key: string]: string } = {
  bmo: "pre market",
  amc: "post market",
  "--": "during market",
};

const whenTranslate: { [key: string]: string } = {
  bmo: "قبل افتتاح الجلسة",
  amc: "بعد إغلاق الجلسة",
  "--": "أثناء الجلسة",
}; */
