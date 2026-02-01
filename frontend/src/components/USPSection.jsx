import React from 'react'

/**
 * USPSection - Reusable component for displaying Unique Selling Propositions
 * @param {string} heading - The main heading for the USP section
 * @param {Array<string>} points - Array of USP points to display
 * @param {string} variant - Color variant: 'teal', 'purple', 'green', 'blue', or 'gradient'
 */
export default function USPSection({ heading, points, variant = 'gradient' }) {
    if (!points || points.length === 0) return null

    return (
        <section className={`usp-section usp-${variant}`} aria-labelledby="usp-heading">
            <h2 id="usp-heading" className="usp-heading">{heading}</h2>
            <ul className="usp-list">
                {points.map((point, index) => (
                    <li key={index} className="usp-item">
                        {point}
                    </li>
                ))}
            </ul>
        </section>
    )
}
