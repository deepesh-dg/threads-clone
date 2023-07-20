"use client";
import React, { HTMLInputTypeAttribute, useId } from "react";

type Props = {
    label?: string;
    setValue: (value: string) => void;
    className?: string;
    type?: HTMLInputTypeAttribute;
    inputClassName?: string;
    placeholder?: string;
    errMsg?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

function Input({ type, setValue, label, errMsg, placeholder, className = "", inputClassName = "", ...props }: Props) {
    const id = useId();

    return (
        <div className={`${className}`}>
            {label ? (
                <label htmlFor={id} className="mb-2 inline-block">
                    {label}
                </label>
            ) : null}
            <input
                type={type || "text"}
                id={id}
                onChange={(e) => setValue(e.target.value)}
                className={`bg-primary/5 px-4 py-2 rounded-lg outline-none border border-transparent focus:border-primary/70 duration-150 w-full ${
                    errMsg ? "border-red-400" : ""
                } ${inputClassName}`}
                placeholder={placeholder}
                {...props}
            />
            {errMsg && <p className="text-red-400 text-sm mt-0.5 pl-1">{errMsg}</p>}
        </div>
    );
}

export default Input;
