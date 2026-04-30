import type {ReactNode} from "react";

interface CustomIconProps {
    children: ReactNode
}

export default function CustomIconBG({children}: CustomIconProps) {
    return (
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
            {children}
        </div>
    )

}