export default function getLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) =>
    window.navigator.geolocation.getCurrentPosition(
      (geoLoc) => {
        resolve(geoLoc);
      },
      (error) => {
        reject(error);
      }
    )
  );
}
