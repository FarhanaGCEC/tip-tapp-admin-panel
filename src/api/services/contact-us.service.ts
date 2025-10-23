/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable class-methods-use-this */
import authFetch from '../axiosinterceptor'

class ContactUsApi {
  private static instance: ContactUsApi

  private constructor() {}

  public static useAPI(): ContactUsApi {
    if (ContactUsApi.instance === undefined) {
      ContactUsApi.instance = new ContactUsApi()
    }
    return this.instance
  }

  public getContactMessages = async (params: {
    page?: number
    limit?: number
    search?: string
    status?: 'pending' | 'replied'
    dateFrom?: string
    dateTo?: string
  }) => {
    try {
      const queryParams = new URLSearchParams()
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.search) queryParams.append('search', params.search)
      if (params.status) queryParams.append('status', params.status)
      if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom)
      if (params.dateTo) queryParams.append('dateTo', params.dateTo)

      const response = await authFetch.get(`/contact-us?${queryParams.toString()}`)
      return response
    } catch (error) {
      return false
    }
  }

  public getContactMessageById = async (id: string) => {
    try {
      const response = await authFetch.get(`/contact-us/${id}`)
      return response
    } catch (error) {
      return false
    }
  }

  public replyToContactMessage = async (
    id: string,
    data: { replyMessage: string }
  ) => {
    try {
      const response = await authFetch.post(`/contact-us/${id}/reply`, data)
      return response
    } catch (error) {
      return false
    }
  }

  public updateContactMessageStatus = async (
    id: string,
    data: { status: 'pending' | 'replied' }
  ) => {
    try {
      const response = await authFetch.patch(`/contact-us/${id}/status`, data)
      return response
    } catch (error) {
      return false
    }
  }

  public deleteContactMessage = async (id: string) => {
    try {
      const response = await authFetch.delete(`/contact-us/${id}`)
      return response
    } catch (error) {
      return false
    }
  }
}

export default ContactUsApi
