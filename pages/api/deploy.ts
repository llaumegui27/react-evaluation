import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from 'dayjs';

type ShouldIdeployResponse = {

    "timezone": "UTC",
    "shouldideploy": true,
    "message": "Go for it"
    
}

type DeployData = {
    timezone: string,
    deploy: boolean,
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DeployData>
) {
    let day = req.query.day;
    day = day?.toString();
    const format = 'DD/MM/YYYY HH:mm';
    const date = dayjs(day, format);
    const dayOfWeekName = date.format('dddd');
    day = dayOfWeekName;
    
    const response = await fetch("https://shouldideploy.today/api?tz=" + day);
    const data = await response.json() as ShouldIdeployResponse;

    const result = {
        timezone: data.timezone[0],
        deploy: data.shouldideploy,
        message: data.message[0]
    }

    res.status(200).json(result)
}
