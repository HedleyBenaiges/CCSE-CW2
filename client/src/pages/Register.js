import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function App() {

  function register(data) {
    axios.post(`http://localhost:5000/users/register`, data).then((response) => {
      alert(response);
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().max(255).required(),
    password: Yup.string().min(5).max(255).required(),
    address: Yup.string().max(255),
  })

  const initialValues = {
    email: '',
    password: '',
    address: ''
  };

  return (
    <div className="loginContainer">
      <Formik initialValues={initialValues} onSubmit={register} validationSchema={validationSchema}>
        <Form>
          <label>Email: </label>
          <ErrorMessage name="email"/>
          <br/>
          <Field id="inpEmail" name="email" placeholder="example@email.com"/>
          <br/>
          <label>Password: </label>
          <ErrorMessage name="password" component="span"/>
          <br/>
          <Field id="inpPassword" name="password" placeholder="Password"/>
          <br/>
          <label>Address: </label>
          <ErrorMessage name="address" component="span"/>
          <br/>
          <Field id="inpAddress" name="address" placeholder="Address"/>
          <br/>
          <button type="submit">Register</button>
          <br/>
          <a href="/login">Already have an account? Log in here!</a>  
        </Form>
      </Formik>
    </div>
  );
}

export default App;
