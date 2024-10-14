import React from "react";
import Image from "next/image";
import homeImage from "../../assets/home.jpg";
import { Metadata } from "next";
import Trending from "@/components/trending";

export const metadata: Metadata = {
  title: "الصفحة الرئيسية | US Stock Hub",
  description:
    "اكتشف آخر الأخبار والتوصيات والمعلومات حول سوق الأسهم الأمريكية. احصل على بيانات شاملة عن الأسهم وتحديثات السوق.",
  keywords:
    "سوق الأسهم الأمريكي, إشارات الأسهم, إشارات التداول, أخبار مالية, أخبار الأسهم, أحدث أخبار الأسهم, تقويم الطروحات الأولية, طرح أولي للأسهم, الطروحات الأولية, انقسامات الأسهم, تقويم الأرباح, تواريخ الأرباح, أرباح الأسهم, توزيع الأرباح, التقارير المالية, أسعار الأسهم, تحليل الأسهم, تحليل سوق الأسهم, اتجاهات الأسهم, تنبيهات الأسهم, تنبيهات السوق, رؤى التداول, توصيات الأسهم, توقعات الأسهم, تنبؤات الأسهم, إشارات الأسهم الأمريكية, ناسداك, بورصة نيويورك, داو جونز, ستاندرد آند بورز 500, تحديثات السوق, تقويم الأحداث المالية, البيانات المالية, تطبيق إشارات الأسهم, تقويم الأسهم الأمريكية, الأرباح القادمة, أخبار سوق الأسهم الأمريكي, استراتيجيات الاستثمار, نصائح التداول, رؤى مالية, محفظة الأسهم, فحص الأسهم, الاستعلام عن الأسهم, معلومات الأسهم, تاريخ الأسهم, توقعات السوق, أخبار التداول, توقعات سوق الأسهم, مواعيد الطروحات الأولية, تقويم انقسامات الأسهم, تنبيهات انقسامات الأسهم, الانقسامات القادمة للأسهم, إعلانات الأرباح, تقويم توزيع الأرباح, أخبار البورصة, توقعات مالية, أدوات البحث عن الأسهم, منصة معلومات الأسهم, منصة تداول الأسهم, تطبيق سوق الأسهم, منصة التداول, الخدمات المالية, إشارات السوق, أخبار الطروحات الأولية, تحديثات اتجاهات الأسهم, تقارير الأرباح, استراتيجيات سوق الأسهم",
};

const HomePage = () => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 `} dir="rtl">
      <section className="mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
          الأسهم ذات حجم تداول كبير لليوم
        </h2>
        <Trending />
      </section>

      <section className="mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          لماذا نحن
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              نستخدم خوارزميات متطورة لتقديم إشارات الأسهم الأكثر دقة، مما يمنحك
              ميزة تنافسية في السوق. بالإضافة إلى ذلك، نوفر لك معلومات شاملة حول
              أي سهم أمريكي تهتم به. ستبقى أيضًا على اطلاع بأحدث الأخبار
              والمقالات حول سوق الأسهم الأمريكية. نقوم بتجميع التحديثات في الوقت
              الفعلي من مصادر موثوقة حتى لا تفوتك أي تغييرات مهمة في السوق.
            </p>
          </div>

          <div className="md:w-1/2">
            <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-xl shadow-2xl">
              <Image
                src={homeImage}
                alt="Stock market graph"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          معلومات عنا
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-[#1877F2]">
              من نحن
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              نحن فريق من الخبراء الماليين والتقنيين شغوفون بجعل تداول الأسهم
              أكثر سهولة ومرتكزًا على البيانات.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-[#1877F2]">
              مهمتنا
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              تمكين المتداولين من جميع المستويات بالأدوات والرؤى التي يحتاجونها
              لاتخاذ قرارات واثقة ومبنية على معلومات في سوق الأسهم.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-[#1877F2]">
              لماذا بدأنا
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              رأينا حاجة لتوفير إشارات أكثر دقة ومعلومات شاملة للمستثمرين
              الأفراد، فأنشأنا هذه المنصة لتقديم الموثوقية والوضوح.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-[#1877F2]">
              القيم الأساسية
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              الشفافية والدقة والابتكار في كل ما نقوم به.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
