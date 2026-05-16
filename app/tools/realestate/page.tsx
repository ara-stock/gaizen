'use client'

import { useState } from 'react'

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: 'var(--border)' }}>
      <span className="text-sm" style={{ color: 'var(--muted)' }}>{label}</span>
      <span className="text-sm font-semibold tabular-nums" style={{ color: highlight ? 'var(--accent)' : 'var(--foreground)' }}>
        {value}
      </span>
    </div>
  )
}

function Input({ label, value, onChange, unit, step = '1' }: {
  label: string; value: string; onChange: (v: string) => void; unit?: string; step?: string
}) {
  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: 'var(--muted)' }}>{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          step={step}
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

export default function ToolsPage() {
  const [propertyPrice, setPropertyPrice] = useState('3000')
  const [downPayment, setDownPayment] = useState('600')
  const [loanRate, setLoanRate] = useState('1.5')
  const [loanYears, setLoanYears] = useState('35')
  const [monthlyRent, setMonthlyRent] = useState('12')
  const [managementFee, setManagementFee] = useState('1')
  const [repairCost, setRepairCost] = useState('0.5')
  const [propertyTax, setPropertyTax] = useState('10')
  const [vacancyRate, setVacancyRate] = useState('15')

  const pp = parseFloat(propertyPrice) * 10000 || 0
  const dp = parseFloat(downPayment) * 10000 || 0
  const rate = parseFloat(loanRate) / 100 / 12
  const months = parseFloat(loanYears) * 12
  const rent = parseFloat(monthlyRent) * 10000 || 0
  const mgmt = parseFloat(managementFee) * 10000 || 0
  const repair = parseFloat(repairCost) * 10000 || 0
  const tax = parseFloat(propertyTax) * 10000 || 0
  const vacancy = parseFloat(vacancyRate) / 100

  const loanAmount = pp - dp
  const monthlyLoan = rate > 0
    ? loanAmount * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1)
    : loanAmount / months

  const annualRentIncome = rent * 12 * (1 - vacancy)
  const grossYield = pp > 0 ? (rent * 12) / pp * 100 : 0
  const annualExpenses = (mgmt + repair) * 12 + tax
  const annualCF = annualRentIncome - annualExpenses - monthlyLoan * 12
  const netYield = pp > 0 ? (annualRentIncome - annualExpenses) / pp * 100 : 0

  const fmt = (n: number) => n.toLocaleString('ja-JP', { maximumFractionDigits: 0 })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>TOOLS</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>不動産利回り計算ツール</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          表面利回り・実質利回り・キャッシュフローをリアルタイム計算
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h2 className="text-sm font-semibold mb-5" style={{ color: 'var(--foreground)' }}>物件・ローン</h2>
            <div className="space-y-4">
              <Input label="物件価格" value={propertyPrice} onChange={setPropertyPrice} unit="万円" />
              <Input label="頭金" value={downPayment} onChange={setDownPayment} unit="万円" />
              <Input label="ローン金利（年）" value={loanRate} onChange={setLoanRate} unit="%" step="0.1" />
              <Input label="ローン年数" value={loanYears} onChange={setLoanYears} unit="年" />
            </div>
          </div>

          <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h2 className="text-sm font-semibold mb-5" style={{ color: 'var(--foreground)' }}>収支・費用</h2>
            <div className="space-y-4">
              <Input label="月額家賃" value={monthlyRent} onChange={setMonthlyRent} unit="万円" />
              <Input label="月額管理費" value={managementFee} onChange={setManagementFee} unit="万円/月" step="0.1" />
              <Input label="修繕積立費" value={repairCost} onChange={setRepairCost} unit="万円/月" step="0.1" />
              <Input label="固定資産税" value={propertyTax} onChange={setPropertyTax} unit="万円/年" />
              <Input label="空室率" value={vacancyRate} onChange={setVacancyRate} unit="%" step="0.5" />
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h2 className="text-sm font-semibold mb-6" style={{ color: 'var(--foreground)' }}>計算結果</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'rgba(0,201,122,0.08)', border: '1px solid rgba(0,201,122,0.2)' }}>
                <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>表面利回り</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{grossYield.toFixed(2)}%</p>
              </div>
              <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'rgba(0,168,98,0.08)', border: '1px solid rgba(0,168,98,0.2)' }}>
                <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>実質利回り</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--accent-dim)' }}>{netYield.toFixed(2)}%</p>
              </div>
            </div>

            <Row label="物件価格" value={`¥${fmt(pp)}`} />
            <Row label="借入金額" value={`¥${fmt(loanAmount)}`} />
            <Row label="月額ローン返済" value={`¥${fmt(monthlyLoan)}/月`} />
            <Row label="年間家賃収入（空室考慮）" value={`¥${fmt(annualRentIncome)}`} />
            <Row label="年間支出合計" value={`¥${fmt(annualExpenses + monthlyLoan * 12)}`} />
            <div className="mt-4 p-4 rounded-lg" style={{
              backgroundColor: annualCF >= 0 ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
              border: `1px solid ${annualCF >= 0 ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
            }}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>年間キャッシュフロー</span>
                <span className="text-xl font-bold" style={{ color: annualCF >= 0 ? '#10b981' : '#ef4444' }}>
                  ¥{fmt(annualCF)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: 'var(--muted)' }}>月間CF</span>
                <span className="text-sm font-semibold" style={{ color: annualCF >= 0 ? '#10b981' : '#ef4444' }}>
                  ¥{fmt(annualCF / 12)}/月
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--accent)' }}>TIPS</p>
            <ul className="space-y-2 text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
              <li>• <strong style={{ color: 'var(--foreground)' }}>フリーレント交渉</strong>: 入居初月は家賃無料にする「フリーレント」を交渉できる場合があります。1〜2ヶ月分の賃料減収を想定してキャッシュフロー計算に組み込んでおくと安全です。</li>
              <li>• 空室率は立地・築年数・管理状況によって大きく異なります。保守的に見積もる（5〜10%）ほど実態に近い試算になります。</li>
              <li>• 修繕積立・管理費は築年数とともに増加傾向にあります。長期保有を前提にする場合は余裕を持たせた設定を推奨します。</li>
            </ul>
          </div>
          <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
            ※ 本ツールは概算計算です。税金・手数料等は含まれていません。投資判断はご自身の責任で。
          </p>
        </div>
      </div>
    </div>
  )
}
