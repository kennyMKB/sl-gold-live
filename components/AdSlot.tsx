'use client'
import { useEffect } from 'react'
export default function AdSlot({ slot, style }: { slot?: string, style?: React.CSSProperties }) {
  useEffect(()=>{try{ // @ts-ignore
    (window.adsbygoogle = window.adsbygoogle || []).push({});}catch{}} , [])
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID) return null
  return (<ins className="adsbygoogle block my-4" style={style || { display: 'block' }}
    data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID} data-ad-slot={slot || 'auto'} data-ad-format="auto" data-full-width-responsive="true" />)
}
