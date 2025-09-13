'use client'

import { useState } from 'react'
import FileUpload from '@/components/FileUpload'

interface LogoSettingsProps {
  logoFile: File | null
  logoPreview: string | null
  logoText: string
  logoFont: string
  logoFontSize: number
  onLogoUpload: (file: File) => void
  onLogoRemove: () => void
  onLogoTextChange: (text: string) => void
  onLogoFontChange: (font: string) => void
  onLogoFontSizeChange: (size: number) => void
}

export default function LogoSettings({
  logoFile,
  logoPreview,
  logoText,
  logoFont,
  logoFontSize,
  onLogoUpload,
  onLogoRemove,
  onLogoTextChange,
  onLogoFontChange,
  onLogoFontSizeChange
}: LogoSettingsProps) {
  return (
    <div>
      <label className='block text-sm font-medium mb-2 text-white'>
        크루 로고
      </label>
      
      {/* Logo Choice: Image or Text */}
      <div className='space-y-4'>
        {logoPreview ? (
          <div className='relative'>
            <img
              src={logoPreview}
              alt='Logo preview'
              className='w-full h-32 object-contain bg-gray-800 rounded-lg'
            />
            <button
              onClick={onLogoRemove}
              className='absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600'
            >
              ×
            </button>
          </div>
        ) : (
          <>
            {/* Text Logo Input */}
            <div>
              <label className='block text-xs font-medium mb-2 text-gray-400'>
                크루명 (텍스트 로고)
              </label>
              <input
                type='text'
                value={logoText}
                onChange={(e) => onLogoTextChange(e.target.value)}
                className='w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500'
                placeholder='크루명을 입력하세요'
              />
            </div>
            
            {/* Font Selection */}
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='block text-xs font-medium mb-2 text-gray-400'>
                  글꼴 선택
                </label>
                <select
                  value={logoFont}
                  onChange={(e) => onLogoFontChange(e.target.value)}
                  className='w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500'
                >
                  <option value='Arial'>Arial</option>
                  <option value='Arial Black'>Arial Black</option>
                  <option value='Helvetica'>Helvetica</option>
                  <option value='Impact'>Impact</option>
                  <option value='Times New Roman'>Times New Roman</option>
                  <option value='Georgia'>Georgia</option>
                  <option value='Courier New'>Courier New</option>
                  <option value='Verdana'>Verdana</option>
                </select>
              </div>
              <div>
                <label className='block text-xs font-medium mb-2 text-gray-400'>
                  글자 크기
                </label>
                <div className='flex items-center space-x-2'>
                  <input
                    type='range'
                    min='12'
                    max='32'
                    value={logoFontSize}
                    onChange={(e) => onLogoFontSizeChange(Number(e.target.value))}
                    className='flex-1'
                  />
                  <span className='text-white text-sm w-8'>{logoFontSize}px</span>
                </div>
              </div>
            </div>
            
            <div className='text-center'>
              <span className='text-gray-500 text-sm'>또는</span>
            </div>
            
            <FileUpload
              onFileSelect={onLogoUpload}
              accept='image/*'
              maxSize={5}
            >
              <div className='text-gray-500 text-sm py-4'>
                <p>이미지 로고 업로드</p>
              </div>
            </FileUpload>
          </>
        )}
      </div>
    </div>
  )
}