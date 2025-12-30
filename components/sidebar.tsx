import Link from "next/link";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: "📊" },
  { name: "Sprint Detail", href: "/sprint", icon: "🏃" },
  { name: "Signals", href: "/signals", icon: "🚨" },
  { name: "Automations", href: "/automations", icon: "🤖" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold text-sidebar-foreground">
          ControlLoop
        </h1>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
