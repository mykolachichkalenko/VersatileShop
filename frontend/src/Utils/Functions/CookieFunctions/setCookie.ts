type SameSite = "Lax" | "Strict" | "None";

export default function setCookie(name: string, value: string, maxAgeSec = 86400, path = "/", sameSite: SameSite = "Lax") {
    document.cookie =
        `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ` +
        `Max-Age=${maxAgeSec}; Path=${path}; SameSite=${sameSite}`;
}