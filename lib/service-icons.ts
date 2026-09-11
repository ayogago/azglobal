import { Briefcase, GraduationCap, HeartPulse, Landmark, Scale, UserRound, type LucideIcon } from 'lucide-react';
import type { ServiceKey } from '@/lib/content';

export const SERVICE_ICONS: Record<ServiceKey, LucideIcon> = {
  immigration: Landmark,
  legal: Scale,
  academic: GraduationCap,
  medical: HeartPulse,
  business: Briefcase,
  personal: UserRound,
};
