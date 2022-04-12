
<script>

  let clicks = 0;

</script>

<div class="hero min-h-screen bg-base-200">
	<div class="flex-col items-center place-center justify-center p-20">
    <div class="flex-col hero-content lg:flex-row">
      <img src="/maja_huvudentre.jpg" class="max-w-sm rounded-lg shadow-2xl" />
      <div>
        <h1 class="text-5xl font-bold">Liv och lärande i framkant!</h1>
        <p class="py-6">
          Maja Beskowgymnasiet är skolan för dig som vill ha en god grund för fortsatta studier och
          ett spännande arbetsliv. Skolan ligger centralt placerad mellan stadskärnan och Umeå
          universitet, vilket underlättar för nära samarbeten och studiebesök. Inom verksamheten finns
          även koppling till Umeå Elitidrottsgymnasium.
        </p>
        <button
          on:click={() => {
            window.open('https://www.skola.umea.se/skolor/gymnasieskolor/maja-beskowgymnasiet.html');
          }}
          class="btn btn-primary">Läs mer!</button
        >
        <button on:click={() => {
    
            clicks = clicks+1;
    
          }} class="btn btn-primary">Add!!</button>
      </div>
    </div>

    <div class="stats shadow">
  
      <div class="stat">
        <div class="stat-title">Antal clicks:</div>
        <div class="stat-value">{clicks}</div>
        <div class="stat-desc">21% more than last month</div>
      </div>
      
    </div>
    
  </div>





</div>
