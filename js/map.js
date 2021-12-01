//지도생성---------------------------------------
const container = document.getElementById('map'); 
const options = { 
	center: new kakao.maps.LatLng(37.3754367,127.007084), 
	level: 3
};

const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      
//지도이동막기 ------------------------------------------
setDraggable(true);

function setDraggable(draggable) {

    map.setDraggable(draggable);    
}

//지도확대축소막기-----------------------------
setZoomable(true);

function setZoomable(zoomable) {

    map.setZoomable(zoomable);    
}

//지도에 컨트롤 올리기--------------------------------------
const mapTypeControl = new kakao.maps.MapTypeControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//마커 표시하기--------------------------------------------
const branch_btns = document.querySelectorAll(".branch li");

 const imageSrc = 'img/location/marker1.png',
	   imageSize = new kakao.maps.Size(64,64),
	   imageOption = {offset: new kakao.maps.Point(32, 64)}; 

const markerOptions = [
	 {
		title : "타임빌라스 의왕점",
		latlng : new kakao.maps.LatLng(37.37615164654933, 127.00967017729234),
		button: branch_btns[0]
	 },
	 {
		title : "신세계프리미엄아울렛 시흥점",
		latlng : new kakao.maps.LatLng(37.37985804700607,126.7370634838679),
		button: branch_btns[1]
	 },
	 {
		title : "영등포 타임스퀘어",
		latlng : new kakao.maps.LatLng(37.51712084872874,126.90566030935004),
		button: branch_btns[2]
	 },
	 {
		title : "송도 현대프리미엄아울렛",
		latlng : new kakao.maps.LatLng(37.38167174962092,126.65795857415686),
		button: branch_btns[3]
	 }
 ];

const $boxs = $(".wrap2").find(".shop>div")

 for(let i=0; i<markerOptions.length; i++){
	new kakao.maps.Marker({
		map: map,
		position:markerOptions[i].latlng,
		title:markerOptions[i].title,
		image:new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
	});


	markerOptions[i].button.onclick = function(e){
		e.preventDefault();

		let target = $(this).index()
		$boxs.hide();
		$boxs.eq(target).show();

		moveTo(markerOptions[i].latlng); //해당지점으로 이동
		
		for(let k=0; k<markerOptions.length; k++){
            markerOptions[k].button.classList.remove("on");
        }
        markerOptions[i].button.classList.add("on");


	}
 }


 //지도이동----------------------------------
function moveTo(target) {            
    let moveLatLon = target;
    
    map.setCenter(moveLatLon);
}

window.onresize = function(){
    //활성화된 버튼의 data-index값 구하기
    var active_btn = document.querySelector(".branch li.on");
    var active_index = active_btn.getAttribute("data-index");
    console.log(active_index);
    map.setCenter(markerOptions[active_index].latlng)
}

