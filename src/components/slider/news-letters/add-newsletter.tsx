/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React from 'react'
import AddNewNewsLetter from '../../../pages/news-letters-management/add-new-newsletter'

interface AddNewslettersProps {
  mainTopic: string
  content: any
}

const AddNewsletters: React.FC<AddNewslettersProps> = () => {
  return <AddNewNewsLetter />
}

export default AddNewsletters
