import { LoginButton } from '@/components/auth/LoginButton'
import Link from 'next/link'

type LoginPageProps = {
  searchParams: Promise<{ redirect?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirect } = await searchParams
  const redirectTo = redirect || '/create'

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">GGprofile</h1>
          <p className="text-muted-foreground">
            ログインしてカードを作成・保存しよう
          </p>
        </div>

        <div className="bg-card rounded-lg border p-6 space-y-4">
          <LoginButton provider="discord" redirectTo={redirectTo} />
          <LoginButton provider="google" redirectTo={redirectTo} />

          <p className="text-xs text-center text-muted-foreground pt-4">
            ログインすると
            <Link href="/terms" className="underline hover:text-foreground">
              利用規約
            </Link>
            と
            <Link href="/privacy" className="underline hover:text-foreground">
              プライバシーポリシー
            </Link>
            に同意したものとみなします
          </p>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            トップに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
