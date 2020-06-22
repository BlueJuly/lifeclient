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
    return mobileDeviceInfo;
  } catch (error) {
    return error;
  }
};
