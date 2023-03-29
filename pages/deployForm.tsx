import {Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SWRConfig } from 'swr'
import DayComponent from './dayComponent';



export default function WeatherForm({ fallback }: any) {
    const router = useRouter();
    const [day, setDay] = useState("");
    const [dateActivated, setDateActivated] = useState("")
    function handleSearchDate() {
        router.push('/day/' + day)
    }
    return (
        <SWRConfig  value={{ fallback }}>
        
            <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            /><br />
            <Button 
            onClick={(e) => {
                e.preventDefault();
                handleSearchDate();
            }}
            colorScheme='blue'>Valider</Button>
            {dateActivated && <DayComponent day={dateActivated} />}
        </SWRConfig>
    )
}

export async function getStaticProps() {
    // `getStaticProps` is executed on the server side.
    let day = null;

   
    try {
        day = await fetch('/api?tz=UTC').then((res) => res.json())
    } catch (error) {
        console.error("Error on server call for regenerating day")
    }

    return {
        props: {
            fallback: {
                '/api?tz=UTC': day
            }
        },
        revalidate: 10
    }
}

