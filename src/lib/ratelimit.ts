// Basic in-memory rate limiter for server actions.
// Note: In a production serverless environment (e.g. Vercel), this state resets per cold-boot.
// For true edge rate limiting, replace the Map with @upstash/ratelimit and Redis.

const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(identifier: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Cleanup stale entries periodically
    if (Math.random() < 0.1) {
        for (const [key, value] of rateLimitMap.entries()) {
            if (value.expiresAt < now) {
                rateLimitMap.delete(key);
            }
        }
    }

    const currentData = rateLimitMap.get(identifier);

    if (!currentData || currentData.expiresAt < now) {
        // First entry or expired
        rateLimitMap.set(identifier, { count: 1, expiresAt: now + windowMs });
        return true; // allowed
    }

    if (currentData.count >= limit) {
        return false; // Rate limit exceeded
    }

    // Increment count
    currentData.count += 1;
    rateLimitMap.set(identifier, currentData);
    return true; // allowed
}
