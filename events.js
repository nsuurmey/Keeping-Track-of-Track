export const MEET_CONFIG = {
  meetName: "Junior Track Meet 2026",
  scheduledStartTime: "8:30 AM",
  operatorPin: "1234",
  refreshIntervalSeconds: 15,
  comingUpCount: 5,
};

// Edit this list to match your meet's event order.
// Field events are included so families with jumpers/throwers can track
// when those events transition. Adjust Long Jump's position to wherever
// it actually falls relative to the track schedule on meet day.
export const EVENTS = [
  // ── Field events (begin at 8:30 AM, run concurrently with early track) ──
  { id: 1,  name: "Discus / Javelin", gender: "Mixed", ageGroup: "Field",  estimatedDuration: 90 },

  // ── Track events ─────────────────────────────────────────────────────────
  { id: 2,  name: "100m Dash",        gender: "Girls", ageGroup: "",        estimatedDuration: 55 },
  { id: 3,  name: "100m Dash",        gender: "Boys",  ageGroup: "",        estimatedDuration: 55 },
  { id: 4,  name: "3000m Run",        gender: "Girls", ageGroup: "",        estimatedDuration: 30 },
  { id: 5,  name: "3000m Run",        gender: "Boys",  ageGroup: "",        estimatedDuration: 30 },
  { id: 6,  name: "4x100m Relay",     gender: "Girls", ageGroup: "",        estimatedDuration: 20 },
  { id: 7,  name: "4x100m Relay",     gender: "Boys",  ageGroup: "",        estimatedDuration: 20 },
  { id: 8,  name: "400m Dash",        gender: "Girls", ageGroup: "",        estimatedDuration: 45 },
  { id: 9,  name: "400m Dash",        gender: "Boys",  ageGroup: "",        estimatedDuration: 45 },

  // ── Long Jump begins when Discus/Javelin finishes (adjust position as needed) ──
  { id: 10, name: "Long Jump",        gender: "Mixed", ageGroup: "Field",   estimatedDuration: 75 },

  { id: 11, name: "800m Run",         gender: "Girls", ageGroup: "",        estimatedDuration: 30 },
  { id: 12, name: "800m Run",         gender: "Boys",  ageGroup: "",        estimatedDuration: 30 },
  { id: 13, name: "200m Dash",        gender: "Girls", ageGroup: "",        estimatedDuration: 45 },
  { id: 14, name: "200m Dash",        gender: "Boys",  ageGroup: "",        estimatedDuration: 45 },
  { id: 15, name: "1500m Run",        gender: "Girls", ageGroup: "",        estimatedDuration: 25 },
  { id: 16, name: "1500m Run",        gender: "Boys",  ageGroup: "",        estimatedDuration: 25 },
  { id: 17, name: "4x400m Relay",     gender: "Girls", ageGroup: "",        estimatedDuration: 22 },
  { id: 18, name: "4x400m Relay",     gender: "Boys",  ageGroup: "",        estimatedDuration: 22 },
];
