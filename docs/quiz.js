async function countPlanalto() {
  const files = [
    "data/all_data.json", 
    "data/bolsonaro_agenda.json",
    "data/agenda_dilma_final.json",
    "data/temer_agenda.json"
  ];
  let total = 0;

  for (let file of files) {
    const data = await d3.json(file);
    total += data.filter(d => d.local && d.local.toLowerCase().includes("palácio do planalto")).length;
  }

  return total;
}
