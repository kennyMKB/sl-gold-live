import { NextResponse } from 'next/server'
import { deriveFromOunceLKR } from '../../../lib/karat'
export async function GET(){
  try{
    const apiKey=process.env.METALS_API_KEY
    const metalsBase=process.env.METALS_API_BASE||'https://metals-api.com/api'
    const fxBase=process.env.EXCHANGE_RATE_BASE||'https://api.exchangerate.host'
    let ounceUSD=0
    if(apiKey){
      const r=await fetch(`${metalsBase}/latest?access_key=${apiKey}&base=USD&symbols=XAU`,{ next:{ revalidate:30 }})
      const j=await r.json()
      if(j?.rates?.XAU) ounceUSD=1/j.rates.XAU
    }
    if(!ounceUSD) ounceUSD=2400
    let usdToLkr=0
    try{
      const fx=await fetch(`${fxBase}/latest?base=USD&symbols=LKR`,{ next:{ revalidate:60 }})
      const jf=await fx.json(); usdToLkr=jf?.rates?.LKR||300
    }catch{ usdToLkr=300 }
    const ounceLKR=ounceUSD*usdToLkr
    const d=deriveFromOunceLKR(ounceLKR)
    return NextResponse.json({ perGram:{k24:{LKR:d.perGram.k24},k22:{LKR:d.perGram.k22},k18:{LKR:d.perGram.k18},k14:{LKR:d.perGram.k14}},
      perOunce:{k24:d.perOunce.k24,k22:d.perOunce.k22,k18:d.perOunce.k18,k14:d.perOunce.k14},
      perSovereign8g:{k24:d.perSovereign8g.k24,k22:d.perSovereign8g.k22}, perTola:d.perTola, usdToLkr, updatedAt:new Date().toISOString(),
      source: apiKey ? 'metals-api + exchangerate.host' : 'fallback constants' })
  }catch(e){ return NextResponse.json({ error:'failed', message:String(e)}, { status:500 })}
}
