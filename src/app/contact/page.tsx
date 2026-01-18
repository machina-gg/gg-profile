import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'お問い合わせ | GGprofile',
  description: 'GGprofileへのお問い合わせはこちらから。',
}

const CONTACT_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSc3s3X28c75jIOjbuWTvmjsHre5JQGW1gvJemUHDhQ2JmIivQ/viewform?usp=publish-editor'

export default function ContactPage() {
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
            <h1 className="text-2xl font-bold mb-6">お問い合わせ</h1>

            <div className="space-y-6">
              <p className="text-muted-foreground">
                GGprofileへのお問い合わせありがとうございます。
                ご質問、ご要望、不具合報告など、お気軽にお送りください。
              </p>

              <div className="bg-muted/50 rounded-lg p-6 text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  お問い合わせはGoogleフォームで受け付けています
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[#A78BFA] to-[#F472B6] hover:from-[#A78BFA]/90 hover:to-[#F472B6]/90"
                >
                  <a
                    href={CONTACT_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    お問い合わせフォームを開く
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold mb-3">お問い合わせ内容の例</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>サービスに関するご質問</li>
                  <li>新機能のご要望</li>
                  <li>不具合のご報告</li>
                  <li>アカウントに関するお問い合わせ</li>
                  <li>その他のお問い合わせ</li>
                </ul>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold mb-3">回答について</h2>
                <p className="text-muted-foreground text-sm">
                  お問い合わせへの回答には数日お時間をいただく場合があります。
                  すべてのお問い合わせに回答できない場合がありますので、
                  あらかじめご了承ください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
