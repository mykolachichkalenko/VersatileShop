import type {ReactNode} from "react";

interface PWithPlaypenSansProps {
    className?: string,
    children: ReactNode
}

export default function PWithPlaypenSans({children,className}: PWithPlaypenSansProps) {
    return (
        <p className={className} style={{ fontFamily: "Playpen Sans, cursive" }}>
            {children}
        </p>
    )
}