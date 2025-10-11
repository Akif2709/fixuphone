import { TimeSlot, DayTimeSlots, BusinessHours } from "../../types/timeslot-types";

// Format time for display (Dutch format)
function formatTimeForDisplay(hour: number, minute: number): string {
  if (minute === 0) {
    return `${hour}:00`;
  } else {
    return `${hour}:${minute.toString().padStart(2, "0")}`;
  }
}

// Generate time slots for a specific day
export function generateTimeSlotsForDay(dayId: string, businessHoursData: BusinessHours[]): TimeSlot[] {
  const dayConfig = businessHoursData.find((day) => day.dayId === dayId);

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

// Get all time slots for all days
export function getAllTimeSlots(businessHoursData: BusinessHours[]): DayTimeSlots[] {
  return businessHoursData.map((dayConfig) => ({
    day: dayConfig.day,
    dayId: dayConfig.dayId,
    timeSlots: generateTimeSlotsForDay(dayConfig.dayId, businessHoursData),
  }));
}

// Get time slots for a specific day
export function getTimeSlotsForDay(dayId: string, businessHoursData: BusinessHours[]): TimeSlot[] {
  return generateTimeSlotsForDay(dayId, businessHoursData);
}

// Get available time slots for a specific day
export function getAvailableTimeSlotsForDay(dayId: string, businessHoursData: BusinessHours[]): TimeSlot[] {
  return getTimeSlotsForDay(dayId, businessHoursData).filter((slot) => slot.available);
}

// Check if a specific time slot is available
export function isTimeSlotAvailable(dayId: string, timeSlotId: string, businessHoursData: BusinessHours[]): boolean {
  const timeSlots = getTimeSlotsForDay(dayId, businessHoursData);
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
export function getBusinessHoursForDay(dayId: string, businessHoursData: BusinessHours[]): BusinessHours | undefined {
  return businessHoursData.find((day) => day.dayId === dayId);
}

// Check if business is open on a specific day
export function isBusinessOpenOnDay(dayId: string, businessHoursData: BusinessHours[]): boolean {
  const dayConfig = getBusinessHoursForDay(dayId, businessHoursData);
  return dayConfig ? dayConfig.isOpen : false;
}

// Get all open days
export function getOpenDays(businessHoursData: BusinessHours[]): BusinessHours[] {
  return businessHoursData.filter((day) => day.isOpen);
}

// Get next available business day
export function getNextBusinessDay(businessHoursData: BusinessHours[]): BusinessHours | undefined {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Map JavaScript day numbers to our day IDs
  const dayMapping = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  // Start from today and find next open day
  for (let i = 0; i < 7; i++) {
    const dayIndex = (currentDay + i) % 7;
    const dayId = dayMapping[dayIndex];
    const dayConfig = getBusinessHoursForDay(dayId, businessHoursData);

    if (dayConfig && dayConfig.isOpen) {
      return dayConfig;
    }
  }

  return undefined;
}
