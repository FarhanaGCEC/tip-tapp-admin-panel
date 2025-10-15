import {
  UseQueryResult,
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import authFetch from './axiosinterceptor'

export interface PushNotificationType {
  NotificationID: number
  RichText?: string
  UserID?: string
  Title: string
  Message: string
  NotificationDate: string
  IsRead: boolean
  NotificationType: string
  TipperProfilePictureUrl?: string
  tipper?: UserType
}

export interface UserType {
  id: number
  KeyCloakID: string
  Username: string
  FirstName: string
  LastName: string
  Address: string
  Country: string
  City: string
  VerificationCode: string | null
  Bio: string
  ProfilePictureURL: string
  DateOfBirth: string | null
  Role: string
  NotificationSettings: string | null
  BankDetails: string | null
  CreatedAt: string
  UpdatedAt: string
}

export interface GetPushNotificationType {
  items: PushNotificationType[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}

export const useGetNotificationsList = (
  page = 1,
  limit = 10
): UseQueryResult<GetPushNotificationType> => {
  return useQuery({
    queryKey: ['get_push_notification_list', page, limit],
    queryFn: async () => {
      return authFetch.get(`/notifications/admin?page=${page}&limit=${limit}`)
    },
    select(data) {
      return data?.data?.data || { items: [], meta: {} }
    },
  })
}

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (notificationId: number) => {
      return authFetch.patch(`/notifications/admin/${notificationId}/read`)
    },
    onSuccess() {
      queryClient.invalidateQueries(['get_push_notification_list'])
    },
  })
}
