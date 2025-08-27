'use client'
import { motion } from 'framer-motion'
export default function PriceCard({ title, value, sub, hue }:{ title:string, value:string, sub?:string, hue:'amber'|'lime'|'teal'|'pink'}){
  const glow={amber:'shadow-[0_0_30px_rgba(251,191,36,.35)]',lime:'shadow-[0_0_30px_rgba(163,230,53,.35)]',teal:'shadow-[0_0_30px_rgba(45,212,191,.35)]',pink:'shadow-[0_0_30px_rgba(244,114,182,.35)]'}[hue]
  return (<motion.div whileHover={{y:-4,scale:1.01}} className={`neon-run ${glow}`}><div className="card-inner p-4">
    <div className="text-sm opacity-80">{title}</div><div className="mt-2 text-2xl font-semibold">{value}</div>{sub && <div className="mt-1 text-xs opacity-70">{sub}</div>}</div></motion.div>)
}
