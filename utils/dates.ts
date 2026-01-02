export const todayISO = (): string => {
    return new Date().toISOString().split('T')[0];
};

export const daysBetween = (a: string, b: string): number => {
    const d1 = new Date(a);
    const d2 = new Date(b);
    const diff = d2.getTime() - d1.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
};
