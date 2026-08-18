// Simple in-memory rate limiting
// For production, consider using Redis or a dedicated rate limiting service

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimit = new Map<string, RateLimitEntry>();

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  const entries = Array.from(rateLimit.entries());
  entries.forEach(([key, value]) => {
    if (now > value.resetTime) {
      rateLimit.delete(key);
    }
  });
}, 10 * 60 * 1000);

export interface RateLimitConfig {
  interval: number; // in milliseconds
  uniqueTokenPerInterval: number; // max requests per interval
}

export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = {
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 60, // 60 requests per minute
  }
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const now = Date.now();
  const entry = rateLimit.get(identifier);

  if (!entry || now > entry.resetTime) {
    // Create new entry
    const resetTime = now + config.interval;
    rateLimit.set(identifier, {
      count: 1,
      resetTime,
    });

    return {
      success: true,
      limit: config.uniqueTokenPerInterval,
      remaining: config.uniqueTokenPerInterval - 1,
      reset: resetTime,
    };
  }

  // Increment existing entry
  entry.count++;

  if (entry.count > config.uniqueTokenPerInterval) {
    return {
      success: false,
      limit: config.uniqueTokenPerInterval,
      remaining: 0,
      reset: entry.resetTime,
    };
  }

  return {
    success: true,
    limit: config.uniqueTokenPerInterval,
    remaining: config.uniqueTokenPerInterval - entry.count,
    reset: entry.resetTime,
  };
}

export function getRateLimitIdentifier(ip: string, endpoint: string): string {
  return `${ip}:${endpoint}`;
}
