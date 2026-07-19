'use client'

import { useState } from 'react'
import Link from 'next/link'
import AdUnit from '@/components/ads/AdUnit'

function Row({ label, value, type = 'neutral' }: { label: string; value: string; type?: 'income' | 'expense' | 'neutral' }) {
  const color = type === 'income' ? '#10b981' : type === 'expense' ? '#ef4444' : 'var(--foreground)'
  return (
    <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: 'var(--border)' }}>
      <span className="text-sm" style={{ color: 'var(--muted)' }}>{label}</span>
      <span className="text-sm font-semibold tabular-nums" style={{ color }}>{value}</span>
    </div>
  )
}

function Input({ label, value, onChange, unit, step = '1', hint }: {
  label: string; value: string; onChange: (v: string) => void; unit?: string; step?: string; hint?: string
}) {
  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: 'var(--muted)' }}>
        {label}
        {hint && <span className="ml-1.5 text-xs" style={{ color: 'var(--accent)', opacity: 0.8 }}>{hint}</span>}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          step={step}
          min="0"
          className="flex-1 px-3 py-2 rounded-md text-sm outline-none focus:ring-1"
          style={{
            backgroundColor: 'var(--surface-2)',
            border: '1px solid var(--border)',
            color: 'var(--foreground)',
          }}
        />
        {unit && <span className="text-xs flex-shrink-0" style={{ color: 'var(--muted)' }}>{unit}</span>}
      </div>
    </div>
  )
}

