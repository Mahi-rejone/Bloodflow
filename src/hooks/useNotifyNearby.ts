"use client";

import { useState } from "react";
import { message } from "antd";
import { useNotifyNearbyDonorsMutation } from "@/redux/feature/notification/notificationApi";

const getPosition = () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject({ code: 0 });
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60000,
    });
  });

const GEO_ERRORS: Record<number, string> = {
  0: "Your browser doesn't support location.",
  1: "Location permission was denied. Allow it in your browser settings.",
  2: "Couldn't determine your location.",
  3: "Getting your location took too long. Try again.",
};

export function useNotifyNearby() {
  const [locating, setLocating] = useState(false);
  const [notifyNearby, { isLoading }] = useNotifyNearbyDonorsMutation();

  const notify = async (bloodGroup: string, requestId?: string) => {
    setLocating(true);
    try {
      const pos = await getPosition();
      const result = await notifyNearby({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        bloodGroup,
        requestId,
      }).unwrap();

      const { notified, area } = result.data;
      const place = area.town || area.district;
      if (notified === 0) {
        message.info(`No matching donors found near ${place}.`);
      } else {
        message.success(`Notified ${notified} donor(s) near ${place}.`);
      }
      return true;
    } catch (err: any) {
      if (typeof err?.code === "number" && err.code in GEO_ERRORS) {
        message.error(GEO_ERRORS[err.code]);
      } else {
        message.error(err?.data?.errorMessage || "Couldn't send alerts.");
      }
      return false;
    } finally {
      setLocating(false);
    }
  };

  return { notify, loading: locating || isLoading };
}
