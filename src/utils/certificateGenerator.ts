import html2canvas from "html2canvas";
import { ParticipantData } from "@/components/certification/ParticipantForm";
import { formatDistance } from "./formatDistance";

interface TemplateData {
  logoPreview: string | null;
  logoText: string;
  logoFont: string;
  logoFontSize: number;
  logoPosition: { x: number; y: number };
  logoSize: { width: number; height: number };
  backgroundColor: string;
  backgroundPreview: string | null;
  description: string;
}

export const generateCertificateElement = (
  participant: ParticipantData,
  templateData: TemplateData
): HTMLDivElement => {
  const container = document.createElement("div");
  container.style.width = "800px";
  container.style.height = "1131px"; // A4 비율 (800 * 1.414)
  container.style.position = "relative";
  container.style.backgroundColor = templateData.backgroundColor;
  container.style.overflow = "hidden";

  if (templateData.backgroundPreview) {
    container.style.backgroundImage = `url(${templateData.backgroundPreview})`;
    container.style.backgroundSize = "cover";
    container.style.backgroundPosition = "center";
  }

  // 배경 오버레이
  if (templateData.backgroundPreview) {
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.inset = "0";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    container.appendChild(overlay);
  }

  // 메인 콘텐츠 컨테이너
  const content = document.createElement("div");
  content.style.position = "relative";
  content.style.zIndex = "10";
  content.style.height = "100%";
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.justifyContent = "space-between";
  content.style.textAlign = "center";
  content.style.color = "white";
  content.style.padding = "48px";

  // 로고 영역
  const logoSection = document.createElement("div");
  logoSection.style.display = "flex";
  logoSection.style.justifyContent = "center";
  logoSection.style.alignItems = "center";
  logoSection.style.minHeight = "120px";

  if (templateData.logoPreview) {
    const logo = document.createElement("img");
    logo.src = templateData.logoPreview;
    logo.style.maxWidth = `${templateData.logoSize.width}px`;
    logo.style.maxHeight = `${templateData.logoSize.height}px`;
    logo.style.objectFit = "contain";
    logoSection.appendChild(logo);
  } else {
    const textLogo = document.createElement("div");
    textLogo.textContent = templateData.logoText;
    textLogo.style.fontFamily = templateData.logoFont;
    textLogo.style.fontSize = `${Math.max(templateData.logoFontSize, 24)}px`;
    textLogo.style.fontWeight = "bold";
    textLogo.style.color = "white";
    textLogo.style.textAlign = "center";
    textLogo.style.letterSpacing = "2px";
    textLogo.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
    // 박스 스타일 제거하고 깔끔한 텍스트만 표시
    logoSection.appendChild(textLogo);
  }

  content.appendChild(logoSection);

  // 메인 콘텐츠
  const mainContent = document.createElement("div");
  mainContent.style.display = "flex";
  mainContent.style.flexDirection = "column";
  mainContent.style.gap = "32px";

  // 참가자명
  const runnerSection = document.createElement("div");
  const runnerLabel = document.createElement("div");
  runnerLabel.textContent = "RUNNER";
  runnerLabel.style.fontSize = "18px";
  runnerLabel.style.fontWeight = "500";
  runnerLabel.style.marginBottom = "8px";

  const runnerName = document.createElement("div");
  runnerName.textContent = participant.name;
  runnerName.style.fontSize = "48px";
  runnerName.style.fontWeight = "900";
  runnerName.style.fontFamily = "Arial, sans-serif";

  runnerSection.appendChild(runnerLabel);
  runnerSection.appendChild(runnerName);

  // 기록
  const recordSection = document.createElement("div");
  const recordLabel = document.createElement("div");
  recordLabel.textContent = "RECORD";
  recordLabel.style.fontSize = "18px";
  recordLabel.style.fontWeight = "500";
  recordLabel.style.marginBottom = "8px";

  const recordValue = document.createElement("div");
  recordValue.textContent = `${formatDistance(participant.distance)} ${
    participant.time
  }`;
  recordValue.style.fontSize = "32px";
  recordValue.style.fontWeight = "bold";
  recordValue.style.textAlign = "center";

  recordSection.appendChild(recordLabel);
  recordSection.appendChild(recordValue);

  mainContent.appendChild(runnerSection);
  mainContent.appendChild(recordSection);
  content.appendChild(mainContent);

  // 푸터
  const footer = document.createElement("div");
  footer.style.display = "flex";
  footer.style.flexDirection = "column";
  footer.style.gap = "16px";
  footer.style.fontSize = "14px";

  const placeAndDate = document.createElement("div");
  placeAndDate.style.display = "flex";
  placeAndDate.style.justifyContent = "space-between";

  const placeDiv = document.createElement("div");
  const placeLabel = document.createElement("div");
  placeLabel.textContent = "PLACE";
  placeLabel.style.fontWeight = "500";
  const placeValue = document.createElement("div");
  placeValue.textContent = participant.place;
  placeDiv.appendChild(placeLabel);
  placeDiv.appendChild(placeValue);

  const dateDiv = document.createElement("div");
  const dateLabel = document.createElement("div");
  dateLabel.textContent = "DATE";
  dateLabel.style.fontWeight = "500";
  const dateValue = document.createElement("div");
  dateValue.textContent = participant.date;
  dateDiv.appendChild(dateLabel);
  dateDiv.appendChild(dateValue);

  placeAndDate.appendChild(placeDiv);
  placeAndDate.appendChild(dateDiv);

  const description = document.createElement("div");
  description.style.textAlign = "center";
  description.style.marginTop = "16px";
  const descText = document.createElement("p");
  descText.textContent = templateData.description || "설명이 여기에 표시됩니다";
  descText.style.fontSize = "12px";
  descText.style.opacity = "0.8";
  descText.style.margin = "0";
  description.appendChild(descText);

  footer.appendChild(placeAndDate);
  footer.appendChild(description);
  content.appendChild(footer);

  container.appendChild(content);
  return container;
};

export const generateCertificateImage = async (
  participant: ParticipantData,
  templateData: TemplateData
): Promise<string> => {
  const element = generateCertificateElement(participant, templateData);

  // DOM에 임시로 추가 (화면 밖에)
  element.style.position = "absolute";
  element.style.left = "-10000px";
  element.style.top = "-10000px";
  document.body.appendChild(element);

  try {
    const canvas = await html2canvas(element, {
      width: 800,
      height: 1131,
      scale: 2, // 고해상도
      useCORS: true,
      allowTaint: true,
      backgroundColor: templateData.backgroundColor,
    });

    // Base64 이미지 데이터 URL 반환
    return canvas.toDataURL("image/png", 1.0);
  } finally {
    // DOM에서 제거
    document.body.removeChild(element);
  }
};

export const downloadCertificate = async (
  participant: ParticipantData,
  templateData: TemplateData
) => {
  try {
    const imageDataUrl = await generateCertificateImage(
      participant,
      templateData
    );

    const link = document.createElement("a");
    link.download = `certificate_${participant.name}_${participant.distance}.png`;
    link.href = imageDataUrl;
    link.click();
  } catch (error) {
    console.error("Certificate download failed:", error);
    throw error;
  }
};

export const downloadMultipleCertificates = async (
  participants: ParticipantData[],
  templateData: TemplateData
) => {
  try {
    for (const participant of participants) {
      await downloadCertificate(participant, templateData);
      // 브라우저가 동시 다운로드를 차단하지 않도록 약간의 지연
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  } catch (error) {
    console.error("Multiple certificates download failed:", error);
    throw error;
  }
};
