import { Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  markClassName?: string;
};

export function Logo({
  className,
  iconClassName,
  textClassName,
  markClassName,
}: LogoProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 select-none',
        className
      )}
    >
      <span
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-full bg-forest text-ivory',
          markClassName
        )}
        aria-hidden="true"
      >
        <Compass className="h-5 w-5" />
      </span>
      <span className={cn('flex flex-col leading-none', textClassName)}>
        <span className="font-serif text-lg font-semibold tracking-wide text-forest">
          WAYFARER
        </span>
        <span className="text-[0.625rem] font-sans uppercase tracking-[0.3em] text-terracotta-600">
          Travel Co.
        </span>
      </span>
    </span>
  );
}
