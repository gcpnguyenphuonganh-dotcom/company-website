
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import AboutPreview from "@/components/about-preview"
import ProductsPreview from "@/components/products-preview"
import CertificationsSection from "@/components/certifications-section"
import NewsPreview from "@/components/news-preview"
import ContactPreview from "@/components/contact-preview"
import PartnersSection from "@/components/partners-section"
import AutomotiveSection from "@/components/oto1"
import Automotive from "@/components/car"
import Automotive1 from "@/components/car1"


export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      <AboutPreview />
      <ProductsPreview />
      {/* <AutomotiveSection/> */}
      <Automotive/>
      {/* <Automotive1/> */}
      <CertificationsSection />
      <NewsPreview />
      <ContactPreview />
      <PartnersSection />
    </main>
  )
}
