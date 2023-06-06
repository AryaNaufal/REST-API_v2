import crypto from "crypto";

export const hash = (data: string): string => crypto.createHash("sha256").update(data).digest("hex");