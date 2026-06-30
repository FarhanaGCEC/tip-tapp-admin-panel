import React from 'react'
import { getValidationPermissions } from '../utils/authSession'

const permissionChecker = (
  Component: React.ReactNode,
  permission: string,
  Replacement: React.ReactNode = <></>
): React.ReactNode => {
  const permissions = getValidationPermissions()

  if (permissions.includes(permission)) {
    return Component
  }

  return Replacement
}

export default permissionChecker
