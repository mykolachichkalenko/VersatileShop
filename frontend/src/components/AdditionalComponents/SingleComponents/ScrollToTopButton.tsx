import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 1000);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!show) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed top-2 z-999 rounded-full p-3 shadow-md bg-white/90 backdrop-blur border cursor-pointer"
            aria-label="Scroll to top"
        >
            <ArrowUp size={20} />
        </button>
    );
}
