import { NextRequest, NextResponse } from 'next/server'
function syntheticSeries(days:number,start:number){const out:{t:string,y:number}[]=[];let val=start;for(let i=days-1;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const change=(Math.random()-0.5)*0.008;val=Math.max(10,val*(1+change));out.push({t:d.toISOString(),y:val})}return out}
export async function GET(req:NextRequest){
  const range=(new URL(req.url).searchParams.get('range')||'30d') as '1d'|'7d'|'30d'|'1y'
  const days= range==='1d'?1: range==='7d'?7: range==='1y'?365:30
  const apiKey=process.env.METALS_API_KEY
  const metalsBase=process.env.METALS_API_BASE||'https://metals-api.com/api'
  const fxBase=process.env.EXCHANGE_RATE_BASE||'https://api.exchangerate.host'
  try{
    const fx=await fetch(`${fxBase}/latest?base=USD&symbols=LKR`,{ next:{ revalidate:300 }})
    const jf=await fx.json(); const usdToLkr=jf?.rates?.LKR||300
    if(apiKey && days>1){
      const end=new Date(); const start=new Date(); start.setDate(end.getDate()-(days-1))
      const s=start.toISOString().slice(0,10); const e=end.toISOString().slice(0,10)
      const r=await fetch(`${metalsBase}/timeseries?access_key=${apiKey}&start_date=${s}&end_date=${e}&base=USD&symbols=XAU`,{ next:{ revalidate:300 }})
      const j=await r.json()
      if(j?.rates){
        const points=Object.keys(j.rates).sort().map(date=>{const xau=j.rates[date].XAU; const usdPerOunce=1/xau; const lkrPerGram24=(usdPerOunce*usdToLkr)/31.1034768; return { t:new Date(date).toISOString(), y:lkrPerGram24 }})
        return NextResponse.json({ points, usdToLkr, source:'metals-api timeseries' })
      }
    }
    const points=syntheticSeries(days,30000); return NextResponse.json({ points, usdToLkr, source:'synthetic' })
  }catch{ const points=syntheticSeries(days,30000); return NextResponse.json({ points, source:'synthetic-error' })}
}
