import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl } from "@mui/material";
import React, { useEffect, useState } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

const Success = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem('appointment-details')
        if(data) setData(JSON.parse(data))
    })

    return (
        <Box>
            <h3>Scheduled successfully!</h3>
            <Card style={{ margin: '5px', border: '1px solid lightgrey' }} elevation="0">
                <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                        <CalendarTodayIcon/>&nbsp;Scheduled for {data.date}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        <AccessTimeIcon/>&nbsp;From {data.time} (~15 mins)
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        <PersonIcon/>&nbsp;Consultant will be our care counsellor
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        <CallIcon/>&nbsp;Consultation will be {data.callType === 'video' ? 'a video' : 'an audio'} call
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        <InsertLinkIcon/>&nbsp;Link sent on your email and whatsapp.
                    </Typography>
                </CardContent>
            </Card>
            <div>
                <FormControl>
                    <Button variant="contained">Done</Button>
                </FormControl>
            </div>
        </Box>
    )
}

export default Success