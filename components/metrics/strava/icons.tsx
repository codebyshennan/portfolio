import {
  faChartLine,
  faMedal,
  faMountain,
  faBicycle,
  faRoad,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const rideIcon = (
  <FontAwesomeIcon icon={faBicycle} size="3x" className="text-orange" />
);
export const distanceIcon = (
  <FontAwesomeIcon icon={faRoad} size="3x" className="text-orange" />
);
export const timeIcon = (
  <FontAwesomeIcon icon={faStopwatch} size="3x" className="text-orange" />
);
export const elevationIcon = (
  <FontAwesomeIcon icon={faChartLine} size="3x" className="text-orange" />
);
export const longestRideIcon = (
  <FontAwesomeIcon icon={faMedal} size="3x" className="text-orange" />
);
export const biggestClimbIcon = (
  <FontAwesomeIcon icon={faMountain} size="3x" className="text-orange" />
);
