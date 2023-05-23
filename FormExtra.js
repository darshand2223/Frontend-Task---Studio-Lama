import { childSymptomsType } from '../assets/constants'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { FormControl, FormLabel } from "@mui/material";
import React, { useEffect } from 'react';

const Form3 = () => {

    useEffect(() => {
        console.log(childSymptomsType)
    }, [])

    return (
        <Box>
            <h3>Tell us about Alice's food and nutrition issues...</h3>
            {
                childSymptomsType[0].symptoms.map((str) => {
                    return (
                        <Card sx={{ minWidth: 275 }} style={{ margin: '5px', border: '1px solid lightgrey' }} elevation="0">
                            <CardContent style={{ display: 'flex' }}>
                                <Checkbox
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    <b>{str}</b>
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })
            }
            <div>
                <FormControl>
                    <Button variant="contained">Next</Button>
                </FormControl>
            </div>
        </Box>
    )
}

export default Form3