import { useState } from "react";

const EulaModal = ({ lang }: { lang: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const content =
    lang === "ar"
      ? {
          title: "اتفاقية المستخدم",
          lastUpdated: "آخر تحديث: 4-10-2024",
          importantNotice:
            "مهم: يرجى قراءة اتفاقية المستخدم قبل استخدام التطبيق. باستخدامك للتطبيق، فإنك توافق على الالتزام بهذه الاتفاقية.",
          licenseGrant: "1. منح الترخيص",
          licenseText:
            "نمنحك ترخيصًا لاستخدام التطبيق للأغراض الشخصية وغير التجارية.",
          restrictions: "2. القيود",
          restrictionList: [
            "عدم إعادة إنتاج أو تعديل أو توزيع محتوى التطبيق بدون إذن.",
            "عدم استخدام التطبيق لأغراض تجارية.",
            "عدم الانخراط في أي نشاط قد يضر بالتطبيق.",
          ],
          userConduct: "3. سلوك المستخدم",
          userConductText:
            "توافق على استخدام التطبيق فقط للأغراض القانونية ووفقًا لهذه الاتفاقية.",
          disclaimer: "4. إخلاء المسؤولية",
          disclaimerText:
            'يتم تقديم التطبيق "كما هو" دون أي ضمانات. لا نضمن أن يكون التطبيق خاليًا من الأخطاء أو متاحًا بشكل دائم.',
          changesToAgreement: "5. التغييرات على الاتفاقية",
          changesText:
            "نحتفظ بالحق في تعديل هذه الاتفاقية. سيتم نشر النسخة المحدثة على هذه الصفحة.",
          acceptance: "6. القبول",
          acceptanceText:
            "باستخدامك للتطبيق، فإنك تقر بأنك قد قرأت وفهمت وتوافق على الالتزام بهذه الاتفاقية.",
        }
      : {
          title: "User Agreement",
          lastUpdated: "Last Updated: [Insert Date]",
          importantNotice:
            "IMPORTANT: Please read this User Agreement before using the application. By using the application, you agree to be bound by this agreement.",
          licenseGrant: "1. License Grant",
          licenseText:
            "We grant you a license to use the application for personal and non-commercial purposes.",
          restrictions: "2. Restrictions",
          restrictionList: [
            "Do not reproduce, modify, or distribute application content without permission.",
            "Do not use the application for commercial purposes.",
            "Do not engage in any activity that may harm the application.",
          ],
          userConduct: "3. User Conduct",
          userConductText:
            "You agree to use the application only for lawful purposes and in accordance with this Agreement.",
          disclaimer: "4. Disclaimer",
          disclaimerText:
            'The application is provided "as is" without any warranties. We do not guarantee that the application will be error-free or always available.',
          changesToAgreement: "5. Changes to Agreement",
          changesText:
            "We reserve the right to modify this Agreement. The updated version will be posted on this page.",
          acceptance: "6. Acceptance",
          acceptanceText:
            "By using the application, you acknowledge that you have read, understood, and agree to be bound by this Agreement.",
        };

  return (
    <div>
      <button
        className="text-blue-500 underline mx-1"
        onClick={() => setIsOpen(true)}
      >
        {lang === "ar" ? "اتفاقية المستخدم" : "User Agreement"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 max-w-md rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {lang === "ar" ? "اتفاقية المستخدم" : "User Agreement"}
            </h2>
            <div className="overflow-y-scroll h-64">
              {/* EULA content */}
              <div
                className={`p-6 ${
                  lang === "ar" ? "text-right" : "text-left"
                } max-w-4xl mx-auto`}
              >
                <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
                <p className="text-gray-500 mb-6">{content.lastUpdated}</p>
                <p className="text-lg font-semibold">
                  {content.importantNotice}
                </p>
                <section className="my-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {content.licenseGrant}
                  </h2>
                  <p>{content.licenseText}</p>
                </section>
                <section className="my-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {content.restrictions}
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    {content.restrictionList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section className="my-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {content.userConduct}
                  </h2>
                  <p>{content.userConductText}</p>
                </section>
                <section className="my-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {content.disclaimer}
                  </h2>
                  <p>{content.disclaimerText}</p>
                </section>
                <section className="my-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {content.changesToAgreement}
                  </h2>
                  <p>{content.changesText}</p>
                </section>
                <section className="my-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {content.acceptance}
                  </h2>
                  <p>{content.acceptanceText}</p>
                </section>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                {lang === "ar" ? "موافق" : "Okay"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EulaModal;
