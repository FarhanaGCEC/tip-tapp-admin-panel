/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-useless-catch */
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import authFetch from '../axiosinterceptor'
import {
  ActivePaymentGatewayResponse,
  FormDataTipSetting,
  GatewayItem,
  GetGatewayResponse,
} from '../../types/gatewaytype'
import { EmailData } from '../../types/emailTest'

export const GetGatewaySettingDetails = (
  searchdata: string,
  active: string | undefined,
  page: number,
  pageSize: number
): UseQueryResult<GetGatewayResponse> => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: [
      'get_gateway_setting_all_and_search',
      searchdata,
      active,
      page,
      pageSize,
    ],
    queryFn: async () => {
      try {
        const params = new URLSearchParams()
        if (pageSize) params.set('limit', String(pageSize))
        params.set('page', String(page))
        if (searchdata) params.set('search', searchdata)
        if (active) params.set('isActive', active)

        const response = await authFetch.get<GetGatewayResponse>(
          `/settings-gateway?${params.toString()}`
        )
        return response?.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error('Fetch error:', error)
    },
  })
}

export const GatewaySettingUpdate = (
  handleError: (message: string) => void
) => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({
      settingid,
      updatedData,
    }: {
      settingid: string
      updatedData: Partial<GatewayItem>
    }) => {
      try {
        const response = await authFetch.patch(
          `/settings-gateway/${settingid}`,
          updatedData
        )
        return response.data
      } catch (error: any) {
        if (error.response && error.response.status === 409) {
          // Pass the custom error message from backend
          throw new Error(error.response.data.message || 'Conflict error')
        }

        throw error
      }
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['get_gateway_setting_all_and_search'])
        queryClient.invalidateQueries(['get_active_payment_gateway'])
      },
      onError: (error: any) => {
        handleError(error.message)
      },
    }
  )
}

export const GatewaySettingAdd = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (updatedData: any) => {
      try {
        const response = await authFetch.post(
          '/settings-gateway',
          updatedData.updatedData
        )
        return response.data
      } catch (error: any) {
        console.error('Post error:', error)
        throw new Error(error.response?.data?.message || 'An error occurred')
      }
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['get_gateway_setting_all_and_search'])
        queryClient.invalidateQueries(['get_active_payment_gateway'])
      },
      onError: (error: any) => {},
    }
  )
}

export const GetActivePaymentGateway = (): UseQueryResult<ActivePaymentGatewayResponse> => {
  return useQuery({
    queryKey: ['get_active_payment_gateway'],
    queryFn: async () => {
      try {
        const response = await authFetch.get<ActivePaymentGatewayResponse>(
          '/settings-gateway/active-payment'
        )
        return response.data
      } catch (error) {
        throw error
      }
    },
    onError: (error) => {
      console.error('Fetch error:', error)
    },
  })
}

export const GatewaySettingFindOne = (
  userparameid: string
): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_user_by_id', userparameid],
    queryFn: async () => {
      try {
        const response = await authFetch.get(
          `/settings-gateway/${userparameid}`
        )
        return response.data.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {},
    onError: (error: any) => {
      console.error('Fetch error:', error)
    },
  })
}

export const TipSettingGet = () => {
  return useQuery({
    queryKey: ['get_tip_setting'],
    queryFn: async () => {
      try {
        const response = await authFetch.get('/settings-gateway/tip-settings')
        return response.data.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {},
    onError: (error: any) => {
      console.error('Fetch error:', error)
    },
  })
}

export const TipSettingUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async ({ updatedData }: { updatedData: Partial<FormDataTipSetting> }) => {
      try {
        const response = await authFetch.patch(
          `/settings-gateway/tip-settings`,
          updatedData
        )
        return response.data
      } catch (error: any) {
        console.error('Response Error:', error.response.data)
        console.error('Response Status:', error.response.status)
      }
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['get_tip_setting'])
      },
      onError: (error: any) => {
        console.error('Mutation Error:', error.message)
      },
    }
  )
}

export const TestEmail = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (EmailData: EmailData) => {
      try {
        const response = await authFetch.post('/mail/test', EmailData)
        return response.data
      } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred')
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['get_gateway_setting_all_and_search'])
        queryClient.invalidateQueries(['get_active_payment_gateway'])
      },
      onError: (error: any) => {
        console.error('Mutation Error:', error)
      },
    }
  )
}
