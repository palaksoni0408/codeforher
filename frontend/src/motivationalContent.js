/**
 * Motivational Content Configuration for ViyaStree
 * 
 * Rules:
 * - Contextual motivation only (meaningful moments)
 * - Short Hindi or Hinglish lines
 * - Calm, encouraging, non-judgmental tone
 * - Never block primary actions
 * - Shown once per session or at specific triggers
 */

export const motivationalQuotes = {
    // Dashboard - Daily Strength Line (rotated daily)
    dashboard: {
        daily: [
            'Aap aaj strong hain kyunki aapne mushkil dekhi hai.',
            'Perfect hona zaroori nahi. Vishwas hona zaroori hai.',
            'Har din ek naya mauka hai apne sapno ke kareeb jaane ka.',
            'Aapki mehnat aapki pehchaan hai.',
            'Chhoti shuruat bhi badi safalta ki neev hoti hai.'
        ]
    },

    // Shiksha (Education) - Show only if no course started OR progress 40-70%
    shiksha: {
        noCoursesStarted: [
            'Seekhne ke liye pehle khud par bharosa.',
            'Apni pehchaan samajhna hi seekhne ki shuruaat hai.'
        ],
        midProgress: [
            'Aap sahi raaste par hain. Bas thoda aur.',
            'Har kadam aapko aapke lakshya ke kareeb le ja raha hai.'
        ]
    },

    // Samruddhih (Livelihood)
    samruddhih: {
        beforeFirstApplication: 'Apni zindagi ki hero aap khud hain.',
        afterSuccessfulApplication: 'Aapko kuch prove nahi karna. Bas apna haq lena hai.'
    },

    // Shaktih (Power & Safety)
    shaktih: {
        sectionIntro: 'Awaaz uthana bhi suraksha ka ek tareeka hai.',
        rightsAwareness: 'Apne liye bolna strength hai. Dusron ke liye bolna netritva.'
    },

    // Gamification / Progress Feedback
    gamification: {
        firstLessonCompleted: 'Har strong safar pehla kadam se shuru hota hai.',
        firstJobApplication: 'Dar ke baad hi himmat aati hai.',
        courseHalfway: 'Aadha safar tay ho chuka. Ab ruk mat jaana.',
        allCoursesCompleted: 'Aapne apne aap par vishwas rakha. Yahi aapki sabse badi jeet hai.'
    }
}

/**
 * Get daily quote for dashboard (rotates based on day of year)
 */
export function getDailyQuote() {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
    const quotes = motivationalQuotes.dashboard.daily
    return quotes[dayOfYear % quotes.length]
}

/**
 * Get Shiksha quote based on course progress
 * @param {Array} courses - Array of courses with percentComplete
 * @returns {string|null} - Quote or null if shouldn't show
 */
export function getShikshaQuote(courses = []) {
    if (!courses || courses.length === 0) return null

    const startedCourses = courses.filter(c => (c.percentComplete || 0) > 0)

    // No courses started
    if (startedCourses.length === 0) {
        const quotes = motivationalQuotes.shiksha.noCoursesStarted
        return quotes[Math.floor(Math.random() * quotes.length)]
    }

    // Check if any course is in mid-progress (40-70%)
    const midProgressCourse = startedCourses.find(c => {
        const percent = c.percentComplete || 0
        return percent >= 40 && percent <= 70
    })

    if (midProgressCourse) {
        const quotes = motivationalQuotes.shiksha.midProgress
        return quotes[Math.floor(Math.random() * quotes.length)]
    }

    return null
}

/**
 * Get Samruddhih quote based on application status
 * @param {number} applicationCount - Number of applications submitted
 * @param {boolean} justApplied - Whether user just applied
 * @returns {string|null} - Quote or null if shouldn't show
 */
export function getSamruddhihQuote(applicationCount = 0, justApplied = false) {
    if (justApplied && applicationCount === 1) {
        return motivationalQuotes.samruddhih.afterSuccessfulApplication
    }

    if (applicationCount === 0) {
        return motivationalQuotes.samruddhih.beforeFirstApplication
    }

    return null
}

/**
 * Get gamification quote based on achievement
 * @param {string} achievement - Type of achievement
 * @returns {string|null} - Quote or null
 */
export function getGamificationQuote(achievement) {
    return motivationalQuotes.gamification[achievement] || null
}

/**
 * Session storage helpers to track if quote was shown
 */
const SESSION_KEY_PREFIX = 'viyastree_quote_shown_'

export function wasQuoteShownThisSession(context) {
    try {
        return sessionStorage.getItem(SESSION_KEY_PREFIX + context) === 'true'
    } catch (_) {
        return false
    }
}

export function markQuoteAsShown(context) {
    try {
        sessionStorage.setItem(SESSION_KEY_PREFIX + context, 'true')
    } catch (_) { }
}

export function clearQuoteSession(context) {
    try {
        sessionStorage.removeItem(SESSION_KEY_PREFIX + context)
    } catch (_) { }
}
