// ==================== TIMESLOT INTERFACES ====================

export interface TimeSlot {
  id: string;
  time: string;
  display: string;
  available: boolean;
}

export interface DayTimeSlots {
  day: string;
  dayId: string;
  timeSlots: TimeSlot[];
}

export interface BusinessHours {
  day: string;
  dayId: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  breakStart?: string;
  breakEnd?: string;
}
