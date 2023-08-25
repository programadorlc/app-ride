const rideListElement = document.querySelector("#rideList")
const AllRides = getAllRides()

AllRides.forEach(async ([id, value]) => {
  const ride = JSON.parse(value)
  ride.id = id

  const itemElement = document.createElement("li")
  itemElement.id = ride.id
  itemElement.className = "d-flex p-1 align-items-center shadow-sm justify-content-between gap-3"
  rideListElement.appendChild(itemElement)

  itemElement.addEventListener("click", () => {
    window.location.href = `./detail.html?id=${ride.id}`
  })

  itemElement.style = "cursor:pointer;"

  const firstPosition = ride.data[0]
  const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude)

  const mapID = `map${ride.id}`
  const mapElement = document.createElement("div")
  mapElement.id = mapID
  mapElement.style = "width:100px;height:100px"
  mapElement.classList.add("bg-secondary", "rounded-4")

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

  itemElement.appendChild(mapElement)
  itemElement.appendChild(dataElement)

  const map = L.map(mapID, {
    attributionControl: false,
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false
  })
  map.setView([firstPosition.latitude, firstPosition.longitude], 15)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 10,
    maxZoom: 19,
  }).addTo(map);

  L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map)

})

