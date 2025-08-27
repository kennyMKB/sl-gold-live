export default function AboutPage(){
  return (<div className="max-w-3xl space-y-4">
    <h1 className="text-2xl font-semibold">About</h1>
    <p><strong>SL Gold Live</strong> shows live gold prices in LKR with a calculator, charts, and a banks page. This site is ad-ready (AdSense).</p>
    <h3 className="text-lg font-semibold">How prices are calculated</h3>
    <ul className="list-disc pl-6 space-y-1">
      <li>Spot USD/oz × USD→LKR = LKR/oz → LKR/gram (24K). Other karats use purity ratio.</li>
      <li>Sovereign (8g) reflects common South Asian unit.</li>
    </ul>
    <h3 className="text-lg font-semibold">Disclaimer</h3>
    <p>Educational info only. Not investment advice.</p>
  </div>)
}
