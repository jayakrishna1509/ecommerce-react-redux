// User Activity Tracker
import { collection, addDoc, getDocs, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';

/**
 * Log user activity to Firestore
 * @param {string} userId - User ID
 * @param {string} activityType - Type of activity (login, logout, order, view_product, etc.)
 * @param {object} metadata - Additional data about the activity
 */
export const logUserActivity = async (userId, activityType, metadata = {}) => {
    try {
        const activityRef = collection(fireDB, 'userActivity');
        await addDoc(activityRef, {
            userId,
            activityType,
            metadata,
            timestamp: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
        });
        console.log(`✅ Activity logged: ${activityType}`);
    } catch (error) {
        console.error('Error logging activity:', error);
    }
};

/**
 * Get user activity history
 * @param {string} userId - User ID
 * @param {number} limitCount - Number of activities to fetch
 * @returns {Promise<Array>} Array of activities
 */
export const getUserActivityHistory = async (userId, limitCount = 50) => {
    try {
        const activityRef = collection(fireDB, 'userActivity');
        const q = query(
            activityRef,
            where('userId', '==', userId),
            orderBy('timestamp', 'desc'),
            limit(limitCount)
        );
        
        const querySnapshot = await getDocs(q);
        const activities = [];
        querySnapshot.forEach((doc) => {
            activities.push({ id: doc.id, ...doc.data() });
        });
        
        return activities;
    } catch (error) {
        console.error('Error fetching activity:', error);
        return [];
    }
};

/**
 * Get all activities (Admin only)
 * @param {number} limitCount - Number of activities to fetch
 * @returns {Promise<Array>} Array of all activities
 */
export const getAllActivities = async (limitCount = 100) => {
    try {
        const activityRef = collection(fireDB, 'userActivity');
        const q = query(
            activityRef,
            orderBy('timestamp', 'desc'),
            limit(limitCount)
        );
        
        const querySnapshot = await getDocs(q);
        const activities = [];
        querySnapshot.forEach((doc) => {
            activities.push({ id: doc.id, ...doc.data() });
        });
        
        return activities;
    } catch (error) {
        console.error('Error fetching all activities:', error);
        return [];
    }
};

/**
 * Activity Types Constants
 */
export const ACTIVITY_TYPES = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    SIGNUP: 'signup',
    ORDER_PLACED: 'order_placed',
    PRODUCT_VIEWED: 'product_viewed',
    CART_UPDATED: 'cart_updated',
    PROFILE_UPDATED: 'profile_updated',
    PASSWORD_CHANGED: 'password_changed'
};
