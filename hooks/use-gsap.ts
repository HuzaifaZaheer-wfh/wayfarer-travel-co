
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function registerScrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  selector = '[data-reveal]'
) {
  const sectionRef = useRef<T>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    registerScrollTrigger();

    const reducedMotion = prefersReducedMotion();

    if (reducedMotion) {
      section.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        gsap.set(element, { autoAlpha: 1, y: 0 });
      });

      return;
    }

    const hoverCleanup: Array<() => void> = [];

    const context = gsap.context(() => {
      const revealElements = Array.from(
        section.querySelectorAll<HTMLElement>(selector)
      );

      gsap.set(revealElements, {
        autoAlpha: 0,
        y: 26,
      });

      revealElements.forEach((element) => {
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        });
      });

      // GSAP-based hover interactions
      const hoverElements = Array.from(
        section.querySelectorAll<HTMLElement>('[data-gsap-hover]')
      );

      hoverElements.forEach((element) => {
        const enter = () => {
          gsap.to(element, {
            y: -5,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        const leave = () => {
          gsap.to(element, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        element.addEventListener('pointerenter', enter);
        element.addEventListener('pointerleave', leave);
        element.addEventListener('focusin', enter);
        element.addEventListener('focusout', leave);

        hoverCleanup.push(() => {
          element.removeEventListener('pointerenter', enter);
          element.removeEventListener('pointerleave', leave);
          element.removeEventListener('focusin', enter);
          element.removeEventListener('focusout', leave);

          gsap.killTweensOf(element);
        });
      });
    }, section);

    return () => {
      hoverCleanup.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, [selector]);

  return sectionRef;
}

export function useHeroIntro<T extends HTMLElement = HTMLElement>() {
  const heroRef = useRef<T>(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    if (prefersReducedMotion()) {
      hero.querySelectorAll<HTMLElement>('[data-hero]').forEach((element) => {
        gsap.set(element, { autoAlpha: 1, y: 0 });
      });

      return;
    }

    const context = gsap.context(() => {
      const heroElements = Array.from(
        hero.querySelectorAll<HTMLElement>('[data-hero]')
      );

      gsap.fromTo(
        heroElements,
        {
          autoAlpha: 0,
          y: 28,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power3.out',
        }
      );

      const heroImage = hero.querySelector<HTMLElement>('img');

      if (heroImage) {
        gsap.fromTo(
          heroImage,
          { scale: 1.07 },
          {
            scale: 1,
            duration: 1.8,
            ease: 'power2.out',
          }
        );
      }
    }, hero);

    return () => context.revert();
  }, []);

  return heroRef;
}

export function useCountUp<T extends HTMLElement = HTMLElement>(
  value: number,
  suffix = ''
) {
  const counterRef = useRef<T>(null);

  useEffect(() => {
    const element = counterRef.current;

    if (!element) return;

    const finalValue = `${value.toLocaleString('en-US')}${suffix}`;

    if (prefersReducedMotion()) {
      element.textContent = finalValue;
      return;
    }

    registerScrollTrigger();

    const counter = { value: 0 };

    element.textContent = `0${suffix}`;

    const context = gsap.context(() => {
      gsap.to(counter, {
        value,
        duration: 1.8,
        ease: 'power2.out',
        snap: { value: 1 },
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          once: true,
        },
        onUpdate: () => {
          element.textContent =
            `${Math.round(counter.value).toLocaleString('en-US')}${suffix}`;
        },
      });
    }, element);

    return () => context.revert();
  }, [value, suffix]);

  return counterRef;
}
 