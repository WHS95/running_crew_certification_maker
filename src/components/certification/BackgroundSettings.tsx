'use client'

import FileUpload from '@/components/FileUpload'

interface BackgroundSettingsProps {
  backgroundColor: string
  backgroundPreview: string | null
  logoPreview: string | null
  onBackgroundColorChange: (color: string) => void
  onBackgroundUpload: (file: File) => void
  onBackgroundRemove: () => void
  onRandomColor: () => void
  onExtractColor: () => void
}

export default function BackgroundSettings({
  backgroundColor,
  backgroundPreview,
  logoPreview,
  onBackgroundColorChange,
  onBackgroundUpload,
  onBackgroundRemove,
  onRandomColor,
  onExtractColor
}: BackgroundSettingsProps) {
  return (
    <div>
      <label className='block text-sm font-medium mb-2 text-white'>
        배경 설정
      </label>
      <div className='space-y-4'>
        {/* Color Picker */}
        <div>
          <label className='block text-xs font-medium mb-2 text-gray-400'>
            배경 색상
          </label>
          <div className='flex items-center space-x-3 flex-wrap gap-2'>
            <input
              type='color'
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className='w-12 h-12 rounded-lg border border-white/20 cursor-pointer'
            />
            <button
              onClick={onRandomColor}
              className='px-3 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors'
            >
              랜덤
            </button>
            <button
              onClick={onExtractColor}
              disabled={!logoPreview}
              className='px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              로고추출
            </button>
          </div>
        </div>

        {/* Background Image */}
        <div>
          <label className='block text-xs font-medium mb-2 text-gray-400'>
            배경 이미지 (선택사항)
          </label>
          {backgroundPreview ? (
            <div className='relative'>
              <img
                src={backgroundPreview}
                alt='Background preview'
                className='w-full h-24 object-cover bg-gray-800 rounded-lg'
              />
              <button
                onClick={onBackgroundRemove}
                className='absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600'
              >
                ×
              </button>
            </div>
          ) : (
            <FileUpload
              onFileSelect={onBackgroundUpload}
              accept='image/*'
              maxSize={10}
              className=''
            >
              <div className='text-gray-500 text-sm py-4'>
                <p>배경 이미지 업로드 (선택사항)</p>
              </div>
            </FileUpload>
          )}
        </div>
      </div>
    </div>
  )
}