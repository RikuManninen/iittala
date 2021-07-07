export const getMarkerInfo = async () => {
  const res = await fetch('/api/markers/');
  const json = await res.json();
  return json;
}

export default getMarkerInfo