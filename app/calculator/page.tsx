'use client'
import useSWR from 'swr'
import { useMemo, useState } from 'react'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())
export default function CalculatorPage(){
  const {data}=useSWR('/api/gold',fetcher,{refreshInterval:60000})
  const [grams,setGrams]=useState(8)
  const [karat,setKarat]=useState<'k24'|'k22'|'k18'|'k14'>('k22')
  const perGram24=data?.perGram?.k24?.LKR||0
  const factor={k24:1,k22:22/24,k18:18/24,k14:14/24}[karat]
  const price=useMemo(()=> (grams*perGram24*factor)||0,[grams,karat,perGram24])
  return (<div className="space-y-4">
    <h1 className="text-xl font-semibold">Gold Calculator</h1>
    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm">Weight (grams)
          <input value={grams} onChange={e=>setGrams(Number(e.target.value))} type="number" className="rounded-md bg-white/5 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-brand-accent" /></label>
        <label className="flex flex-col gap-1 text-sm">Karat
          <select value={karat} onChange={e=>setKarat(e.target.value as any)} className="rounded-md bg-white/5 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-brand-accent">
            <option value="k24">24K</option><option value="k22">22K</option><option value="k18">18K</option><option value="k14">14K</option>
          </select></label>
        <div className="flex flex-col justify-end"><div className="text-xs opacity-70">Estimated Value</div>
          <div className="text-2xl font-semibold">LKR {Math.round(price).toLocaleString()}</div></div>
      </div>
      <p className="mt-3 text-xs opacity-70">Note: Uses live 24K/gram price and adjusts by karat purity. Taxes, making charges, and dealer margins are not included.</p>
    </div></div>)
}
