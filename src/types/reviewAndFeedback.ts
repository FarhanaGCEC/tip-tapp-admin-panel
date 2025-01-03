interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}


export interface GetReviewFeedbackResponse {
  data: {
    items: ReviewFeedbackItem[]
    meta: Meta
  }
  message: string
}


export interface ReviewFeedbackItem {
  TipId: number
  tipperName: string
  serviceProviderName: string
  createdAt: string
  rating: number
}


export interface OneReviewItem {
  TipperName: string,
  TipperprofilePictureURL : string,
  Rating : number,
  Review : string,
  Comment : string,
  IsHidden : boolean
}

export interface UpdateFeedbackResponse {
  data : ReviewFeedbackItem
  message : string
}

export interface OneFAQCategory {
  name: string
  orderType: number
  status: string
  addedBy: string
}