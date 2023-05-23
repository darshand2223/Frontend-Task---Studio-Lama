import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl } from "@mui/material";
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

const Form3 = (props) => {

    const [information, setInformation] = useState('');

    useEffect(() => {
        const info = localStorage.getItem('additional-information')
        if (info) setInformation(info)
    }, [])

    const handleData = () => {
        // set information in localstorage
        if(information) localStorage.setItem('additional-information', information)
        props.handleNext()
    }

    const handleInformationData = (event) => {
        setInformation(event.target.value)
    }

    return (
        <Box>
            <h3>Any other information you'd like us to know?</h3>
    
            <FormControl>
                <TextField
                    id="additional-information"
                    multiline
                    rows={5}
                    value={information}
                    onChange={handleInformationData}
                    placeholder="Mention any medical history, family history, any incident which caused concern, food and sleep routine"
                    />
            </FormControl>
            <div>
                <FormControl>
                    <Button variant="contained" onClick={handleData}>Next</Button>
                </FormControl>
            </div>
        </Box>
    )
}

export default Form3