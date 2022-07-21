export function mIsServer() {
    return typeof process !== 'undefined';
}

export function mIsClient() {
    return typeof window !== 'undefined';
}
