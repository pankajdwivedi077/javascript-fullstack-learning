import type React from "react";

const VARIANTS = ['primary', 'secondary', 'ghost'] as const
type Variant = (typeof VARIANTS)[number]

type BadgeaProps = {
    label: string;
    variant?: Variant
}

export function Badge({label, variant='primary'}: BadgeaProps){
   
  const styples: Record<Variant, React.CSSProperties> = {
    primary: {
        color: 'red'
    },
    secondary: {
        color: "yellow"
    },
    ghost: {
        color: "black"
    }
  }  

  return <span style={styples[variant]} >{label}</span>
}