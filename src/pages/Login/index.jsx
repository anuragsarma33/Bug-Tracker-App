import { memo, useState } from "react";
import { Bug } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/auth/authSlice";
import styles from "./styles.module.css";
import classNames from "classnames";

const Login = memo(() => {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const errors = { username: "", password: "" };
    const { username, password } = formData;

    if (!username.trim()) {
      errors.username = "Username is required";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    dispatch(login(formData));
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.logoContainer}>
          <Bug size={30} color="rgb(37 99 235)" />
          <h1 className={styles.primaryHeading}>Bug Tracker</h1>
          <div className={styles.subHeading}>
            Sign in to your account to track and manage bugs
          </div>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.flexColumn}>
              <div className={styles.inputContainer}>
                <label htmlFor="username" className={styles.label}>
                  Username
                </label>
                <input
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  className={classNames(styles.input, {
                    [styles.error]: formErrors.username,
                  })}
                  onFocus={() => setFormErrors({ ...formErrors, username: "" })}
                  onBlur={() => {
                    if (!formData.username.trim()) {
                      setFormErrors({
                        ...formErrors,
                        username: "Username is required",
                      });
                    }
                  }}
                />
                {formErrors.username && (
                  <p className={styles.errorMessage}>{formErrors.username}</p>
                )}
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={handleChange}
                  className={classNames(styles.input, {
                    [styles.error]: formErrors.password,
                  })}
                  onFocus={() => setFormErrors({ ...formErrors, password: "" })}
                  onBlur={() => {
                    if (!formData.password) {
                      setFormErrors({
                        ...formErrors,
                        password: "Password is required",
                      });
                    }
                  }}
                />
                {formErrors.password && (
                  <p className={styles.errorMessage}>{formErrors.password}</p>
                )}
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Sign In
              </button>
            </div>
          </form>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      </div>
    </div>
  );
});

export default Login;
