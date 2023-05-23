import React, { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputAdornment from '@mui/material/InputAdornment';
import {Typography} from "@mui/material";

const Form1 = (props) => {
    // console.log(props)
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const [radio, setRadioValue] = useState(false)
    const [data, setData] = useState();

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('basic-info'))
        setData(data)
        // console.log(data)
    }, [])

    const validationSchema = Yup.object().shape({
        cname: Yup.string()
            .required('Child name is required')
            .min(3, 'Child name must be at least 3 characters')
            .max(20, 'Child name must not exceed 20 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        bdate: Yup.date()
            .required("Date of birth is required")
            .typeError("Invalid date")
            .max(new Date(Date.now()), "Future dates are not allowed"),
        phone: Yup.string()
            .required("Phone number is required")
            .matches(phoneRegExp, 'Phone number is not valid'),
        bornInWeeks: Yup.number()
            .nullable()
            .notRequired()
            .when('bornInWeeks', {
                is: (value) => value?.length,
                then: (rule) => rule.min(20, 'Born in weeks must be at least 20'),
                then: (rule) => rule.min(36, 'Born in weeks must not exceed 36'),
            }),
        weight: Yup.string(),
        height: Yup.string(),

      },
      [
        // Add Cyclic deps here because when require itself
        ['bornInWeeks', 'bornInWeeks'],
    ]);

      const {
        register,
        control,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      });


      const onSubmit = (data) => {
        data.bdate = data.bdate.toISOString().split('T')[0]
        data.isBorn = radio
        // store it in localstorage
        localStorage.setItem('basic-info', JSON.stringify(data));
        props.handleNext()
      };

    return (
        <Box component="form" style={{padding: '10px'}}>
            <h4>Get your questions answered by our consultants from the cofort of your home</h4>
            <div>
                <FormControl>
                    <FormLabel>Child's name</FormLabel>
                    <TextField 
                    required 
                    id="cname" 
                    name="cname" 
                    value={data?.cname}
                    fullWidth size="small" 
                    variant="outlined" 
                    {...register('cname')} 
                    error={errors.cname ? true : false}
                    inputProps={{ maxLength: 15 }}
                    />
                    <Typography variant="inherit" color="red">
                        {errors.cname?.message}
                    </Typography>
                </FormControl>
            </div>
            
            <div>
                <FormControl>
                    <FormLabel>Child's date of birth</FormLabel>
                    <TextField 
                    required 
                    id="bdate" 
                    name="bdate" 
                    type="date"
                    value={data?.bdate}
                    fullWidth 
                    size="small" 
                    variant="outlined" 
                    {...register('bdate')} 
                    error={errors.bdate ? true : false} 
                    />
                    <Typography variant="inherit" color="red">
                        {errors.bdate?.message}
                    </Typography>
                </FormControl>
            </div>

            <div>
                <FormControl>
                    <FormLabel>Born at less than 37 weeks?</FormLabel>
                    <RadioGroup
                        // defaultValue={data?.isBorn || false}
                        value={radio || false}
                        name="radio"
                        id="radio"
                        // value={radio}
                        onChange={() => setRadioValue(!radio)}
                        // {...register('radio')} 
                    >
                        <FormControlLabel value={false} control={<Radio />} label="No" />
                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                    </RadioGroup>
                </FormControl>
            </div>
                
            {
                radio ? <div>
                <FormControl>
                    <FormLabel>Born in weeks</FormLabel>
                    <TextField 
                    required 
                    id="bornInWeeks" 
                    name="bornInWeeks" 
                    value={data?.bornInWeeks}
                    fullWidth 
                    size="small" 
                    variant="outlined" 
                    {...register('bornInWeeks')} 
                    error={errors.bornInWeeks ? true : false} />
                    <Typography variant="inherit" color="red">
                        {errors.bornInWeeks?.message}
                    </Typography>
                </FormControl>
            </div> :
            ''
            }
            
            <div>
                <FormControl>
                    <FormLabel>Child's weight</FormLabel>
                    <TextField 
                    id="weight" 
                    name="weight" 
                    value={data?.weight}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                      }}
                    fullWidth 
                    size="small" 
                    variant="outlined" 
                    {...register('weight')} 
                    />
                </FormControl>
            </div>
            
            <div>
                <FormControl>
                    <FormLabel>Child's height</FormLabel>
                    <TextField 
                    id="height" 
                    name="height" 
                    value={data?.height}
                    fullWidth 
                    InputProps={{
                        startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                      }}
                    size="small" 
                    variant="outlined" 
                    {...register('height')} 
                    />
                </FormControl>
            </div>

            <div>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <TextField 
                    required 
                    id="email" 
                    name="email" 
                    value={data?.email}
                    fullWidth 
                    size="small" 
                    variant="outlined" 
                    {...register('email')} 
                    error={errors.email ? true : false} 
                    />
                    <Typography variant="inherit" color="red">
                        {errors.email?.message}
                    </Typography>
                </FormControl>
            </div>

            <div>
                <FormControl>
                    <FormLabel>Phone number</FormLabel>
                    <TextField 
                    required 
                    id="phone" 
                    name="phone" 
                    fullWidth 
                    value={data?.phone}
                    size="small" 
                    variant="outlined" 
                    {...register('phone')} 
                    error={errors.phone ? true : false}  
                    />
                    <Typography variant="inherit" color="red">
                        {errors.phone?.message}
                    </Typography>
                </FormControl>
            </div>

            <div>
                <FormControl>
                    <Button 
                    variant="contained" 
                    onClick={handleSubmit(onSubmit)}>
                        Next
                    </Button>
                </FormControl>
            </div>
        </Box>      
    )
}

export default Form1