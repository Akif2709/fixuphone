'use server';

import { getContactInfo } from './contact-migration';
import { 
  getAllTimeSlots, 
  getTimeSlotsForDay, 
  getAvailableTimeSlotsForDay,
  isTimeSlotAvailable,
  getBusinessHoursForDay,
  isBusinessOpenOnDay,
  getOpenDays,
  getNextBusinessDay
} from './utils/timeslot-utils';
import { BusinessHours } from '../types';

/**
 * Get contact information with integrated timeslot functionality
 * This combines contact info from database with timeslot utilities
 */
export async function getContactInfoWithTimeslots() {
  try {
    const contactInfo = await getContactInfo();
    
    // Create timeslot utilities that use the contact info's business hours
    const timeslotUtils = {
      getAllTimeSlots: () => getAllTimeSlots(contactInfo.businessHours),
      getTimeSlotsForDay: (dayId: string) => getTimeSlotsForDay(dayId, contactInfo.businessHours),
      getAvailableTimeSlotsForDay: (dayId: string) => getAvailableTimeSlotsForDay(dayId, contactInfo.businessHours),
      isTimeSlotAvailable: (dayId: string, timeSlotId: string) => isTimeSlotAvailable(dayId, timeSlotId, contactInfo.businessHours),
      getBusinessHoursForDay: (dayId: string) => getBusinessHoursForDay(dayId, contactInfo.businessHours),
      isBusinessOpenOnDay: (dayId: string) => isBusinessOpenOnDay(dayId, contactInfo.businessHours),
      getOpenDays: () => getOpenDays(contactInfo.businessHours),
      getNextBusinessDay: () => getNextBusinessDay(contactInfo.businessHours)
    };
    
    return {
      ...contactInfo,
      timeslotUtils
    };
  } catch (error) {
    console.error('❌ Error getting contact info with timeslots:', error);
    throw error;
  }
}

/**
 * Get business hours from contact info in the correct format for timeslot functions
 */
export async function getBusinessHoursFromContact(): Promise<BusinessHours[]> {
  try {
    const contactInfo = await getContactInfo();
    return contactInfo.businessHours;
  } catch (error) {
    console.error('❌ Error getting business hours from contact:', error);
    throw error;
  }
}

// NOTE: Validation and sync functions removed since we now use MongoDB as single source of truth
// Business hours are managed directly through the contact info in the database
