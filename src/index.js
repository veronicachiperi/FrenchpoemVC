function formatNutritionProgram(response) {
  const lines = response.data.answer.split(' Day ');
  const days = {};
  
  lines.forEach((line, index) => {
    if (index === 0) {
      line = line.replace('Day 1:', '');
    } else {
      line = 'Day ' + line;
    }
    
    const dayMatch = line.match(/Day (\d+):/);
    if (dayMatch) {
      const currentDay = dayMatch[1];
      const dayContent = line.replace(`Day ${currentDay}:`, '').trim();
      days[currentDay] = dayContent.split(' - ').map(meal => meal.trim());
    }
  });

  let formattedProgram = '';
  for (const day in days) {
    formattedProgram += `Day ${day}:\n${days[day].join('\n')}\n\n`;
  }

  return formattedProgram;
}

function displayProgram(response) {
  const formattedProgram = formatNutritionProgram(response);

  const programElement = document.querySelector("#program");
  programElement.innerHTML = formattedProgram;
}

function generateProgram(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions").value.trim(); 
  let apiKey = "01f7b532710b4e09a2cat93a396e1ao1";
  let context = "You are an expert in nutrition. Your mission is to generate 3 day nutrition programs with quantities based on user weight in basic HTML. Make sure to follow the user weight. Do not include a title to the program. Sign the program with 'VC' inside a <strong> element at the end of the program and NOT at the beginning";
  let prompt = `User instructions: Generate a nutrition program after reading ${instructionsInput}`;
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  let programElement = document.querySelector("#program");
  programElement.classList.remove("hidden");
  programElement.innerHTML = `<div class="generating">⏳ Generating your Nutrition program based on ${instructionsInput}</div>`;

  axios.get(apiURL).then(response => { programElement.innerHTML = '';
  displayProgram(response);
  }).catch(error => {
    console.error("Error generating program:", error);
    programElement.innerHTML = `<div class="error">❌ Error generating program. Please try again later.</div>`;
  });
}

let programFormElement = document.querySelector("#program-generator-form");
programFormElement.addEventListener("submit", generateProgram);