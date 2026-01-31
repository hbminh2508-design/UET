
/**
 * Generates an "Ultra Secure" OTP based on Student ID and timestamp.
 * This simulates a complex algorithm that is hard to guess but deterministic for the demo.
 * Format: UET-[HashOfID]-[RandomHex]
 */
export const generateUltraSecureOTP = (studentId: string): string => {
  const cleanId = studentId.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  const timestamp = new Date().getMinutes(); // Changes every minute for "security"
  
  // Simple hashing simulation
  let hash = 0;
  for (let i = 0; i < cleanId.length; i++) {
    hash = ((hash << 5) - hash) + cleanId.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  
  const hashString = Math.abs(hash + timestamp).toString(16).substring(0, 4).toUpperCase();
  const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

  // Return a 7-character complexity
  // Ex: 4A2F901
  return (hashString + randomSuffix).substring(0, 7);
};

/**
 * Validates Student ID format.
 * Supports:
 * 1. UET Standard: 2x02cdfg (8 digits)
 * 2. External VNU Schools: 8 digits + hyphen + school code (e.g., 25011034-ussh, 25011034-ulis)
 * 3. Special accounts: vnu-ad, vnu-lec, vnu-deep, root-er
 */
export const validateStudentId = (id: string): boolean => {
  const lowerId = id.toLowerCase();
  if (lowerId === 'vnu-ad') return true; // Backdoor for Admin
  if (lowerId === 'vnu-lec') return true; // Backdoor for Lecturer
  if (lowerId === 'vnu-deep' || lowerId === 'root-er') return true; // Backdoor for Developer
  
  // Regex: 8 digits, optionally followed by - and alphanumeric characters
  const regex = /^\d{8}(-[a-z0-9]+)?$/;
  return regex.test(lowerId);
};
