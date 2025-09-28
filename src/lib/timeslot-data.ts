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

// Business hours configuration
export const businessHours: BusinessHours[] = [
  {
    day: "Maandag",
    dayId: "monday",
    isOpen: true,
    openTime: "09:00",
    closeTime: "18:00",
  },
  {
    day: "Dinsdag",
    dayId: "tuesday",
    isOpen: true,
    openTime: "09:00",
    closeTime: "18:00",
  },
  {
    day: "Woensdag",
    dayId: "wednesday",
    isOpen: true,
    openTime: "09:00",
    closeTime: "18:00",
  },
  {
    day: "Donderdag",
    dayId: "thursday",
    isOpen: true,
    openTime: "09:00",
    closeTime: "18:00",
  },
  {
    day: "Vrijdag",
    dayId: "friday",
    isOpen: true,
    openTime: "09:00",
    closeTime: "18:00",
  },
  {
    day: "Zaterdag",
    dayId: "saturday",
    isOpen: true,
    openTime: "10:00",
    closeTime: "16:00",
  },
  {
    day: "Zondag",
    dayId: "sunday",
    isOpen: false,
    openTime: "00:00",
    closeTime: "00:00",
  },
];

// Generate time slots for a specific day
export function generateTimeSlotsForDay(dayId: string): TimeSlot[] {
  const dayConfig = businessHours.find((day) => day.dayId === dayId);

  if (!dayConfig || !dayConfig.isOpen) {
    return [];
  }

  const timeSlots: TimeSlot[] = [];
  const openTime = dayConfig.openTime;
  const closeTime = dayConfig.closeTime;

  // Parse times
  const [openHour, openMinute] = openTime.split(":").map(Number);
  const [closeHour, closeMinute] = closeTime.split(":").map(Number);

  const openMinutes = openHour * 60 + openMinute;
  const closeMinutes = closeHour * 60 + closeMinute;

  // Generate 30-minute slots
  for (let minutes = openMinutes; minutes < closeMinutes; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    const displayTime = formatTimeForDisplay(hour, minute);

    timeSlots.push({
      id: `${dayId}-${timeString}`,
      time: timeString,
      display: displayTime,
      available: true,
    });
  }

  return timeSlots;
}

// Format time for display (Dutch format)
function formatTimeForDisplay(hour: number, minute: number): string {
  if (minute === 0) {
    return `${hour}:00`;
  } else {
    return `${hour}:${minute.toString().padStart(2, "0")}`;
  }
}

// Get all time slots for all days
export function getAllTimeSlots(): DayTimeSlots[] {
  return businessHours.map((dayConfig) => ({
    day: dayConfig.day,
    dayId: dayConfig.dayId,
    timeSlots: generateTimeSlotsForDay(dayConfig.dayId),
  }));
}

// Get time slots for a specific day
export function getTimeSlotsForDay(dayId: string): TimeSlot[] {
  return generateTimeSlotsForDay(dayId);
}

// Get available time slots for a specific day
export function getAvailableTimeSlotsForDay(dayId: string): TimeSlot[] {
  return getTimeSlotsForDay(dayId).filter((slot) => slot.available);
}

// Check if a specific time slot is available
export function isTimeSlotAvailable(dayId: string, timeSlotId: string): boolean {
  const timeSlots = getTimeSlotsForDay(dayId);
  const slot = timeSlots.find((s) => s.id === timeSlotId);
  return slot ? slot.available : false;
}

// Mark a time slot as unavailable (for booking conflicts)
export function markTimeSlotUnavailable(dayId: string, timeSlotId: string): void {
  // This would typically update a database or state management system
  // For now, this is a placeholder for future implementation
  console.log(`Marking time slot ${timeSlotId} for ${dayId} as unavailable`);
}

// Get business hours for a specific day
export function getBusinessHoursForDay(dayId: string): BusinessHours | undefined {
  return businessHours.find((day) => day.dayId === dayId);
}

// Check if business is open on a specific day
export function isBusinessOpenOnDay(dayId: string): boolean {
  const dayConfig = getBusinessHoursForDay(dayId);
  return dayConfig ? dayConfig.isOpen : false;
}

// Get all open days
export function getOpenDays(): BusinessHours[] {
  return businessHours.filter((day) => day.isOpen);
}

// Get next available business day
export function getNextBusinessDay(): BusinessHours | undefined {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Map JavaScript day numbers to our day IDs
  const dayMapping = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  // Start from today and find next open day
  for (let i = 0; i < 7; i++) {
    const dayIndex = (currentDay + i) % 7;
    const dayId = dayMapping[dayIndex];
    const dayConfig = getBusinessHoursForDay(dayId);

    if (dayConfig && dayConfig.isOpen) {
      return dayConfig;
    }
  }

  return undefined;
}
