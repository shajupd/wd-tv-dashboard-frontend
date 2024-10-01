export const CLIENTS_DATA = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Client ${String.fromCharCode(65 + i)}`,
  currentScore: Math.floor(Math.random() * 41) + 60, // Random score between 60 and 100
  scoreHistory: Array.from(
    { length: 3 },
    () => Math.floor(Math.random() * 41) + 60
  ),
  marketing: {
    cpl: Math.floor(Math.random() * 21) + 80,
    qualityLead: Math.floor(Math.random() * 21) + 80,
    cac: Math.floor(Math.random() * 21) + 80,
  },
  finance: {
    payOnTime: Math.floor(Math.random() * 21) + 80,
    budgetUtilization: Math.floor(Math.random() * 21) + 80,
    clientProfitability: Math.floor(Math.random() * 21) + 80,
  },
  engagement: {
    meetingAttendance: Math.floor(Math.random() * 21) + 80,
    clientSupportResponse: Math.floor(Math.random() * 21) + 80,
    approvalTime: Math.floor(Math.random() * 21) + 80,
  },
  dailyTrends: {
    cpl: Array.from({ length: 7 }, (_, i) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
      value: Math.floor(Math.random() * 21) + 80,
    })),
    qualityLead: Array.from({ length: 7 }, (_, i) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
      value: Math.floor(Math.random() * 21) + 80,
    })),
  },
}));
