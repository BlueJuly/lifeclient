import {
  getSystemName,
  getSystemVersion,
  getManufacturer,
  getBrand,
  getBatteryLevel,
  getVersion,
  getTotalMemory,
  getUsedMemory,
  getDeviceId,
} from 'react-native-device-info';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import socketIO from './socketIO';
export const getMobileDeviceInfo = async function() {
  let mobileDeviceInfo = {};
  try {
    mobileDeviceInfo.manufacturer = await getManufacturer();
    mobileDeviceInfo.brand = getBrand();
    mobileDeviceInfo.deviceId = getDeviceId();
    mobileDeviceInfo.systemName = getSystemName();
    mobileDeviceInfo.systemVersion = getSystemVersion();
    mobileDeviceInfo.applicationVersion = getVersion();
    mobileDeviceInfo.batteryLevel = await getBatteryLevel();
    mobileDeviceInfo.totalMemory = await getTotalMemory();
    mobileDeviceInfo.usedMemory = await getUsedMemory();
    const authStatus = await messaging().requestPermission();
    // const enabled =
    //   authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;

    // if (enabled) {
    //   console.log('Authorization status:', authStatus);
    // }
    mobileDeviceInfo.token = await messaging().getToken();
    return mobileDeviceInfo;
  } catch (error) {
    return error;
  }
};
