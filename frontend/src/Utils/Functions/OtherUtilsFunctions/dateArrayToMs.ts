export default function dateArrayToMs(arr: number[]) {
    if (!arr || arr.length < 6) return 0;

    const [
        year,
        month,
        day,
        hour = 0,
        minute = 0,
        second = 0,
        nano = 0
    ] = arr;

    const millisecond = Math.floor(nano / 1_000_000);

    return Date.UTC(
        year,
        month - 1,
        day,
        hour,
        minute,
        second,
        millisecond
    );
};