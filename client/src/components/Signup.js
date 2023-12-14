import {  Button, TextField, MenuItem, InputLabel, Select, Box, FormControl} from '@mui/material'; 
import {useFormik} from 'formik'
import { useState } from 'react';
import * as yup from 'yup'

function Signup({setUser}){
    const [signup, setSignup] = useState(true)

    const signupSchema = yup.object().shape({
        username: yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required('Required!'),
        email: yup.string().email('Invalid email'),
        password: yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required('Required!'),
        grade_level: yup.number().min(1, 'enter a grade from 1-3').max(3, 'enter a grade from 1-3')

    })
    const loginSchema = yup.object().shape({
        username: yup.string().required('username required'),
        password: yup.string().required('password required')
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            grade_level: ''
        },
        validationSchema: signup ? signupSchema : loginSchema,
        onSubmit:(values) => {
            const endpoint = signup ? '/users' : 'login'
            fetch(endpoint,{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            }).then((resp)=>{
                if (resp.ok){
                    resp.json().then(({ user }) => {
                        setUser(user)
                    })
                }else {
                    console.log('error? handle')
                }
            })

        }
    })
    function toggleSignup() {
        setSignup((currentSignup) => !currentSignup)
    }



    
    return(
        <Box>
                <Button onClick={toggleSignup}>{signup ? 'Login instead!' : 'Register for an account'}</Button>
                <form onSubmit={formik.handleSubmit}>
                
                <TextField
                    id='username'         
                    label='username'
                    variant='outlined'
                    required
                    value={formik.values.username}
                    onChange={formik.handleChange}
                />
                {signup && <TextField
                    id='email'
                    label='email'
                    variant='outlined'
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />}
                <TextField 
                    id='password'
                    label='password'
                    type='password'
                    variant='outlined'
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}

                />
                {signup && <FormControl fullWidth>
                    <InputLabel id="grade_level" >Grade</InputLabel>
                    <Select
                        name='grade_level'
                        id="grade_level"
                        variant='outlined'
                        value={formik.values.grade_level}
                        required
                        label="grade_level"
                        onChange={formik.handleChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                </Select>
                </FormControl>}
                            
                <Button variant='contained' type='submit'>submit</Button>
               


                </form>
        </Box>
    )
}

export default Signup; 