"use client";

import { useState } from "react";
import { formatDistance } from "@/utils/formatDistance";

export interface ParticipantData {
  id: string;
  name: string;
  distance: string;
  time: string;
  date: string;
  place: string;
}

interface ParticipantFormProps {
  onAdd: (participant: ParticipantData) => void;
  onRemove: (id: string) => void;
  participants: ParticipantData[];
}

export default function ParticipantForm({
  onAdd,
  onRemove,
  participants,
}: ParticipantFormProps) {
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    distance: "10K",
    time: "",
    date: "2025-09-13",
    place: "KOREA",
  });

  const handleAdd = () => {
    if (!newParticipant.name.trim() || !newParticipant.time.trim()) {
      alert("이름과 기록 시간을 입력해주세요.");
      return;
    }

    const participant: ParticipantData = {
      id: Date.now().toString(),
      ...newParticipant,
    };

    onAdd(participant);
    setNewParticipant({
      name: "",
      distance: "10K",
      time: "",
      date: "2025-09-13",
      place: "KOREA",
    });
  };

  const formatTime = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/\D/g, "");

    // HH:MM:SS 형식으로 변환
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}:${numbers.slice(2)}`;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}:${numbers.slice(
        4
      )}`;
    }

    return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}:${numbers.slice(
      4,
      6
    )}`;
  };

  return (
    <div className='space-y-4 sm:space-y-6'>
      <h3 className='text-sm sm:text-base font-medium text-white mb-2 sm:mb-3'>참가자 개별 입력</h3>
      
      {/* 새 참가자 입력 폼 */}
      <div className='bg-white/5 p-3 sm:p-4 rounded-lg border border-white/20'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
          <div>
            <label className='block text-sm font-medium mb-2 text-white'>
              참가자명 *
            </label>
            <input
              type='text'
              value={newParticipant.name}
              onChange={(e) =>
                setNewParticipant({ ...newParticipant, name: e.target.value })
              }
              className='w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500'
              placeholder='이름을 입력하세요'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2 text-white'>
              거리
            </label>
            <input
              type='text'
              value={newParticipant.distance}
              onChange={(e) =>
                setNewParticipant({
                  ...newParticipant,
                  distance: e.target.value,
                })
              }
              className='w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500'
              placeholder='예: 5K, 10K, 21K, 42K, 100m 등'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2 text-white'>
              기록 시간 *
            </label>
            <input
              type='text'
              value={newParticipant.time}
              onChange={(e) =>
                setNewParticipant({
                  ...newParticipant,
                  time: formatTime(e.target.value),
                })
              }
              className='w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500'
              placeholder='예: 00:54:36'
              maxLength={8}
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2 text-white'>
              날짜
            </label>
            <input
              type='date'
              value={newParticipant.date}
              onChange={(e) =>
                setNewParticipant({ ...newParticipant, date: e.target.value })
              }
              className='w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2 text-white'>
              장소
            </label>
            <input
              type='text'
              value={newParticipant.place}
              onChange={(e) =>
                setNewParticipant({ ...newParticipant, place: e.target.value })
              }
              className='w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500'
              placeholder='장소를 입력하세요'
            />
          </div>

          <div className='flex items-end'>
            <button
              onClick={handleAdd}
              className='w-full px-4 py-2 bg-basic-blue text-white rounded-lg hover:opacity-80 transition-colors font-medium'
            >
              참가자 추가
            </button>
          </div>
        </div>
      </div>

      {/* 참가자 목록 */}
      {participants.length > 0 && (
        <div className='space-y-3'>
          <h4 className='text-xs sm:text-sm font-medium text-white'>
            추가된 참가자 ({participants.length}명)
          </h4>
          <div className='space-y-2 max-h-48 sm:max-h-64 overflow-y-auto'>
            {participants.map((participant) => (
              <div
                key={participant.id}
                className='flex flex-col sm:flex-row sm:items-center justify-between bg-white/5 p-3 rounded-lg border border-white/20 gap-3'
              >
                <div className='flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-sm'>
                  <div>
                    <span className='text-gray-400'>이름:</span>
                    <div className='text-white font-medium'>
                      {participant.name}
                    </div>
                  </div>
                  <div>
                    <span className='text-gray-400'>거리:</span>
                    <div className='text-white'>{formatDistance(participant.distance)}</div>
                  </div>
                  <div>
                    <span className='text-gray-400'>기록:</span>
                    <div className='text-white'>{participant.time}</div>
                  </div>
                  <div>
                    <span className='text-gray-400'>날짜:</span>
                    <div className='text-white'>{participant.date}</div>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(participant.id)}
                  className='ml-4 w-8 h-8 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors'
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
