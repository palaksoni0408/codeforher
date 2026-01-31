import React from 'react'

export const Bell = ({ className = '', title = 'Notifications' }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 0 1-6 0"/>
  </svg>
)

export const User = ({ className = '', title = 'User' }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
