'use client'
import useSWR from 'swr'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useMemo } from 'react'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())
export default function PriceChart({range='30d'}:{range?:'1d'|'7d'|'30d'|'1y'}){
  const {data}=useSWR(`/api/history?range=${range}`,fetcher,{refreshInterval:60000})
  const points=useMemo(()=> (data?.points||[]).map((p:any)=>({t:new Date(p.t).toLocaleDateString(), y:Math.round(p.y)})),[data])
  if(!points?.length) return null
  return (<div className="rounded-xl border border-white/10 bg-black/40 p-4">
    <div className="mb-2 text-sm opacity-80">24K per gram (LKR)</div>
    <div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={points}>
      <XAxis dataKey="t" hide /><YAxis width={60} tickFormatter={(v)=>`₨ ${Math.round(Number(v)/1000)}k`} />
      <Tooltip formatter={(v)=>[`LKR ${Number(v).toLocaleString()}`,'Price']} />
      <Line type="monotone" dataKey="y" strokeWidth={2} dot={false} />
    </LineChart></ResponsiveContainer></div></div>)
}
