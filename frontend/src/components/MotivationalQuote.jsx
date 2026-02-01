import React, { useState } from 'react'

/**
 * MotivationalQuote Component
 * 
 * Displays motivational text in a calm, non-intrusive way
 * - Dismissible
 * - Never blocks primary actions
 * - Soft visual style
 * - Accessible with large font
 * 
 * @param {string} quote - The motivational quote to display
 * @param {string} variant - Visual variant: 'default', 'teal', 'purple', 'green', 'blue'
 * @param {function} onDismiss - Optional callback when dismissed
 * @param {string} className - Additional CSS classes
 */
export default function MotivationalQuote({ quote, variant = 'default', onDismiss, className = '' }) {
    const [dismissed, setDismissed] = useState(false)

    if (!quote || dismissed) return null

    const handleDismiss = () => {
        setDismissed(true)
        if (onDismiss) onDismiss()
    }

    return (
        <div
            className={`motivational-quote motivational-quote-${variant} ${className}`}
            role="status"
            aria-live="polite"
        >
            <div className="motivational-quote-content">
                <span className="motivational-quote-icon" aria-hidden="true">✨</span>
                <p className="motivational-quote-text">{quote}</p>
            </div>
            <button
                type="button"
                className="motivational-quote-dismiss"
                onClick={handleDismiss}
                aria-label="Dismiss motivation"
            >
                ×
            </button>
        </div>
    )
}
