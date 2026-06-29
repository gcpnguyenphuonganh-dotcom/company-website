
import HeroSection from "@/components/HomePage/Banner"
import AboutPreview from "@/components/HomePage/AboutUs"
import ProductsPreview from "@/components/HomePage/OurProducts"
import CertificationsSection from "@/components/HomePage/QualityAssurance"
import NewsPreview from "@/components/HomePage/News"
import ContactPreview from "@/components/HomePage/ContactUs"
import PartnersSection from "@/components/HomePage/Partners"
import Automotive from "@/components/HomePage/OurProductsCar"
import StatsSection from "@/components/HomePage/Stats"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      <AboutPreview />
      <ProductsPreview />
      <Automotive />
      <CertificationsSection />
      <NewsPreview />
      <ContactPreview />
      <PartnersSection />
    </main>
  )
}
