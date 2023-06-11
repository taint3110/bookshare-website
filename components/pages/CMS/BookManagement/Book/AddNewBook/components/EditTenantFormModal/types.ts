import { Dispatch, SetStateAction } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'

export interface IEditTenantFormModalProps {
  selectedImage: File | null
  selectImage: Dispatch<SetStateAction<File | null>>
  setFormValue: UseFormSetValue<FieldValues>
  isOpen: boolean
  onClose: () => void
  onClickAccept: () => void
}
