"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Intercept clicks on links globally
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href) {
        // Skip default page refresh / hash anchors / external links / targets
        const url = new URL(link.href);
        const isInternal = url.origin === window.location.origin;
        const isHash = url.hash !== "";
        const targetAttr = link.getAttribute("target");
        
        // Skip download links or special schemes
        const isSpecialScheme = url.protocol === "mailto:" || url.protocol === "tel:";

        if (isInternal && !isHash && !isSpecialScheme && (!targetAttr || targetAttr === "_self")) {
          const targetPath = url.pathname + url.search;
          
          // Skip if clicking current path
          if (targetPath === pathname) return;

          e.preventDefault();

          const curtain = curtainRef.current;
          if (!curtain) return;

          // Slide curtain up from bottom
          gsap.killTweensOf(curtain);
          gsap.timeline({
            onComplete: () => {
              router.push(targetPath);
            }
          })
          .set(curtain, { yPercent: 100, display: "flex" })
          .to(curtain, {
            yPercent: 0,
            duration: 0.5,
            ease: "power3.inOut"
          });
        }
      }
    };

    document.addEventListener("click", handleLinkClick, true);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
    };
  }, [pathname, router]);

  // When pathname changes, slide curtain up to top to reveal the new page content
  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      // On first load, hide curtain immediately without animation
      gsap.set(curtain, { display: "none" });
      return;
    }

    gsap.killTweensOf(curtain);
    gsap.timeline({
      onComplete: () => {
        gsap.set(curtain, { display: "none" });
      }
    })
    .set(curtain, { yPercent: 0, display: "flex" })
    .to(curtain, {
      yPercent: -100,
      duration: 0.55,
      ease: "power3.inOut"
    });
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--color-surface)",
        borderTop: "4px solid var(--color-violet)",
        zIndex: 99999,
        pointerEvents: "none",
        transform: "translateY(100%)",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2 
          style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "2.5rem", 
            fontWeight: 500,
            color: "var(--color-text-primary)", 
            letterSpacing: "0.1em",
            margin: 0
          }}
        >
          ZENTRIX
        </h2>
        <div 
          style={{ 
            width: "60px", 
            height: "1px", 
            background: "var(--color-violet)", 
            margin: "12px auto 0" 
          }} 
        />
      </div>
    </div>
  );
}
