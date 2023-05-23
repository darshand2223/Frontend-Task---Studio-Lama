import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, FormLabel, useScrollTrigger } from "@mui/material";
import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Form4 = (props) => {

    const [slot, setSlot] = useState('');
    const [data, setData] = useState({})
    const [callType, setCallType] = useState(data.callType || 'video')

    useEffect(() => {
        const data = localStorage.getItem('appointment-details')
        if(data) setData(JSON.parse(data))
    }, [])

    const validationSchema = Yup.object().shape({
        date: Yup.date()
            .required("Date of birth is required")
            .typeError("Invalid date")
            .min(new Date(Date.now()), "Past dates are not allowed"),
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        data.date = new Date(data.date).toISOString().split('T')[0]
        data.time = slot
        data.callType = callType
        localStorage.setItem('appointment-details', JSON.stringify(data))
        props.handleNext()
    };

    return (
        <Box>
            <h3>Schedule an appointment</h3>
    
            <div>
                <FormControl>
                    <FormLabel>Select date</FormLabel>
                    <TextField 
                    required 
                    id="date" 
                    name="date" 
                    type="date"
                    value={data?.date}
                    fullWidth 
                    size="small" 
                    variant="outlined" 
                    {...register('date')} 
                    error={errors.date ? true : false} 
                    />
                    <Typography variant="inherit" color="red">
                        {errors.date?.message}
                    </Typography>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <FormLabel>Select time</FormLabel>
                    <Select
                        id="time"
                        size='small'
                        value={10}
                        // onChange={handleTimeChange}
                        fullWidth
                        >
                        <MenuItem value={10}>10:30 to 11:00 am</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <FormLabel>Choose a slot</FormLabel>
                    <Stack direction="row" spacing={1}>
                        <Chip 
                        label="10:30 to 10:45 am" 
                        style={ slot == '10:30 to 10:45 am' ? {backgroundColor: '#d7e9ff'} : {backgroundColor: ''}} 
                        onClick={ () => {setSlot('10:30 to 10:45 am') }} 
                        />
                        <Chip 
                        label="10:45 to 11:00 am" 
                        onClick={ () => {setSlot('10:45 to 11:00 am') }} 
                        style={ slot == '10:45 to 11:00 am' ? {backgroundColor: '#d7e9ff'} : {backgroundColor: ''}}
                        />
                    </Stack>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <FormLabel>Call type</FormLabel>
                    <Stack direction="row" spacing={1}>
                        <Chip 
                        label="Video call" 
                        style={ callType == 'video' ? {backgroundColor: '#d7e9ff'} : {backgroundColor: ''}} 
                        onClick={() => setCallType('video')}/>
                        <Chip 
                        label="Audio call" 
                        style={ callType == 'audio' ? {backgroundColor: '#d7e9ff'} : {backgroundColor: ''}} 
                        onClick={() => setCallType('audio')}/>
                    </Stack>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <Button variant="contained" onClick={handleSubmit(onSubmit)}>Next</Button>
                </FormControl>
            </div>
        </Box>
    )
}

export default Form4