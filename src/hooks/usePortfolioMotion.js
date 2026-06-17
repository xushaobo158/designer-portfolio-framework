import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)
gsap.ticker.lagSmoothing(500, 33)

const allMotionTargets = [
  '[data-motion-nav]',
  '[data-hero-line]',
  '[data-hero-detail]',
  '[data-section-kicker]',
  '[data-section-title]',
  '[data-section-count]',
  '[data-section-description]',
  '[data-project-card]',
  '[data-project-preview]',
  '[data-parallax-media]',
  '[data-ability-card]',
  '[data-process-strip]',
  '[data-contact-status]',
  '[data-contact-title]',
  '[data-contact-description]',
  '[data-contact-actions]',
  '[data-contact-details]',
  '[data-contact-footer]',
].join(',')

export function usePortfolioMotion() {
  const scope = useRef(null)

  useGSAP(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 820px)').matches
    const opening = document.querySelector('.opening-screen')

    if (reducedMotion) {
      gsap.set(allMotionTargets, { clearProps: 'all' })
      gsap.set(opening, { display: 'none' })
      return undefined
    }

    document.documentElement.classList.add('motion-ready')
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const progress = { value: 0 }
    const progressNode = document.querySelector('.opening-progress')
    const heroLines = gsap.utils.toArray('[data-hero-line]')
    const heroDetails = gsap.utils.toArray('[data-hero-detail]')

    gsap.set('[data-motion-nav]', { y: -32, autoAlpha: 0 })
    gsap.set(heroLines, {
      yPercent: 125,
      scaleX: 0.64,
      transformOrigin: 'left center',
    })
    gsap.set(heroLines[0], { xPercent: -16 })
    gsap.set(heroLines[1], { xPercent: 13 })
    gsap.set(heroDetails, { y: 34, autoAlpha: 0 })
    gsap.set('.hero-grid', { autoAlpha: 0, scale: 1.08 })

    const openingTimeline = gsap.timeline({
      defaults: { ease: 'power4.out' },
      onComplete: () => {
        document.body.style.overflow = previousOverflow
        gsap.set(opening, { display: 'none' })
        document.documentElement.classList.add('opening-complete')
        window.dispatchEvent(new CustomEvent('portfolio:opening-complete'))
        const hashTarget = window.location.hash && document.querySelector(window.location.hash)
        if (hashTarget) {
          const previousScrollBehavior = document.documentElement.style.scrollBehavior
          document.documentElement.style.scrollBehavior = 'auto'
          window.scrollTo(0, hashTarget.offsetTop)
          document.documentElement.style.scrollBehavior = previousScrollBehavior
        }
        requestAnimationFrame(() => ScrollTrigger.refresh())
      },
    })
    openingTimeline.timeScale(1.55)

    openingTimeline
      .fromTo('.opening-meta', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.15)
      .to(progress, {
        value: 100,
        duration: 1.35,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (progressNode) progressNode.textContent = String(Math.round(progress.value)).padStart(3, '0')
        },
      }, 0.2)
      .fromTo('.opening-centerline', { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'expo.inOut' }, 0.25)
      .to('.opening-meta', { autoAlpha: 0, y: -18, duration: 0.45, ease: 'power2.in' }, 1.35)
      .to('.opening-centerline', { scaleX: 0, transformOrigin: 'right center', duration: 0.65, ease: 'expo.inOut' }, 1.4)
      .to('.opening-panel-top', { yPercent: -104, duration: 1.35, ease: 'expo.inOut' }, 1.48)
      .to('.opening-panel-bottom', { yPercent: 104, duration: 1.35, ease: 'expo.inOut' }, 1.48)
      .to('.hero-grid', { autoAlpha: 0.34, scale: 1, duration: 1.6 }, 1.72)
      .to('[data-motion-nav]', { y: 0, autoAlpha: 1, duration: 1.15 }, 1.82)
      .to(heroLines, {
        yPercent: 0,
        xPercent: 0,
        scaleX: 1,
        duration: 1.55,
        stagger: 0.13,
        ease: 'expo.out',
      }, 1.86)
      .to(heroDetails, {
        y: 0,
        autoAlpha: 1,
        duration: 1.05,
        stagger: 0.1,
      }, 2.28)

    gsap.to('.hero-copy', {
      yPercent: -7,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.55,
      },
    })

    gsap.utils.toArray('[data-motion-section]').forEach((section) => {
      const kicker = section.querySelector('[data-section-kicker]')
      const title = section.querySelector('[data-section-title]')
      const count = section.querySelector('[data-section-count]')
      const description = section.querySelector('[data-section-description]')

      if (!title) return

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      })
        .from(kicker, { x: -90, autoAlpha: 0, duration: 0.72, ease: 'power4.out' })
        .from(title, {
          yPercent: 120,
          scaleX: 0.72,
          skewY: 3,
          transformOrigin: 'left bottom',
          duration: 1.02,
          ease: 'expo.out',
        }, 0.08)
        .from(count, { y: -35, autoAlpha: 0, duration: 0.58, ease: 'power3.out' }, 0.4)
        .from(description, { y: 48, autoAlpha: 0, duration: 0.72, ease: 'power3.out' }, 0.43)
    })

    const projectCards = gsap.utils.toArray('[data-project-card]')
    if (projectCards.length) {
      const projectTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.project-grid',
          start: 'top 80%',
          once: true,
        },
      })

      projectTimeline
        .from(projectCards, {
          y: 150,
          rotateX: 9,
          autoAlpha: 0,
          transformPerspective: 1200,
          duration: 0.9,
          stagger: 0.11,
          ease: 'power4.out',
          clearProps: 'transform,opacity,visibility',
        })
        .from('[data-project-preview]', {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.78,
          stagger: 0.11,
          ease: 'expo.inOut',
          clearProps: 'clipPath',
        }, 0.12)
        .from('[data-parallax-media]', {
          scale: 1.13,
          duration: 1,
          stagger: 0.11,
          ease: 'power3.out',
          clearProps: 'scale',
        }, 0.14)
    }

    if (!isMobile) {
      projectCards.forEach((card) => {
        const media = card.querySelector('[data-parallax-media]')
        if (!media) return
        gsap.fromTo(media, { yPercent: -3 }, {
          yPercent: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.65,
          },
        })
      })
    }

    const abilityCards = gsap.utils.toArray('[data-ability-card]')
    if (abilityCards.length) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.ability-grid',
          start: 'top 80%',
          once: true,
        },
      })
        .from(abilityCards, {
          y: 130,
          autoAlpha: 0,
          scaleY: 0.86,
          transformOrigin: 'center bottom',
          duration: 0.85,
          stagger: 0.075,
          ease: 'power4.out',
          clearProps: 'transform,opacity,visibility',
        })
        .from('[data-process-strip]', { scaleX: 0, autoAlpha: 0, transformOrigin: 'left center', duration: 0.82, ease: 'expo.out' }, 0.42)
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 72%',
        once: true,
      },
    })
      .from('[data-contact-status]', { y: 30, autoAlpha: 0, duration: 0.58, ease: 'power3.out' })
      .from('[data-contact-title]', {
        y: 170,
        scaleX: 0.7,
        skewY: -3,
        transformOrigin: 'center bottom',
        duration: 1.05,
        ease: 'expo.out',
      }, 0.08)
      .from('[data-contact-description]', { y: 45, autoAlpha: 0, duration: 0.65, ease: 'power3.out' }, 0.48)
      .from('[data-contact-actions] > *', { y: 35, autoAlpha: 0, duration: 0.62, stagger: 0.075, ease: 'power3.out' }, 0.56)
      .from('[data-contact-details] > *', { y: 35, autoAlpha: 0, duration: 0.62, stagger: 0.065, ease: 'power3.out' }, 0.66)
      .from('[data-contact-footer]', { autoAlpha: 0, duration: 0.58 }, 0.78)

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => {
      document.body.style.overflow = previousOverflow
      document.documentElement.classList.remove('motion-ready')
      document.documentElement.classList.remove('opening-complete')
      window.removeEventListener('load', onLoad)
    }
  }, { scope })

  return scope
}
