var map = L.map('map')
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);
document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';
document.getElementsByClassName( 'leaflet-control-zoom' )[0].style.display = 'none';

const input = document.querySelector('#input');
const ip = document.querySelector('#ip');
const loc = document.querySelector('#loc');
const timezone = document.querySelector('#timezone');
const isp = document.querySelector('#isp');

const inputBtn = document.querySelector('.input-btn')

const greenIcon = L.icon({
    iconUrl: 'https://svgshare.com/i/pDS.svg',
    shadowUrl: 'https://svgshare.com/i/pDz.svg',

    iconSize:     [36, 46], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [0, -94], // point of the icon which will correspond to marker's location
    shadowAnchor: [-18, -94],  // the same for the shadow
});

const consol = async() => {
const data = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_UE3WYD6BkzsN40ASKVyMJaccoUtZ6&ipAddress=${input.value}&domain=${input.value}`)
const res = await data.json()

ip.innerHTML = res.ip
loc.innerHTML = `${res.location.city} ${res.location.country}`
timezone.innerHTML = `UTC ${res.location.timezone}`
isp.innerHTML = res.isp

const coordinate = [res.location.lat, res.location.lng]
map.setView(coordinate, 13);
var marker = L.marker(coordinate, {icon: greenIcon}).addTo(map);

}
consol()

document.querySelector('#btn').addEventListener('click', (e) =>{
    e.preventDefault();

if(!input.value){

   inputBtn.classList.add('errMotion')
   setTimeout(() => {
    inputBtn.classList.remove('errMotion')

}, 1500)
} else{
    consol()
    .catch(err => {
        const error = document.querySelector('.error');
        error.style.display = 'block';
        error.innerHTML = 'Sorry your domain not Existed:(';
        setTimeout(() => {
            error.style.display = 'none';
        }, 3000);
    })
    input.value = '';
}   
})

