/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React from 'react'
import AddAnnoucements from '../../../pages/annoucements/add-new-annoucements'

interface AddNewslettersProps {
  mainTopic: string
  content: any
}

const AddAnnoucementsSlider: React.FC<AddNewslettersProps> = () => {
  return <AddAnnoucements />
}

export default AddAnnoucementsSlider
