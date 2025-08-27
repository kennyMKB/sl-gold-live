import { NextResponse } from 'next/server'
import Papa from 'papaparse'
const template=[
  { bank:'DFCC', product:'Ranwarama Pawning', unit:'8g', k24:'185000-200000', k22:'170000-180000', updated_at:'', sourceUrl:'https://www.dfcc.lk/products/ranwarama-pawning/' },
  { bank:"People's Bank", product:'Gold Loan', unit:'—', k24:'', k22:'', updated_at:'', sourceUrl:'https://www.peoplesbank.lk/gold-loan/' },
  { bank:'BOC', product:'Ran Surekum Naya Sewa', unit:'—', k24:'', k22:'', updated_at:'', sourceUrl:'https://www.boc.lk/personal-banking/ran-surekum-naya-sewa' },
  { bank:'Commercial Bank', product:'Gold Loans Pawning', unit:'—', k24:'', k22:'', updated_at:'', sourceUrl:'https://www.combank.lk/personal-banking/loans/gold-loans' },
  { bank:'Sampath Bank', product:'Randiriya Pawning', unit:'—', k24:'', k22:'', updated_at:'', sourceUrl:'https://www.sampath.lk/personal-banking/pawning-and-gold-loan/Sampath-Randiriya?category=personal_banking' },
  { bank:'Seylan', product:'Gold Loan', unit:'—', k24:'', k22:'', updated_at:'', sourceUrl:'https://www.seylan.lk/pawning/gold-loan' }
]
export async function GET(){
  const sheet=process.env.BANK_SHEET_CSV_URL
  if(sheet){
    try{
      const res=await fetch(sheet,{ next:{ revalidate:180 }})
      const csv=await res.text(); const parsed=Papa.parse(csv,{ header:true })
      return NextResponse.json({ rows: parsed.data, usingSheet:true })
    }catch{ return NextResponse.json({ rows: template, usingSheet:false, note:'Failed to load sheet, template used.' })}
  }
  return NextResponse.json({ rows: template, usingSheet:false })
}
