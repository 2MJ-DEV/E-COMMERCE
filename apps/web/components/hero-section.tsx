import Link from 'next/link'
import { ArrowRight, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function HeroSection() {
    

    return (
        <>
            
            <main className="overflow-hidden">
                <section>
                    <div className="relative pt-24">
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="max-w-3xl text-center sm:mx-auto lg:mr-auto lg:mt-0 lg:w-4/5">
                                <Link
                                    href="/"
                                    className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border p-1 pr-3">
                                    <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">Nouveau</span>
                                    <span className="text-sm">Marché local frais & direct</span>
                                    <span className="bg-(--color-border) block h-4 w-px"></span>

                                    <ArrowRight className="size-4" />
                                </Link>

                                <h1 className="mt-8 text-balance text-4xl font-semibold md:text-5xl xl:text-5xl xl:[line-height:1.125]">Des légumes et viandes frais, directement des producteurs</h1>
                                <p className="mx-auto mt-8 hidden max-w-2xl text-wrap text-lg font-sans sm:block">Achetez en direct auprès des fournisseurs locaux. Qualité, traçabilité et livraison rapide pour vos clients.</p>
                                <p className="mx-auto mt-6 max-w-2xl text-wrap font-sans sm:hidden">Des produits frais, locaux, livrés rapidement.</p>

                                <div className="mt-8">
                                    <Button
                                        size="lg"
                                        asChild>
                                        <Link href="#">
                                            <Rocket className="relative size-4" />
                                            <span className="text-nowrap">Voir les legumes</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mask-b-from-55% relative mx-auto mt-16 max-w-6xl overflow-hidden px-4">
                            <Image
                                className="z-2 border-border/25 relative hidden rounded-2xl border dark:block"
                                src="/screenshots/marketplace.png"
                                alt="app screen"
                                width={2796}
                                height={2008}
                            />
                            <Image
                                className="z-2 border-border/25 relative rounded-2xl border dark:hidden"
                                src="/screenshots/marketplace.png"
                                alt="app screen"
                                width={2796}
                                height={2008}
                            />
                        </div>
                    </div>
                </section>
                {/* <section className="bg-background relative z-10 pb-16">
                    <div className="m-auto max-w-5xl px-6">
                        <h2 className="text-center text-lg font-medium">Your favorite companies are our partners.</h2>
                        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
                            <img
                                className="h-5 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/nvidia.svg"
                                alt="Nvidia Logo"
                                height="20"
                                width="auto"
                            />
                            <img
                                className="h-4 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/column.svg"
                                alt="Column Logo"
                                height="16"
                                width="auto"
                            />
                            <img
                                className="h-4 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/github.svg"
                                alt="GitHub Logo"
                                height="16"
                                width="auto"
                            />
                            <img
                                className="h-5 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/nike.svg"
                                alt="Nike Logo"
                                height="20"
                                width="auto"
                            />
                            <img
                                className="h-4 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/laravel.svg"
                                alt="Laravel Logo"
                                height="16"
                                width="auto"
                            />
                            <img
                                className="h-7 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/lilly.svg"
                                alt="Lilly Logo"
                                height="28"
                                width="auto"
                            />
                            <img
                                className="h-5 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                                alt="Lemon Squeezy Logo"
                                height="20"
                                width="auto"
                            />
                            <img
                                className="h-6 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/openai.svg"
                                alt="OpenAI Logo"
                                height="24"
                                width="auto"
                            />
                            <img
                                className="h-4 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/tailwindcss.svg"
                                alt="Tailwind CSS Logo"
                                height="16"
                                width="auto"
                            />
                            <img
                                className="h-5 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/vercel.svg"
                                alt="Vercel Logo"
                                height="20"
                                width="auto"
                            />
                            <img
                                className="h-5 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/zapier.svg"
                                alt="Zapier Logo"
                                height="20"
                                width="auto"
                            />
                        </div>
                    </div>
                </section> */}
            </main>
        </>
    )
}
