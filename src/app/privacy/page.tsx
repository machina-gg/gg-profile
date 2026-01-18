import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | GGprofile',
  description: 'GGprofileのプライバシーポリシーです。',
}

export default function PrivacyPage() {
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
            <h1 className="text-2xl font-bold mb-6">プライバシーポリシー</h1>

            <div className="prose prose-sm prose-invert max-w-none space-y-6">
              <p className="text-muted-foreground">
                最終更新日: 2024年1月
              </p>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">1. はじめに</h2>
                <p className="text-muted-foreground">
                  GGprofile（以下「本サービス」）は、ユーザーのプライバシーを尊重し、
                  個人情報の保護に努めます。本ポリシーは、本サービスにおける個人情報の
                  取り扱いについて説明します。
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">2. 収集する情報</h2>
                <p className="text-muted-foreground">本サービスでは以下の情報を収集します：</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>アカウント情報（メールアドレス、表示名、アバター画像）</li>
                  <li>プロフィールカードに入力された情報</li>
                  <li>OAuth認証プロバイダーから提供される情報（Discord、Google）</li>
                  <li>サービス利用に関するログ情報</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">3. 情報の利用目的</h2>
                <p className="text-muted-foreground">収集した情報は以下の目的で利用します：</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>本サービスの提供・運営</li>
                  <li>ユーザー認証およびアカウント管理</li>
                  <li>プロフィールカードの作成・保存・共有</li>
                  <li>サービスの改善・新機能の開発</li>
                  <li>お問い合わせへの対応</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">4. 情報の共有</h2>
                <p className="text-muted-foreground">
                  本サービスは、以下の場合を除き、ユーザーの個人情報を第三者に
                  提供しません：
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>ユーザーの同意がある場合</li>
                  <li>法令に基づく開示要請がある場合</li>
                  <li>サービス運営に必要な外部サービス（ホスティング、分析等）への提供</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">5. Cookie の使用</h2>
                <p className="text-muted-foreground">
                  本サービスでは、ユーザー認証およびサービス改善のためにCookieを
                  使用します。ブラウザの設定でCookieを無効にすることができますが、
                  一部の機能が利用できなくなる場合があります。
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">6. データの保管</h2>
                <p className="text-muted-foreground">
                  ユーザーのデータは、セキュリティを考慮したクラウドサービス上に
                  保管されます。適切なセキュリティ対策を講じていますが、
                  インターネット上での完全なセキュリティは保証できません。
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">7. ユーザーの権利</h2>
                <p className="text-muted-foreground">ユーザーは以下の権利を有します：</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>自己の個人情報へのアクセス</li>
                  <li>個人情報の訂正・削除の要求</li>
                  <li>アカウントの削除</li>
                </ul>
                <p className="text-muted-foreground">
                  これらの要求は、お問い合わせフォームからご連絡ください。
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">8. 子どものプライバシー</h2>
                <p className="text-muted-foreground">
                  本サービスは13歳未満の方を対象としていません。13歳未満の方の
                  個人情報を意図的に収集することはありません。
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">9. ポリシーの変更</h2>
                <p className="text-muted-foreground">
                  本ポリシーは必要に応じて変更されることがあります。重要な変更がある
                  場合は、本ページにて通知します。
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">10. お問い合わせ</h2>
                <p className="text-muted-foreground">
                  プライバシーに関するご質問やご要望は、
                  <Link href="/contact" className="text-[#A78BFA] hover:underline">
                    お問い合わせフォーム
                  </Link>
                  からご連絡ください。
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
