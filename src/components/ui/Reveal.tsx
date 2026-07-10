import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";

interface RevealProps {
    children: ReactNode;
    /** Delay before the reveal starts, in ms (used to stagger siblings). */
    delay?: number;
    /** Vertical offset the content rises from, in px. */
    offset?: number;
    sx?: SxProps<Theme>;
}

/**
 * Fades and rises its children into view the first time they enter the
 * viewport. Honors `prefers-reduced-motion` by rendering fully visible with no
 * transition.
 */
export default function Reveal({
    children,
    delay = 0,
    offset = 24,
    sx,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const prefersReduced =
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
            setReduceMotion(true);
            setInView(true);
            return;
        }

        // Environments without IntersectionObserver (e.g. jsdom, very old
        // browsers) just render the content visible.
        if (typeof IntersectionObserver === "undefined") {
            setInView(true);
            return;
        }

        const element = ref.current;
        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <Box
            ref={ref}
            sx={[
                {
                    opacity: inView ? 1 : 0,
                    transform: inView ? "none" : `translateY(${offset}px)`,
                    transition: reduceMotion
                        ? "none"
                        : "opacity 600ms ease, transform 600ms ease",
                    transitionDelay: `${delay}ms`,
                    willChange: "opacity, transform",
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            {children}
        </Box>
    );
}
