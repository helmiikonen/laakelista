export type Medicine = {
  id: number
  fimeaId: string
  name: string
  activeIngredient: string | null
  strength: string | null
  atcCode: string | null
  atcName: string | null
  dosageForm: string | null
  routeOfAdministration: string | null
  marketingAuthorisationHolder: string | null
  authorisationNumber: string | null
  authorisationStatus: string | null
  isHumanMedicine: boolean
}

export type UserMedicine = {
  id: number
  userId: number
  medicineId: number
  medicineName: string
  medicineStrength: string
  activeIngredient: string
  medicineDosageForm: string
  purpose: string
  dosage: string
  regularMedicine: boolean
  notes: string | null
}

export type CreateUserMedicineRequest = {
  medicineId: number
  purpose: string
  dosage: string
  regularMedicine: boolean
  notes: string | null
}

export type UpdateUserMedicineRequest = {
  medicineId: number
  purpose: string
  dosage: string
  regularMedicine: boolean
  notes: string | null
}