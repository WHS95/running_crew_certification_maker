export const formatDistance = (distance: string): string => {
  // 빈 문자열이면 그대로 반환
  if (!distance.trim()) return distance;
  
  const trimmed = distance.trim();
  
  // 숫자(정수 또는 소수)만 입력된 경우 K 추가
  const isNumberOnly = /^\d+(\.\d+)?$/.test(trimmed);
  if (isNumberOnly) {
    return `${trimmed}K`;
  }
  
  // 이미 K, M 등이 붙어있거나 다른 형식이면 그대로 반환
  return trimmed;
};