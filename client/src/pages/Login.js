import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function App() {
  function logout() {
    // Clears all session storage
    // This includes JWT and Basket
    sessionStorage.clear()
    alert("Logged out successfully\nBasket has been emptied")
  }

  function login(data) {
    try {      
      axios.post(`http://localhost:5000/users/login`, data).then((response) => {
        sessionStorage.setItem("access_token", response.data.accessToken);
        if (response.data.accessToken !== null) {
          alert("Logged In");
        } else {
          alert("Login Failed");
        }
      });
    } catch (error) {
      alert(error)
    }

  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().max(255).required(),
    password: Yup.string().min(5).max(255).required(),
  })

  const initialValues = {
    email: '',
    password: ''
  };

  return (
    <div className="loginContainer">
      <Formik initialValues={initialValues} onSubmit={login} validationSchema={validationSchema}>
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
          <button type="submit">Log In</button>
          <button onClick={logout}>Log Out</button>
          <br/>
          <a href="/register">Not created an account yet? Register here!</a>  
        </Form>
      </Formik>

    </div>
  );
}

export default App;
