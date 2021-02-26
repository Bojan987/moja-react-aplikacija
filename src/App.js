import { useEffect, useState } from "react";
import { ValidationComponent } from "./components/ValidationComponent";
import { CharComponent } from "./components/CharComponent";
import { getStudent } from "./services";
import "./App.css";

function App() {
  const [string, setString] = useState("");
  const [stringToArray, setStringToArray] = useState([]);
  const [student, setStudent] = useState(undefined);
  const [css, setCss] = useState(false);

  //fetch Student
  useEffect(() => {
    getStudent().then((res) => {
      setStudent(res.data);
    });
  }, []);

  // convert string to array
  const toArray = (string) => {
    const stringArray = string.split("");

    return stringArray;
  };

  //set input state and array state
  const handleChange = (e) => {
    setString(e.target.value);
    setStringToArray(toArray(e.target.value));
  };

  //delete charComponent from array
  const handleClick = (id) => {
    setStringToArray((prevArray) => {
      return prevArray.filter((el, idx) => idx !== id);
    });
  };

  //update input field after deleting
  useEffect(() => {
    setString(stringToArray.join(""));
  }, [stringToArray]);

  //add css
  const handleCss = () => {
    setCss(!css);
  };

  return (
    <div>
      {css === false ? (
        <div className="App">
          <button onClick={handleCss}>CSS Toggle</button>
          <input
            type="text"
            placeholder="Write your String"
            onChange={handleChange}
            value={string}
          />
          <p>Your String length : {string.length}</p>
          <ValidationComponent stringLength={string.length} />
          <hr />
          {stringToArray.map((el, idx) => (
            <CharComponent
              character={el}
              key={idx}
              id={idx}
              onDelete={handleClick}
            />
          ))}
          <hr />
          {student !== undefined && (
            <div>
              <p>{student.name}</p>
              <p>{student.lastName}</p>
              <p>{student.age}</p>
              <p>{student.placeOfBirth.city}</p>
              <p>{student.placeOfBirth.country}</p>
              <p>{student.placeOfBirth.zip}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="wrapper">
          <div className="inputWrapp">
            <div className="input-container">
              <p>Your String length : {string.length}</p>
              <input
                type="text"
                placeholder="Write your String"
                onChange={handleChange}
                value={string}
              />

              <p>
                <ValidationComponent stringLength={string.length} />
              </p>

              <div className="buttons">
                <button className="primary ghost" onClick={handleCss}>
                  CSS TOGGLE
                </button>
              </div>
            </div>

            <div className="charWrapper">
              {stringToArray.map((el, idx) => (
                <CharComponent
                  character={el}
                  key={idx}
                  id={idx}
                  onDelete={handleClick}
                />
              ))}
            </div>
          </div>

          <div className="student-wrap">
            {student !== undefined && (
              <div className="card-container">
                <img
                  className="round"
                  src="https://randomuser.me/api/portraits/men/64.jpg"
                  alt="user"
                />
                <h3>{student.name}</h3>
                <h6>{student.lastName}</h6>
                <p>
                  Age:{student.age}
                  <br /> City:{student.placeOfBirth.city} <br />
                  Country:{student.placeOfBirth.country} <br /> Zip:
                  {student.placeOfBirth.zip}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
