import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPO } from "@/types/calender";

async function getIPO(): Promise<IPO[]> {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/calenders/ipo`,
    { next: { revalidate: 43200 } }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch earning data");
  }
  return response.json();
}

export default async function IpoComp({ lang = "en" }: { lang?: "en" | "ar" }) {
  let ipos: IPO[];
  try {
    ipos = await getIPO();
  } catch (error) {
    console.error("Error fetching IPOs:", error);
    return (
      <TableRow>
        <TableCell colSpan={4} className="text-center">
          {lang === "en"
            ? "Error Loading IPO Data"
            : "خطأ في تحميل بيانات اكتتابات الأسهم"}
        </TableCell>
      </TableRow>
    );
  }

  const headers = {
    en: [
      "Date",
      "Symbol",
      "Company",
      "Exchange",
      "Shares",
      "Price Range",
      "Market Cap",
    ],
    ar: [
      "التاريخ",
      "الرمز",
      "الشركة",
      "البورصة",
      "الأسهم",
      "نطاق السعر",
      "القيمة السوقية",
    ],
  };

  const noIposMessage = {
    en: "No IPOs found",
    ar: "لم يتم العثور على اكتتابات عامة",
  };

  const undefinedText = {
    en: "Undefined",
    ar: "غير معرف",
  };

  return (
    <div className="m-0 p-0" dir={`${lang === "ar" ? "rtl" : ""}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#003E77]">
            {lang === "en" ? "IPOs" : "الاكتتابات العامة"}
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
              {ipos.map((ipo, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap">
                    {ipo.date}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {ipo.symbol}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {ipo.company}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {ipo.exchange}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {ipo.shares
                      ? new Intl.NumberFormat("en-US").format(ipo.shares)
                      : undefinedText[lang]}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {ipo.priceRange
                      ? `${ipo.priceRange}$`
                      : undefinedText[lang]}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {ipo.marketCap
                      ? `${new Intl.NumberFormat("en-US").format(
                          ipo.marketCap
                        )}$`
                      : undefinedText[lang]}
                  </TableCell>
                </TableRow>
              ))}
              {ipos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    {noIposMessage[lang]}
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
