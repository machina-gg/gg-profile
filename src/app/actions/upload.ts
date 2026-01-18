'use server'

import { createClient } from '@/lib/supabase/server'

export async function uploadProfileImage(formData: FormData) {
  const file = formData.get('file') as File

  if (!file) {
    return { error: 'ファイルが選択されていません' }
  }

  // ファイルサイズチェック（2MB）
  if (file.size > 2 * 1024 * 1024) {
    return { error: 'ファイルサイズは2MB以下にしてください' }
  }

  // ファイルタイプチェック
  if (!file.type.startsWith('image/')) {
    return { error: '画像ファイルを選択してください' }
  }

  const supabase = await createClient()

  // ユニークなファイル名を生成
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`
  const filePath = `temp/${fileName}`

  // ファイルをArrayBufferに変換
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  // Supabase Storageにアップロード
  const { error: uploadError } = await supabase.storage
    .from('profile-images')
    .upload(filePath, buffer, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    console.error('Upload error:', uploadError)
    return { error: 'アップロードに失敗しました' }
  }

  // 公開URLを取得
  const {
    data: { publicUrl },
  } = supabase.storage.from('profile-images').getPublicUrl(filePath)

  return { url: publicUrl }
}
