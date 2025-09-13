export interface CrewTemplate {
  id?: string
  logoImage?: File | string
  backgroundImage?: File | string
  backgroundColor?: string
  description: string
  createdAt?: string
}

export interface ParticipantRecord {
  id?: string
  name: string
  distance: number
  time: string
  date: string
  templateId: string
}

export interface Certificate {
  id: string
  participant: ParticipantRecord
  template: CrewTemplate
  generatedAt: string
}