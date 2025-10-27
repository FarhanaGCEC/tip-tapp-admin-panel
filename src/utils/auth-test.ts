// Utility function to test authentication token persistence
// This is for debugging purposes only

export const testTokenPersistence = () => {
  console.group('🔍 Token Persistence Test')
  
  const token = localStorage.getItem('jwtToken')
  const validationToken = localStorage.getItem('validationToken')
  const user = localStorage.getItem('user')
  
  console.log('JWT Token:', token ? '✅ Present' : '❌ Missing')
  console.log('Validation Token:', validationToken ? '✅ Present' : '❌ Missing')
  console.log('User Data:', user ? '✅ Present' : '❌ Missing')
  
  if (token && validationToken && user) {
    console.log('✅ All authentication data is present in localStorage')
    
    try {
      const userData = JSON.parse(user)
      console.log('👤 User:', userData.Email || 'No email found')
      console.log('🎭 Role:', userData.Role || 'No role found')
    } catch (error) {
      console.error('❌ Error parsing user data:', error)
    }
  } else {
    console.log('❌ Missing authentication data')
  }
  
  console.groupEnd()
}

// Add this to window for easy testing in DevTools
if (typeof window !== 'undefined') {
  (window as any).testAuth = testTokenPersistence
}