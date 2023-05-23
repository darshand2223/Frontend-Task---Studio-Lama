import { childSymptomsList, childSymptomsType } from '../assets/constants';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl } from "@mui/material";
import React, { useEffect, useState } from 'react';

const Form2 = (props) => {

    const [symptoms, setSymptoms] = useState([])
    const [selectedSymptoms, setSelectedSymptoms] = useState([])
    const [name, setName] = useState('');

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('basic-info'))
        setName(data.cname)
    }, [])

    const handleSymptomsData = (data) => {
        const obj = selectedSymptoms.filter(val => val === data.id)
        if (!obj.length) { setSelectedSymptoms([...selectedSymptoms, data.id]); setSymptoms([...symptoms, data]) }
        else {
            setSelectedSymptoms(selectedSymptoms.filter(val => val !== data.id))
            setSymptoms(symptoms.filter(obj => obj.id === data.id))
        }
    }

    const handleData = () => {
        //store in localstorage
        localStorage.setItem('symptoms', JSON.stringify(symptoms))
        props.handleNext()
    }

    return (
        <Box>
            <h3>{name ? name : 'He/She'} needs help with...</h3>
            {
                childSymptomsList.map((obj) => {
                    return (
                        <Card 
                        sx={  
                            selectedSymptoms.includes(obj.id) ? 
                            { backgroundColor: '#d7e9ff', minWidth: 275, margin: '5px', border: '1px solid #1664C0', cursor: 'pointer'} :
                            { minWidth: 275, margin: '5px', border: '1px solid lightgrey', cursor: 'pointer' }
                        } 
                        elevation="0" 
                        onClick={() => handleSymptomsData(obj)}
                        >
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} gutterBottom>
                                    <b>{obj.name}</b>
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} gutterBottom>
                                    {obj.info}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })
            }
            <div>
                <FormControl>
                    <Button 
                    variant="contained" 
                    onClick={handleData}
                    disabled={selectedSymptoms.length === 0}
                    >
                        Next
                    </Button>
                </FormControl>
            </div>
        </Box>
    )
}

export default Form2