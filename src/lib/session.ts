// src/lib/session.ts
export function generateSessionId(userId: string): string {
    return `${userId}-${Date.now()}`;
  }
  