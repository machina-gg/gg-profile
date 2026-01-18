import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: '利用規約 | GGprofile',
  description: 'GGprofileの利用規約です。',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              トップに戻る
            </Link>
          </Button>

          <div className="bg-card rounded-xl border p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6">利用規約</h1>

            <div className="prose prose-sm prose-invert max-w-none space-y-6">
              <p className="text-muted-foreground">
                最終更新日: 2024年1月
              </p>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">第1条（適用）</h2>
                <p className="text-muted-foreground">
                  本規約は、GGprofile（以下「本サービス」）の利用に関する条件を定めるものです。
                  ユーザーは本規約に同意の上、本サービスを利用するものとします。
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">第2条（サービス内容）</h2>
                <p className="text-muted-foreground">
                  本サービスは、ゲーマー向けのプロフィールカード作成・共有サービスを提供します。
                  サービスの内容は予告なく変更される場合があります。
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">第3条（禁止事項）</h2>
                <p className="text-muted-foreground">ユーザーは以下の行為を行ってはなりません：</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>他のユーザーまたは第三者の権利を侵害する行為</li>
                  <li>虚偽の情報を登録する行為</li>
                  <li>本サービスの運営を妨害する行為</li>
                  <li>不正アクセスやシステムへの攻撃</li>
                  <li>その他、運営が不適切と判断する行為</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">第4条（知的財産権）</h2>
                <p className="text-muted-foreground">
                  ユーザーが作成したカードの内容に関する権利はユーザーに帰属しますが、
                  本サービスの運営に必要な範囲で利用することに同意するものとします。
                  本サービスのシステムおよびデザインに関する権利は運営に帰属します。
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">第5条（免責事項）</h2>
                <p className="text-muted-foreground">
                  運営は、本サービスの完全性、正確性、有用性等について保証しません。
                  本サービスの利用により生じた損害について、運営は責任を負いません。
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">第6条（アカウントの削除）</h2>
                <p className="text-muted-foreground">
                  運営は、ユーザーが本規約に違反した場合、事前の通知なくアカウントを
                  削除することができます。
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">第7条（規約の変更）</h2>
                <p className="text-muted-foreground">
                  運営は、必要と判断した場合、本規約を変更することができます。
                  変更後の規約は、本ページに掲載した時点で効力を生じるものとします。
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">第8条（準拠法・管轄）</h2>
                <p className="text-muted-foreground">
                  本規約の解釈は日本法に準拠し、紛争が生じた場合は東京地方裁判所を
                  第一審の専属的合意管轄裁判所とします。
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
