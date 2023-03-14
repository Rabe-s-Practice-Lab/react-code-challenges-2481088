import { useState } from "react";

const promiseTest = (
  validEmail,
  validPassword,
  doesPasswordMatch,
  time = 1000
) => {
  return new Promise((resolve, reject) => {
    const error = [];
    setTimeout(() => {
      if (!validEmail) {
        error.push("Invalid Email");
      }
      if (!validPassword) {
        error.push("Invalid Password");
      }
      if (!doesPasswordMatch) {
        error.push("Password must match");
      }
      if (error.length > 0) {
        reject(error);
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

export default function FormValidator3() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

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
      //console.log(response);
      setMsg(response);
    } catch (error) {
      setMsg(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = email.trim() && password.trim() && passwordConfirm.trim();

  return (
    <form onSubmit={createNewUser}>
      <h2>Sign Up 3!</h2>
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

      {Array.isArray(msg) ? (
        <p style={{ color: "red" }}> {msg.join(", ")}</p>
      ) : (
        <p>{msg}</p>
      )}

      <button type="submit" disabled={loading || !isDisabled}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
