"use client";

import { useState } from "react";
import { ParticipantData } from "./ParticipantForm";
import {
  downloadCertificate,
  downloadMultipleCertificates,
} from "@/utils/certificateGenerator";

interface CertificateGalleryProps {
  participants: ParticipantData[];
  templateData: {
    logoPreview: string | null;
    logoText: string;
    logoFont: string;
    logoFontSize: number;
    logoPosition: { x: number; y: number };
    logoSize: { width: number; height: number };
    backgroundColor: string;
    backgroundPreview: string | null;
    description: string;
  };
}

interface CertificateCardProps {
  participant: ParticipantData;
  templateData: CertificateGalleryProps["templateData"];
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function CertificateCard({
  participant,
  isSelected,
  onSelect,
}: CertificateCardProps) {
  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 ${
        isSelected
          ? "ring-4 ring-blue-500 shadow-2xl transform scale-105"
          : "hover:shadow-xl hover:transform hover:scale-102"
      }`}
      onClick={() => onSelect(participant.id)}
    >


      {/* 선택 표시 */}
      {isSelected && (
        <div className='absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold z-10'>
          ✓
        </div>
      )}

      {/* 참가자 이름 표시 */}
      <div className='mt-2 text-center'>
        <p className='text-white text-sm font-medium truncate'>
          {participant.name}
        </p>
        <p className='text-gray-400 text-xs'>
          {participant.distance} • {participant.time}
        </p>
      </div>
    </div>
  );
}

export default function CertificateGallery({
  participants,
  templateData,
}: CertificateGalleryProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
    setSelectAll(newSelected.size === participants.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(participants.map((p) => p.id)));
    }
    setSelectAll(!selectAll);
  };

  const handleDownload = async (type: "selected" | "all") => {
    const targetParticipants =
      type === "all"
        ? participants
        : participants.filter((p) => selectedIds.has(p.id));

    if (targetParticipants.length === 0) {
      alert("다운로드할 기록증을 선택해주세요.");
      return;
    }

    try {
      if (targetParticipants.length === 1) {
        await downloadCertificate(targetParticipants[0], templateData);
        alert("기록증 다운로드가 완료되었습니다.");
      } else {
        await downloadMultipleCertificates(targetParticipants, templateData);
        alert(
          `${targetParticipants.length}개의 기록증 다운로드가 완료되었습니다.`
        );
      }
    } catch (error) {
      console.error("Download failed:", error);
      alert("다운로드 중 오류가 발생했습니다.");
    }
  };

  // const handleShare = async (type: 'selected' | 'all') => {
  //   const targetParticipants = type === 'all'
  //     ? participants
  //     : participants.filter(p => selectedIds.has(p.id))

  //   if (targetParticipants.length === 0) {
  //     alert('공유할 기록증을 선택해주세요.')
  //     return
  //   }

  //   // Web Share API 지원 확인
  //   if (navigator.share) {
  //     try {
  //       const names = targetParticipants.map(p => p.name).join(', ')
  //       await navigator.share({
  //         title: '마라톤 기록증',
  //         text: `${names}님의 마라톤 기록증을 확인해보세요!`,
  //         url: window.location.href,
  //       })
  //     } catch (error) {
  //       console.error('Share failed:', error)
  //     }
  //   } else {
  //     // Web Share API를 지원하지 않는 경우 링크 복사
  //     const names = targetParticipants.map(p => p.name).join(', ')
  //     const shareText = `${names}님의 마라톤 기록증을 확인해보세요! ${window.location.href}`

  //     try {
  //       await navigator.clipboard.writeText(shareText)
  //       alert('공유 링크가 클립보드에 복사되었습니다!')
  //     } catch {
  //       alert('공유 링크를 복사할 수 없습니다.')
  //     }
  //   }
  // }

  if (participants.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-400 text-lg'>
          참가자를 추가하면 기록증 미리보기가 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* 컨트롤 바 */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between bg-white/5 p-3 sm:p-4 rounded-lg border border-white/20 gap-3 sm:gap-0'>
        <div className='flex items-center space-x-3 sm:space-x-4'>
          <label className='flex items-center space-x-2 cursor-pointer'>
            <input
              type='checkbox'
              checked={selectAll}
              onChange={handleSelectAll}
              className='w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500'
            />
            <span className='text-white text-sm'>
              전체 선택 ({selectedIds.size}/{participants.length})
            </span>
          </label>
        </div>

        <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
          <button
            onClick={() => handleDownload("selected")}
            disabled={selectedIds.size === 0}
            className='px-2 sm:px-4 py-2 bg-basic-blue text-white rounded-lg hover:bg-basic-blue/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm'
          >
            선택 다운로드 ({selectedIds.size})
          </button>
          <button
            onClick={() => handleDownload("all")}
            className='px-4 py-2 bg-basic-blue/80 text-white rounded-lg hover:bg-basic-blue/80 transition-colors text-sm'
          >
            전체 다운로드
          </button>
        </div>
      </div>

      {/* 기록증 갤러리 */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
        {participants.map((participant) => (
          <CertificateCard
            key={participant.id}
            participant={participant}
            templateData={templateData}
            isSelected={selectedIds.has(participant.id)}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
