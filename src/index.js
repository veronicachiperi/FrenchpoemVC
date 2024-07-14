function displayProgram(response) {
  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generatePoem(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions").value.trim(); 
  let apiKey = "01f7b532710b4e09a2cat93a396e1ao1";
  let context = "You are an expert in nutrition. Your mission is to generate 1 week nutrition programs based on user weight in basic HTML and separate each line with a <br />. Make sure to follow the user weight. Do not include a title to the program. Sign the program with 'VC' inside a <strong> element at the end of the program and NOT at the beginning";
  let prompt = `User instructions: Generate a nutrition program after reading ${instructionsInput}`;
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  let programElement = document.querySelector("#program");
  programElement.classList.remove("hidden");
  programElement.innerHTML = `<div class="generating">⏳ Generating your Nutrition program based on ${instructionsInput}</div>`;

  axios.get(apiURL).then(displayPoem).catch(error => {
    console.error("Error generating poem:", error);
    programElement.innerHTML = `<div class="error">❌ Error generating program. Please try again later.</div>`;
  });
}

let programFormElement = document.querySelector("#program-generator-form");
programFormElement.addEventListener("submit", generateProgram);