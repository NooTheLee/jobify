import { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { Alert, FormRow } from '../component';
import { ALERT_DANGER } from "./../context/actions";
import { useNavigate } from 'react-router-dom';

const initState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
}

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initState);
  const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext();


  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  };


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      displayAlert(ALERT_DANGER);
      return
    }
    const currentUser = { name, email, password }
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login successful! Redirecting...'
      });
      //loginUser(currentUser)
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created ! Redirecting..'
      });
      // registerUser(currentUser);
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)

    }
  }, [user, navigate])

  return (
    <div className=''>

      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">
                {values.isMember ? "Login" : "Register"}
              </h2>
              {showAlert && (<Alert />)}
              <form className="register-form" id="register-form">
                {!values.isMember && (
                  <FormRow name="name"
                    className={""}
                    labelText={""}
                    value={""}
                    handleChange={handleChange}
                  />
                )}
                <FormRow name="email"
                  className={""}
                  labelText={""}
                  value={""}
                  handleChange={handleChange}
                />
                <FormRow name="password"
                  className={""}
                  labelText={""}
                  value={""}
                  handleChange={handleChange} />

                <div className="form-group form-button">
                  <input type="submit" onClick={onSubmit} name="signup" id="signup" className="form-submit" defaultValue="Register" disabled={isLoading} />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure><img src="/images/signup-image.jpg" alt="sing up image" /></figure>
              <button type='submit' onClick={toggleMember} className="form-submit" >{!values.isMember ? "Login" : "Register"}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};

export default Register;