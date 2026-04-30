import "./ChatWithUserMessages.css";
import type Message from "@/Utils/Interfaces/Message.ts";
import MessageCard from "@/components/AdditionalComponents/Cards/MessageCard.tsx";
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {ChevronDown} from "lucide-react";

interface ChatWithUserMessagesProps {
    messages: Message[];
    myId: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    isNewMessageAdded: boolean;
    setIsNewMessageAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatWithUserMessages({
                                                 messages,
                                                 myId,
                                                 setPage,
                                                 setIsNewMessageAdded,
                                                 isNewMessageAdded,
                                             }: ChatWithUserMessagesProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const lockRef = useRef(false);
    const prevScrollHeightRef = useRef(0);
    const prevScrollTopRef = useRef(0);
    const shouldRestoreScrollRef = useRef(false);
    const didInitialScrollRef = useRef(false);
    const wasNearBottomRef = useRef(true);


    const [showScrollDownButton, setShowScrollDownButton] = useState(false);

    const firstMessageKey = useMemo(
        () => messages[0]?.id || messages[0]?.temporaryId,
        [messages]
    );

    const lastMessageKey = useMemo(
        () => messages[messages.length - 1]?.id || messages[messages.length - 1]?.temporaryId,
        [messages]
    );

    const isNearBottom = (container: HTMLDivElement, threshold = 300) => {
        return container.scrollHeight - container.scrollTop - container.clientHeight <= threshold;
    };

    const scrollToBottomNow = () => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollTop = container.scrollHeight - container.clientHeight;
    };

    const handleScrollToBottom = () => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth"
        });

        wasNearBottomRef.current = true;
        setShowScrollDownButton(false);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const nearBottom = isNearBottom(container, 300);
            wasNearBottomRef.current = nearBottom;
            setShowScrollDownButton(!nearBottom);
        };

        handleScroll();
        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        const container = containerRef.current;

        if (!sentinel || !container) return;
        if (!didInitialScrollRef.current) return;

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !lockRef.current) {
                    lockRef.current = true;

                    prevScrollHeightRef.current = container.scrollHeight;
                    prevScrollTopRef.current = container.scrollTop;
                    shouldRestoreScrollRef.current = true;

                    setPage(prev => prev + 1);
                }
            },
            {
                root: container,
                threshold: 0.1,
                rootMargin: "100px"
            }
        );

        obs.observe(sentinel);

        return () => obs.disconnect();
    }, [firstMessageKey, setPage]);

    useLayoutEffect(() => {
        if (didInitialScrollRef.current) return;
        if (messages.length === 0) return;

        scrollToBottomNow();
        didInitialScrollRef.current = true;
        setShowScrollDownButton(false);
    }, [lastMessageKey]);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        if (!shouldRestoreScrollRef.current) return;

        const prevScrollHeight = prevScrollHeightRef.current;
        const prevScrollTop = prevScrollTopRef.current;
        const newScrollHeight = container.scrollHeight;
        const heightDiff = newScrollHeight - prevScrollHeight;

        container.scrollTop = prevScrollTop + heightDiff;

        shouldRestoreScrollRef.current = false;
        prevScrollHeightRef.current = 0;
        prevScrollTopRef.current = 0;

        requestAnimationFrame(() => {
            lockRef.current = false;
        });
    }, [firstMessageKey]);

    useLayoutEffect(() => {
        if (!isNewMessageAdded) return;

        if (wasNearBottomRef.current) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    scrollToBottomNow();
                    setShowScrollDownButton(false);
                    setIsNewMessageAdded(false);
                });
            });
            return;
        }

        setShowScrollDownButton(true);
        setIsNewMessageAdded(false);
    }, [lastMessageKey, isNewMessageAdded, setIsNewMessageAdded]);



    return (
        <div ref={containerRef} className={"chatWithUserMessages"}>
            {messages?.length > 0 && <div ref={sentinelRef} style={{height: 1}}/>}

            {messages.map(message => (
                <MessageCard
                    myId={myId}
                    message={message}
                    key={message.id || message.temporaryId}
                />
            ))}

            {showScrollDownButton && (
                <button
                    type="button"
                    className={"chatWithUserScrollDownButton"}
                    onClick={handleScrollToBottom}
                >
                    <ChevronDown/>
                </button>
            )}
        </div>
    );
}