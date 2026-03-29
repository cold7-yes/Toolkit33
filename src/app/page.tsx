"use client";
import React from "react";
import { Radar, IconContainer } from "../components/ui/radar-effect";
import { HiCog } from "react-icons/hi";
import { HiCpuChip } from "react-icons/hi2";
import { BsGlobe } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { FiTool } from "react-icons/fi";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black">
      <div className="relative flex h-[32rem] w-full max-w-6xl flex-col items-center justify-end space-y-6 overflow-hidden px-4 pb-24">
        {/* Row 1 — Automations, Agents, Web Tools */}
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex w-full items-center justify-between">
            <IconContainer
              text="Automations"
              delay={0.2}
              href="/automations"
              icon={<HiCog className="h-8 w-8 text-slate-600" />}
            />
            <IconContainer
              delay={0.4}
              text="Agents"
              href="/agents"
              icon={<HiCpuChip className="h-8 w-8 text-slate-600" />}
            />
            <IconContainer
              text="Web Tools"
              delay={0.3}
              href="/web-tools"
              icon={<BsGlobe className="h-8 w-8 text-slate-600" />}
            />
          </div>
        </div>
        {/* Row 2 — Documentation, Maintenance */}
        <div className="mx-auto w-full max-w-xl">
          <div className="flex w-full items-center justify-between">
            <IconContainer
              text="Documentation"
              delay={0.5}
              href="/documentation"
              icon={<IoDocumentText className="h-8 w-8 text-slate-600" />}
            />
            <IconContainer
              text="Maintenance"
              delay={0.8}
              href="/maintenance"
              icon={<FiTool className="h-8 w-8 text-slate-600" />}
            />
          </div>
        </div>

        <Radar className="absolute -bottom-12" />
        <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>
    </div>
  );
}
