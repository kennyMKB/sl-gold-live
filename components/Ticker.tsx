'use client'
import useSWR from 'swr'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())
export default function Ticker(){
  const {data}=useSWR('/api/gold',fetcher,{refreshInterval:30000})
  const price=data?.perGram?.k24?.LKR
  const ounce=data?.perOunce?.k24
  if(!price)return null
  return (<div className="overflow-hidden rounded-lg border border-white/10 bg-black/40">
    <div className="ticker-track py-2 px-4 text-sm">
      Live 24K per gram: LKR {Math.round(price).toLocaleString()} • 24K per ounce: LKR {Math.round(ounce).toLocaleString()} • 22K per gram: LKR {Math.round(data?.perGram?.k22?.LKR).toLocaleString()} • Sovereign (8g, 22K): LKR {Math.round((data?.perGram?.k22?.LKR||0)*8).toLocaleString()} • Updated: {new Date(data?.updatedAt).toLocaleTimeString()}
    </div></div>)
}
