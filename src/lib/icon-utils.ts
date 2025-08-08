
import {
  UtensilsCrossed,
  PlaneTakeoff,
  Home,
  Lightbulb,
  ShoppingCart,
  Ticket,
  HeartPulse,
  Carrot,
  Car,
  Tag,
  HelpCircle,
  Award,
  ShieldCheck,
  PiggyBank,
  Flame,
  Library,
  type LucideIcon,
} from 'lucide-react';
import type { IconName } from '@/types';

const icons: Record<IconName, LucideIcon> = {
  UtensilsCrossed,
  PlaneTakeoff,
  Home,
  Lightbulb,
  ShoppingCart,
  Ticket,
  HeartPulse,
  Carrot,
  Car,
  Tag,
  HelpCircle,
  Award,
  ShieldCheck,
  PiggyBank,
  Flame,
  Library,
};

export function getLucideIcon(iconName?: IconName): LucideIcon {
  return iconName && iconName in icons ? icons[iconName] : HelpCircle;
}
