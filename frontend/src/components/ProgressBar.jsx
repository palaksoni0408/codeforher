import React from 'react'

export default function ProgressBar({ percent = 0, label, showLabel = true, className = '' }) {
  const p = Math.min(100, Math.max(0, Number(percent)))
  return (
    <div className={`progress-bar-wrap ${className}`}>
      <div className="progress-bar" role="progressbar" aria-valuenow={p} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-bar-fill" style={{ width: `${p}%` }} />
      </div>
      {showLabel && label != null && (
        <span className="progress-bar-label">{label}</span>
      )}
    </div>
  )
}
