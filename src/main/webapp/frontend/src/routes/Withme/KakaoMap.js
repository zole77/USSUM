import { useEffect, useState, useRef } from "react";
import WithMePost from "./WithMePost";

const KakaoMap = ({
    withMePost,
    selectedCity,
    selectedDistrict,
    onMapClick,
    setWithMe_x,
    setWithMe_y,
    setReadModalOpen,
    setSelectedPost,
    setPostUser,
    setPostThumbnail,
}) => {
    const [markerSet, setMarkerSet] = useState([]);
    const [postUserInfo, setPostUserInfo] = useState(null);

    useEffect(() => {
        console.log(withMePost);
        if (withMePost && withMePost.length > 0) {
            const newMarkerSet = withMePost.map((post) => ({
                lat: post.withMe_x,
                lng: post.withMe_y,
            }));
            setMarkerSet(newMarkerSet);
        }
    }, [withMePost]);

    useEffect(() => {
        const kakaoMapScript = document.createElement("script");
        kakaoMapScript.async = false;
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=876d8abc7de6bcc08cb2aea4cf294117&libraries=services&autoload=false`;
        document.head.appendChild(kakaoMapScript);

        const onLoadKakaoAPI = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(35.179587, 129.074857),
                    level: 3,
                };

                const map = new window.kakao.maps.Map(container, options);

                const geocoder = new window.kakao.maps.services.Geocoder();

                if (selectedCity && selectedDistrict) {
                    const address = selectedCity + " " + selectedDistrict;
                    geocoder.addressSearch(address, function (result, status) {
                        if (status === window.kakao.maps.services.Status.OK) {
                            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                            map.setCenter(coords);
                        } else {
                            console.error("Address search failed: ", status);
                        }
                    });
                }

                // 각 포스트에 대해 마커 생성 및 추가
                withMePost.forEach((post) => {
                    const markerPosition = new window.kakao.maps.LatLng(
                        post.withMe_y,
                        post.withMe_x
                    );
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition,
                    });

                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: `<div style="width: 200px; height: 50px; display: flex; justify-content: center; align-items: center; cursor: pointer;" id="infowindow-${post.withMe_id}">${post.withMe_title}</div>`,
                    });

                    // 마커에 클릭 이벤트 등록
                    window.kakao.maps.event.addListener(marker, "click", function () {
                        // 마커 클릭 시 정보창 열기
                        infowindow.open(map, marker);
                        // InfoWindow 내용에 대한 클릭 이벤트 설정
                        const infoWindowContent = document.getElementById(
                            `infowindow-${post.withMe_id}`
                        );
                        if (infoWindowContent) {
                            infoWindowContent.addEventListener("click", () => {
                                console.log(post);
                                setPostThumbnail(
                                    `http://localhost:3000/withme/image/${post.withMe_thumbnail}`
                                );
                                setPostUser(
                                    `http://localhost:3000/member/one?mem_id=${post.mem_id}`
                                );
                                setSelectedPost(post);
                                setReadModalOpen(true);
                            });
                        }
                    });
                    marker.setMap(map);
                });

                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: map.getCenter(),
                });
                marker.setMap(map);

                window.kakao.maps.event.addListener(map, "click", function (mouseEvent) {
                    const latlng = mouseEvent.latLng;
                    marker.setPosition(latlng);
                    setWithMe_x(latlng.La);
                    setWithMe_y(latlng.Ma);
                    if (onMapClick) {
                        onMapClick(latlng);
                    }
                });
            });
        };

        kakaoMapScript.addEventListener("load", onLoadKakaoAPI);

        return () => {
            document.head.removeChild(kakaoMapScript);
        };
    }, []);

    useEffect(() => {
        // Add markers to the map
    }, [markerSet]);

    return (
        <>
            <div id="map" style={{ width: "100%", minHeight: "500px", objectFit: "cover" }}></div>
            <div id="clickLatlng"></div>
        </>
    );
};

export default KakaoMap;
