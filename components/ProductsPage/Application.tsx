"use client";

import {
  Car,
  MoveVertical,
  Zap,
  Factory,
  Home as HomeIcon,
  Cog,
  Building2,
  PlugZap,
} from "lucide-react";

// ── Application catalogue ──
// Replace `image` with a real image URL (e.g. from /public or Strapi) when available.
// While `image` is empty, the icon fallback below is used instead.
type ApplicationItem = {
  key: string;
  name: string;
  description: string;
  image?: string;
  Icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
};

const APPLICATIONS: ApplicationItem[] = [
  {
    key: "automotive",
    name: "Automotive",
    description:
      "Relays and components engineered for reliability in vehicle electrical systems, EV charging and onboard control units.",
    Icon: Car,
  },
  {
    key: "elevating-machine",
    name: "Elevating Machine",
    description:
      "Switching solutions built for elevators, hoists and lifting equipment that demand long mechanical life and safety.",
    Icon: MoveVertical,
  },
  {
    key: "energy-related",
    name: "Energy Related",
    description:
      "Components supporting solar inverters, energy storage systems and other renewable energy applications.",
    Icon: Zap,
  },
  {
    key: "factory-automation",
    name: "Factory Automation",
    description:
      "High-cycle, durable switching devices for PLCs, robotics and industrial control panels on the production line.",
    Icon: Factory,
  },
  {
    key: "home-appliance",
    name: "Home Appliance",
    description:
      "Compact, cost-effective relays for washing machines, refrigerators, air conditioners and other household devices.",
    Icon: HomeIcon,
  },
  {
    key: "industrial-appliance",
    name: "Industrial Appliance",
    description:
      "Rugged components designed for heavy-duty industrial equipment operating in demanding environments.",
    Icon: Cog,
  },
  {
    key: "office-automation",
    name: "Office Automation",
    description:
      "Precision switching parts for printers, copiers and other office equipment requiring quiet, stable operation.",
    Icon: Building2,
  },
  {
    key: "power-distribution",
    name: "Power Distribution",
    description:
      "Reliable, high-capacity switching for power distribution boards, meters and smart grid infrastructure.",
    Icon: PlugZap,
  },
];

function ApplicationCard({ app }: { app: ApplicationItem }) {
  const { name, description, image, Icon } = app;

  return (
    <div className="group flex flex-col border border-slate-100 rounded-2xl overflow-hidden hover:border-[#013478]/25 hover:shadow-xl hover:shadow-[#013478]/6 transition-all duration-300 bg-white h-[360px]">
      <div className="relative w-full h-[45%] flex justify-center items-center overflow-hidden bg-[#013478]/5">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#013478]/10 to-[#013478]/5 flex items-center justify-center">
            <Icon size={44} strokeWidth={1.5} className="text-[#013478] opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-300" />
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-[15px] font-black text-[#020c1a] mb-2 leading-snug group-hover:text-[#013478] transition-colors">
          {name}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-4">{description}</p>
      </div>
    </div>
  );
}

export default function ApplicationSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-8 bg-[#013478]" />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#013478]">
              Applications
            </span>
          </div>
          <h2 className="text-3xl font-black text-[#020c1a]">Where our products are used</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {APPLICATIONS.map((app) => (
          <ApplicationCard key={app.key} app={app} />
        ))}
      </div>
    </section>
  );
}