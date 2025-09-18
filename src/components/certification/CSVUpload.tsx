"use client";

import { useRef } from "react";
import { ParticipantData } from "./ParticipantForm";

interface CSVUploadProps {
  onUpload: (participants: ParticipantData[]) => void;
}

export default function CSVUpload({ onUpload }: CSVUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadTemplate = () => {
    const csvContent = [
      "name,distance,time,date,place",
      "홍길동,10K,00:54:36,2025-09-13,KOREA",
      "김철수,21K,01:45:20,2025-09-13,KOREA",
      "이영희,5K,00:32:15,2025-09-13,KOREA",
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "participants_template.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      alert("CSV 파일만 업로드 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split("\n").filter((line) => line.trim());

        if (lines.length < 2) {
          alert("CSV 파일에 데이터가 없습니다.");
          return;
        }

        const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
        const requiredHeaders = ["name", "distance", "time", "date", "place"];

        const headerMap: { [key: string]: number } = {};
        requiredHeaders.forEach((header) => {
          const index = headers.findIndex((h) => h === header);
          if (index === -1) {
            throw new Error(`필수 헤더 '${header}'가 없습니다.`);
          }
          headerMap[header] = index;
        });

        const participants: ParticipantData[] = [];

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",").map((v) => v.trim());

          if (values.length < requiredHeaders.length) continue;

          const name = values[headerMap.name]?.replace(/"/g, "") || "";
          const time = values[headerMap.time]?.replace(/"/g, "") || "";

          if (!name || !time) {
            console.warn(
              `라인 ${i + 1}: 이름 또는 시간이 비어있어 건너뜁니다.`
            );
            continue;
          }

          participants.push({
            id: `csv-${Date.now()}-${i}`,
            name,
            distance: values[headerMap.distance]?.replace(/"/g, "") || "10K",
            time,
            date: values[headerMap.date]?.replace(/"/g, "") || "2025-09-13",
            place: values[headerMap.place]?.replace(/"/g, "") || "KOREA",
          });
        }

        if (participants.length === 0) {
          alert("유효한 참가자 데이터가 없습니다.");
          return;
        }

        onUpload(participants);
        alert(`${participants.length}명의 참가자가 추가되었습니다.`);
      } catch (error) {
        console.error("CSV 파싱 오류:", error);
        alert(
          `CSV 파일 처리 중 오류가 발생했습니다: ${
            error instanceof Error ? error.message : "알 수 없는 오류"
          }`
        );
      }
    };

    reader.onerror = () => {
      alert("파일 읽기 중 오류가 발생했습니다.");
    };

    reader.readAsText(file, "UTF-8");

    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className='space-y-4'>
      <h4 className='text-xs sm:text-sm font-medium text-white'>대량등록 CSV</h4>
      <div className='bg-white/5 p-3 sm:p-4 rounded-lg border border-white/20 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0'>
        {/* CSV 템플릿 다운로드 */}
        <div className='flex items-center space-x-3'>
          <button
            onClick={downloadTemplate}
            className='px-3 sm:px-4 py-2 bg-basic-blue text-white rounded-lg hover:opacity-80 transition-colors text-xs sm:text-sm font-medium w-full sm:w-auto'
          >
            CSV 템플릿 다운로드
          </button>
        </div>

        <div className='flex items-center space-x-3'>
          <input
            ref={fileInputRef}
            type='file'
            accept='.csv'
            onChange={handleFileUpload}
            className='hidden'
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className='px-3 sm:px-4 py-2 bg-basic-blue text-white rounded-lg hover:opacity-80 transition-colors text-xs sm:text-sm font-medium w-full sm:w-auto'
          >
            CSV 파일 업로드
          </button>
        </div>
      </div>
    </div>
  );
}
