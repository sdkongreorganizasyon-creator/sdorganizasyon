import {
  BadgeCheck,
  BarChart3,
  Bus,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Cpu,
  Globe2,
  Hotel,
  Landmark,
  ListChecks,
  Mail,
  MapPinned,
  MessagesSquare,
  MonitorSmartphone,
  Network,
  Presentation,
  QrCode,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  WalletCards,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "badge-check": BadgeCheck,
  bus: Bus,
  "calendar-check": CalendarCheck2,
  chart: BarChart3,
  check: CheckCircle2,
  clipboard: ClipboardCheck,
  clock: Clock3,
  cpu: Cpu,
  globe: Globe2,
  hotel: Hotel,
  landmark: Landmark,
  "list-checks": ListChecks,
  mail: Mail,
  map: MapPinned,
  messages: MessagesSquare,
  monitor: MonitorSmartphone,
  network: Network,
  presentation: Presentation,
  qr: QrCode,
  shield: ShieldCheck,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  "user-check": UserCheck,
  users: Users,
  wallet: WalletCards,
  workflow: Workflow,
};

type IconProps = Readonly<{
  name?: string | null;
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

export function Icon({
  name,
  size = 24,
  strokeWidth = 1.7,
  className,
}: IconProps) {
  const Component = (name && iconMap[name]) || Sparkles;

  return (
    <Component
      aria-hidden="true"
      className={className}
      size={size}
      strokeWidth={strokeWidth}
    />
  );
}
