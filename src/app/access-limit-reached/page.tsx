import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccessLimitReachedPage() {
  return (
    <>
      <Card className="max-w-md mx-auto mt-10 ">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#FF0000]">
            Access Limit Reached
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            You have reached the maximum number of visits to this page for today
            (three visits). Please come back tomorrow.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
