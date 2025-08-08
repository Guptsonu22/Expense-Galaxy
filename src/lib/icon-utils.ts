
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
};

export function getLucideIcon(iconName?: IconName): LucideIcon {
  return iconName && iconName in icons ? icons[iconName] : HelpCircle;
}

    