export default function EnRealEstatePage() {
  const [propertyPrice, setPropertyPrice] = useState('4800')
  const [downPayment, setDownPayment] = useState('500')
  const [loanRate, setLoanRate] = useState('1.2')
  const [loanYears, setLoanYears] = useState('35')
  const [monthlyRent, setMonthlyRent] = useState('14.5')
  const [managementFee, setManagementFee] = useState('1.2')
  const [repairCost, setRepairCost] = useState('0.8')
  const [propertyTax, setPropertyTax] = useState('9')
  const [occupancyRate, setOccupancyRate] = useState('85')
  const [commissionRate, setCommissionRate] = useState('5')

  const pp = parseFloat(propertyPrice) * 10000 || 0
  const dp = parseFloat(downPayment) * 10000 || 0
  const rate = parseFloat(loanRate) / 100 / 12
  const months = parseFloat(loanYears) * 12
  const rent = parseFloat(monthlyRent) * 10000 || 0
  const mgmt = parseFloat(managementFee) * 10000 || 0
  const repair = parseFloat(repairCost) * 10000 || 0
  const tax = parseFloat(propertyTax) * 10000 || 0
  const occupancy = parseFloat(occupancyRate) / 100
  const commission = rent * (parseFloat(commissionRate) / 100)

  const loanAmount = Math.max(pp - dp, 0)
  const monthlyLoan = months === 0 || loanAmount === 0
    ? 0
    : rate > 0
      ? loanAmount * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1)
      : loanAmount / months

  const annualRentIncome = rent * 12 * occupancy
  const grossYield = pp > 0 ? (rent * 12) / pp * 100 : 0
  const annualExpenses = (mgmt + repair + commission) * 12 + tax
  const annualCF = annualRentIncome - annualExpenses - monthlyLoan * 12
  const netYield = pp > 0 ? (annualRentIncome - annualExpenses) / pp * 100 : 0

  const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 })
  const isCash = loanAmount === 0 || months === 0

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <Link href="/en/tools/" className="text-xs mb-4 block hover:text-white transition-colors" style={{ color: 'var(--muted)' }}>
          ← Back to Tools
        </Link>
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>TOOLS</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>Real Estate Yield Calculator</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Gross yield, net yield, and cash flow in real time.
          <span className="ml-2" style={{ color: 'var(--muted)', opacity: 0.7 }}>Inputs in 万 (1 unit = ¥10,000)</span>
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h2 className="text-sm font-semibold mb-5" style={{ color: 'var(--foreground)' }}>Property & Loan</h2>
            <div className="space-y-4">
              <Input label="Property price" value={propertyPrice} onChange={setPropertyPrice} unit="万 (¥10K)" />
              <Input label="Down payment" hint="(part of purchase price)" value={downPayment} onChange={setDownPayment} unit="万" />
              <Input label="Loan interest rate (annual)" hint="0 = all cash" value={loanRate} onChange={setLoanRate} unit="%" step="0.1" />
              <Input label="Loan term" hint="0 = all cash" value={loanYears} onChange={setLoanYears} unit="years" />
            </div>
          </div>

          <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Income</h2>
            <div className="space-y-4 mb-6">
              <Input label="Monthly rent" value={monthlyRent} onChange={setMonthlyRent} unit="万" />
              <Input label="Occupancy rate" value={occupancyRate} onChange={setOccupancyRate} unit="%" step="0.5" />
            </div>
            <div className="border-t pt-4" style={{ borderColor: 'var(--border)' }}>
              <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Expenses</h2>
              <div className="space-y-4">
                <Input label="Management fee (condo)" value={managementFee} onChange={setManagementFee} unit="万/month" step="0.1" />
                <Input label="Repair reserve" value={repairCost} onChange={setRepairCost} unit="万/month" step="0.1" />
                <Input label="Property management fee" hint="(% of rent)" value={commissionRate} onChange={setCommissionRate} unit="%" step="0.5" />
                <Input label="Property tax" value={propertyTax} onChange={setPropertyTax} unit="万/year" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h2 className="text-sm font-semibold mb-6" style={{ color: 'var(--foreground)' }}>Results</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'rgba(0,201,122,0.08)', border: '1px solid rgba(0,201,122,0.2)' }}>
                <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Gross Yield</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{grossYield.toFixed(2)}%</p>
              </div>
              <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'rgba(0,168,98,0.08)', border: '1px solid rgba(0,168,98,0.2)' }}>
                <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Net Yield</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--accent-dim)' }}>{netYield.toFixed(2)}%</p>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex gap-4 text-xs mb-2" style={{ color: 'var(--muted)' }}>
                <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>Income</span>
                <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>Expense</span>
              </div>
            </div>

            <Row label="Property price" value={`¥${fmt(pp)}`} />
            <Row label="Loan amount" value={isCash ? 'All cash' : `¥${fmt(loanAmount)}`} />
            <Row label="Annual rent income (adjusted for occupancy)" value={`¥${fmt(annualRentIncome)}`} type="income" />
            <Row label="Monthly loan payment" value={isCash ? '—' : `¥${fmt(monthlyLoan)}/mo`} type={isCash ? 'neutral' : 'expense'} />
            <Row label="Total annual expenses (incl. loan)" value={`¥${fmt(annualExpenses + monthlyLoan * 12)}`} type="expense" />

            <div className="mt-4 p-4 rounded-lg" style={{
              backgroundColor: annualCF >= 0 ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
              border: `1px solid ${annualCF >= 0 ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
            }}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Annual Cash Flow</span>
                <span className="text-xl font-bold" style={{ color: annualCF >= 0 ? '#10b981' : '#ef4444' }}>
                  ¥{fmt(annualCF)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: 'var(--muted)' }}>Monthly CF</span>
                <span className="text-sm font-semibold" style={{ color: annualCF >= 0 ? '#10b981' : '#ef4444' }}>
                  ¥{fmt(annualCF / 12)}/mo
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--accent)' }}>TIPS</p>
            <ul className="space-y-2 text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
              <li>• <strong style={{ color: 'var(--foreground)' }}>Free rent</strong>: Landlords often offer 1–2 months rent-free to attract tenants. Factor this into your cash flow estimate to be conservative.</li>
              <li>• Occupancy rate varies significantly by location, building age, and management quality. Using 80–85% gives a more realistic estimate.</li>
              <li>• Repair reserves and management fees tend to increase with building age. Build in a buffer for long-term hold scenarios.</li>
            </ul>
          </div>
          <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
            * Approximate calculation. Does not include taxes, transaction fees, or other costs. All investment decisions are your own.
          </p>
        </div>
      </div>
      <AdUnit slot="5904640354" format="auto" className="mt-10" />
    </div>
  )
}
