// jest-dom adds custom Vitest matchers for asserting on DOM nodes.
// Allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/vitest";

// jsdom does not implement these browser APIs; provide minimal stubs so
// components that use them (e.g. scroll-reveal) render in tests.
if (typeof window.matchMedia !== "function") {
    window.matchMedia = (query: string) =>
        ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: () => {},
            removeEventListener: () => {},
            addListener: () => {},
            removeListener: () => {},
            dispatchEvent: () => false,
        }) as unknown as MediaQueryList;
}

if (typeof globalThis.IntersectionObserver === "undefined") {
    class MockIntersectionObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
            return [];
        }
        root = null;
        rootMargin = "";
        thresholds = [];
    }
    globalThis.IntersectionObserver =
        MockIntersectionObserver as unknown as typeof IntersectionObserver;
}
