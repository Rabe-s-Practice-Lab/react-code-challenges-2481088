import { useState } from "react";

const isValueUnique = (str, character) => {
  const obj = [...str].reduce((acc, curr) => {
    acc[curr] = (acc[curr] ?? 0) + 1;
    return acc;
  }, {});

  return obj[character] === 1;
};

export default function FormValidator2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const createNewUser = (e) => {
    e.preventDefault();

    const validEmail = isValueUnique(email, "@");
    const validPassword = password.length >= 8;
    const doesPasswordMatch = password === passwordConfirm;

    if (!validEmail) {
      setMsg("Invalid Email!");
    } else if (!validPassword) {
      setMsg("Invalid Password");
    } else if (!doesPasswordMatch) {
      setMsg("Password must match !");
    } else {
      setMsg("Your account has been successfully created!");
    }
  };

  const isDisabled = email.trim() && password.trim() && passwordConfirm.trim();

  return (
    <form onSubmit={createNewUser}>
      <h2>Sign Up!</h2>
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
      <input type="submit" value="Submit" disabled={!isDisabled} />
    </form>
  );
}
