'use client';

import { useEffect, useRef } from 'react';

const NAVER_MAP_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID!;

const NaverMap = ({ address = '불정로 6' }: { address: string }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(37.5665, 126.978), // 기본 위치 (서울 시청)
      zoom: 15,
    });

    // 주소 -> 좌표 변환 (Geocoding API 사용)
    naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status === naver.maps.Service.Status.OK) {
        const location = response.v2.addresses[0];

        const latlng = new naver.maps.LatLng(parseFloat(location.y), parseFloat(location.x));

        // 지도 중심 이동
        map.setCenter(latlng);

        // 마커 추가
        new naver.maps.Marker({
          position: latlng,
          map: map,
        });
      }
    });
  }, [address]);

  return (
    <>
      <script
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        defer
      ></script>

      <div className="mx-10 my-5 h-[400px] w-full" ref={mapRef} />
    </>
  );
};

export default NaverMap;
