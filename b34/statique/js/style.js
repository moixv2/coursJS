//b37d8e918bcf60f7c3b869cb0e49aef3
//48.85
//2.27

let instance=null;
class MeteoAPP{

	constructor(){
		this.appid= document.body.dataset.appid || null;
		this.units= document.body.dataset.units || "metric";
		this.lang= document.body.dataset.lang  || "fr" ;
		this.url = "//api.openweathermap.org/data/2.5/";
		this.coords = null;

		if (!this.appid) {
			throw new Error('Appid is not defined');
		}

		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(position=>{
				this.coords = position.coords;
                this.weather();
                this.previsionDays();
	
            })
            
            
        }
        
	}
/***************Weather*****************/

	weather(){
		let $weather = document.querySelector("#weather");
		if ($weather) {
			this.api('weather', {
				lat:this.coords.latitude,
				lon:this.coords.longitude
			}).then(response=>{
				$weather.querySelector(".ciel").innerHTML   = response.weather[0].description;
				$weather.querySelector(".min").innerHTML    = Math.round(response.main.temp_min)+"°";
				$weather.querySelector(".max").innerHTML    =Math.round(response.main.temp_max)+"°";
				$weather.querySelector(".current").innerHTML=Math.round(response.main.temp)+"°";
				console.log(response);
			});
		}
    }
    
/***************prevision days******************/


previsionDays(){
    let $previsionDays = document.querySelector("#previsionDays");
    if ($previsionDays) {
        this.api('previsionDays', {
            lat:this.coords.latitude,
            lon:this.coords.longitude
        }).then(response=>{
           /* $previsionDays.querySelector(".day").innerHTML   = response.previsionDays[0].description;*/
            $previsionDays.querySelector(".ciel").innerHTML   = response.previsionDays[0].description;
            $previsionDays.querySelector(".min").innerHTML    = Math.round(response.main.temp_min)+"°";
            $previsionDays.querySelector(".max").innerHTML    =Math.round(response.main.temp_max)+"°";
            console.log(response);
        });
    }
}

/*********************************************** */

	api(apiName, query={}){
		let url = this.url + apiName +"?appid="+this.appid+"&units="+this.units+"&lang="+this.lang;
		for(let param in query){
			url+="&"+param+"="+query[param];		
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


