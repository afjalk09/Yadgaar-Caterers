import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <main
      id="main-content"
      aria-labelledby="not-found-title"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-24 text-center"
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative w-full max-w-xl">
        <p className="font-serif text-7xl font-bold leading-none text-primary md:text-8xl">404</p>
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-accent" />
        <h1 id="not-found-title" className="mt-8 font-serif text-3xl font-bold text-foreground md:text-4xl">
          This page has left the celebration
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          The page you are looking for could not be found or may have moved. Head back to the homepage, or use the
          links below to explore our catering services.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-full rounded-full bg-primary px-8 text-white hover:bg-primary/90 sm:w-auto">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full rounded-full border-primary px-8 text-primary hover:bg-primary/5 sm:w-auto">
            <Link href="/#services">Explore Services</Link>
          </Button>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-6">
          <a href={siteConfig.contact.phonePrimaryHref} className="inline-flex items-center gap-2 rounded-md hover:text-primary">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.contact.phonePrimary}
          </a>
          <a href={`${siteConfig.contact.whatsapp}?text=Hello%20Yadgaar%20Caterers`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md hover:text-primary">
            <Mail className="h-4 w-4" aria-hidden="true" />
            WhatsApp Enquiry
          </a>
          <Link href="/#contact" className="rounded-md hover:text-primary">
            Contact details
          </Link>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
