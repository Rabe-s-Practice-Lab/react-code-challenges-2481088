import React from "react";
import { useEffect } from "react";

export default function DogPics() {
  const [randomDogUrl, setRandomDogUrl] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  // API: https://dog.ceo/dog-api/

  React.useEffect(() => {
    getRandomDog();
  }, []);

  async function getRandomDog() {
    try {
      setLoading(true);
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      if (!data.status) {
        throw new Error("Failed to fetch new images");
      }
      setRandomDogUrl(data.message);
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dog-pics">
      {!loading ? (
        <img
          src={randomDogUrl}
          alt={"pic"}
          width="600"
          height="600"
          style={{ borderRadius: "10%" }}
        />
      ) : (
        <div> loading... </div>
      )}

      <button onClick={getRandomDog}>🐶</button>
    </div>
  );
}
