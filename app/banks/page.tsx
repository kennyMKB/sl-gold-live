'use client'
import useSWR from 'swr'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())
export default function BanksPage(){
  const {data}=useSWR('/api/banks',fetcher,{refreshInterval:5*60*1000})
  return (<div className="space-y-4">
    <h1 className="text-xl font-semibold">Sri Lankan Banks — Gold / Pawning Info</h1>
    <p className="text-sm opacity-80">Aggregated pawning/gold info from banks or your Google Sheet.</p>
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40"><table className="min-w-full text-sm">
      <thead className="bg-white/5"><tr><th className="px-3 py-2 text-left">Bank</th><th className="px-3 py-2 text-left">Product</th><th className="px-3 py-2 text-left">Unit</th><th className="px-3 py-2 text-left">24K</th><th className="px-3 py-2 text-left">22K</th><th className="px-3 py-2 text-left">Updated</th><th className="px-3 py-2 text-left">Source</th></tr></thead>
      <tbody>{(data?.rows||[]).map((r:any,i:number)=> (<tr key={i} className="border-t border-white/10">
        <td className="px-3 py-2">{r.bank}</td><td className="px-3 py-2">{r.product}</td><td className="px-3 py-2">{r.unit}</td>
        <td className="px-3 py-2">{r.k24?`LKR ${Number(r.k24).toLocaleString()}`:'—'}</td>
        <td className="px-3 py-2">{r.k22?`LKR ${Number(r.k22).toLocaleString()}`:'—'}</td>
        <td className="px-3 py-2">{r.updated_at||'—'}</td>
        <td className="px-3 py-2"><a className="text-brand-accent underline" href={r.sourceUrl} target="_blank" rel="noreferrer">link</a></td>
      </tr>))}</tbody></table></div>
      {!data?.usingSheet && (<div className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm">
        Tip: Publish a Google Sheet as CSV and set <code>BANK_SHEET_CSV_URL</code> in your environment.
      </div>)}
    </div>)
}
