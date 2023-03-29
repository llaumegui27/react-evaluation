import { useState } from "react";
import useSWR from "swr";

type DayComponentProps = { day: string };

export default function DayComponent({ day }: DayComponentProps) {
    const fetcher = (...args: Parameters<typeof fetch>) =>
        fetch(...args).then((res) => res.json());
    const { data, error } = useSWR(
        "/api?tz=" + day,
        fetcher,
        { revalidateOnFocus: false }
    );
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return (
        <div>
            <h1>{data.message}</h1>
        </div>
    );
}
