"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/ui/CommandPalette"), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/ui/WhatsAppButton"), { ssr: false });
const MouseSpotlight = dynamic(() => import("@/components/ui/MouseSpotlight"), { ssr: false });

export default function ClientWidgets() {
  useEffect(() => {
    // Patch Node.prototype.removeChild and insertBefore to prevent browser extensions
    // or unmount race conditions from throwing 'NotFoundError: The node to be removed is not a child of this node'
    if (typeof window !== "undefined" && typeof Node !== "undefined" && Node.prototype) {
      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function <T extends Node>(child: T): T {
        if (child.parentNode !== this) {
          if (child.parentNode) {
            return originalRemoveChild.call(child.parentNode, child) as T;
          }
          return child;
        }
        return originalRemoveChild.call(this, child) as T;
      };

      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
        if (referenceNode && referenceNode.parentNode !== this) {
          if (referenceNode.parentNode) {
            return originalInsertBefore.call(referenceNode.parentNode, newNode, referenceNode) as T;
          }
        }
        return originalInsertBefore.call(this, newNode, referenceNode) as T;
      };
    }
  }, []);

  return (
    <>
      <MouseSpotlight />
      <CustomCursor />
      <CommandPalette />
      <WhatsAppButton />
    </>
  );
}
