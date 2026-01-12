import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Share2, Image } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'かんたん作成',
    description: 'ゲーム内ネームやランクを入力するだけで、オシャレなカードが完成。',
  },
  {
    icon: Share2,
    title: 'SNSでシェア',
    description: 'ワンクリックでX（Twitter）にシェア。OGP対応でカードがプレビュー表示されます。',
  },
  {
    icon: Image,
    title: '画像ダウンロード',
    description: 'PNG形式でダウンロード可能。Instagramなど画像投稿にも対応。',
  },
]

export function FeatureSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            GGprofileの特徴
          </h2>
          <p className="text-muted-foreground">
            ゲーマーがSNSで自分をアピールするために必要な機能を揃えました
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-background border-border/50">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
