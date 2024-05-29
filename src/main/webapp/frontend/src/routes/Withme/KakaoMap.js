import { useEffect } from 'react';


const KakaoMap = ({selectedCity, selectedDistrict, onMapClick}) => {
    useEffect(() => {
        const kakaoMapScript = document.createElement('script')
        kakaoMapScript.async = false
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=876d8abc7de6bcc08cb2aea4cf294117&libraries=services&autoload=false`
        document.head.appendChild(kakaoMapScript)

        const onLoadKakaoAPI = () => {
            window.kakao.maps.load(() => {
                console.log("kakao map api loaded")
                const container = document.getElementById('map')
                const options = {
                    center: new window.kakao.maps.LatLng(35.179587, 129.074857),
                    level: 3,
                }


                const map = new window.kakao.maps.Map(container, options);

                const geocoder = new window.kakao.maps.services.Geocoder();


                if (selectedCity && selectedDistrict) {
                    const address = selectedCity + " " + selectedDistrict;
                    console.log("address: ", address)
                    geocoder.addressSearch(address, function (result, status) {
                        if (status === window.kakao.maps.services.Status.OK) {
                            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                            // const marker = new window.kakao.maps.Marker({
                            //     map: map,
                            //     position: coords,
                            // });
                            // const infowindow = new window.kakao.maps.InfoWindow({
                            //     content: '<div style="width:150px;text-align:center;padding:6px 0;"></div>',
                            // });
                            //infowindow.open(map, marker);
                            map.setCenter(coords);
                        } else {
                            console.error("Address search failed: ", status);
                        }

                    });
                }

                const marker = new window.kakao.maps.Marker({
                    map:map,
                    position: map.getCenter()
                });
                marker.setMap(map);

                window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                    const latlng = mouseEvent.latLng;
                    // const marker = new window.kakao.maps.Marker({
                    //     map: map,
                    //     position: latlng,
                    // });
                    marker.setPosition(latlng);
                    console.log("Clicked Coordinates: ", latlng); // 클릭된 좌표 확인
                    if (onMapClick) {
                        onMapClick(latlng);
                    }
                });
            });
        };

        kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
        return() =>{
            document.head.removeChild(kakaoMapScript);
        };
    }, [selectedCity,selectedDistrict]);


    return (
        <>
            <div id="map" style={{ width: '100%', height: '90%' }}></div>

            <div id="clickLatlng"></div>
        </>
    );
};

export default KakaoMap;