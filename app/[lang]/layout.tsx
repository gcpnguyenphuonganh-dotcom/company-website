import Navbar from "@/components/Header/NavBar";
import Footer from "@/components/Footer/Footer";
import { I18nProvider } from "@/lib/I18nProvider";
import CookieBanner from "@/components/CookieBanner";

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'vi' },
    { lang: 'ja' },
  ]
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>  
}) {
  const { lang } = await params      

  return (
    <I18nProvider lang={lang}>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CookieBanner/>
    </I18nProvider>
  )
}