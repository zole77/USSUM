import { useEffect } from 'react';

const KakaoMap = () => {
    useEffect(() => {
        const kakaoMapScript = document.createElement('script')
        kakaoMapScript.async = false
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=876d8abc7de6bcc08cb2aea4cf294117&libraries=services&autoload=false`
        document.head.appendChild(kakaoMapScript)

        const onLoadKakaoAPI = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map')
                const options = {
                    center: new window.kakao.maps.LatLng(35.179587, 129.074857),
                    level: 3,
                }


                const map = new window.kakao.maps.Map(container, options);

                const geocoder = new window.kakao.maps.services.Geocoder();

                geocoder.addressSearch('부산광역시 남구 대연동', function(result, status) {


                    if (status === window.kakao.maps.services.Status.OK) {
                        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                        const marker = new window.kakao.maps.Marker({
                            map: map,
                            position: coords,
                        });
                        const infowindow = new window.kakao.maps.InfoWindow({
                            content: '<div style="width:150px;text-align:center;padding:6px 0;">여기</div>',
                        });
                        //infowindow.open(map, marker);
                        map.setCenter(coords);
                    }
                });
            });
        };

        kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
    }, []);

    return (
        <>
            <div id="map" style={{ width: '100%', height: '90%' }}></div>

            <div id="clickLatlng"></div>
        </>
    );
};

export default KakaoMap;