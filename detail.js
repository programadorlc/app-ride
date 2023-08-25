const params = new URLSearchParams(window.location.search)
const rideID = params.get("id")
const ride = getRideRecord(rideID)

document.addEventListener("DOMContentLoaded", async () => {
  const firstPosition = ride.data[0]
  const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude)

  const dataElement = document.createElement("div")
  dataElement.className = "flex-fill d-flex flex-column"

  const cityDiv = document.createElement("div")
  cityDiv.className = "text-primary mb-2"
  cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`

  const MaxSpeedDiv = document.createElement("div")
  MaxSpeedDiv.className = "h5"
  MaxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} Km/h`

  const distanceDiv = document.createElement("div")
  distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km`

  const durationDiv = document.createElement("div")

  durationDiv.innerText = `Duration: ${getDuration(ride)}`

  const dateDiv = document.createElement("div")
  dateDiv.className = "text-secondary mt-2"
  dateDiv.innerText = getStartDate(ride)

  dataElement.appendChild(cityDiv)
  dataElement.appendChild(MaxSpeedDiv)
  dataElement.appendChild(distanceDiv)
  dataElement.appendChild(durationDiv)
  dataElement.appendChild(dateDiv)

  document.querySelector("#data").appendChild(dataElement)

  const deleteBtn = document.querySelector("#deleteBtn")
  deleteBtn.addEventListener("click", () => {
    deleteRide(rideID)
    window.location.href = "./"
  })

  const map = L.map("mapDetail", {
    attributionControl: false,
  })
  map.setView([firstPosition.latitude, firstPosition.longitude], 15)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 10,
    maxZoom: 19,
  }).addTo(map);

  const positionsArray = ride.data.map((position => {
    return [position.latitude, position.longitude]
  }))

  const polyline = L.polyline(positionsArray, { color: "#F00" })
  polyline.addTo(map)

  map.fitBounds(polyline.getBounds)
})

