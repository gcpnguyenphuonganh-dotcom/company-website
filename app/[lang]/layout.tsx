import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { I18nProvider } from "@/lib/I18nProvider";

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
  params: Promise<{ lang: string }>  // ← Promise
}) {
  const { lang } = await params      // ← await

  return (
    <I18nProvider lang={lang}>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </I18nProvider>
  )
}