import { useState, useEffect } from "react";
import { Box, Flex, Text, Image, SimpleGrid, Spinner, Center, useColorModeValue } from "@chakra-ui/react";
import { FaTemperatureHigh, FaWind, FaCloud } from "react-icons/fa";

const cities = [
  { name: "London", id: "2643743" },
  { name: "Paris", id: "2988507" },
  { name: "Berlin", id: "2950159" },
  { name: "Madrid", id: "3117735" },
  { name: "Rome", id: "3169070" },
];

const apiKey = "YOUR_API_KEY_HERE"; // Replace YOUR_API_KEY_HERE with your actual OpenWeatherMap API key

const WeatherCard = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setWeather(data);
    };

    fetchWeather();
  }, [city.id]);

  if (!weather) {
    return (
      <Center p={10}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" bg={useColorModeValue("white", "gray.800")}>
      <Text fontSize="xl" fontWeight="bold">
        {city.name}
      </Text>
      <Text mt={2}>
        <FaTemperatureHigh /> {weather.main.temp}°C
      </Text>
      <Text mt={2}>
        <FaWind /> {weather.wind.speed} m/s
      </Text>
      <Text mt={2}>
        <FaCloud /> {weather.weather[0].description}
      </Text>
      <Image src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather icon" mt={2} />
    </Box>
  );
};

const Index = () => {
  return (
    <Flex direction="column" align="center" justify="center" minH="100vh">
      <Text fontSize="4xl" fontWeight="bold" mb={6}>
        Weather in Major European Cities
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={10} p={10}>
        {cities.map((city) => (
          <WeatherCard key={city.id} city={city} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Index;
