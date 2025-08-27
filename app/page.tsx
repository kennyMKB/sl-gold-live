'use client'
import useSWR from 'swr'
import Ticker from '../components/Ticker'
import PriceCard from '../components/PriceCard'
import PriceChart from '../components/Chart'
import AdSlot from '../components/AdSlot'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())
export default function HomePage(){
  const {data}=useSWR('/api/gold',fetcher,{refreshInterval:30000})
  const d=data
  return (<div className="space-y-6">
    <Ticker />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <PriceCard title="24K / gram" value={d?`LKR ${Math.round(d.perGram.k24.LKR).toLocaleString()}`:'—'} hue="amber" />
      <PriceCard title="22K / gram" value={d?`LKR ${Math.round(d.perGram.k22.LKR).toLocaleString()}`:'—'} hue="lime" />
      <PriceCard title="Sovereign (8g, 22K)" value={d?`LKR ${Math.round(d.perSovereign8g.k22).toLocaleString()}`:'—'} hue="teal" />
      <PriceCard title="Ounce (24K)" value={d?`LKR ${Math.round(d.perOunce.k24).toLocaleString()}`:'—'} hue="pink" />
    </div>
    <PriceChart range="30d" />
    <AdSlot />
  </div>)
}
