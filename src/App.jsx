import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsCloudSun } from "react-icons/bs";
import {
  WiDayFog,
  WiDayThunderstorm,
  WiDayStormShowers,
  WiLightning,
  WiNightSnow,
} from "react-icons/wi";

const weatherIcon = {
  "01": {
    textColor: "text-red-500",
    icon: <MdOutlineWbSunny size={120} />,
  },
  "02": {
    textColor: "text-blue-500",
    icon: <MdOutlineWbSunny size={120} />,
  },
  "03": {
    textColor: "text-green-500",
    icon: <BsCloudSun size={120} />,
  },
  "04": {
    textColor: "text-gray-500",
    icon: <WiDayFog size={120} />,
  },
  "09": {
    textColor: "text-cyan-500",
    icon: <WiDayThunderstorm size={120} />,
  },
  10: {
    textColor: "text-orange-500",
    icon: <WiDayStormShowers size={120} />,
  },
  11: {
    textColor: "text-red-500",
    icon: <MdOutlineWbSunny size={120} />,
  },
  13: {
    textColor: "text-blue-500",
    icon: <WiNightSnow size={120} />,
  },
  50: {
    textColor: "text-red-500",
    icon: <WiLightning size={120} />,
  },
};

const App = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [weatherData, setWeatherData] = useState();

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };
  // F12들어가서 components들어가면 내 위경도 값이 담겨있는것을 확일할수 있다.

  const getWeather = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4957b0177cff74ba574e053e51ce7d69&units=metric`
    );

    setWeatherData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getGeolocation();
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;
    getWeather();
  }, [latitude, longitude]); /* 둘중 하나만 변화해도 실행됨 */

  // 위의 2개가 실행되기위해서는 long lat 둘다 있어야 된다. 근데 값이 없음. 위에 getGeolocation으로 가져오는데 밑의 useeffect가 동시에 일어나기 때문에
  //오류가 발생하는거임 그래서 뒤의 useEffect getWeather를 딜레이시키면 해결됨 이때 useEffet의 의존성 배열을 사용하면됨,, 렌더링시에 실행시키지 말고 lat long의 값의 변화를 감지하고 실행시키면됨

  return (
    <div
      className={
        "min-h-screen flex flex-col justify-center items-center text-2xl"
      }
    >
      {/* svg이미지는 text취급받음*/}
      {weatherData ? (
        <div
          className={`flex flex-col items-center gap-8 ${
            weatherIcon[weatherData.weather[0].icon.substring(0, 2)].textColor
          }`}
        >
          {/* <MdOutlineWbSunny size={120} />{" "} */}
          {/* 아이콘 가져다 쓰기(위에 임포트 해놓고)*/}
          {weatherIcon[weatherData.weather[0].icon.substring(0, 2)].icon}
          <div>
            {weatherData.name},{weatherData.main.temp}
          </div>
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
};

export default App;
