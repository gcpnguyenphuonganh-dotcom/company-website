"use client";


const partners = [
  "Suzuki",
  "Daihatsu",
  "Isuzu",
  "Lexus",
  "Acura",
  "Infiniti",
  "Scion",
  "Hino",
  "UD Trucks",
];

export default function OurCustomers() {
  return (
    <section className="bg-white py-24">

        {/* GRID 2 CỘT */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT: DESCRIPTION */}
          <div className="max-w-[520px]">
           <SectionLabel>Our Customers</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-black text-[#020c1a] mb-6 leading-snug">
              Trusted by Our Valued Customers
            </h2>

            <p className="text-gray-600 leading-relaxed text-[14px]">
             We are proud to collaborate with a wide range of trusted customers who rely on our quality, reliability, and commitment to excellence. Through close partnerships and continuous innovation, we strive to understand each customer’s unique needs and deliver solutions that create lasting value. Our dedication to high standards and long-term relationships enables us to consistently exceed expectations and build trust across every collaboration.
            </p>
          </div>

          {/* RIGHT: PARTNERS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

            {partners.map((partner) => (
              <div
                key={partner}
                className="flex items-center justify-center h-[72px] px-4 border border-gray-200 rounded-xl bg-gray-50 
                hover:bg-[#013478]/5 hover:border-[#013478]/30 hover:scale-[1.05] transition-all duration-300"
              >
                <span className="text-base font-semibold text-gray-500 hover:text-[#013478] transition-colors">
                  {partner}
                </span>
              </div>
            ))}

          </div>

        </div>
    </section>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className={`h-px w-8 ${light ? "bg-[#4a7fd4]" : "bg-[#013478]"}`} />
      <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${light ? "text-[#4a7fd4]" : "text-[#013478]"}`}>
        {children}
      </span>
    </div>
  );
}