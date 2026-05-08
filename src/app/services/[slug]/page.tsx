import services from "@/data/services.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Globe, Smartphone, Cpu, Code2, Check, ArrowRight } from "lucide-react";
import { Card, Header, PlanName, MainPrice, Body, List, ListItem, Separator } from "@/components/ui/pricing-card";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

const IconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Cpu,
  Code2,
};

export default async function ServicePost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = services.find(s => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon && IconMap[service.icon] 
    ? IconMap[service.icon] 
    : Code2;

  const introMarkdown = service.intro;
  const pricingPlans = service.packages;
  const outroMarkdown = service.outro;

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 md:px-24 mb-32">
        <header className="mb-16 pb-16 border-b border-neutral-200 dark:border-neutral-900 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="mb-8 p-4 bg-neutral-100 dark:bg-neutral-900 inline-block rounded-2xl text-black dark:text-white">
              <Icon size={32} strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 font-light max-w-2xl leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 min-w-[280px] shadow-sm">
            <span className="text-neutral-500 text-xs font-mono uppercase tracking-widest block mb-2">Harga Mulai</span>
            <div className="text-2xl font-bold text-black dark:text-white mb-6">
              {service.price.replace('Mulai Dari ', '')}
            </div>
            <Link 
              href={`https://wa.me/6287776266539?text=${encodeURIComponent(`Halo Pilcodev, saya ingin konsultasi gratis mengenai layanan ${service.title}.`)}`}
              className="flex items-center justify-center gap-2 w-full text-center bg-black text-white dark:bg-white dark:text-black py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform"
            >
              Konsultasi Gratis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

        <div className="flex flex-col gap-16">
          <div className="w-full">
            <article className="prose prose-neutral dark:prose-invert max-w-4xl mx-auto prose-p:leading-relaxed prose-p:font-light prose-headings:font-medium prose-a:text-black dark:prose-a:text-white hover:prose-a:text-neutral-600 dark:hover:prose-a:text-neutral-300">
              <ReactMarkdown>{introMarkdown}</ReactMarkdown>
            </article>

            {pricingPlans.length > 0 && (
              <div className="mt-20 mb-20">
                <h2 className="text-3xl font-semibold mb-10 text-center tracking-tight">Pilihan Paket</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pricingPlans.map((plan: any, idx: number) => (
                    <Card key={idx} className="max-w-full">
                      <Header>
                        <PlanName>{plan.title}</PlanName>
                        <MainPrice className="text-xl">{plan.price}</MainPrice>
                      </Header>
                      <Body>
                        <List>
                          {plan.features.map((feature: string, i: number) => (
                            <ListItem key={i}>
                              <Check className="w-4 h-4 mt-0.5 text-neutral-500 shrink-0" /> 
                              <span>{feature}</span>
                            </ListItem>
                          ))}
                        </List>
                        {plan.benefits.length > 0 && (
                          <>
                            <Separator>Keuntungan</Separator>
                            <List>
                              {plan.benefits.map((benefit: string, i: number) => (
                                <ListItem key={i}>
                                  <Check className="w-4 h-4 mt-0.5 text-neutral-900 dark:text-neutral-100 shrink-0" /> 
                                  <span>{benefit}</span>
                                </ListItem>
                              ))}
                            </List>
                          </>
                        )}
                        <Link 
                          href={`https://wa.me/6287776266539?text=${encodeURIComponent(`Halo Pilcodev, saya tertarik untuk memilih paket ${plan.title} pada layanan ${service.title}.`)}`}
                          className="mt-6 flex items-center justify-center gap-2 w-full border border-neutral-200 dark:border-neutral-800 py-2.5 rounded-full text-sm font-medium text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                        >
                          Pilih Paket
                        </Link>
                      </Body>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <article className="prose prose-neutral dark:prose-invert max-w-4xl mx-auto prose-p:leading-relaxed prose-p:font-light prose-headings:font-medium prose-li:font-light">
              <ReactMarkdown>{outroMarkdown}</ReactMarkdown>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}

