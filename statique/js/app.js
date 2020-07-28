let instance=null;
class MeteoAPP{

	constructor(){
		this.appid = document.body.dataset.appid || null;
		this.units = document.body.dataset.units || 'metric';
		this.lang = document.body.dataset.lang  || 'fr' ;
		this.url = '//api.openweathermap.org/data/2.5/';
		this.coords = null;

		if (!this.appid) {
			throw new Error('App id is not defined');
		}

		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(position=>{
				this.coords = position.coords;
				this.weather();	
				this.hourly();
				this.daily();
			})
		}
	}

	weather(){
		const weather = document.querySelector('#weather');
		if (weather) {
			this.api('weather', {
				lat:this.coords.latitude,
				lon:this.coords.longitude
			}).then(response=>{
				$weather.querySelector('.ciel').innerHTML = response.weather[0].description;
				$weather.querySelector('.minimal').innerHTML = Math.round(response.main.temp_min) + '°';
				$weather.querySelector('.maximal').innerHTML = Math.round(response.main.temp_max) + '°';
				$weather.querySelector('.current').innerHTML = Math.round(response.main.temp) + '°';
				console.log(response);
			});
		}
	}

    hourly(){
        const hourly = document.querySelector('#prevision-hours');
        if (hourly) {
            this.api('onecall', {
                lat:this.coords.latitude,
                lon:this.coords.longitude
            }).then(response=>{
                const date = new Date(??);
                let firstHour = date.getHours();
                firstHour = Number(firstHour);
                const lastHour = ??;
                const totalHours = lastHour - firstHour;

                const hoursParentElement = document.getElementById('hours');
                for (let i = 0; i <= totalHours; i++) {
                    const eachHour = new Date(??);
                    const hourElement = document.createElement('div');
                    const textElement = document.createTextNode(eachHour.getHours() +'h');
                    hourElement.appendChild(??);
                    hoursParentElement.appendChild(??);
                }

                const iconsParentElement = document.getElementById('icons');
                for (let i = 0; i <= totalHours; i++) {
                    const iconElement = document.createElement('img');
                    const url = ??;
                    const ext = ??;
                    const uri = url + ?? + ext;
                    iconElement.src = uri;
                    iconsParentElement.appendChild(??);
                }

                const tempsParentElement = document.getElementById('temps');
                for (let i = 0; i <= totalHours; i++) {
                    const degElement = document.createElement('div');
                    const textDegElement = document.createTextNode(Math.round(??) + '°');
                    degElement.appendChild(??);
                    tempsParentElement.appendChild(??);
                }
                console.log(response);
            })
        }

    }

    daily(){
        const daily = document.querySelector('#prevision-days');
        if (daily) {
            this.api('onecall', {
                lat:this.coords.latitude,
                lon:this.coords.longitude
            }).then(response=>{
                const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi','Samedi'];
                const parentElement = document.getElementById('days');
                for (let i = 1; i < response.daily.length; i++) {
                    const rowElement = document.createElement('tr');
                    rowElement.setAttribute('id', 'day' + [i]);
                    const dayElement = document.createElement('td');
                    const stateElement = document.createElement('td');
                    const maxTempElement = document.createElement('td');
                    const minTempElement = document.createElement('td');
                    parentElement.appendChild(??);
                    const trParentElement = document.getElementById('day' + [i]);

                    const date = new Date(??);
                    let day = date.getDay();
                    for (let y = 0; y < days.length; y++) {
                        if (day === y) {
                            day = days[y];
                        }
                    }
                    const dayTextElement = document.createTextNode(day);
                    dayElement.appendChild(??);
                    trParentElement.appendChild(??);
                    const state = ??;
                    const stateTextElement = document.createTextNode(??);
                    stateElement.appendChild(??);
                    trParentElement.appendChild(??);

                    const maxTemp = Math.round(??) + '°';
                    const maxTempTextElement = document.createTextNode(??);
                    maxTempElement.appendChild(??);
                    trParentElement.appendChild(??);

                    const minTemp = Math.round(??) + '°';
                    const minTempTextElement = document.createTextNode(??);
                    minTempElement.appendChild(??);
                    trParentElement.appendChild(??);
                    console.log(day, state, minTemp, maxTemp);
                }
            })
        }
    }


	api(apiName, query={}){
		let url = this.url + apiName +'?appid='+this.appid+'&units='+this.units+'&lang='+this.lang;
		for(let param in query){
			url+='&'+param+'='+query[param];		
		}
		return fetch(url).then(response=>response.json()) ;

	}

	static run(){
		if (!instance) {
			instance = new this;
		}
		return instance;
	}

}

console.log(MeteoAPP.run());









































