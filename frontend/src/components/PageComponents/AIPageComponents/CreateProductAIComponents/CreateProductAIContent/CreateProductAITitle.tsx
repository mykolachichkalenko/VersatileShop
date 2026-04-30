import {Sparkles} from "lucide-react";

export default function CreateProductAITitle() {
    return (
        <div className={"mt-[50px] flex items-center justify-center"}>
            <svg width="0" height="0">
                <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7"/>
                    <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
            </svg>

            <Sparkles
                size={100}
                style={{stroke: "url(#aiGradient)"}}
            />
        </div>
    );
}