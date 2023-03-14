import { useState } from "react";

const promiseTest = (
  validEmail,
  validPassword,
  doesPasswordMatch,
  time = 1000
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!validEmail) {
        reject("Invalid Email!");
      } else if (!validPassword) {
        reject("Invalid Password");
      } else if (!doesPasswordMatch) {
        reject("Password must match !");
      } else {
        resolve("Your account has been successfully created!");
      }
    }, time);
  });
};

const isValueUnique = (str, character) => {
  const obj = [...str].reduce((acc, curr) => {
    acc[curr] = (acc[curr] ?? 0) + 1;
    return acc;
  }, {});

  return obj[character] === 1;
};

export default function FormValidator() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const createNewUser = async (e) => {
    e.preventDefault();

    const validEmail = isValueUnique(email, "@");
    const validPassword = password.length >= 8;
    const doesPasswordMatch = password === passwordConfirm;

    try {
      setLoading(true);
      const response = await promiseTest(
        validEmail,
        validPassword,
        doesPasswordMatch,
        2000
      );
      setMsg(response);
    } catch (error) {
      setMsg(error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = email.trim() && password.trim() && passwordConfirm.trim();

  return (
    <form onSubmit={createNewUser}>
      <h2>Sign Up 2!</h2>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        name="password"
        onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))}
      />
      <label htmlFor="password-confirm">Confirm Password </label>
      <input
        type="text"
        name="password-confirm"
        onChange={(e) => setPasswordConfirm(e.target.value.replace(/\s/g, ""))}
      />
      {msg && <p> {msg} </p>}

      <button type="submit" disabled={loading || !isDisabled}>
        {loading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}
