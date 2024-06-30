import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from './security/AuthContext';
import { retrieveTodoApi } from './security/api/TodoApiService ';
import { ErrorMessage, Field, Form, Formik } from 'formik';

export default function TodoComponent (){

    const {id} = useParams();

    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    const authContext = useAuth();

    const username = authContext.username;

    useEffect(
        () => retrieveTodos(),
        [id]
    )

    function retrieveTodos(){
        retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.error())
    }

    function onSubmit(values){
        console.log(values);
    }

    function validate(values){
        let errors = {
            // description: 'enter a valid description',
            // targetDate: 'enter a valid target Date'
        }

        if(values.description.length < 5){
            errors.description = 'Enter atleast 5 characters'
        }
        
        if(values.targetDate == null){
            errors.targetDate = 'Enter a target date'
        }
        console.log(values);
        return errors
    }

  return (
    <div className='container'>
        <h1>Enter Todo Details</h1>
        <div>
            <Formik 
                initialValues={ {description, targetDate} } 
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate = {validate}
                validateOnBlur={false}
                validateOnChange={false}
            >
            {
                (props) => (
                    <Form>
                        <ErrorMessage
                        name='description'
                        component="div"
                        className='alert alert-warning'/>

                        <ErrorMessage
                        name='targetDate'
                        component="div"
                        className='alert alert-warning'/>

                        <fieldset className='form-group'>
                            <label>Description</label>
                            <Field type="text" className='form-control' name="description"/>
                        </fieldset>
                        
                        <fieldset className='form-group'>
                            <label>Target Date</label>
                            <Field type="date" className='form-control' name="targetDate"/>
                        </fieldset>
                        <div>
                            <button className='btn btn-success m-5' type='submit'>Save</button>
                        </div>
                    </Form>
                )
                
            }
            </Formik>
        </div>
    </div>
  )
}
