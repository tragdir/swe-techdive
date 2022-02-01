import React from "react";

const AddPatient = () => {
  return (
    <div>
      <h1>Nice form is coming! 🐱‍🏍</h1>
      <form id='form' method='post' action='/item' enctype='multipart/form-data'>
            <label for='name'> Name
            <input type='text' id='name' name='name'></input>
            </label>

            <label for='age'> Age
            <input type='age' id='age' name='age'></input>
            </label>


            <label for='zip'> Zip
            <input type='number' id='zip' name='zip'></input>
            </label>

            <p></p>

            <label for='scoreA'> ZoneA
            <input type='number' id='scoreA' name='scoreA' max='3' min='0'></input>
            </label>

            <label for='scoreB'> ZoneB
            <input type='number' id='scoreB' name='scoreB' max='3' min='0'></input>
            </label>

            <label for='scoreC'> ZoneC
            <input type='number' id='scoreC' name='scoreC' max='3' min='0'></input>
            </label>

            <label for='scoreD'> ZoneD
            <input type='number' id='scoreD' name='scoreD' max='3' min='0'></input>
            </label>

            <label for='scoreE'> ZoneE
            <input type='number' id='scoreE' name='scoreE' max='3' min='0'></input>
            </label>

            <label for='scoreF'> ZoneF
            <input type='number' id='scoreF' name='scoreF' max='3' min='0'></input>
            </label>

            <p></p>

            <label for='comment'> Information
            <p></p>
            <textarea id='comment' name='comment' rows="6" cols="50"></textarea>
            </label>

            <p></p>

            <label for='picture'> X-Ray Image
            <input type='file' id='picture' name='picture'></input>
            </label>
            <p></p>

            <input type='submit' value='Add New'></input>
        </form>

    </div>
  );
};

export default AddPatient;
