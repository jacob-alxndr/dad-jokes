const fetchData = async () => {
  const ep = "https://icanhazdadjoke.com/";
  const res = await fetch(ep, { headers: { accept: "application/json" } });
  const data = await res.json();
  return data;
};

export { fetchData };
