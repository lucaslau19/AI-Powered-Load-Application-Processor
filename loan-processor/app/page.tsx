import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Eye, FileText, Bot, Banknote } from "lucide-react";

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:py-20 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          Fast, Fair Funding
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-3">
          Need a little breathing room? Apply in minutes and get a decision fast.
          We&apos;re here to help you move forward.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Helping Canadians move forward every day.
        </p>
        <a href="/apply" className="block sm:inline-block">
          <Button size="lg" className="w-full sm:w-auto text-base px-8">
            Get Started
          </Button>
        </a>
      </section>

      {/* Value Props */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Decisions in Minutes</h3>
              <p className="text-sm text-muted-foreground">
                No long waits or paperwork piles. Our smart system reviews your info right away.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Your Data, Protected</h3>
              <p className="text-sm text-muted-foreground">
                Everything you share stays safe and encrypted. We never sell your info to anyone.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">No Surprises</h3>
              <p className="text-sm text-muted-foreground">
                Track your application every step of the way. What you see is what you get.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:pb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0">
          {[
            { step: 1, icon: FileText, title: "Apply Online", desc: "Fill out a quick form and upload your documents." },
            { step: 2, icon: Bot, title: "Instant Review", desc: "Our AI analyzes your application in seconds." },
            { step: 3, icon: Banknote, title: "Get Funded", desc: "Approved? Funds hit your account in 1\u20132 business days." },
          ].map(({ step, icon: Icon, title, desc }, i) => (
            <div key={step} className="flex flex-col items-center text-center relative">
              {/* Connecting line (desktop only) */}
              {i < 2 && (
                <div className="hidden sm:block absolute top-5 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-border" />
              )}
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm mb-3 z-10">
                {step}
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent mb-3">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground max-w-[220px]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nav text-white/90">
        <div className="mx-auto max-w-4xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p>&copy; 2025 BreeFlow by Bree</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="text-white/40">|</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="text-white/40">|</span>
            <span className="hover:text-white cursor-pointer">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
