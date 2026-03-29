"use client";

import { Copy, ExternalLink, GitPullRequest, Maximize2, ArrowLeft } from "lucide-react";
import { MeshGradient, Dithering } from "@paper-design/shaders-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Release {
  title: string;
  date: string;
  image: string;
  excerpt: string;
  contributors: string[];
  content: React.ReactNode;
}

interface ChangelogProps {
  title: string;
  subtitle: string;
  releases: Release[];
  backHref?: string;
}

export function Changelog({ title, subtitle, releases, backHref = "/" }: ChangelogProps) {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* shader header full-width */}
      <div className="relative w-full overflow-hidden">
        <MeshGradient
          colors={["#5b00ff", "#00ffa3", "#ff9a00", "#ea00ff"]}
          swirl={0.55}
          distortion={0.85}
          speed={0.1}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <Dithering
          colorBack="#f2f2f2"
          colorFront="#eaeaea"
          shape="simplex"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/30" />

        <div className="relative container mx-auto px-4 py-12 text-left">
          <a
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Back
          </a>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <GitPullRequest className="size-4" />
              <p>Changelog</p>
            </div>
            <h1 className="text-4xl font-semibold text-white leading-snug">
              {title}
              <br /> {subtitle}
            </h1>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="grid justify-center container mx-auto px-4 border-x border-white/10">
        {releases.map((item, idx) => (
          <Dialog key={idx}>
            <div className="relative flex flex-col lg:flex-row w-full py-16 gap-6 lg:gap-0">
              <div className="lg:sticky top-2 h-fit">
                <time className="text-white/50 w-36 text-sm font-medium lg:absolute">
                  {item.date}
                </time>
              </div>

              <div className="flex max-w-prose flex-col gap-4 lg:mx-auto">
                <h3 className="text-3xl font-medium text-white lg:pt-10 lg:text-3xl">{item.title}</h3>
                <DialogTrigger asChild>
                  <div className="relative cursor-pointer">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="border-white/10 max-h-96 w-full rounded-lg border object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-lg" />
                  </div>
                </DialogTrigger>
                <p className="text-white/50 text-sm font-medium">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center -space-x-2">
                      {item.contributors.slice(0, 3).map((src, id) => (
                        <img
                          key={id}
                          src={src}
                          alt="Contributor"
                          className="border-white/10 size-6 rounded-full border"
                        />
                      ))}
                    </div>
                    {item.contributors.length > 3 && (
                      <span className="text-white/50 text-sm font-medium">
                        +{item.contributors.length - 3} contributors
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/10">
                              <Maximize2 className="size-4" />
                            </Button>
                          </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Show full release</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/10">
                            <Copy className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy link</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/10">
                            <ExternalLink className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Open in new tab</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 absolute bottom-0 left-0 right-0 h-px w-[200vw] -translate-x-1/2" />
            </div>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-prose bg-black/95 border-white/20 text-white">
              <DialogHeader>
                <DialogTitle className="text-left text-white">{item.title}</DialogTitle>
                <DialogDescription className="text-left text-white/60">
                  {item.excerpt}
                </DialogDescription>
              </DialogHeader>
              <img
                src={item.image}
                alt={item.title}
                className="border-white/10 max-h-96 w-full rounded-lg border object-cover"
              />
              {item.content}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
