function generatePlan() {
  const acres = parseFloat(document.getElementById("acres").value);
  const floors = parseInt(document.getElementById("floors").value);
  const rooms = parseInt(document.getElementById("rooms").value);

  const resultDiv = document.getElementById("result");

  if (!acres || !floors || !rooms) {
    resultDiv.innerHTML = "❌ Please fill all fields.";
    return;
  }

  // Convert acres to square feet
  const totalSqft = acres * 43560;

  // Assume 60% usable construction area
  const buildableArea = totalSqft * 0.6;

  const areaPerFloor = buildableArea / floors;
  const avgRoomSize = 120; // sqft per room assumption

  const possibleRoomsPerFloor = Math.floor(areaPerFloor / avgRoomSize);

  // Determine flat type
  let flatType = "";
  if (possibleRoomsPerFloor >= 6) {
    flatType = "✅ 3BHK is feasible";
  } else if (possibleRoomsPerFloor >= 4) {
    flatType = "✅ 2BHK is feasible";
  } else {
    flatType = "⚠️ Space is limited — consider compact design";
  }

  resultDiv.innerHTML = `
    📐 Total Land: ${totalSqft.toFixed(0)} sqft<br>
    🏢 Area per Floor: ${areaPerFloor.toFixed(0)} sqft<br>
    🚪 Possible Rooms/Floor: ${possibleRoomsPerFloor}<br>
    ${flatType}
  `;
}