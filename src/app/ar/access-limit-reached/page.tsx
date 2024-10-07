import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الوصول للحد الأقصى",
};

export default function AccessLimitReachedPage() {
  return (
    <>
      <Card className="max-w-md mx-auto mt-10 ">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#FF0000]">
            تم الوصول إلى الحد الأقصى من الزيارات.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            .لقد وصلت إلى الحد الأقصى لعدد الزيارات لهذه الصفحة اليوم (ثلاث
            زيارات). يرجى العودة غداً
          </p>
        </CardContent>
      </Card>
    </>
  );
}
