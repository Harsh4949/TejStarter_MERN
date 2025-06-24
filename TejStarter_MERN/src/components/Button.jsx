import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
})
 {
    return (
        <button className={`px-6 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}
//text-white bg-secondary font-semibold  rounded-full px-6 py-2 hidden lg:block